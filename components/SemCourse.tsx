import {CourseKey, CustomCourse} from "../pages";
import data from "../data_5scheduler.json";
import {FiPlus, FiX} from "react-icons/fi";
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

export default function SemCourse({courseKey, onAdd, onDelete}: { courseKey: CourseKey, onAdd?: (courseKey: CourseKey) => void, onDelete?: (courseKey: CourseKey) => void }) {
    const thisCourse: Course = typeof courseKey === "string" ? data.find(d => d.identifier === courseKey) : courseKey;

    return (
        <CourseShell thisCourse={thisCourse}>
            <button className="ml-auto pl-2 flex-shrink-0 opacity-50 hover:opacity-100" onClick={() => (onAdd || onDelete)(courseKey)}>
                {onAdd ? <FiPlus/> : <FiX/>}
            </button>
        </CourseShell>
    )
}