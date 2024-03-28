import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { Quicksand } from "next/font/google";
import Image from "next/image";
import Deezer from "./Deezer";
const quicksand = Quicksand({
  weight: "700",
  subsets: ["latin"],
});

const MusicDisplay = ({ musicData }) => {
  const audioRef = useRef();
  function playSound(id) {
    const targetAudio = document.getElementsByClassName(`audiobtn${id}`)[0];
    targetAudio.play();
  }
  function pauseSound(id) {
    const targetAudio = document.getElementsByClassName(`audiobtn${id}`)[0];
    targetAudio.pause();
  }
  return (
    <div className={`${quicksand.className} flex flex-col items-center w-full`}>
      {musicData.map((track) => (
        <div
          key={track.id}
          className="grid grid-cols-8 gap-4 h-40 bg-opacity-25 backdrop-filter backdrop-blur-lg hover:bg-opacity-95 bg-white w-5/6 rounded-md m-5 hover:scale-105 pr-10"
        >
          <div className="flex">
            <img
              src={`${track.album.images[0]?.url}`}
              className="rounded-tl-md roundedb-bl-md"
            />
          </div>

          {track.preview_url !== null && (
            <div
              className={`flex items-center space-x-4 col-span-7 justify-between`}
            >
              <h1 className="text-xl">
                {track.name + ` - ` + track.artists[0].name}
              </h1>
              <div className="pr-10">
                <button
                  className="mr-5"
                  onClick={() => {
                    playSound(track.id);
                  }}
                >
                  <Image
                    src={"/play_logo_1.png"}
                    alt="play"
                    className="object-contain"
                    width={30}
                    height={30}
                  />
                </button>
                <button
                  onClick={() => {
                    pauseSound(track.id);
                  }}
                >
                  <Image
                    src={"/pause_logo_3.png"}
                    alt="pause"
                    className="object-contain"
                    width={30}
                    height={30}
                  />
                </button>
              </div>
              <audio
                ref={audioRef}
                style={{
                  width: "60%",
                  marginBottom: "10px",
                  justifySelf: "center",
                  marginRight: "20px",
                }}
                className={`audiobtn${track.id}`}
              >
                <source src={track.preview_url}></source>
              </audio>
            </div>
          )}
          {track.preview_url == null && <Deezer track={track} />}
        </div>
      ))}
    </div>
  );
};

export default MusicDisplay;
