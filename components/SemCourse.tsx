import {CourseKey, CustomCourse, SemState} from "../pages";
import data from "../data_5scheduler.json";
import {FiPlus, FiX} from "react-icons/fi";
import {Dispatch, SetStateAction} from "react";
import CourseShell from "./CourseShell";

export const colors = {
    Pomona: "#00549A",
    Pitzer: "#F4921C",
    HarveyMudd: "#333333",
    Scripps: "#33735B",
    ClaremontMckenna: "#98012E",
};

export interface CatalogCourse {
    title: string,
    identifier: string,
    description: string,
    source: string,
    credits: number,
    instructors: string[],
    offered: string,
    prerequisites: string,
    corequisites: string,
    currently_offered: boolean,
    fee: number
};

export type Course = CatalogCourse | CustomCourse;

export default function SemCourse({courseKey, setAppState, callback, isSearch, semId}: { courseKey: CourseKey, setAppState: Dispatch<SetStateAction<SemState[]>>, semId: string, callback?: () => void, isSearch?: boolean }) {
    const thisCourse: Course = typeof courseKey === "string" ? data.find(d => d.identifier === courseKey) : courseKey;

    function onAdd() {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semId);
            newAppState[thisIndex].courses.push(courseKey);
            return newAppState;
        });
        if (callback) callback();

        // @ts-ignore
        window.umami && window.umami("Add catalog course");
    }

    function onDelete() {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semId);
            newAppState[thisIndex].courses = newAppState[thisIndex].courses.filter(d => d !== courseKey);
            return newAppState;
        });

        // @ts-ignore
        window.umami && window.umami("Remove course");
    }

    return (
        <CourseShell thisCourse={thisCourse}>
            <button className="ml-auto pl-2 flex-shrink-0 opacity-50 hover:opacity-100" onClick={isSearch ? onAdd : onDelete}>
                {isSearch ? <FiPlus/> : <FiX/>}
            </button>
        </CourseShell>
    )
}