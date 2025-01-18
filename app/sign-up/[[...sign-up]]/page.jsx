import { SignUp, useUser } from "@clerk/nextjs";

export default function Home() {
  return (
    <div
      className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center "
      style={{ backgroundImage: "url('/srilanka.jpg')" }}
    >
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      <SignUp />
    </div>
  );
}
