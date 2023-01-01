import {Course, SemState} from "../pages";
import data from "../data_5scheduler.json";
import {FiPlus, FiX} from "react-icons/fi";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";

export const colors = {
    Pomona: "#00549A",
    Pitzer: "#F4921C",
    HarveyMudd: "#333333",
    Scripps: "#33735B",
    ClaremontMckenna: "#98012E",
}

export default function SemClass({course, setAppState, callback, isSearch, semId}: { course: Course, setAppState: Dispatch<SetStateAction<SemState[]>>, semId: string, callback?: () => void, isSearch?: boolean }) {
    const thisCourse = typeof course === "string" ? data.find(d => d.identifier === course) : course;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const firedEvent = useRef<boolean>(false);

    function onAdd() {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semId);
            newAppState[thisIndex].courses.push(course);
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
            newAppState[thisIndex].courses = newAppState[thisIndex].courses.filter(d => d !== course);
            return newAppState;
        });

        // @ts-ignore
        window.umami && window.umami("Remove course");
    }

    useEffect(() => {
         function onClose() {
            setIsOpen(false);
         }

         window.addEventListener("classOpened", onClose);

         return () => window.removeEventListener("classOpened", onClose);
    }, []);

    return (
        <div className="pl-2 pr-1 py-1 mt-3 text-sm" style={{backgroundColor: (thisCourse.source in colors ? colors[thisCourse.source] : "#222222") + "70"}}>
            <div className="flex cursor-pointer leading-[1.15]" onClick={() => {
                if (!isOpen) window.dispatchEvent(new Event("classOpened"));
                setIsOpen(prev => !prev);
            }}>
                <div className="w-full flex-shrink min-w-0">
                    <p className="font-bold opacity-75">{thisCourse.identifier}</p>
                    <p className="truncate opacity-75">{thisCourse.title}</p>
                </div>
                <button className="ml-auto pl-2 flex-shrink-0 opacity-50 hover:opacity-100" onClick={isSearch ? onAdd : onDelete}>
                    {isSearch ? <FiPlus/> : <FiX/>}
                </button>
            </div>
            {isOpen && (
                <div className="my-2">
                    {"custom" in thisCourse ? (
                        <p>Custom course added by user</p>
                    ) : (
                        <>
                            {!!thisCourse.instructors.length && (
                                <p className="mb-2 opacity-75">{thisCourse.instructors.join(", ")}</p>
                            )}
                            <p className="">{thisCourse.description || "No description in catalog"} {thisCourse.prerequisites && `Prerequisites: ${thisCourse.prerequisites}.`} {thisCourse.corequisites && `Corequisites: ${thisCourse.corequisites}`}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}