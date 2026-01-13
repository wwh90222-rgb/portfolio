import React, { useState, useEffect, useRef, useMemo } from "react";

// --- Utilities ---
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

// --- Data ---
const CATEGORIES = [
    "TV CF",
    "AI CONTENTS",
    "DIGITAL CONTENTS",
    "YOUTUBE",
    "SHORT-FORM",
    "MUSIC & SHOW"
];

const projectsSeed = [
    // TV CF
    {
        id: 1,
        title: "IPHONE 15PRO",
        client: "SK Telecom",
        category: "TV CF",
        thumb: "/tvcf-thumb-iphone.png",
        youtubeId: "_Z6l7a4demk",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 50 },
            { label: "Clean", value: 50 },
            { label: "Screen synthesis", value: 100 },
            { label: "2D Motion graphic", value: 100 }
        ]
    },
    {
        id: 2,
        title: "PRISM SHINHANCARD",
        client: "CJ",
        category: "TV CF",
        thumb: "/tvcf-thumb-prism.png",
        youtubeId: "YrMzymJmUJU",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 100 },
            { label: "Clean", value: 100 },
            { label: "2D Motion graphic", value: 100 }
        ]
    },
    {
        id: 3,
        title: "GALAXY S24",
        client: "SK Telecom",
        category: "TV CF",
        thumb: "/tvcf-thumb-galaxy.png",
        youtubeId: "UUC_uIn4Ky4",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 100 },
            { label: "Clean", value: 100 },
            { label: "2D Motion graphic", value: 70 }
        ]
    },
    {
        id: 4,
        title: "롯데마트 델리셔스페스타",
        client: "롯데마트",
        category: "TV CF",
        thumb: "/tvcf-thumb-lottemart.png",
        youtubeId: "o17qUj4IXKM",
        role: "Post Production",
        contributions: [
            { label: "Design", value: 100 },
            { label: "2D Motion graphic", value: 100 }
        ]

    },
    {
        id: 5,
        title: "ADOT",
        client: "SK Telecom",
        category: "TV CF",
        thumb: "/tvcf-thumb-adot.png",
        youtubeId: "jExR0KNHGyY",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 50 },
            { label: "Clean", value: 100 },
            { label: "Screen synthesis", value: 30 },
            { label: "2D Motion graphic", value: 50 }
        ]
    },
    {
        id: 6,
        title: "ALIEXPRESS",
        client: "ALIEXPRESS",
        category: "TV CF",
        thumb: "/tvcf-thumb-aliexpress.png",
        youtubeId: "88LSmjUApio",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 50 },
            { label: "Clean", value: 50 },
            { label: "2D Motion graphic", value: 100 }
        ]
    },
    {
        id: 7,
        title: "SAMSUNG ZFLIP5",
        client: "SK Telecom",
        category: "TV CF",
        thumb: "/tvcf-thumb-zflip5.png",
        youtubeId: "0vrHL_1cx84",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 100 },
            { label: "Clean", value: 100 },
            { label: "Screen synthesis", value: 30 },
            { label: "2D Motion graphic", value: 50 }
        ]
    },
    {
        id: 8,
        title: "T ROAMING",
        client: "SK Telecom",
        category: "TV CF",
        thumb: "/tvcf-thumb-troaming.png",
        youtubeId: "jLAiHYbGSbQ",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 30 },
            { label: "Skin", value: 50 },
            { label: "Clean", value: 100 },
            { label: "Screen synthesis", value: 20 },
            { label: "2D Motion graphic", value: 50 }
        ]
    },
    {
        id: 9,
        title: "KANU",
        client: "KANU",
        category: "TV CF",
        thumb: "/tvcf-thumb-kanu.png",
        youtubeId: "MmXEOe1eOlA",
        role: "2D FLAME ASSISTANT",
        contributions: [
            { label: "Key", value: 50 },
            { label: "Skin", value: 100 },
            { label: "Clean", value: 70 },
            { label: "2D Motion graphic", value: 50 }
        ]
    },

    // AI CONTENTS - Horizontal (Page 0)
    { id: 11, title: "RICOLA", client: "Personal Project", category: "AI CONTENTS", thumb: "/ricola-thumb.png", youtubeId: "qf4ykW6kGxQ", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "horizontal" },
    { id: 12, title: "SONY", client: "Personal Project", category: "AI CONTENTS", thumb: "/sony-thumb.png", youtubeId: "YTWIs7JP6pg", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "horizontal" },
    { id: 13, title: "KB 손해보험", client: "Personal Project", category: "AI CONTENTS", thumb: "/kb-thumb.png", youtubeId: "iGeU2pcPlDg", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "horizontal" },
    { id: 14, title: "F1 2 TRAILER", client: "Personal Project", category: "AI CONTENTS", thumb: "/f1-thumb.jpg", youtubeId: "It_H_QBI-pA", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "horizontal" },
    // AI CONTENTS - Vertical (Page 1)
    { id: 15, title: "신한프렌즈야구단", client: "Shinhan Bank(Bid)", category: "AI CONTENTS", thumb: "/ai-vertical-1.jpg", youtubeId: "aAElIEXQAGY", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "vertical" },
    { id: 16, title: "삼성화재_보험편", client: "Samsung Fire & Marine(Bid)", category: "AI CONTENTS", thumb: "/ai-vertical-2.png", youtubeId: "vENX-fomTNk", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "vertical" },
    { id: 17, title: "삼성화재_병원동행편", client: "Samsung Fire & Marine(Bid)", category: "AI CONTENTS", thumb: "/ai-vertical-3.png", youtubeId: "M5BHI3POp48", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "vertical" },
    { id: 18, title: "NONFICTION", client: "Personal Project", category: "AI CONTENTS", thumb: "/ai-vertical-4.png", youtubeId: "Yfvoer4LGLo", role: "End-to-End Production", contributions: [{ label: "Produce", value: 100 }], aspect: "vertical" },

    // DIGITAL CONTENTS
    {
        id: 21, title: "ECLIPSE MINT", client: "MARS KOREA", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-eclipse.jpg", youtubeId: "xRymMyZrBnQ", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Storyboard", value: 100 },
            { label: "AD", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 22, title: "SMILE CARD", client: "EBAY & CJ ENM", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-smilecard.png", youtubeId: "UUtfiXpF3gk", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 23, title: "BUDWEISER", client: "BUDWEISER & CJ ENM", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-budweiser.png", youtubeId: "YgGDLFtFqdo", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 24, title: "BARC", client: "BARC", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-barc.jpg", youtubeId: "8_rK1Sce96Y", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 25, title: "알고보면 OAP", client: "Client A", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-algobomyeon.png", youtubeId: "0BtiDbCi5XQ", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "3D", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 26, title: "알쓸문잡 TITLE", client: "Client B", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-alssul.jpg", youtubeId: "VIyNsCFbM9k", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 27, title: "빵빵토크 TITLE", client: "Client C", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-bbangbbang.jpg", youtubeId: "3xJUBTwC19U", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 28, title: "이찌라의 상식 TITLE", client: "Client D", category: "DIGITAL CONTENTS", thumb: "/digital-thumb-ijjira.png", youtubeId: "5Jv-mFTXPwM", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },

    // YOUTUBE
    {
        id: 31, title: "SIMMONS AD", client: "SIMMONS", category: "YOUTUBE", thumb: "/youtube-thumb-simmons.png", youtubeId: "q7t_lpAsBqU", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 32, title: "WACOM X 조용석", client: "WACOM", category: "YOUTUBE", thumb: "/youtube-thumb-wacom.jpg", youtubeId: "_VFLDfsLWLc", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 33, title: "HYUNDAI'S TASTE", client: "HYUNDAI", category: "YOUTUBE", thumb: "/youtube-thumb-hyundai.png", youtubeId: "LS8Qkj22tmE", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 34, title: "슈퍼핑거 시즌3", client: "중소벤처기업부", category: "YOUTUBE", thumb: "/youtube-thumb-superfinger.jpg", youtubeId: "HsmAT-SmjVc", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },

    // SHORT-FORM
    {
        id: 41, title: "GALAXY Z FLIP7 | Z FOLD7 사전예약", client: "LG U+", category: "SHORT-FORM", thumb: "/shortform-thumb-galaxy.png", youtubeId: "PkhVgY7BNNA", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 42, title: "라라소프트 그린핑거", client: "유한킴벌리", category: "SHORT-FORM", thumb: "/shortform-thumb-greenfinger.png", youtubeId: "4N_XdR--IPc", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 43, title: "화이트 X 빤쮸토끼", client: "유한킴벌리", category: "SHORT-FORM", thumb: "/shortform-thumb-white.png", youtubeId: "a7Vv3Nl3Y4A", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 44, title: "네이처메이드​ SUS", client: "유한킴벌리", category: "SHORT-FORM", thumb: "/shortform-thumb-naturemade.png", youtubeId: "bp4tMdfTVJU", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 45, title: "차차차 탐구생활", client: "KB 차차차", category: "SHORT-FORM", thumb: "/shortform-thumb-chachacha.png", youtubeId: "r0D5Gzmz_yM", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 46, title: "THANK U+ 페스타", client: "LG U+", category: "SHORT-FORM", thumb: "/shortform-thumb-thankuplus.png", youtubeId: "F_IDU1msf6g", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 47, title: "ALL DAY 맥스드라이", client: "유한킴벌리", category: "SHORT-FORM", thumb: "/shortform-thumb-alldaymaxdry.png", youtubeId: "qu9KfLNmcVE", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 48, title: "IBK 카드", client: "IBK 기업은행(Bid)", category: "SHORT-FORM", thumb: "/shortform-thumb-ibkcard.png", youtubeId: "vxnhLJWe26s", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 50 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },

    // MUSIC & SHOW
    {
        id: 51, title: "KEEP THE VIBE", client: "CJ ENM & JOHNNIE WALKER", category: "MUSIC & SHOW", thumb: "/music-thumb-keepthevibe.png", youtubeId: "F9uLKknEf6Y", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "DI", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 52, title: "ADOY LIVE", client: "NAVER ON STAGE", category: "MUSIC & SHOW", thumb: "/music-thumb-adoy.png", youtubeId: "gTq_HcpKSm4", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "DI", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 53, title: "SLOVIBE-LIVE", client: "SLOVIBE", category: "MUSIC & SHOW", thumb: "/music-thumb-slovibe-live.jpg", youtubeId: "LtO4yydkaBk", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "DI", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 54, title: "SLOVIBE-TALK", client: "SLOVIBE", category: "MUSIC & SHOW", thumb: "/music-thumb-slovibe-talk.jpg", youtubeId: "ChRJDo8TaHM", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "AD", value: 100 },
            { label: "DI", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 55, title: "2022 한류 POP FESTIVAL", client: "Music Client", category: "MUSIC & SHOW", thumb: "/music-thumb-hallyupop.png", youtubeId: "-y71a9u1rQU", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    },
    {
        id: 56, title: "2022 부산 국제 ROCK FESTIVAL", client: "Music Client", category: "MUSIC & SHOW", thumb: "/music-thumb-busanrock.png", youtubeId: "oXGKOYvXFpA", role: "End-to-End Production", contributions: [
            { label: "Planning", value: 100 },
            { label: "Design", value: 100 },
            { label: "Edit", value: 100 },
            { label: "Post-production", value: 100 }
        ]
    }
];

