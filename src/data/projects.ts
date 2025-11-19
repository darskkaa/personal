export type Project = {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    tech: string[];
    visualMetaphor: string;
    architecture?: string[];
    telemetry?: { label: string; value: string }[];
    terminalLog?: string[];
    link?: string;
};

export const projects: Project[] = [
    {
        id: "adilos",
        title: "AdilOS",
        category: "Operating System",
        year: "2024",
        description: "A browser-based operating system simulation featuring a RAG-powered AI assistant. It demonstrates complex state management and a 4-tier intent classification system for natural language processing.",
        tech: ["React", "TypeScript", "TensorFlow.js", "Gemini API"],
        visualMetaphor: "Abstract Neural Network Node",
        architecture: ["User Input", "TensorFlow Tokenizer", "RAG Retrieval", "Gemini Synthesis"],
        telemetry: [
            { label: "Uptime", value: "99.9%" },
            { label: "Latency", value: "85ms" },
            { label: "Intent Accuracy", value: "98.2%" },
            { label: "Nodes Active", value: "4" }
        ],
        terminalLog: [
            "Initializing RAG pipeline...",
            "Loading vector embeddings...",
            "Context retrieved: 4 nodes",
            "Response generated in 120ms",
            "Intent classification: QUERY_TECH",
            "Updating UI state..."
        ],
        link: "https://adil-os.duckdns.org/"
    },
    {
        id: "sneaker-bot",
        title: "Sneaker Bot",
        category: "Automation",
        year: "2023",
        description: "Built for high-frequency trading environments, this automation client ensures zero-latency execution. It features AES-256 encryption for secure key management and a dynamic proxy rotation engine.",
        tech: ["Electron", "Python", "C++", "Puppeteer"],
        visualMetaphor: "Cyberpunk Geometry",
        architecture: ["Task Init", "Proxy Rotation", "AES-256 Decryption", "Checkout"],
        telemetry: [
            { label: "Execution Delay", value: "0ms" },
            { label: "Encryption", value: "AES-256" },
            { label: "Proxies Active", value: "1,024" },
            { label: "Success Rate", value: "94%" }
        ],
        terminalLog: [
            "Task 142 initialized",
            "Proxy [192.168.1.45] rotated",
            "Key exchange successful",
            "Target acquired: SKU-9921",
            "Checkout complete: Order #4921",
            "Writing log to secure storage..."
        ],
        link: "https://darkacobot.netlify.app/login"
    },
    {
        id: "trubridge-data",
        title: "TruBridge Data",
        category: "Data Analysis",
        year: "2023",
        description: "Analyzed a 402k+ entry dataset to reveal 9.3% uninsured rates using Python pipelines. Visualized complex healthcare data trends to drive business insights.",
        tech: ["Python", "Pandas", "Matplotlib", "SQL"],
        visualMetaphor: "Particle Data Cloud",
        architecture: ["Raw CSV Ingest", "Pandas Cleaning", "SQL Aggregation", "Matplotlib Render"],
        telemetry: [
            { label: "Rows Processed", value: "402,150" },
            { label: "Processing Time", value: "1.2s" },
            { label: "Data Integrity", value: "100%" },
            { label: "Insights Found", value: "12" }
        ],
        terminalLog: [
            "Reading dataset.csv...",
            "Cleaning null values...",
            "Aggregating by region...",
            "Generating visualization...",
            "Exporting report to PDF..."
        ]
    },
];
