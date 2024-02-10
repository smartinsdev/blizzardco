import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cinzel } from "next/font/google";
import { Bangers } from "next/font/google";
import Link from "next/link";

const bangers = Bangers({ subsets: ["latin"], weight: "400" });

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={cn("min-h-screen bg-background", cinzel.className)}>
      <section className="relative hidden md:block">
        <video autoPlay muted loop className="object-cover w-full h-full">
          <source src="bg-video3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute top-[40%] left-[46%] -translate-x-1/2 flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm md:text-base lg:w-1/2 mx-auto">
            Prepare-se para explorar, competir e se divertir como nunca antes! O
            próximo desafio está à sua espera. Você está pronto para entrar na
            ação?
          </p>
          <Link href="/register" passHref>
            <Button size="lg" className="mt-10 font-bold">
              Comece agora
            </Button>
          </Link>
        </div>
      </section>
      <section className="md:hidden py-40 px-20 flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
        <h1
          className={cn(
            "scroll-m-20 text-4xl tracking-tight md:text-5xl lg:text-6xl text-center",
            bangers.className
          )}
        >
          Blizzard Conquer
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-sm md:text-base lg:w-1/2 mx-auto">
          Prepare-se para explorar, competir e se divertir como nunca antes! O
          próximo desafio está à sua espera. Você está pronto para entrar na
          ação?
        </p>
        <Link href="/register" passHref>
          <Button size="lg" className="mt-10 font-bold">
            Comece agora
          </Button>
        </Link>
      </section>
    </main>
  );
}
