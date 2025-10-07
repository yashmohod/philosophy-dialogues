import React, { useEffect, useState } from "react";

export default function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setProgress(scrolled);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "4px",
                width: `${progress}%`,
                background: "#66d9ef",
                transition: "width 0.2s ease-out",
                zIndex: 100,
            }}
        />
    );
}
