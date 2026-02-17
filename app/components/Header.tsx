"use client";
import { useState } from "react";
import Link from 'next/link'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  return (
    <main>
   <header className="bg-[#0072ce] dark:bg-gray-900 w-full position-fixed top-0 left-0 relative z-100 ">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
    <div className="flex lg:flex-1">
      <Link href="/">
        <img
          src="/Elanco.svg" 
          alt="Elanco Logo"
          className="h-26 w-auto"
        />
      </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            className="rounded-md p-2 text-white cursor-pointer text-2xl font-bold transition duration-300"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              onClick={() => setProductOpen((v) => !v)}
              className="flex items-center gap-x-1 text-sm font-semibold text-white cursor-pointer hover:text-[#02253e] dark:hover:text-gray-300 transition duration-300"
            >
              Parasites ▼
            </button>

            {productOpen && (
              <div className="absolute left-0 mt-3 w-90 rounded-xl border bg-white dark:bg-gray-800 dark:text-white p-3 shadow-lg">
                <div className="font-semibold dark:text-gray-200">Skin</div>

                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Ectoparasites (Lice, Mites, Ticks)</a>
                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Flies</a>

                <div className="font-semibold dark:text-gray-200">Lung & Trachea</div>
                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Dictyocalulusviviparus (Lungworm)</a>

                <div className="font-semibold dark:text-gray-200">Gastrointestinal</div>
                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Nematodes (Roundworm)</a>
                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Cestodes (Tapeworm)</a>
                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Protozoa (Coccidia, Giardia)</a>

                <div className="font-semibold dark:text-gray-200">Liver</div>
                <a className="block rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 underline dark:text-gray-100" href="#">Fasciola hepatica (Liver Fluke)</a>
              </div>
            )}
          </div>

          <a className="text-sm font-semibold text-white hover:text-[#02253e] dark:hover:text-gray-300 transition duration-300" href="#">
            About Us
          </a>
          <a className="text-sm font-semibold text-white hover:text-[#02253e] dark:hover:text-gray-300 transition duration-300" href="#" >
            Weather
          </a>
          <a className="text-sm font-semibold text-white hover:text-[#02253e] dark:hover:text-gray-300 transition duration-300" href="#">
            Additional Info
          </a>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="fixed right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 dark:text-white p-6 shadow-lg">
            <button
              className="mb-6 text-right cursor-pointer text-1xl font-bold dark:text-white"
              onClick={() => setMobileOpen(false)}
            >
              ✕
            </button>

            <button
              className="block w-full text-left font-semibold cursor-pointer dark:text-white"
              onClick={() => setProductOpen((v) => !v)}
            >
          Parasites
            </button>

            {productOpen && (
              <div className="ml-3 mt-2 space-y-2 text-sm">
                <div className="font-semibold dark:text-gray-200">Skin</div>
                <a className="block underline dark:text-gray-100" href="#">Ectoparasites (Lice, Mites, Ticks)</a>
                <a className="block underline dark:text-gray-100" href="#">Flies</a>

                <div className="font-semibold dark:text-gray-200">Lung & Trachea</div>
                <a className="block underline dark:text-gray-100" href="#">Dictyocalulusviviparus (Lungworm)</a>

                <div className="font-semibold dark:text-gray-200">Gastrointestinal</div>
                <a className="block underline dark:text-gray-100" href="#">Nematodes (Roundworm)</a>
                <a className="block underline dark:text-gray-100" href="#">Cestodes (Tapeworm)</a>
                <a className="block underline dark:text-gray-100" href="#">Protozoa (Coccidia, Giardia)</a>

                <div className="font-semibold dark:text-gray-200">Liver</div>
                <a className="block underline dark:text-gray-100" href="#">Fasciola hepatica (Liver Fluke)</a>
              </div>
            )}

            <a className="mt-4 block font-semibold dark:text-gray-100" href="#">About Us</a>
            <a className="mt-4 block font-semibold dark:text-gray-100" href="#">Weather</a>
            <a className="mt-4 block font-semibold dark:text-gray-100" href="#">Additional Info</a>
          </div>
        </div>
      )}
    </header>
    </main>
  );
}
