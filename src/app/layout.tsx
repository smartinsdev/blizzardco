import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/header/NavBar";
import { Toaster } from "@/components/ui/sonner";

const cinzel = Cinzel({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blizzard Conquer",
  description:
    "Embarque em uma jornada épica no mundo congelado de Blizzard Conquer, onde os guerreiros mais destemidos desafiam os elementos para forjar seu destino. Explore vastas terras geladas, enfrente inimigos poderosos e descubra segredos antigos enquanto busca se tornar uma lenda. Com gráficos deslumbrantes, jogabilidade envolvente e uma comunidade vibrante, Blizzard Conquer oferece uma experiência de jogo incomparável que vai deixar você ansioso por mais. Prepare-se para conquistar o frio e alcançar a grandeza em Blizzard Conquer!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cinzel.className}>
        <NavBar />
        {children}

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
