"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, Monitor, Mic, FileText, Star, Code } from "lucide-react";


export default function AnimationStage() {
    const interviewElements = [
        { icon: Mic, text: "Mock Interview", color: "text-indigo-600" },
        { icon: Code, text: "Tech Prep", color: "text-purple-600" },
        { icon: FileText, text: "AI Powered Review", color: "text-green-600" },
        { icon: Star, text: "Skill Assessment", color: "text-yellow-500" },
    ];
    const [animationStage, setAnimationStage] = useState(0);

    useEffect(() => {
        const animationTimer = setInterval(() => {
            setAnimationStage((prev) => (prev + 1) % interviewElements.length);
        }, 3000);

        return () => clearInterval(animationTimer);
    }, []);

    return (
        <div className="relative w-full max-w-xl mx-auto perspective-1000">
            <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Circular Orbit Container */}
                <div className="relative w-96 h-96 rounded-full border-2 border-dashed border-indigo-200">
                    {/* Central Monitor */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Monitor
                            size={200}
                            className="text-gray-300 fill-black"
                            strokeWidth={1}
                        />
                        {/* Replace MockInterviewGPT text with robot.mp4 video */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-40 h-30 mb-10 bg-gray-800 rounded-lg overflow-hidden">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full object-cover"
                                >
                                    <source src="/robot.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    {/* Animated Interview Elements */}
                    {interviewElements.map((element, index) => {
                        const Icon = element.icon;
                        const isActive = index === animationStage;
                        const angle = (index * Math.PI * 2) / interviewElements.length;
                        const radius = 200;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <div
                                key={element.text}
                                className={`absolute transform transition-all duration-1000 ease-in-out ${isActive
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-50"
                                    }`}
                                style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: `translate(-50%, -50%) ${isActive ? "scale(1)" : "scale(0.5)"
                                        }`,
                                }}
                            >
                                <div className="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-3">
                                    <Icon
                                        className={`w-6 h-6 ${element.color} ${isActive ? "animate-pulse" : ""
                                            }`}
                                    />
                                    <span className="text-gray-800">{element.text}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}