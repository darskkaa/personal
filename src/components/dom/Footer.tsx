import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full py-8 px-4 md:px-12 border-t border-white/5 mt-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm text-gray-500 font-mono">
                    © {new Date().getFullYear()} Adil Zaben.
                </div>

                <nav className="flex gap-8 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/#work" className="hover:text-white transition-colors">
                        Work
                    </Link>
                    <Link href="/contact" className="hover:text-white transition-colors">
                        Contact
                    </Link>
                </nav>

                <div className="flex flex-col items-end text-xs text-gray-600 font-mono">
                    <span>darskkaa</span>
                    <span>adilzaben@gmail.com</span>
                </div>
            </div>
        </footer>
    );
}
