import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChapterView({ file, title, chapters, selected, setSelected }) {
    const [content, setContent] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        fetch(process.env.PUBLIC_URL + `/conversations/${file}`)
            .then((res) => res.text())
            .then((text) => {
                setContent(text);
                setTimeout(() => setVisible(true), 100);
            });
    }, [file]);

    const currentIndex = chapters.findIndex((ch) => ch.file === file);
    const nextChapter = chapters[currentIndex + 1];

    return (
        <div
            className={`transition-all duration-700 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
        >
            <h2 className="text-3xl font-semibold border-b border-glass pb-2 mb-6 text-accent">
                {title}
            </h2>

            <article className="prose prose-invert max-w-none leading-relaxed text-text mb-10">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>

            {nextChapter && (
                <div className="flex justify-end mt-12">
                    <button
                        onClick={() => {
                            setSelected(nextChapter);
                            // Scroll the main content back to top
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="bg-accent/10 border border-accent/30 text-accent px-5 py-2 rounded-lg hover:bg-accent/20 hover:border-accent transition-all duration-300 shadow-glow"
                    >
                        Next Chapter → {nextChapter.title}
                    </button>
                </div>
            )}
        </div>
    );
}
