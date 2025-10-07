import React, { useEffect, useState } from "react";
import ChapterView from "./components/ChapterView";

export default function App() {
  const [chapters, setChapters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Load chapters dynamically
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/conversations/index.json")
      .then((res) => res.json())
      .then((data) => {
        setChapters(data);
        setSelected(data[0]);
      })
      .catch((err) => console.error("Failed to load index.json:", err));
  }, []);

  // Detect screen size and adjust default sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setSidebarOpen(desktop); // sidebar visible by default on desktop
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bg text-text font-sans transition-all duration-500">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-glass bg-panel/80 backdrop-blur-md shadow-sm">
        <h1 className="text-lg font-bold text-accent tracking-wide">
          Philosophy Dialogues
        </h1>

        <div className="flex items-center gap-4">
          {/* About link */}
          <a
            href="#/about"
            className="hover:text-accent transition-colors"
            title="About"
          >
            ℹ️
          </a>

          {/* Toggle button (works on all screen sizes) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:text-accent transition-colors"
            title="Menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`
          ${isDesktop ? "fixed" : "fixed"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          top-0 left-0 w-72 h-screen bg-panel/90 backdrop-blur-md border-r border-glass p-6
          transition-transform duration-500 ease-in-out z-40 flex-shrink-0 pt-20
        `}
      >
        <ul className="space-y-2">
          {chapters.map((ch) => (
            <li key={ch.file}>
              <button
                onClick={() => {
                  setSelected(ch);
                  if (!isDesktop) setSidebarOpen(false);
                }}
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

      {/* Overlay for mobile */}
      {sidebarOpen && !isDesktop && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
        ></div>
      )}

      {/* Main content */}
      <main
        className={`flex-grow mt-20 p-8 md:p-12 overflow-y-auto transition-all duration-700 ${isDesktop && sidebarOpen ? "lg:ml-72" : ""
          } flex justify-center`}
      >
        <div className="max-w-3xl w-full">
          {selected ? (
            <ChapterView
              file={selected.file}
              title={selected.title}
              chapters={chapters}
              selected={selected}
              setSelected={setSelected}
            />
          ) : (
            <p className="text-center text-accent mt-20">
              Select a chapter to begin reading.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
