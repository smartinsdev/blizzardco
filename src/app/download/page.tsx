import Image from "next/image";
import dropBox from "../../assets/dropbox-1.svg";
import megaLogo from "../../assets/mega-icon.svg";
import fourShared from "../../assets/4shared.png";
import adobeLogo from "../../assets/adobe-svgrepo-com.svg";

export default function Download() {
  return (
    <main className="min-h-screen relative bg-1">
      <div className="flex justify-center text-zinc-300 items-center pt-40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-7x font-bold leading-tight tracking-tight font-cinzel">
          Baixe nosso cliente
        </h1>
      </div>
      <section className="max-w-7xl mx-auto px-4 py-20 font-roboto text-zinc-300">
        <h2 className="pt-10 mb-10 text-2xl font-bold tracking-tighter text-zinc-200 md:text-4xl">
          Clients <span className="text-[#A57C3C]">.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-zinc-950 rounded-md p-6 shadow-md flex flex-col items-center space-y-5">
            <h3 className="text-2xl font-semibold">DropBox</h3>
            <Image src={dropBox} alt="DropBox Logo" width={100} height={100} />
            <a
              href="#link-do-jogo"
              className="bg-[#A57C3C] hover:bg-[#7A551F] text-[#ffffe9] py-2 px-4 rounded-md inline-block"
            >
              Baixar Agora
            </a>
          </div>
          <div className="bg-zinc-950 rounded-md p-6 shadow-md flex flex-col items-center space-y-5">
            <h3 className="text-2xl font-semibold">Mega</h3>
            <Image src={megaLogo} alt="DropBox Logo" width={100} height={100} />
            <a
              href="#link-do-jogo"
              className="bg-[#A57C3C] hover:bg-[#7A551F] text-[#ffffe9] py-2 px-4 rounded-md inline-block"
            >
              Baixar Agora
            </a>
          </div>
          <div className="bg-zinc-950 rounded-md p-6 shadow-md flex flex-col items-center space-y-5">
            <h3 className="text-2xl font-semibold">4shared</h3>
            <Image
              src={fourShared}
              alt="DropBox Logo"
              width={100}
              height={100}
            />
            <a
              href="#link-do-jogo"
              className="bg-[#A57C3C] hover:bg-[#7A551F] text-[#ffffe9] py-2 px-4 rounded-md inline-block"
            >
              Baixar Agora
            </a>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-20 font-roboto text-zinc-300">
        <h2 className="pt-10 mb-10 text-2xl font-bold tracking-tighter text-zinc-200 md:text-4xl">
          Patch e Programas úteis <span className="text-[#A57C3C]">.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-zinc-950 rounded-md p-6 shadow-md flex flex-col items-center space-y-5">
            <h3 className="text-2xl font-semibold">Patch</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-24 h-24 text-zinc-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>

            <a
              href="#link-do-jogo"
              className="bg-[#A57C3C] hover:bg-[#7A551F] text-[#ffffe9] py-2 px-4 rounded-md inline-block"
            >
              Baixar Agora
            </a>
          </div>
          <div className="bg-zinc-950 rounded-md p-6 shadow-md flex flex-col items-center space-y-5">
            <h3 className="text-2xl font-semibold">Adobe Flash Player</h3>
            <Image
              src={adobeLogo}
              alt="DropBox Logo"
              width={100}
              height={100}
            />
            <a
              href="#link-do-jogo"
              className="bg-[#A57C3C] hover:bg-[#7A551F] text-[#ffffe9] py-2 px-4 rounded-md inline-block"
            >
              Baixar Agora
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
