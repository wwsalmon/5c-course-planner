import {CourseKey, SemState} from "../pages";
import {ReqSet} from "./Major";
import classNames from "classnames";
import MajorReq from "./MajorReq";
import {useState} from "react";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";

export function getAllCourses(appState: SemState[]): CourseKey[] {
    return Array.from(new Set(appState.reduce((a, b) => [...a, ...b.courses], [])));
}

export default function MajorReqSet({thisReqSet, appState}: { thisReqSet: ReqSet, appState: SemState[] }) {
    const allCourses: CourseKey[] = getAllCourses(appState);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const isComplete = thisReqSet.options.some(thisReq => allCourses.filter(d => (typeof d === "string" ? d : d.title).match(thisReq.options.join("|"))).length >= thisReq.number);

    return (
        <>
            <button className="flex items-center text-left w-full my-6" onClick={() => setIsOpen(prev => !prev)}>
                <div>
                    <p className={classNames("text-sm font-bold uppercase")}>{thisReqSet.overallName}</p>
                    <p className="text-sm opacity-50">{isComplete ? "Complete ✅" : `${thisReqSet.options.length} tracks`}</p>
                </div>
                <span className="flex-shrink-0 ml-auto pl-2">
                        {isOpen ? <FiChevronUp/> : <FiChevronDown/>}
                </span>
            </button>
            {isOpen && (
                <>
                    {thisReqSet.options.map(d => (
                        <MajorReq thisReq={d} appState={appState} isSub={true}/>
                    ))}
                </>
            )}
        </>
    )
}