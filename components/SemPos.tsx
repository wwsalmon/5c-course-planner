import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";
import {Course, SemState} from "../pages";
import SemClass from "./SemClass";
import {FiX} from "react-icons/fi";

export default function SemPos({semState, setAppState}: {semState: SemState, setAppState: Dispatch<SetStateAction<SemState[]>>}) {
    function onRemove() {
        setAppState(prev => prev.filter(d => d.id !== semState.id));
    }

    const [courses, setCourses] = useState<Course[]>([]);

    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <div className="flex items-center">
                <UpperH className="opacity-50">{semState.title}</UpperH>
                <button className="ml-auto opacity-50 hover:opacity-100" onClick={onRemove}><FiX/></button>
            </div>
            {semState.courses.map((d, i) => (
                <SemClass course={d}/>
            ))}
            <BigButton className="px-2 py-1 text-sm mt-3">
                <span>+ Add course</span>
            </BigButton>
        </div>
    )
}