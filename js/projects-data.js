/* ============================================================
   Project data — rendered into cards by page-projects.js / page-home.js
   cat: 'web' | 'tools' | 'creative' | 'web3'
   detail: longer copy shown in the project modal on projects.html
   ============================================================ */
const projectData = [
  {
    num: '01', cat: 'web', title: 'AnonyChat',
    desc: 'Real-time anonymous chat app so people can talk without revealing who they are — instant updates, no identity required.',
    detail: 'Built to answer a simple question: what does a chat app look like when identity is optional instead of mandatory? Firebase handles presence and message sync, Socket.io keeps the real-time layer snappy, and the whole thing is designed so a conversation can start and end without either side needing an account trail.',
    stack: ['React', 'Firebase', 'Socket.io', 'JavaScript'],
    live: null
  },
  {
    num: '02', cat: 'web', title: 'Care Connect',
    desc: 'Healthcare-oriented web application, built alongside a full presentation deck to pitch the concept.',
    detail: 'A healthcare-facing web app built with the pitch in mind as much as the product — the presentation deck that accompanies it was built to walk a non-technical audience through the concept, which shaped a lot of the UI decisions.',
    stack: ['React', 'Web App'],
    live: null
  },
  {
    num: '03', cat: 'web', title: 'Bagpack Drive',
    desc: 'A Google-Drive-inspired file manager — drag-and-drop uploads, folder browsing, and a familiar drive-style interface.',
    detail: 'Recreating a familiar interface on purpose — Drive\u2019s UX is a genuinely hard bar to hit (folder nesting, drag-and-drop, selection states), so building a working clone of it was a deliberate exercise in matching a product people already have muscle memory for.',
    stack: ['React', 'Vite'],
    live: null
  },
  {
    num: '04', cat: 'web', title: 'Company Registration System',
    desc: 'CRUD-driven system for maintaining company registration records, with structured forms backed by a real database.',
    detail: 'Straightforward on the surface — forms, a database, CRUD — but the kind of project that teaches you where validation actually needs to live and why "just add a field" requests get complicated fast.',
    stack: ['Database', 'CRUD', 'Forms'],
    live: null
  },
  {
    num: '05', cat: 'web', title: 'Attendance Dashboard',
    desc: 'Dashboard for tracking attendance with statistics and generated reports at a glance.',
    detail: 'A reporting-first build: the dashboard exists to answer "who was here and when" as fast as possible, with statistics summarized rather than left as a raw table to scroll through.',
    stack: ['Dashboard', 'Reports'],
    live: null
  },
  {
    num: '06', cat: 'web', title: 'Blog Frontend',
    desc: 'A frontend-only blogging interface focused on clean typography and a fast reading experience.',
    detail: 'No backend by design — this one was about typography, spacing, and reading comfort. Tailwind made it fast to iterate on type scale until paragraphs actually felt good to read.',
    stack: ['React', 'Tailwind CSS'],
    live: null
  },
  {
    num: '07', cat: 'web', title: 'Portfolio Website',
    desc: 'An earlier developer portfolio covering projects, skills, résumé and contact — the predecessor to this one.',
    detail: 'The site that came before this one — same job (projects, skills, résumé, contact), a much smaller ambition. Kept in the record because it\u2019s a fair before-and-after of how much the bar moved.',
    stack: ['Frontend', 'Portfolio'],
    live: null
  },
  {
    num: '08', cat: 'tools', title: 'Real-Time GPS Tracker',
    desc: 'Tracks live movement with dynamic coordinate updates and map integration for continuous location tracking.',
    detail: 'Built on top of the Geolocation API with continuous watch-position updates rather than one-off lookups, so the map reflects movement, not just a single point in time.',
    stack: ['JavaScript', 'Geolocation', 'Maps'],
    live: null
  },
  {
    num: '09', cat: 'tools', title: 'GPS Coordinates Finder',
    desc: 'A no-frills utility that returns exact latitude/longitude for a location using the browser Geolocation API.',
    detail: 'The simplest tool in the record on purpose — one job, done fast: ask the browser where you are, print the coordinates.',
    stack: ['HTML', 'JavaScript', 'Geolocation API'],
    live: null
  },
  {
    num: '10', cat: 'tools', title: 'WhatsApp Chat JSON Converter',
    desc: 'Converts exported WhatsApp chat logs into clean, structured JSON — built for downstream analysis and automation.',
    detail: 'WhatsApp\u2019s export format is a wall of loosely-structured text. This parses it into proper structured JSON so it can actually be fed into analysis or automation scripts instead of regex\u2019d by hand every time.',
    stack: ['JavaScript', 'Parsing'],
    live: null
  },
  {
    num: '11', cat: 'tools', title: 'YouTube Video Downloader',
    desc: 'A Python utility for pulling down YouTube videos via API, built for quick offline access.',
    detail: 'A Python-side utility for offline access to video content — the kind of tool you build once and then quietly rely on for years.',
    stack: ['Python', 'APIs'],
    live: null
  },
  {
    num: '12', cat: 'tools', title: 'Expense Tracker Management System',
    desc: 'A console-based expense tracker from college — add, remove, update entries and generate spending reports.',
    detail: 'A college minor project and one of the earliest things in this record — plain C++, no UI beyond the console, but it\u2019s where a lot of the fundamentals (structuring data, generating reports from it) actually got learned.',
    stack: ['C++', 'Console App'],
    live: null
  },
  {
    num: '13', cat: 'creative', title: 'Codeflix',
    desc: 'A Netflix-inspired personal portfolio with an animated interface and a responsive project showcase — live and deployed.',
    detail: 'Netflix\u2019s browsing UI is deceptively hard to clone convincingly — the row-scroll interactions and hover states took real iteration. Deployed and live on Vercel, and still one of the projects I point people to first.',
    stack: ['React', 'Vercel', 'Animation'],
    live: 'https://netflix-portfolio-iota.vercel.app/'
  },
  {
    num: '14', cat: 'creative', title: 'TrashDash',
    desc: 'A Flappy-Bird-style browser game starring a raccoon, hand-animated frame by frame and shipped to GitHub Pages. One of my favorites.',
    detail: 'Pure creative indulgence — hand-animated in Adobe Animate rather than leaning on a game engine, which meant every frame of the raccoon\u2019s flight was drawn, not procedurally generated. Still the project I\u2019d show first if someone asked what I do for fun.',
    stack: ['Adobe Animate', 'HTML5 Canvas'],
    live: null
  },
  {
    num: '15', cat: 'creative', title: 'Kudewala Uncle',
    desc: 'A compact, personality-driven landing page built with plain HTML, CSS and JavaScript.',
    detail: 'No framework, no build step — just HTML, CSS and JS doing exactly what they\u2019re good at for a small, characterful landing page.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: null
  },
  {
    num: '16', cat: 'creative', title: 'Akshat — Music Player',
    desc: 'A music player experiment attempting Audius API integration for streaming playback.',
    detail: 'An experiment more than a finished product — the goal was wiring a real streaming API (Audius) into a custom player UI rather than shipping a polished end-to-end product.',
    stack: ['JavaScript', 'Audius API'],
    live: null
  },
  {
    num: '17', cat: 'web3', title: 'Solana Token Creator',
    desc: 'A Web3 dApp for connecting a wallet and minting a custom SPL token straight from the browser.',
    detail: 'The entry point into the Solana ecosystem for me — wallet connection via Phantom/Solflare, then minting a custom SPL token using @solana/web3.js and @solana/spl-token directly from the browser, no backend required.',
    stack: ['Solana', 'web3.js', 'Phantom', 'Solflare'],
    live: null
  }
];
