import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-400 text-white pt-4 pd-3 pb-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center mb-8 md:mb-0">
          <Link to="/" className="flex items-center mb-1">
            <img
              src="src/Components/Images/pixelcut-exyuiport.png"
              className="h-16 w-auto mr-3 rounded-lg shadow-lg bg-white"
              alt="Logo"
            />
          </Link>
          <p className="text-white-300 mt-3 max-w-xs">
            Empowering students with resources, books, and notes for a brighter academic journey.
          </p>
        </div>
        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
          <div>
            <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-blue-200">Resources</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-300 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-300 transition">About</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-blue-200">Follow Us</h2>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition">Github</a>
              </li>
              <li>
                <a href="https://discord.com/" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition">Discord</a>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98.01 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.41.36.77 1.08.77 2.18v3.24c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
                </svg>
              </a>
              <a href="https://discord.com/" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.079.037c-.34.607-.719 1.396-.984 2.021-2.951-.444-5.885-.444-8.819 0-.266-.625-.646-1.414-.985-2.021a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.683 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c3.7 2.723 7.29 2.184 10.872 1.957.07-.005.13-.05.15-.117.21-.652.398-1.326.547-2.02-3.36.73-4.09-1.63-4.09-1.63.364-.91.89-1.15.89-1.15.726-.497 1.42-.363 1.42-.363.7.05 1.07.72 1.07.72.64 1.09 1.68.78 2.09.6.07-.465.25-.78.45-.96-2.68-.3-5.49-1.34-5.49-5.97 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.23a11.38 11.38 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.85.12 3.15.77.84 1.24 1.91 1.24 3.23 0 4.64-2.81 5.67-5.49 5.97.26.22.49.65.49 1.31v1.94c0 .07.08.13.15.12 3.58-.23 7.17-.77 10.87-1.96a.08.08 0 0 0 .03-.06c.42-4.44-.43-8.93-3.55-13.62a.07.07 0 0 0-.03-.03z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold uppercase tracking-wider text-blue-200">Legal</h2>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-blue-300 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-blue-300 transition">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-8 border-blue-600 opacity-30" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-blue-200 text-sm">
        <span>
          © 2024 <span className="font-bold text-white">EduTrade</span>. All Rights Reserved.
        </span>
        <span className="mt-2 md:mt-0">
          Made with <span className="text-red-400">♥</span> for students.
        </span>
      </div>
    </footer>
  );
}

