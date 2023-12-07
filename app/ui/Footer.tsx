import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-customedBlue flex flex-col p-12 border-t self-center w-full mt-4">
      <div className="flex items-center gap-10 paragraph-text self-center">
        <div className="text-white text-[24px]">Pathfinder Viewer</div>
      </div>
      <p className="self-center text-white">
        &copy; 2023
        <Link
          href={"https://juan-rios-website-jriosdel.vercel.app/"}
          className="underline"
        >
          Juan Rios
        </Link>
      </p>
    </footer>
  );
}
