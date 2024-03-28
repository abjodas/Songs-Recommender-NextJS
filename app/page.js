"use client";
import { SearchBar } from "@/components";
import Image from "next/image";
import { useState } from "react";
import { MusicDisplay } from "@/components";

export default function Home() {
  const [musicData, setMusicData] = useState([]);
  return (
    <div
      className={`flex flex-col items-center bg-slate-400 ${
        musicData.length == 0 ? "h-screen" : null
      }`}
    >
      <SearchBar setMusicData={setMusicData} />
      {musicData.length !== 0 && <MusicDisplay musicData={musicData} />}
    </div>
  );
}
