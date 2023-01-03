import {Req} from "./Major";
import {Fragment, useState} from "react";
import MajorCourse from "./MajorCourse";
import {CourseKey, SemState} from "../pages";
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {getAllCourses} from "./MajorReqSet";
import classNames from "classnames";
import data from "../data_5scheduler.json";

export default function MajorReq({thisReq, appState, isSub}: {thisReq: Req, appState: SemState[], isSub?: boolean}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const allCourses: CourseKey[] = getAllCourses(appState);

    const numCompleted = allCourses.filter(d => (typeof d === "string" ? d : d.title).match(thisReq.options.join("|"))).length;

    const isComplete = numCompleted >= thisReq.number;

    return (
        <>
            <button className="flex items-center w-full text-left my-6" disabled={isSub} onClick={() => setIsOpen(prev => !prev)}>
                <div>
                    <p className={classNames("text-sm font-bold", !isSub && "uppercase")}>{thisReq.name}</p>
                    <p className="text-sm opacity-50">{numCompleted}/{thisReq.number} completed {isComplete ? "✅" : `| ${thisReq.options.reduce((a, b) => a + (b.substring(0, 1) === "^" ? data.filter(x => x.identifier.match(b)).length : 1), 0)} options`}</p>
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
                        <Fragment key={d}>
                            {d.substring(0,1) === "^" ? data.filter(x => x.identifier.match(d)).map(course => (
                                <MajorCourse courseKey={course.identifier} appState={appState}/>
                            )) : (
                                <MajorCourse courseKey={d} appState={appState}/>
                            )}
                        </Fragment>
                    ))}
                </>
            )}
        </>
    )
}