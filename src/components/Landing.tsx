import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { LandingProps } from "../types";

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const { colors } = useTheme();
  const [cardHovered, setCardHovered] = useState<boolean>(false);

  return (
    <div
      className={`${colors.animatedBg} min-h-screen flex flex-col items-center justify-center relative transition-all duration-1000 overflow-hidden`}
    >
      {/* Gallery Background Collage */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 grid-rows-4 h-full w-full gap-2 p-4">
          <img
            src="./gallery/gallery_image_01.jpeg"
            className="w-full h-full object-cover rounded opacity-70 transform rotate-12"
          />
          <img
            src="./gallery/gallery_image_02.jpeg"
            className="w-full h-full object-cover rounded opacity-60 transform -rotate-6"
          />
          <img
            src="./gallery/gallery_image_03.jpeg"
            className="w-full h-full object-cover rounded opacity-80 transform rotate-3"
          />
          <img
            src="./gallery/gallery_image_04.jpeg"
            className="w-full h-full object-cover rounded opacity-50 transform -rotate-12"
          />
          <img
            src="./gallery/gallery_image_05.jpeg"
            className="w-full h-full object-cover rounded opacity-75 transform rotate-8"
          />
          <img
            src="./gallery/gallery_image_06.jpeg"
            className="w-full h-full object-cover rounded opacity-65 transform -rotate-3"
          />
          <img
            src="./gallery/gallery_image_07.jpeg"
            className="w-full h-full object-cover rounded opacity-70 transform rotate-6"
          />
          <img
            src="./gallery/gallery_image_08.jpeg"
            className="w-full h-full object-cover rounded opacity-55 transform -rotate-9"
          />
          <img
            src="./gallery/gallery_image_09.jpeg"
            className="w-full h-full object-cover rounded opacity-80 transform rotate-2"
          />
          <img
            src="./gallery/gallery_image_10.jpeg"
            className="w-full h-full object-cover rounded opacity-60 transform -rotate-5"
          />
          <img
            src="./gallery/gallery_image_11.jpeg"
            className="w-full h-full object-cover rounded opacity-75 transform rotate-7"
          />
          <img
            src="./gallery/gallery_image_12.jpeg"
            className="w-full h-full object-cover rounded opacity-65 transform -rotate-4"
          />
          <img
            src="./gallery/gallery_image_01.jpeg"
            className="w-full h-full object-cover rounded opacity-50 transform rotate-10"
          />
          <img
            src="./gallery/gallery_image_02.jpeg"
            className="w-full h-full object-cover rounded opacity-70 transform -rotate-7"
          />
          <img
            src="./gallery/gallery_image_03.jpeg"
            className="w-full h-full object-cover rounded opacity-60 transform rotate-1"
          />
          <img
            src="./gallery/gallery_image_04.jpeg"
            className="w-full h-full object-cover rounded opacity-80 transform -rotate-11"
          />
          <img
            src="./gallery/gallery_image_05.jpeg"
            className="w-full h-full object-cover rounded opacity-55 transform rotate-5"
          />
          <img
            src="./gallery/gallery_image_06.jpeg"
            className="w-full h-full object-cover rounded opacity-75 transform -rotate-2"
          />
          <img
            src="./gallery/gallery_image_07.jpeg"
            className="w-full h-full object-cover rounded opacity-65 transform rotate-9"
          />
          <img
            src="./gallery/gallery_image_08.jpeg"
            className="w-full h-full object-cover rounded opacity-70 transform -rotate-6"
          />
          <img
            src="./gallery/gallery_image_09.jpeg"
            className="w-full h-full object-cover rounded opacity-60 transform rotate-4"
          />
          <img
            src="./gallery/gallery_image_10.jpeg"
            className="w-full h-full object-cover rounded opacity-80 transform -rotate-8"
          />
          <img
            src="./gallery/gallery_image_11.jpeg"
            className="w-full h-full object-cover rounded opacity-50 transform rotate-11"
          />
          <img
            src="./gallery/gallery_image_12.jpeg"
            className="w-full h-full object-cover rounded opacity-75 transform -rotate-1"
          />
        </div>
      </div>

      {/* Logo */}
      <div className="relative z-20 mb-8 animate-fadeInUp">
        <img
          src="./logonobc.png"
          alt="BoothieCall Logo"
          className="w-32 h-32 object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Card with Blob Background and Fade-in Animation */}
      <div
        className="relative z-10 animate-fadeInUp flex items-center"
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        style={{ overflow: "visible" }}
      >
        {/* LEFT SIDE: Back Strip */}
        <div
          className={`hidden md:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2
      transition-all duration-500
      ${
        cardHovered
          ? "opacity-80 -translate-x-20 -rotate-12 z-0"
          : "opacity-0 -translate-x-36 z-[-2]"
      }`}
          style={{ pointerEvents: "none" }}
        >
          <img
            src="./photostrip-behind-left.png"
            alt="Photo Strip Back Left"
            className="w-28 h-72 object-cover rounded-xl"
          />
        </div>
        {/* LEFT SIDE: Front Strip */}
        <div
          className={`hidden md:flex flex-col items-center justify-center absolute left-0 top-1/2 -translate-y-1/2
      transition-all duration-500
      ${
        cardHovered
          ? "opacity-100 -translate-x-10 -rotate-6 z-10"
          : "opacity-0 -translate-x-32 z-[-1]"
      }`}
          style={{ pointerEvents: "none" }}
        >
          <img
            src="photostrip-sample-left.png"
            alt="Photo Strip Left"
            className="w-28 h-72 object-cover rounded-xl"
          />
        </div>

        {/* Main Card */}
        <div
          className={`relative ${colors.card} bg-opacity-90 rounded-3xl ${colors.shadow} px-12 py-14 flex flex-col items-center`}
        >
          <h1
            className={`text-5xl font-elegancia-heading font-bold mb-4 ${colors.textAccent} drop-shadow-lg uppercase tracking-wider`}
          >
            Welcome to BoothieCall Playground
          </h1>
          <p
            className={`text-xl mb-8 ${colors.textSecondary} font-elegancia-body`}
          >
            Create, customize, and download your own photo strips!
          </p>
          <button
            className={`px-12 py-4 ${colors.button} rounded border-2 shadow-elegancia hover:shadow-elegancia-interactive transition-all duration-300 text-xl font-elegancia-body font-bold uppercase tracking-wider`}
            onClick={onStart}
          >
            Start Playground
          </button>
        </div>

        {/* RIGHT SIDE: Back Strip */}
        <div
          className={`hidden md:flex flex-col items-center justify-center absolute right-0 top-1/2 -translate-y-1/2
      transition-all duration-500
      ${
        cardHovered
          ? "opacity-80 translate-x-20 rotate-12 z-0"
          : "opacity-0 translate-x-36 z-[-2]"
      }`}
          style={{ pointerEvents: "none" }}
        >
          <img
            src="./photostrip-behind-right.png"
            alt="Photo Strip Back Right"
            className="w-28 h-72 object-cover rounded-xl"
          />
        </div>
        {/* RIGHT SIDE: Front Strip */}
        <div
          className={`hidden md:flex flex-col items-center justify-center absolute right-0 top-1/2 -translate-y-1/2
      transition-all duration-500
      ${
        cardHovered
          ? "opacity-100 translate-x-10 rotate-6 z-10"
          : "opacity-0 translate-x-32 z-[-1]"
      }`}
          style={{ pointerEvents: "none" }}
        >
          <img
            src="photostrip-sample-right.png"
            alt="Photo Strip Right"
            className="w-28 h-72 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className={`absolute bottom-4 ${colors.textSecondary} text-sm`}>
        Made by Axel Lanuza for BoothieCall.net
      </footer>
    </div>
  );
};

export default Landing;
