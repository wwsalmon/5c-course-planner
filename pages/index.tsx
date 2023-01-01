import SemCol from "../components/SemCol";
import {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import Navbar from "../components/Navbar";
import Head from "next/head";
import {FiPlus} from "react-icons/fi";
import AddCol from "../components/AddCol";
import MyModal from "../components/MyModal";
import BigButton from "../components/BigButton";

let thisYear = new Date().getFullYear();
let thisMonth = new Date().getMonth() + 1;

if (thisMonth === 12) {
    thisYear++;
    thisMonth = 1;
}

const thisSeason = +(thisMonth > 4);
const thisSemester = 2 * thisYear + thisSeason;
const firstSemester = thisSemester - 2;

const initialSems = Array(5).fill(0).map((d, i) => firstSemester + i);

export function decodeSemester(semNum: number) {
    return (semNum % 2 ? "F" : "S") + (Math.floor(semNum / 2)).toString().substring(2);
}

type IdCourse = string;

interface CustomCourse {
    identifier: string,
    title: string,
    source: string,
    custom: true,
};

export type Course = IdCourse | CustomCourse;

export interface SemState {
    sem: number,
    id: string,
    title: string,
    courses: Course[],
}

Modal.setAppElement('#main');

export default function Home() {
    const [appState, setAppState] = useState<SemState[]>([]);
    const [sems, setSems] = useState<number[]>([]);
    const loaded = useRef<boolean>(false);
    const newUser = useRef<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    useEffect(() => {
        const localAppState = window.localStorage.getItem("5c-course-planner-appstate");
        if (!localAppState || !JSON.parse(localAppState).length ) newUser.current = true;
        setAppState(JSON.parse(localAppState) || []);
        setSems(JSON.parse(window.localStorage.getItem("5c-course-planner-sems")) || initialSems);
        loaded.current = true;
    }, []);

    useEffect(() => {
        if (loaded.current) window.localStorage.setItem("5c-course-planner-appstate", JSON.stringify(appState));
    }, [appState]);

    useEffect(() => {
        if (loaded.current) window.localStorage.setItem("5c-course-planner-sems", JSON.stringify(sems));
    }, [sems]);

    return (
        <div className="max-w-full overflow-x-auto" id="main">
            <Head>
                <title>5Planner - course planner for the Claremont Colleges</title>
            </Head>
            <Navbar/>
            <div className="flex max-h-screen items-stretch overflow-y-hidden">
                <AddCol dark={true} onClick={() => {
                    setSems(prev => [prev[0] - 1, ...prev]);
                    // @ts-ignore
                    window.umami && window.umami("Add previous semester");
                }}/>
                {sems.map(d => (
                    <SemCol sem={d} key={d} dark={d < thisSemester} appState={appState} setAppState={setAppState} sems={sems} setSems={setSems}/>
                ))}
                <AddCol onClick={() => {
                    setSems(prev => [...prev, prev[prev.length - 1] + 1]);
                    // @ts-ignore
                    window.umami && window.umami("Add later semester");
                }}/>
            </div>
            {newUser.current && (
                <MyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                    <p className="text-xl font-bold">Welcome to 5Planner!</p>
                    <video src="/demo.mp4" autoPlay={true} muted={true} loop={true} className="my-4 rounded shadow-md"></video>
                    <p>Course planning is hard! Use 5Planner to make lists of possible future classes to help.</p>
                    <p className="text-xs mt-3">General and major requirements coming eventually</p>
                    <button className="p-2 w-full text-white bg-[#222] hover:bg-black text-sm mt-6" onClick={() => setIsModalOpen(false)}>Get started</button>
                </MyModal>
            )}
        </div>
    );
}