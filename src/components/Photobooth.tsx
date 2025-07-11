import React, { useState } from "react";
import StripLayoutSelection from "./StripLayoutSelection";
import CameraSetup from "./CameraSetup";
import AppLayout from "./AppLayout";
import StripDesign from "./StripDesign";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import { useTheme } from "./ThemeContext";
import {
  PhotoboothProps,
  LayoutOption,
  CapturedImage,
  DesignOverlay,
} from "../types";

// Example overlays for each layout (replace with your own PNG/SVG overlays)
//3 images do not fit the card, need to specify the two overlay per row thing, and as no of designs increases so does pagination
const designOverlaysByLayout: Record<number, DesignOverlay[]> = {
  1: [
    { key: "1shot-design1", url: "/designs/1shot-design1.png" },
    { key: "1shot-design2", url: "/designs/1shot-design2.png" },
    { key: "1shot-design3", url: "/designs/1shot-design3.png" },
    { key: "1shot-design4", url: "/designs/1shot-design4.png" },
    { key: "1shot-design5", url: "/designs/1shot-design5.png" },
    { key: "1shot-design6", url: "/designs/1shot-design6.png" },
    { key: "1shot-design7", url: "/designs/1shot-design7.png" },
    { key: "1shot-design8", url: "/designs/1shot-design8.png" },
    { key: "1shot-design9", url: "/designs/1shot-design9.png" },
    { key: "1shot-design10", url: "/designs/1shot-design10.png" },
  ],
  3: [
    { key: "3shot-design1", url: "/designs/3shot-design1.png" },
    { key: "3shot-design2", url: "/designs/3shot-design2.png" },
    { key: "3shot-design3", url: "/designs/3shot-design3.png" },
    { key: "3shot-design4", url: "/designs/3shot-design4.png" },
    { key: "3shot-design5", url: "/designs/3shot-design5.png" },
  ],
  4: [
    { key: "4shot-design1", url: "/designs/4shot-design1.png" },
    { key: "4shot-design2", url: "/designs/4shot-design2.png" },
    { key: "4shot-design3", url: "/designs/4shot-design3.png" },
    { key: "4shot-design4", url: "/designs/4shot-design4.png" },
    { key: "4shot-design5", url: "/designs/4shot-design5.png" },
  ],
  6: [
    { key: "6shot-design1", url: "/designs/6shot-design1.png" },
    { key: "6shot-design2", url: "/designs/6shot-design2.png" },
    { key: "6shot-design3", url: "/designs/6shot-design3.png" },
  ],
};

const Photobooth: React.FC<PhotoboothProps> = ({ onBack }) => {
  const { colors } = useTheme();
  const [layout, setLayout] = useState<LayoutOption | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [capturedImages, setCapturedImages] = useState<CapturedImage[] | null>(
    null
  );
  const [showStripDesign, setShowStripDesign] = useState<boolean>(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignOverlay | null>(
    null
  );

  // Download handler for photo strip
  const handleDownload = (
    dataUrl: string,
    filename: string = "photobooth-strip.png"
  ): void => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get overlays for the current layout (by shots or id)
  const designOverlays: DesignOverlay[] =
    layout && designOverlaysByLayout[layout.shots]
      ? designOverlaysByLayout[layout.shots]
      : [];

  // Step 1: Layout selection
  if (!layout) {
    return (
      <AppLayout>
        <BackButton onClick={onBack}>Back</BackButton>
        <StripLayoutSelection onSelectLayout={setLayout} />
      </AppLayout>
    );
  }

  // Step 2: Camera
  if (showCamera && !capturedImages) {
    return (
      <AppLayout>
        <CameraSetup
          layout={layout}
          onBack={() => setShowCamera(false)}
          onDone={(images) => {
            setCapturedImages(images);
            setShowCamera(false);
            setShowStripDesign(true);
          }}
        />
      </AppLayout>
    );
  }

  // Step 3: Strip Design Selection
  if (showStripDesign && capturedImages) {
    return (
      <AppLayout>
        <StripDesign
          images={capturedImages.map((c) => c.photo)}
          captured={capturedImages}
          designs={designOverlays}
          selectedDesign={selectedDesign}
          onSelectDesign={setSelectedDesign}
          onBack={() => {
            setShowStripDesign(false);
            setCapturedImages(null);
            setShowCamera(true);
          }}
          onNext={() => {
            alert("You chose a design! Implement the next step here.");
          }}
          onDownload={handleDownload}
        />
      </AppLayout>
    );
  }

  // Step 1.5: Confirm layout, go to camera
  return (
    <AppLayout>
      <div className="flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <span
            className={`text-3xl ${colors.text} mb-1`}
            style={{ fontFamily: "'Pacifico', cursive", letterSpacing: "1px" }}
          >
            You chose:
          </span>
          <span className="text-xl font-bold">{layout.label}</span>
        </div>
        <div className="flex gap-4 mt-2">
          <BackButton onClick={() => setLayout(null)}>Back</BackButton>
          <NextButton onClick={() => setShowCamera(true)}>Next</NextButton>
        </div>
      </div>
    </AppLayout>
  );
};

export default Photobooth;
