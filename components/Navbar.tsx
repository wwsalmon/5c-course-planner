import Link from "next/link";
import {Dispatch, SetStateAction} from "react";
import {FiSidebar} from "react-icons/fi";

export default function Navbar({isAbout, setIsSidebarOpen, isSidebarOpen}: {isAbout?: boolean, setIsSidebarOpen?: Dispatch<SetStateAction<boolean>>, isSidebarOpen?: boolean}) {
    return (
        <div className="fixed top-0 left-0 bg-[#222] border-b text-white border-gray-500 w-full h-10 px-4 flex items-center z-10">
            <Link href="/" className="text-sm opacity-50 hover:opacity-100 font-semibold">5C Course Planner</Link>
            {isAbout ? (
                <Link href="/" className="ml-auto text-sm opacity-50 hover:opacity-100">Back to app</Link>
            ) : (
                <Link href="/about" className="ml-auto text-sm opacity-50 hover:opacity-100">About</Link>
            )}
            {setIsSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(prev => !prev)} className="ml-4 opacity-90 hover:opacity-100 text-sm py-1 px-1 -mr-3 bg-gray-100 text-black flex items-center">
                    <FiSidebar/><span className="ml-2">Major requirements</span>
                    {/*{isSidebarOpen ? ">" : "<"} Requirements menu*/}
                </button>
            )}
        </div>
    )
}