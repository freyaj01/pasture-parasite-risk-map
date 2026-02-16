
"use client";
import Link from 'next/link'
import { useState, useEffect } from "react";

const images = [
  "/Rotation_1.webp",
  "/Rotation_2.webp",
  "/Rotation_3.webp", 
];

export default function Rotation() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden relative">

       <div className="find-my-farm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 backdrop-blur-sm p-10 rounded-lg  cursor-pointer text-white">
        <h1 className="text-4xl font-bold mb-4">Find My City</h1>
        <p className="text-lg mb-6">View Potential Parasite Risk.</p>
        <Link href="/Display">
        <button className="bg-[#2171b8] text-white px-4 py-2 font-bold mb-4 rounded hover:bg-[#02253e] transition duration-300 cursor-pointer">
          View Map
        </button>
        </Link>
      </div>
     
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Rotation ${index}`}
          className={`
            w-full h-full object-cover object-center absolute top-0 left-0
            transition-opacity duration-1000
            ${index === currentImage ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}
    </main>
  );
}