import {colors, Course} from "./SemCourse";
import {ReactNode, useEffect, useState} from "react";
import {FiPlus, FiX} from "react-icons/fi";
import CourseInner from "./CourseInner";
import classNames from "classnames";

export default function CourseShell({thisCourse, children, className}: {thisCourse: Course, children: ReactNode, className?: string}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        function onClose() {
            setIsOpen(false);
        }

        window.addEventListener("classOpened", onClose);

        return () => window.removeEventListener("classOpened", onClose);
    }, []);

    return (
        <div className={classNames("pl-2 pr-1 py-1 mt-3 text-sm", className)} style={{backgroundColor: (thisCourse.source in colors ? colors[thisCourse.source] : "#222222") + "70"}}>
            <div className="flex cursor-pointer leading-[1.15]" onClick={() => {
                if (!isOpen) window.dispatchEvent(new Event("classOpened"));
                setIsOpen(prev => !prev);
            }}>
                <div className="w-full flex-shrink min-w-0">
                    <p className="font-bold opacity-75">{thisCourse.identifier}</p>
                    {!isOpen && (
                        <p className="truncate opacity-75">{thisCourse.title}</p>
                    )}
                </div>
                {children}
            </div>
            {isOpen && <CourseInner thisCourse={thisCourse}/>}
        </div>
    )
}