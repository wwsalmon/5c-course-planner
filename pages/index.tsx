import SemCol from "../components/SemCol";
import {useState} from "react";
import Modal from "react-modal";
import MyModal from "../components/MyModal";

let thisYear = new Date().getFullYear();
let thisMonth = new Date().getMonth() + 1;

if (thisMonth === 12) {
    thisYear++;
    thisMonth = 1;
}

const thisSeason = +(thisMonth > 4);
const thisSemester = 2 * thisYear + thisSeason;
const firstSemester = thisSemester - 2;
const lastSemester = thisSemester + 2;

export function decodeSemester(semNum: number) {
    return (semNum % 2 ? "F" : "S") + (Math.floor(semNum / 2)).toString().substring(2);
}

type IdCourse = string;

interface CustomCourse {
    id: string,
    title: string
};

export type Course = IdCourse | CustomCourse;

export interface SemState {
    sem: number,
    id: string,
    title: string,
    courses: Course[],
}

export default function Home() {
    const [appState, setAppState] = useState<SemState[]>([]);
    const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);

    return (
        <div className="max-w-full overflow-x-auto">
            <div className="fixed top-0 left-0 bg-[#222] border-b text-white border-gray-500 w-full px-4 py-2 flex">
                <p className="text-sm opacity-50 font-semibold">5C Course Planner</p>
                <button className="ml-auto text-sm opacity-50 hover:opacity-100"
                        onClick={() => setAboutModalOpen(true)}>About
                </button>
                <MyModal isOpen={aboutModalOpen} setIsOpen={setAboutModalOpen}>
                    <div className="w-72">
                        <p className="text-2xl mb-4">Load your past courses and try future combinations.</p>
                        <p>by samson zhang po '25</p>
                    </div>
                </MyModal>
            </div>
            <div className="flex max-h-screen items-stretch overflow-y-hidden">
                {Array(5).fill(0).map((d, i) => firstSemester + i).map(d => (
                    <SemCol sem={d} key={d} dark={d < thisSemester} appState={appState} setAppState={setAppState}/>
                ))}
            </div>
        </div>
    );
}