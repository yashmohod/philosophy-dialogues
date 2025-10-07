import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChapterView({ file, title }) {
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

    return (
        <div
            className={`transition-all duration-700 ease-in-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
        >
            <h2 className="text-3xl font-semibold border-b border-glass pb-2 mb-6 text-accent">
                {title}
            </h2>
            <article className="prose prose-invert max-w-none leading-relaxed text-text">
                <ReactMarkdown>{content}</ReactMarkdown>
            </article>
        </div>
    );
}
