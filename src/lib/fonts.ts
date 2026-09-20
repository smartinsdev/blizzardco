import { Bangers, Cinzel, Poppins } from "next/font/google";

/**
 * Every `next/font` call creates its own font instance and CSS. Declaring them
 * once here keeps a single instance per family across the app, instead of one
 * per file that happens to need it.
 */

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const cinzel = Cinzel({ subsets: ["latin"], display: "swap" });

export const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
