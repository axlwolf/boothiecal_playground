import React, { useState, useEffect } from "react";
import PhotoLayoutCard from "./PhotoLayoutCard";
import ControlsCard from "./ControlsCard";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import frameMappings from "./frameMappings";
import { parseGIF, decompressFrames } from 'gifuct-js';
import { useTheme } from "./ThemeContext";
import { StripDesignProps, DesignOverlay, CapturedImage } from "../types";

interface DesignGridProps {
  designs: DesignOverlay[];
  selectedDesign: DesignOverlay | null | undefined;
  onSelectDesign: (design: DesignOverlay) => void;
}

// PAGINATED DESIGN GRID
function DesignGrid({ designs, selectedDesign, onSelectDesign }: DesignGridProps): React.JSX.Element {
  const { colors, isDarkMode } = useTheme();
  const pageSize: number = 2; // 2 per row × 2 rows
  const [page, setPage] = useState<number>(0);
  const pageCount: number = Math.ceil(designs.length / pageSize);
  const start: number = page * pageSize;
  const paginatedDesigns: DesignOverlay[] = designs.slice(start, start + pageSize);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4 place-items-center">
        {paginatedDesigns.map((design) => (
          <div
            key={design.key}
            className={`border-2 rounded-lg p-2 cursor-pointer transition ${
              selectedDesign?.key === design.key
                ? `${colors.border} ring-2 ring-${colors.primary}-300`
                : isDarkMode ? "border-gray-600" : "border-gray-200"
            }`}
            onClick={() => onSelectDesign(design)}
          >
            <img src={design.url} alt={design.key} className="w-full h-auto mx-auto" />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mb-2">
        {page > 0 && (
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className={`px-2 py-1 rounded ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition`}
          >
            Previous
          </button>
        )}
        {[...Array(pageCount)].map((_, idx) => (
          <button
            key={idx}
            className={`px-2 py-1 rounded ${
              page === idx ? `bg-${colors.primary}-200 font-bold` : isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
            onClick={() => setPage(idx)}
          >
            {idx + 1}
          </button>
        ))}
        {page < pageCount - 1 && (
          <button
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className={`px-2 py-1 rounded ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition`}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

// Helper: Draw image with "cover" behavior (crops excess, keeps aspect ratio)
function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number): void {
  const imgAspect: number = img.width / img.height;
  const winAspect: number = w / h;
  let sx: number, sy: number, sw: number, sh: number;

  if (imgAspect > winAspect) {
    // Crop left/right
    sh = img.height;
    sw = sh * winAspect;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    // Crop top/bottom
    sw = img.width;
    sh = sw / winAspect;
    sx = 0;
    sy = (img.height - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

type StepType = "filters" | "designs";
type CameraStep = "filters" | "design";
type DownloadType = "photo" | "gif";

export default function StripDesign({ images, designs, onBack, captured = [], selectedDesign, onSelectDesign }: StripDesignProps): React.JSX.Element {
  const { colors } = useTheme();
  const [step, setStep] = useState<StepType>("filters");
  const [photoFilters, setPhotoFilters] = useState<string[]>(images.map(() => ""));
  const [cardAnim, setCardAnim] = useState<string>("card-enter");
  const [downloadType, setDownloadType] = useState<DownloadType>("photo");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [overlayImg, setOverlayImg] = useState<HTMLImageElement | null>(null); // Cache for overlay image

  // Preload overlay image when selectedDesign changes
  useEffect(() => {
    let isMounted = true;
    async function loadOverlay(): Promise<void> {
      let overlay: HTMLImageElement | null = null;
      if (selectedDesign?.url) {
        overlay = new Image();
        overlay.crossOrigin = "anonymous";
        overlay.src = selectedDesign.url;
        await new Promise<void>((resolve) => {
          overlay!.onload = () => resolve();
        });
      }
      if (isMounted) {
        setOverlayImg(overlay);
      }
    }
    loadOverlay();
    return () => { isMounted = false; };
  }, [selectedDesign]);

  // Download logic with frame mapping support and cropping
  const handleDownload = async (): Promise<void> => {
    const mappingKey: string | undefined = selectedDesign?.key;
    const mapping: any = mappingKey ? (frameMappings as any)[mappingKey] : null;

    let width: number, height: number;
    if (mapping) {
      width = mapping.frameWidth;
      height = mapping.frameHeight;
    } else {
      // fallback grid
      const isGrid: boolean = images.length === 6;
      const columns: number = isGrid ? 2 : 1;
      const imageWidth: number = 180;
      const imageHeight: number = 160;
      const gap: number = 16;
      const rows: number = Math.ceil(images.length / columns);
      width = columns * imageWidth + (columns - 1) * gap;
      height = rows * imageHeight + (rows - 1) * gap;
    }

    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

    if (mapping) {
      // Draw each photo in its mapped window, cropping excess
      for (let i = 0; i < mapping.windows.length; i++) {
        const win = mapping.windows[i];
        const img: HTMLImageElement = new Image();
        img.crossOrigin = "anonymous";
        img.src = images[i];
        await new Promise<void>((resolve) => {
          img.onload = (): void => {
            ctx.save();
            if (win.borderRadius) {
              ctx.beginPath();
              ctx.moveTo(win.left + win.borderRadius, win.top);
              ctx.lineTo(win.left + win.width - win.borderRadius, win.top);
              ctx.quadraticCurveTo(win.left + win.width, win.top, win.left + win.width, win.top + win.borderRadius);
              ctx.lineTo(win.left + win.width, win.top + win.height - win.borderRadius);
              ctx.quadraticCurveTo(win.left + win.width, win.top + win.height, win.left + win.width - win.borderRadius, win.top + win.height);
              ctx.lineTo(win.left + win.borderRadius, win.top + win.height);
              ctx.quadraticCurveTo(win.left, win.top + win.height, win.left, win.top + win.height - win.borderRadius);
              ctx.lineTo(win.left, win.top + win.borderRadius);
              ctx.quadraticCurveTo(win.left, win.top, win.left + win.borderRadius, win.top);
              ctx.closePath();
              ctx.clip();
            } else {
              ctx.beginPath();
              ctx.rect(win.left, win.top, win.width, win.height);
              ctx.closePath();
              ctx.clip();
            }
            ctx.filter = photoFilters[i] || "none";
            drawImageCover(ctx, img, win.left, win.top, win.width, win.height);
            ctx.restore();
            ctx.filter = "none";
            resolve();
          };
        });
      }
      // Draw overlay
      if (selectedDesign?.url) {
        const overlay: HTMLImageElement = new Image();
        overlay.crossOrigin = "anonymous";
        overlay.src = selectedDesign.url;
        await new Promise<void>((resolve) => {
          overlay.onload = (): void => {
            ctx.drawImage(overlay, 0, 0, width, height);
            resolve();
          };
        });
      }
    } else {
      // fallback grid logic (your original code)
      const isGrid: boolean = images.length === 6;
      const columns: number = isGrid ? 2 : 1;
      const imageWidth: number = 180;
      const imageHeight: number = 160;
      const gap: number = 16;
      for (let i = 0; i < images.length; i++) {
        const img: HTMLImageElement = new Image();
        img.crossOrigin = "anonymous";
        img.src = images[i];
        await new Promise<void>((resolve) => {
          img.onload = () => {
            ctx.filter = photoFilters[i] || "none";
            const col: number = isGrid ? i % columns : 0;
            const row: number = isGrid ? Math.floor(i / columns) : i;
            const x: number = col * (imageWidth + gap);
            const y: number = row * (imageHeight + gap);
            ctx.drawImage(img, x, y, imageWidth, imageHeight);
            ctx.filter = "none";
            resolve();
          };
        });
      }
      if (selectedDesign?.url) {
        const overlay = new window.Image();
        overlay.crossOrigin = "anonymous";
        overlay.src = selectedDesign.url;
        await new Promise<void>((resolve) => {
          overlay.onload = () => {
            ctx.drawImage(overlay, 0, 0, width, height);
            resolve();
          };
        });
      }
    }

    const dataUrl: string = canvas.toDataURL("image/png");
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = dataUrl;
    link.download = "photobooth-strip.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // GIF strip download logic (uses only the GIFs in captured and overlayImg)
  const handleDownloadGif = async (): Promise<void> => {
    if (!overlayImg || !overlayImg.complete) {
      alert("Frame overlay is still loading. Please wait a moment and try again.");
      return;
    }
    setIsDownloading(true);
    const mappingKey: string | undefined = selectedDesign?.key;
    const mapping: any = mappingKey ? (frameMappings as any)[mappingKey] : null;
    if (!mapping || !captured.length) {
      setIsDownloading(false);
      return;
    }
    const width: number = mapping.frameWidth;
    const height: number = mapping.frameHeight;
    // Parse all GIFs and extract frames using gifuct-js
    const gifFramesArr: any[][] = await Promise.all(
      captured.map(async (cap: CapturedImage): Promise<any[]> => {
        if (!(cap as any).gif) return [];
        const binary: ArrayBuffer = await fetch((cap as any).gif).then((r: Response) => r.arrayBuffer());
        const gif: any = parseGIF(binary);
        const frames: any[] = decompressFrames(gif, true);
        return frames;
      })
    );
    // Find the minimum number of frames across all GIFs
    const minFrames: number = Math.min(...gifFramesArr.map((arr: any[]) => arr.length));
    // For each frame index, composite the GIFs into the strip
    const frames: string[] = [];
    for (let frameIdx = 0; frameIdx < minFrames; frameIdx++) {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      // Draw each GIF frame in its mapped window using drawImageCover
      for (let i = 0; i < mapping.windows.length; i++) {
        const win = mapping.windows[i];
        const gifFrame: any = gifFramesArr[i][frameIdx];
        if (!gifFrame) continue;
        // Create an image from the frame's patch
        const imageData: ImageData = ctx.createImageData(gifFrame.dims.width, gifFrame.dims.height);
        imageData.data.set(gifFrame.patch);
        // Draw the frame patch to an offscreen canvas
        const offCanvas: HTMLCanvasElement = document.createElement('canvas');
        offCanvas.width = gifFrame.dims.width;
        offCanvas.height = gifFrame.dims.height;
        const offCtx: CanvasRenderingContext2D = offCanvas.getContext('2d')!;
        offCtx.putImageData(imageData, 0, 0);
        const img: HTMLImageElement = new Image();
        img.src = offCanvas.toDataURL();
        // eslint-disable-next-line no-await-in-loop
        await new Promise<void>((resolve) => {
          img.onload = (): void => {
            ctx.save();
            if (win.borderRadius) {
              ctx.beginPath();
              ctx.moveTo(win.left + win.borderRadius, win.top);
              ctx.lineTo(win.left + win.width - win.borderRadius, win.top);
              ctx.quadraticCurveTo(win.left + win.width, win.top, win.left + win.width, win.top + win.borderRadius);
              ctx.lineTo(win.left + win.width, win.top + win.height - win.borderRadius);
              ctx.quadraticCurveTo(win.left + win.width, win.top + win.height, win.left + win.width - win.borderRadius, win.top + win.height);
              ctx.lineTo(win.left + win.borderRadius, win.top + win.height);
              ctx.quadraticCurveTo(win.left, win.top + win.height, win.left, win.top + win.height - win.borderRadius);
              ctx.lineTo(win.left, win.top + win.borderRadius);
              ctx.quadraticCurveTo(win.left, win.top, win.left + win.borderRadius, win.top);
              ctx.closePath();
              ctx.clip();
            } else {
              ctx.beginPath();
              ctx.rect(win.left, win.top, win.width, win.height);
              ctx.closePath();
              ctx.clip();
            }
            drawImageCover(ctx, img, win.left, win.top, win.width, win.height);
            ctx.restore();
            resolve();
          };
        });
      }
      // Draw overlay (always after all GIF frames)
      if (overlayImg && overlayImg.complete) {
        ctx.drawImage(overlayImg, 0, 0, width, height);
      }
      frames.push(canvas.toDataURL("image/png"));
    }
    // Use gifshot to create the final GIF
    const gifshot = await import('gifshot');
    (gifshot as any).createGIF({
      images: frames,
      gifWidth: width,
      gifHeight: height,
      frameDuration: 0.2,
      progressCallback: (): void => {},
    }, function(obj: any): void {
      setIsDownloading(false);
      if (!obj.error) {
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = obj.image;
        link.download = "photobooth-strip.gif";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

  const goToStep = (nextStep: StepType): void => {
    setCardAnim("card-exit");
    setTimeout(() => {
      setStep(nextStep);
      setCardAnim("card-enter");
    }, 400);
  };

  return (
    <div className={`flex flex-col md:flex-row w-full min-h-screen justify-center items-center gap-8 ${colors.background} overflow-x-hidden`}>
      <div className="flex-shrink-0">
        <PhotoLayoutCard
          images={images}
          filters={photoFilters}
          selectedDesign={selectedDesign ?? undefined}
        />
      </div>
      <div className="flex items-center">
        <div className={`relative z-10 ${cardAnim} w-full max-w-md md:max-w-sm`}>
          {/* Download type dropdown */}
          <div className="mb-4 flex justify-end">
            <select
              className="border rounded px-2 py-1 text-base"
              value={downloadType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDownloadType(e.target.value as DownloadType)}
              disabled={isDownloading}
            >
              <option value="photo">Download as Photo Strip (PNG)</option>
              <option value="gif">Download as GIF Strip (Animated)</option>
            </select>
          </div>
          {step === "filters" ? (
            <ControlsCard
              step={step}
              setStep={goToStep as React.Dispatch<React.SetStateAction<CameraStep>>}
              filters={photoFilters}
              setFilters={setPhotoFilters}
              selectedDesign={selectedDesign}
              setSelectedDesign={(design: DesignOverlay | null) => design && onSelectDesign(design)}
              images={images}
              designs={designs}
              onDownload={downloadType === "gif" ? handleDownloadGif : handleDownload}
              onBack={onBack}
            />
          ) : (
            <div>
              <DesignGrid
                designs={designs}
                selectedDesign={selectedDesign ?? undefined}
                onSelectDesign={onSelectDesign}
              />
              <div className="flex justify-between mt-4">
                <BackButton onClick={() => goToStep("filters")}>Back</BackButton>
                <NextButton onClick={downloadType === "gif" ? handleDownloadGif : handleDownload} disabled={!selectedDesign || isDownloading}>
                  {isDownloading ? "Preparing..." : "Download"}
                </NextButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
