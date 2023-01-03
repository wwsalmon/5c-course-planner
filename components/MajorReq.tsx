import {Req} from "./Major";
import {useState} from "react";
import MajorCourse from "./MajorCourse";
import {CourseKey, SemState} from "../pages";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {Course} from "./SemCourse";
import {getAllCourses} from "./MajorReqSet";
import classNames from "classnames";

export default function MajorReq({thisReq, appState, isSub}: {thisReq: Req, appState: SemState[], isSub?: boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(thisReq.options.length < 4);

    const allCourses: CourseKey[] = getAllCourses(appState);

    const numCompleted = allCourses.filter(d => (typeof d === "string" ? d : d.title).match(thisReq.options.join("|"))).length;

    const isComplete = numCompleted >= thisReq.number;

    return (
        <>
            <button className="flex items-center w-full text-left my-6" disabled={isSub} onClick={() => setIsOpen(prev => !prev)}>
                <div>
                    <p className={classNames("text-sm font-bold", !isSub && "uppercase")}>{thisReq.name}</p>
                    <p className="text-sm opacity-50">{numCompleted}/{thisReq.number} completed {isComplete ? "✅" : `| ${thisReq.options.length} options`}</p>
                </div>
                {!isSub && (
                    <span className="flex-shrink-0 ml-auto pl-2">
                        {isOpen ? <FiChevronUp/> : <FiChevronDown/>}
                    </span>
                )}
            </button>
            {(isOpen || isSub) && (
                <>
                    {thisReq.options.map(d => (
                        <MajorCourse courseKey={d} key={d} appState={appState}/>
                    ))}
                </>
            )}
        </>
    )
}