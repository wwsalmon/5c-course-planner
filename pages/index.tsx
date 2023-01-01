import SemCol from "../components/SemCol";
import {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import Navbar from "../components/Navbar";
import Head from "next/head";

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
    const loaded = useRef<boolean>(false);

    useEffect(() => {
        setAppState(JSON.parse(window.localStorage.getItem("5c-course-planner-appstate")) || []);
        loaded.current = true;
    }, []);

    useEffect(() => {
        if (loaded.current) window.localStorage.setItem("5c-course-planner-appstate", JSON.stringify(appState));
    }, [appState]);

    return (
        <div className="max-w-full overflow-x-auto" id="main">
            <Head>
                <title>5Planner - course planner for the Claremont Colleges</title>
            </Head>
            <Navbar/>
            <div className="flex max-h-screen items-stretch overflow-y-hidden">
                {Array(5).fill(0).map((d, i) => firstSemester + i).map(d => (
                    <SemCol sem={d} key={d} dark={d < thisSemester} appState={appState} setAppState={setAppState}/>
                ))}
            </div>
        </div>
    );
}