import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillInfoSquareFill } from "react-icons/bs";
function Crousel({ data }) {
  const [video, setvideo] = useState("");

  console.log(data);
  console.log(video);

  const url = `https://api.themoviedb.org/3/movie/${data.id}/videos?language=en-US`;
  const headers = {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzYwZDVlNGVlMmMzMjZmNzJmM2NkOTEzMDFlYjc4MiIsIm5iZiI6MTc0MDExNjgwMy4zMTYsInN1YiI6IjY3YjgxMzQzNzQzNDIwMGMyODIyNWU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIkAZTBJEgdIRScdVsncRWzTkxSAeR87VYkMDH1Q58Y",
  };
  useEffect(() => {
    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res.data.results);
        setvideo(res.data.results[0].key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  return (
    <div className="relative h-[70vh] mt-[2.5vh] w-full">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=0&loop=1&playlist=${video}&controls=0&modestbranding=1&rel=0`}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      ></iframe>

      <div className="absolute inset-0 flex flex-col justify-center pl-10 md:pl-20 text-white max-w-xl">
        <h1 className="text-5xl font-bold">{data.title}</h1>
        <p className="mt-4 text-lg">{data.overview}</p>
        
        <div className="mt-6 flex gap-4">
          <button className="bg-gray-600 bg-opacity-50 px-6 py-3 text-lg font-semibold rounded-md flex items-center gap-2 hover:bg-gray-700 hover:cursor-pointer transition">
            <BsFillInfoSquareFill/> More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Crousel;
