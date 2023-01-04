import {FiX} from "react-icons/fi";
import data from "../data_5scheduler.json";
import SemCourse from "./SemCourse";
import {useState} from "react";

export default function RegexMatch({regexString, onRemove}: {regexString: string, onRemove: (regexString: string) => void}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const matchingCourses = data.filter(course => course.identifier.match(regexString));

    return (
        <div className="p-2 border bg-[#222]" key={regexString}>
            <div className="flex items-center text-white cursor-pointer" onClick={() => setIsOpen(prev => !prev)}>
                <p className="text-sm font-medium">Regex rule: <code>{regexString}</code> | {matchingCourses.length} matches</p>
                <button className="ml-auto opacity-50 hover:opacity-100" onClick={() => onRemove(regexString)}><FiX/></button>
            </div>
            {isOpen && matchingCourses.map(course => (
                <SemCourse courseKey={course.identifier} className="text-white"/>
            ))}
        </div>
    )
}