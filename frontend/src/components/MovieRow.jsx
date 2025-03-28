import React, { useState, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";

function MovieRow({data}) {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; 
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full px-6 relative">
      <div ref={scrollRef} className="flex overflow-x-auto gap-4 scrollbar-hide whitespace-nowrap scroll-smooth">
        <span
          className="absolute content-center top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-10 h-full w-10 rounded-sm bg-[#0f0f0fac] flex items-center justify-center"
          onClick={() => scroll("left")}
        >
          <FaCaretLeft className="h-5 text-white" />
        </span>

        {data.map((movie) => (
          <div
            key={movie.id}
            className="relative group flex-none w-52"
            onMouseEnter={() => setHoveredMovie(movie.id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <motion.img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-52 h-72 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
            />

          
            {hoveredMovie === movie.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-0 left-0 flex flex-col justify-around h-full w-full bg-[#000000aa] p-3 shadow-lg text-white z-10 text-wrap text-center"
              >
                <h3 className="font-bold text-lg">{movie.title}</h3>

                <div className="flex gap-3 mt-3">
                  <button className="bg-white text-black px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-300 cursor-pointer">
                    <FaPlay className="w-5 h-5" /> Play
                  </button>
                  <button className="bg-gray-700 px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600 cursor-pointer">
                    <FaInfoCircle className="w-5 h-5" /> More Info
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}

       
        <span
          className="absolute content-center top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-10 h-full w-10 rounded-sm bg-[#0f0f0fac] flex items-center justify-center"
          onClick={() => scroll("right")}
        >
          <FaCaretRight className="h-5 text-white" />
        </span>
      </div>
    </div>
  );
}

export default MovieRow;
