import Link from "next/link";

export default function Navbar({isAbout}: {isAbout?: boolean}) {
    return (
        <div className="fixed top-0 left-0 bg-[#222] border-b text-white border-gray-500 w-full px-4 py-2 flex">
            <Link href="/" className="text-sm opacity-50 hover:opacity-100 font-semibold">5C Course Planner</Link>
            {isAbout ? (
                <Link href="/" className="ml-auto text-sm opacity-50 hover:opacity-100">Back to app</Link>
            ) : (
                <Link href="/about" className="ml-auto text-sm opacity-50 hover:opacity-100">About</Link>
            )}
        </div>
    )
}