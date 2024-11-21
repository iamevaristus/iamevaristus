class List {
    static socialMedia = [
        { header: "LinkedIn", icon: "ion:logo-linkedin", path: "https://www.linkedin.com/in/iamevaristus", index: 0 },
        { header: "Instagram", icon: "basil:instagram-solid", path: "https://www.instagram.com/iamevaristus", index: 1 },
        { header: "X", icon: "line-md:twitter-x", path: "https://www.x.com/iamevaristus", index: 2 },
        { header: "YouTube", icon: "line-md:youtube-filled", path: "https://www.youtube.com/@iamevaristus", index: 3 },
        { header: "TikTok", icon: "line-md:tiktok", path: "https://www.tiktok.com/@iamevaristus", index: 4 },
    ]

    static resume = {
        company: {
            header: "Companies",
            items: [
                {
                    "name": "Serchservice Inc.",
                    "from": "15th August, 2022",
                    "till": "Present",
                    "website": "https://www.serchservice.com",
                    "is_featured": true,
                    "tag": "Service, simplified",
                    "color": "#050404",
                    "description": "Serchservice is a platform revolutionizing how users tackle unplanned disruptions. It connects users to vetted artisans for quick solutions, offers video-guided DIY support, and enables referral-based sharing of trusted providers, ensuring reliability and convenience.",
                    "position": "CEO & Founder",
                    "logo": "https://chxpalpeslofqzeulcjr.supabase.co/storage/v1/object/public/serch/logo/AppLogo.png",
                    "social": [
                        { "icon": "ion:logo-linkedin", "path": "https://www.linkedin.com/company/serchservice" },
                        { "icon": "basil:instagram-solid", "path": "https://www.instagram.com/serchservice" },
                        { "icon": "line-md:twitter-x", "path": "https://www.x.com/serchservice" },
                        { "icon": "line-md:youtube-filled", "path": "https://www.youtube.com/@serchservice" },
                        { "icon": "line-md:tiktok", "path": "https://www.tiktok.com/@serchservice" }
                    ]
                }
            ]
        },
        projects: {
            header: "Projects",
        },
        education: {
            header: "Education",
        },
        community: {
            header: "Communities"
        },
        skils: {
            header: "Skills",
        }
    }
}

export default List