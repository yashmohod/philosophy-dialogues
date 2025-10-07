import React, { useState, useEffect } from "react";
import ChapterView from "./components/ChapterView";
import ProgressBar from "./components/ProgressBar";
import "./index.css";
import AboutPage from "./components/AboutPage";
import { BookOpen, User, EyeOff, Eye } from "lucide-react";


export default function App() {
  const [chapters, setChapters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [readerMode, setReaderMode] = useState(false);
  const [showAbout, setShowAbout] = useState(false);


  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/conversations/index.json")
      .then(res => res.json())
      .then(files => {
        setChapters(files);
        setSelected(files[0]);
      })
      .catch(err => console.error("Failed to load index.json", err));
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-bg text-text font-sans transition-all duration-500">
      <ProgressBar />

      {/* Floating nav */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-panel/80 backdrop-blur-lg border-b border-glass shadow-glow z-50">
        <h1 className="text-xl font-bold tracking-wide text-accent">
          Philosophy Dialogues
        </h1>
        <div className="flex gap-3 text-lg">
          <div className="flex gap-4 text-lg">
            <button
              onClick={() => setReaderMode(!readerMode)}
              className="hover:text-accent transition-colors"
              title="Toggle Reader Mode"
            >
              {readerMode ? (
                <EyeOff size={22} strokeWidth={1.8} />
              ) : (
                <Eye size={22} strokeWidth={1.8} />
              )}
            </button>

            <button
              onClick={() => setShowAbout(!showAbout)}
              className="hover:text-accent2 transition-colors"
              title="About"
            >
              <BookOpen size={22} strokeWidth={1.8} />
            </button>
          </div>

        </div>
      </div>

      {/* Sidebar */}
      {!readerMode && (
        <aside className="md:w-1/4 w-full mt-16 border-r border-glass bg-panel/60 backdrop-blur-md p-6">
          <ul className="space-y-2">
            {chapters.map((ch) => (
              <li key={ch.file}>
                <button
                  onClick={() => setSelected(ch)}
                  className={`block w-full text-left py-2 px-2 rounded-md transition-all duration-300 ${selected?.file === ch.file
                    ? "bg-accent/10 text-accent font-semibold shadow-glow"
                    : "hover:text-accent hover:bg-accent/5"
                    }`}
                >
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main */}
      <main
        className={`flex-grow mt-16 p-8 md:p-12 overflow-y-auto transition-all duration-700 ${readerMode ? "max-w-3xl mx-auto" : ""
          }`}
      >
        {showAbout ? (
          <AboutPage />
        ) : (
          selected && <ChapterView file={selected.file} title={selected.title} />
        )}
      </main>

    </div>
  );
}
