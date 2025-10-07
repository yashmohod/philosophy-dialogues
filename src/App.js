import React, { useEffect, useState } from "react";
import ChapterView from "./components/ChapterView";
import AboutPage from "./components/AboutPage";
import { Info } from "lucide-react";
export default function App() {
  const [chapters, setChapters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [showAbout, setShowAbout] = useState(false); // NEW STATE
  const [progress, setProgress] = useState(0);

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

  // Handle resizing for sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      setSidebarOpen(desktop);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // if there's no scrollable area, keep bar at 0 (not 100)
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrollProgress = Math.min(
        (scrollTop / scrollableHeight) * 100,
        100
      );
      setProgress(scrollProgress);
    };

    // run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // also update on resize

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bg text-text font-sans transition-all duration-500">
      {/* Progress bar (hidden when AboutPage is active) */}
      {!showAbout && (
        <div
          className={`fixed top-0 left-0 h-[3px] z-[60] transition-all duration-150 ${progress === 100
            ? "bg-accent shadow-[0_0_10px_rgba(0,255,255,0.6)]"
            : "bg-accent"
            }`}
          style={{ width: `${progress}%` }}
        ></div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-glass bg-panel/80 backdrop-blur-md shadow-sm">
        <h1 onClick={() => setShowAbout(false)} className="text-lg font-bold text-accent tracking-wide">
          Philosophy Dialogues
        </h1>

        <div className="flex items-center gap-4">
          {/* About button */}
          <button
            onClick={() => setShowAbout(!showAbout)}
            className={`transition-colors ${showAbout ? "text-accent font-semibold" : "hover:text-accent"
              }`}
            title="About"
          >
            <Info size={22} strokeWidth={2} />
          </button>

          {/* Sidebar toggle (hidden when AboutPage is shown) */}
          {!showAbout && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:text-accent transition-colors"
              title="Menu"
            >
              ☰
            </button>
          )}
        </div>
      </nav>

      {/* Sidebar (hidden when AboutPage is shown) */}
      {!showAbout && (
        <aside
          className={`
            fixed top-0 left-0 w-72 h-screen bg-panel/90 backdrop-blur-md border-r border-glass p-6
            transition-transform duration-500 ease-in-out z-40 flex-shrink-0 pt-20
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
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
      )}

      {/* Overlay (for mobile sidebar) */}
      {sidebarOpen && !isDesktop && !showAbout && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
        ></div>
      )}

      {/* Main content area */}
      <main
        className={`flex-grow mt-20 p-8 md:p-12 transition-all duration-700 ${isDesktop && sidebarOpen && !showAbout ? "lg:ml-72" : ""
          } flex justify-center`}
      >
        <div className="max-w-3xl w-full animate-fade-in">
          {showAbout ? (
            <AboutPage />
          ) : selected ? (
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
