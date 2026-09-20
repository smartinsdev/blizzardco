import { ImageResponse } from "next/og";

export const alt = "Blizzard Conquer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * One image for the whole site — Twitter/X falls back to the Open Graph card,
 * so this covers both. Rendered at build time with the default font: loading a
 * custom one means reading it off disk on every generated route, which isn't
 * worth it for a single static card.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a0b 0%, #1c2b3a 100%)",
        color: "#ffffe9",
      }}
    >
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
        Blizzard Conquer
      </div>
      <div
        style={{
          marginTop: 24,
          fontSize: 36,
          color: "#A57C3C",
        }}
      >
        Explore. Conquiste. Domine.
      </div>
    </div>,
    size
  );
}