// --- Components ---
const ProjectCard = ({ project, onClick, aspect = "horizontal" }) => {
    const isVertical = aspect === "vertical";
    return (
        <button
            onClick={onClick}
            className="group relative w-full text-left outline-none"
        >
            <div className={cn(
                "relative overflow-hidden bg-[#111] transition-all duration-700 rounded-[2rem] border border-white/5 group-hover:border-white/10 group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]",
                isVertical ? "aspect-[9/16]" : "aspect-[16/10] md:rounded-[3rem]"
            )}>
                <img
                    src={project.thumb}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-60 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />

                <div className={cn(
                    "absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-700",
                    isVertical ? "md:p-6" : "md:p-12"
                )}>
                    <div className="flex items-center gap-2 mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] border border-white/20 px-2 py-0.5 rounded-full text-white">{project.category.split(' ')[0]}</span>
                    </div>
                    <h3 className={cn(
                        "font-light text-white mb-1 tracking-tight group-hover:underline decoration-1 underline-offset-4",
                        isVertical ? "text-lg md:text-xl" : "text-2xl"
                    )}>{project.title}</h3>
                    <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase font-bold">{project.client}</p>
                </div>

                {/* Play Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={cn(
                        "rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center",
                        isVertical ? "w-12 h-12" : "w-16 h-16"
                    )}>
                        <svg className={cn("text-white ml-0.5", isVertical ? "w-4 h-4" : "w-6 h-6")} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </button>
    );
};


function ProjectModal({ project, onClose }) {
    if (!project) return null;

    const isVertical = project.aspect === "vertical";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6 backdrop-blur-2xl bg-black/80 animate-in fade-in duration-500">
            {/* Click Outside to Close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className={cn(
                "relative w-full bg-[#0a0c10]/90 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500",
                isVertical ? "max-w-5xl h-[90vh]" : "max-w-6xl max-h-[92vh]"
            )}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 active:scale-90"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Video Side */}
                <div className={cn(
                    "bg-black relative group/video",
                    isVertical
                        ? "w-full md:w-[50%] aspect-[9/16] md:aspect-auto"
                        : "w-full md:w-[65%] aspect-video md:aspect-auto"
                )}>
                    {project.youtubeId ? (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                            title={project.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 font-light tracking-widest text-xs uppercase">
                            Video Stream Unavailable
                        </div>
                    )}
                </div>

                {/* Content Side */}
                <div className={cn(
                    "p-8 md:p-12 overflow-y-auto border-t md:border-t-0 md:border-l border-white/5",
                    isVertical ? "w-full md:w-[50%]" : "w-full md:w-[35%]"
                )}>
                    <div className="mb-10">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-4 font-bold">{project.category}</span>
                        <h2 className="text-3xl font-[200] leading-tight mb-4 tracking-tight">{project.title}</h2>
                        <div className="flex items-center gap-3 text-white/40 text-xs font-light">
                            <span>{project.client}</span>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Role */}
                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 font-bold">Role</h4>
                            <p className="text-sm text-white/80 font-light leading-relaxed">{project.role || "Director / Editor / VFX"}</p>
                        </div>

                        {/* Contributions */}
                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6 font-bold">Work Breakdown</h4>
                            <div className="space-y-6">
                                {(project.contributions || [
                                    { label: "Direction", value: 100 },
                                    { label: "Editing", value: 50 },
                                    { label: "VFX", value: 30 }
                                ]).map((c, i) => (
                                    <div key={i} className="group/item">
                                        <div className="flex justify-between text-xs mb-3">
                                            <span className="text-white/60 group-hover/item:text-white transition-colors duration-300">{c.label}</span>
                                            <span className="font-mono text-white/30 group-hover/item:text-white transition-colors duration-300">{c.value}%</span>
                                        </div>
                                        <div className="h-[1px] w-full bg-white/5 relative">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-white/40 group-hover/item:bg-white transition-all duration-1000 ease-out"
                                                style={{ width: `${c.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Hero Background: Sphere Canvas ---
function SphereCanvas() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const isHoveringRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const baseRadius = window.innerWidth < 768 ? 250 : 380;
        const perspective = 800;
        const particleCount = window.innerWidth < 768 ? 3000 : 8000;
        const particles = [];

        const random = (min, max) => Math.random() * (max - min) + min;

        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const rVar = random(0.80, 1.20);

            particles.push({
                baseTheta: theta,
                basePhi: phi,
                radius: baseRadius * rVar,
                x: 0, y: 0, z: 0,
                size: random(0.3, 1.2),
                opacity: random(0.1, 0.6),
                flowOffset: random(0, 100),
                flowAmp: random(10, 30)
            });
        }

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };

        window.addEventListener("resize", resize);
        resize();

        let rotationY = 0;
        let time = 0;

        const animate = () => {
            if (document.hidden) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const width = window.innerWidth;
            const height = window.innerHeight;
            const centerX = width / 2;
            const centerY = height / 2;

            ctx.clearRect(0, 0, width, height);

            time += 0.005;
            rotationY += 0.0003;

            const mouseXPercent = (mouseRef.current.x / width - 0.5) * 2;
            const mouseYPercent = (mouseRef.current.y / height - 0.5) * 2;

            const targetRotY = mouseXPercent * 0.1;
            const targetRotX = -mouseYPercent * 0.1;

            particles.sort((a, b) => b.z - a.z);

            const currentRotY = rotationY + targetRotY;

            particles.forEach(p => {
                const flowTime = time * 2 + p.flowOffset;
                const rMod = Math.sin(flowTime) * p.flowAmp * 0.5;
                const thetaMod = Math.cos(flowTime * 0.5) * 0.1;
                const phiMod = Math.sin(flowTime * 0.3) * 0.1;

                const r = p.radius + rMod;
                const theta = p.baseTheta + thetaMod;
                const phi = p.basePhi + phiMod;

                let bx = r * Math.cos(theta) * Math.sin(phi);
                let by = r * Math.sin(theta) * Math.sin(phi);
                let bz = r * Math.cos(phi);

                let x1 = bx * Math.cos(currentRotY) - bz * Math.sin(currentRotY);
                let z1 = bz * Math.cos(currentRotY) + bx * Math.sin(currentRotY);

                let y2 = by * Math.cos(targetRotX) - z1 * Math.sin(targetRotX);
                let z2 = z1 * Math.cos(targetRotX) + by * Math.sin(targetRotX);

                p.z = z2;

                let scale = perspective / (perspective + z2 + 400);
                let x2d = x1 * scale + centerX;
                let y2d = y2 * scale + centerY;

                const dx = x2d - mouseRef.current.x;
                const dy = y2d - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const interactRadius = 300;

                if (dist < interactRadius && isHoveringRef.current) {
                    const force = (interactRadius - dist) / interactRadius;
                    const angle = Math.atan2(dy, dx);
                    x2d += Math.cos(angle) * force * 20;
                    y2d += Math.sin(angle) * force * 20;
                }

                ctx.beginPath();
                ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
                const alpha = Math.max(0.02, (p.opacity * scale) - (z2 * 0.0008));
                ctx.fillStyle = `rgba(220, 220, 230, ${alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            isHoveringRef.current = true;
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
}

// --- Main Portfolio Component ---
export default function Portfolio() {
    const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
    const [selectedId, setSelectedId] = useState(null);

    const filteredProjects = useMemo(() => {
        return projectsSeed.filter(p => p.category === activeTab);
    }, [activeTab]);

    const aiHorizontalProjects = useMemo(() =>
        filteredProjects.filter(p => p.aspect === "horizontal"),
        [filteredProjects]);

    const aiVerticalProjects = useMemo(() =>
        filteredProjects.filter(p => p.aspect === "vertical"),
        [filteredProjects]);

    const activeProject = useMemo(
        () => projectsSeed.find(p => p.id === selectedId),
        [selectedId]
    );

    // Lock Scroll when Modal is Open
    useEffect(() => {
        if (selectedId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedId]);

    // Custom Smooth Scroll with "Tension" Easing
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // ms
        let start = null;

        // Ease Out Exponential - creates a "tension" feel (fast snap, slow settle)
        const ease = (t) => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startPosition + distance * ease(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <div className="relative min-h-screen bg-[#07090D] text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
            {/* Global Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            {/* Top Navigation Bar */}
            <header className="fixed top-0 left-0 right-0 z-40 flex justify-center py-6 pointer-events-none">
                <nav className="pointer-events-auto flex items-center gap-6 md:gap-8 px-8 py-4 rounded-full bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl transition-all hover:bg-black/40 hover:border-white/10">
                    <a href="#works" onClick={(e) => handleScroll(e, "#works")} className="text-[10px] hover:text-white text-white/50 uppercase tracking-widest transition-colors duration-300">Featured Projects</a>
                    <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="text-[10px] hover:text-white text-white/50 uppercase tracking-widest transition-colors duration-300">About</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="text-[10px] hover:text-white text-white/50 uppercase tracking-widest transition-colors duration-300">Contact</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                <SphereCanvas />
                <div className="relative z-10 flex flex-col items-center px-4 text-center pointer-events-none">
                    <h1 className="text-3xl md:text-4xl font-[100] tracking-widest text-white/80 animate-in fade-in zoom-in-95 duration-1000 delay-200 drop-shadow-sm uppercase">
                        AI Visual Director
                    </h1>
                </div>

                <div className="absolute bottom-20 z-10 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 px-4 pointer-events-none">
                    <p className="text-xs font-light text-white/40 tracking-wider mb-10 text-pretty max-w-xs">
                        기획부터 제작까지, 전체 흐름을 연출하는<br />AI 비주얼 디렉터 우욱환입니다.
                    </p>

                    <a href="#works" onClick={(e) => handleScroll(e, "#works")} className="pointer-events-auto group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95">
                        <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">View Works</span>
                        <svg className="w-3 h-3 text-white/40 group-hover:text-white transition-colors animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </section>

            <main className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
                {/* Works Grid */}
                <section id="works" className="py-32 md:py-40">
                    <div className="mb-16 md:mb-24 px-4 md:px-0">
                        <div className="inline-block">
                            <h2 className="text-xl md:text-2xl font-[100] tracking-[0.2em] mb-4 uppercase">FEATURED PROJECTS</h2>
                            <div className="h-[1px] w-full bg-white/20"></div>
                        </div>
                    </div>

                    {/* Tabs - Single Row */}
                    <div className="mb-16 w-full flex justify-center">
                        <div className="flex flex-wrap justify-center gap-3">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-[10px] md:text-xs transition-all duration-300 border backdrop-blur-md relative overflow-hidden group min-w-[120px]",
                                        activeTab === cat
                                            ? "bg-white/10 border-white/20 text-white shadow-[0_4px_16px_0_rgba(255,255,255,0.1)]"
                                            : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/10 hover:text-white"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 transition-opacity duration-500",
                                        activeTab === cat ? "opacity-100" : "group-hover:opacity-100"
                                    )} />
                                    <span className="relative z-10 tracking-widest uppercase">{cat}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Works Grid Sections */}
                    <div className="space-y-16 md:space-y-24">
                        {activeTab === "AI CONTENTS" ? (
                            <>
                                {/* AI - Horizontal Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {aiHorizontalProjects.map((p) => (
                                        <ProjectCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} aspect="horizontal" />
                                    ))}
                                </div>
                                {/* AI - Vertical Section */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-8 border-t border-white/5">
                                    {aiVerticalProjects.map((p) => (
                                        <ProjectCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} aspect="vertical" />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className={cn(
                                "grid gap-4 md:gap-6 transition-all duration-500",
                                ["TV CF", "DIGITAL CONTENTS", "MUSIC & SHOW"].includes(activeTab)
                                    ? "grid-cols-1 md:grid-cols-3"
                                    : activeTab === "SHORT-FORM"
                                        ? "grid-cols-2 md:grid-cols-4"
                                        : "grid-cols-1 md:grid-cols-2"
                            )}>
                                {filteredProjects.map((p) => (
                                    <ProjectCard
                                        key={p.id}
                                        project={p}
                                        onClick={() => setSelectedId(p.id)}
                                        aspect={activeTab === "SHORT-FORM" ? "vertical" : "horizontal"}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* About & Contact */}
                <section id="about" className="py-32 border-t border-white/5">
                    <div className="mb-16 md:mb-24 px-4 md:px-0">
                        <div className="inline-block">
                            <h2 className="text-xl md:text-2xl font-[100] tracking-[0.2em] mb-4 uppercase">ABOUT</h2>
                            <div className="h-[1px] w-full bg-white/20"></div>
                        </div>
                    </div>
                    <div className="grid gap-12 md:grid-cols-2">
                        <div className="p-10 md:p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                            <h3 className="text-lg font-light text-white/40 mb-10 tracking-[0.2em] uppercase">Philosophy</h3>
                            <p className="text-sm font-[200] leading-loose text-white/80 tracking-wide text-justify">
                                영상 제작의 전 과정을 이해하고,<br className="hidden md:block" />
                                기획·연출·편집·후반 작업을 하나의 흐름으로 통합해 디렉팅합니다.<br className="hidden md:block" />
                                드로잉 기반 스토리보드와 AI 기반 제작 워크플로우를 활용해<br className="hidden md:block" />
                                아이디어를 빠르고 명확하게 비주얼로 구현합니다.<br className="hidden md:block" />
                                클라이언트와의 원활한 커뮤니케이션을 통해<br className="hidden md:block" />
                                프로젝트의 방향성과 완성도를 끝까지 책임지며,<br className="hidden md:block" />
                                메시지가 선명한 결과물을 만들어냅니다.
                            </p>
                        </div>
                        <div className="p-10 md:p-16 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl">
                            <h3 className="text-lg font-light text-white/40 mb-10 tracking-[0.2em] uppercase">Tools & Workflow</h3>
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xs text-white/60 mb-3 tracking-widest uppercase">Motion & Post-production</h4>
                                    <p className="text-sm font-[200] text-white/90 leading-relaxed">After Effects, Premiere Pro, Autodesk Flame</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-white/60 mb-3 tracking-widest uppercase">Design & Look Development</h4>
                                    <p className="text-sm font-[200] text-white/90 leading-relaxed">Illustrator, Photoshop</p>
                                </div>
                                <div>
                                    <h4 className="text-xs text-white/60 mb-3 tracking-widest uppercase">3D & AI Workflow</h4>
                                    <p className="text-sm font-[200] text-white/90 leading-relaxed">Cinema 4D, ComfyUI</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-40 text-center">
                    <h2 className="text-2xl md:text-4xl font-[100] tracking-tighter mb-12 opacity-80">Start a Conversation.</h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <span className="px-8 py-3 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-white/60 tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white cursor-default">
                            010-3928-9022
                        </span>
                        <a href="mailto:wwh9022@gmail.com" className="px-8 py-3 rounded-full text-xs md:text-sm border border-white/10 bg-white/5 text-white/60 tracking-widest transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white">
                            wwh9022@gmail.com
                        </a>
                    </div>
                </section>
            </main>

            {/* Modal */}
            {activeProject && (
                <ProjectModal
                    project={activeProject}
                    onClose={() => setSelectedId(null)}
                />
            )}
        </div>
    );
}
