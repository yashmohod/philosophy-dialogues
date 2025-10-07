import React from "react";

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-accent mb-4">About This Project</h2>

            <p className="max-w-2xl text-lg text-muted leading-relaxed mb-8">
                This project is an ongoing philosophical dialogue — an attempt to map, in public,
                the exploration of consciousness, determinism, meaning, and the limits of understanding
                in the age of intelligent machines. It’s not meant to provide answers so much as to
                record the evolution of thought as it happens.
            </p>

            <p className="max-w-xl text-muted italic mb-8">
                “We are not reasoning <em>toward</em> certainty, but wandering <em>within</em> it.”
            </p>

            <div className="text-lg text-muted mb-6">
                Created and maintained by{" "}
                <a
                    href="https://github.com/yashmohod"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent2 transition-colors"
                >
                    Yash Mohod
                </a>
                {" "}in collaboration with an AI conversational partner.
            </div>

            <p className="max-w-2xl text-muted mb-8">
                Yash is exploring the intersection of philosophy, code, and design — building digital
                spaces that don’t just inform but <em>transform</em> how we think. This site serves as a live
                experiment in that mission.
            </p>

            <p className="max-w-2xl text-muted">
                The dialogues are held with <strong>ChatGPT</strong>, an artificial intelligence model that
                helps structure, question, and expand ideas in real time. It acts as a mirror for reason —
                testing logic, introducing historical context, and sometimes, provoking paradox. Together,
                human and machine trace the edges of what thinking itself might become.
            </p>
        </div>
    );
}
