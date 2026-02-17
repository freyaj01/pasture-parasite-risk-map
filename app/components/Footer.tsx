"use client";
export default function Footer() {
  return (
    <main>
      <footer className="border-t border-gray-300 bg-[#0072ce]  w-full">
        <div className="mx-auto max-w-7xl px-2 py-6 lg:px-8 ">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between ">
            <div>
              <p className="mb-2 text-sm font-semibold text-white">
                Connect with Elanco
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a66c2] text-white hover:opacity-80 transition"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                  >
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path
                      d="M13.5 12.3h1.8l.3-2.3h-2.1V8.6c0-.7.2-1.1 1.2-1.1h1V5.4c-.5-.1-1.2-.2-2-.2-2 0-3.3 1.2-3.3 3.3V10H8.7v2.3h1.7V19h3.1v-6.7z"
                      fill="#fff"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1da1f2] text-white hover:opacity-80 transition"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                  >
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <rect
                      x="7"
                      y="7"
                      width="10"
                      height="10"
                      rx="3"
                      ry="3"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.2"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1.6"
                    />
                    <circle cx="15.5" cy="8.5" r="0.8" fill="#fff" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e1306c] text-white hover:opacity-80 transition"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                  >
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <rect
                      x="6.5"
                      y="9.5"
                      width="2.2"
                      height="7.5"
                      fill="#fff"
                    />
                    <circle cx="7.6" cy="7.5" r="1.2" fill="#fff" />
                    <path
                      d="M11 9.5h2.1v1c.3-.6 1.2-1.1 2.4-1.1 2.2 0 2.9 1.4 2.9 3.3v4.3h-2.2v-3.8c0-1-.2-1.7-1.2-1.7s-1.5.8-1.5 1.7V17H11z"
                      fill="#fff"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <img
                src="/Elanco.svg"
                alt="Elanco Logo"
                className="h-26 w-auto"
              />
            </div>
          </div>
          <div className="my-6 border-t border-gray-300  w-full" />

          <div className="flex flex-col gap-3 text-sm text-white md:flex-row md:items-center md:justify-between ">
            <div className="flex flex-wrap gap-x-4 gap-y-2 ">
              <a
                href="https://privacy.elanco.com/en-us"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Privacy Statement
              </a>
              <a
                href="https://privacy.elanco.com/en-us"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Terms of Use
              </a>
              <a
                href="https://www.elanco.com/us/retailer-policy"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Retailer Policy
              </a>
              <a
                href="https://www.elanco.com/us/satisfaction-guarantee"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Satisfaction Guarantee
              </a>
              <a
                href="https://www.elanco.com/us/sitemap.xml"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Sitemap
              </a>
              <a
                href="https://www.elanco.com/us/elanco-safety-data-sheets"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Safety Data Sheets
              </a>
              <a
                href="https://submit-irm.trustarc.com/services/validation/bb8600b3-5cd1-4d9c-90d3-1db22b58b1f3"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Do Not Sell My Personal Information
              </a>
              <a
                href="#"
                className="underline hover:text-[#02253e] transition duration-300"
              >
                Cookie Preferences
              </a>
            </div>

            <p className="text-xs text-white">
              Elanco and the diagonal bar logo are trademarks of Elanco or its
              affiliates. © 2026 Elanco. (University Project)
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
