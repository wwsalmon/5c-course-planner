import {Req} from "./Major";
import {useState} from "react";
import MajorCourse from "./MajorCourse";
import {CourseKey, SemState} from "../pages";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {Course} from "./SemCourse";

export default function MajorReq({thisReq, appState}: {thisReq: Req, appState: SemState[]}) {
    const [isOpen, setIsOpen] = useState<boolean>(thisReq.options.length < 4);

    const allCourses: CourseKey[] = Array.from(new Set(appState.reduce((a, b) => [...a, ...b.courses],[])));

    const numCompleted = allCourses.filter(d => (typeof d === "string" ? d : d.title).match(thisReq.options.join("|"))).length;

    const isComplete = numCompleted >= thisReq.number;

    return (
        <>
            <button className="flex items-center w-full text-left my-6" onClick={() => setIsOpen(prev => !prev)}>
                <div>
                    <p className="text-sm font-bold uppercase">{thisReq.name}</p>
                    <p className="text-sm opacity-50">{numCompleted}/{thisReq.number} completed {isComplete ? "✅" : `| ${thisReq.options.length} options`}</p>
                </div>
                <span className="flex-shrink-0 ml-2">
                    {isOpen ? <FiChevronUp/> : <FiChevronDown/>}
                </span>
            </button>
            {isOpen && (
                <>
                    {thisReq.options.map(d => (
                        <MajorCourse courseKey={d} key={d} appState={appState}/>
                    ))}
                </>
            )}
        </>
    )
}