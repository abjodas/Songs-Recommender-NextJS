import React, { useRef, useState } from "react";
import axios from "axios";

const Deezer = ({ track }) => {
    const audioRef = useRef();
    const [source, setSource] = useState([]);
    const [prevName, setPrevName] = useState([]);
    const updateSong = (source) => {
      setSource(source);
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
      }
    };
    const playWithDeezer = async () => {
      setPrevName(track.name);
      const initName = track.name.replace(/ *\([^)]*\) */g, "");
      const name = initName + "+" + track.artists[0].name;
      const nameCleaned = name?.replace(/\s/g, "+");
      const nameFinal = nameCleaned.replace(/[0-9]/g, '');
      const nameFurtherFinal =  nameFinal.replace(/\+$/, '');
      console.log(nameFurtherFinal)
      const options = {
        method: "GET",
        url: "https://deezerdevs-deezer.p.rapidapi.com/search",
        params: { q: `${nameFinal}` },
        headers: {
          "X-RapidAPI-Key": "fd21a96ec1msh73fea74e0d60f33p12855ejsn9649d5769805",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        console.log(response.data.data);
        updateSong(response.data.data[0].preview);
        return response.data.data[0].preview;
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className={`flex items-center space-x-4 col-span-7 justify-between`}>
        <h1 className='text-xl'>{`${track.name} - ${track.artists[0].name}`}</h1>
        <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {playWithDeezer()}}>Play with Deezer</button>
        {source.length !== 0 && prevName == track.name && (
        <audio
          controls
          key={track.id}
          ref={audioRef}
         
          className={`audiobtn${track.id}`}
        >
          <source src={source}></source>
        </audio>
      )}
    </div>
  )
}

export default Deezer