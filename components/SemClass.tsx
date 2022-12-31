import {Course} from "../pages";
import data from "../data_5scheduler.json";
import {FiPlus, FiX} from "react-icons/fi";
import {Dispatch, SetStateAction} from "react";

const colors = {
    Pomona: "#00549A",
    Pitzer: "#F4921C",
    HarveyMudd: "#333333",
    Scripps: "#33735B",
    ClaremontMckenna: "#98012E",
}

export default function SemClass({course, setCourses, callback, isSearch}: { course: Course, setCourses: Dispatch<SetStateAction<Course[]>>, callback?: () => void, isSearch?: boolean }) {
    const thisCourse = data.find(d => d.identifier === course);

    function onAdd() {
        setCourses(prev => [...prev, course]);
        if (callback) callback();
    }

    function onDelete() {
        setCourses(prev => prev.filter(d => d !== course));
    }

    return (
        <div className="pl-2 pr-1 py-1 mt-3 leading-[1.15] text-sm flex" style={{backgroundColor: (thisCourse.source in colors ? colors[thisCourse.source] : "#222222") + "70"}}>
            <div className="w-full flex-shrink min-w-0">
                <p className="font-bold opacity-75">{thisCourse.identifier}</p>
                <p className="truncate opacity-75">{thisCourse.title}</p>
            </div>
            <button className="ml-auto pl-2 flex-shrink-0 opacity-50 hover:opacity-100" onClick={isSearch ? onAdd : onDelete}>
                {isSearch ? <FiPlus/> : <FiX/>}
            </button>
        </div>
    )
}