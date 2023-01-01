import {Dispatch, ReactNode, SetStateAction} from "react";
import BigButton from "./BigButton";
import UpperH from "./UpperH";
import classNames from "classnames";
import {decodeSemester, SemState} from "../pages";
import short from "short-uuid";
import SemPos from "./SemPos";
import {FiX} from "react-icons/fi";

export default function SemCol({children, sem, dark, appState, setAppState, sems, setSems}: {children?: ReactNode, sem: number, dark?: boolean, appState: SemState[], setAppState: Dispatch<SetStateAction<SemState[]>>, sems: number[], setSems: Dispatch<SetStateAction<number[]>>}) {
    function addPos() {
        // @ts-ignore
        window.umami && window.umami("Add possibility");
        setAppState(prev => [...prev, {title: "Untitled", sem, id: short.generate(), courses: []}]);
    }

    return (
        <div className={classNames("w-72 px-4 border-r overflow-y-auto py-6 flex-shrink-0 min-h-screen", dark ? "border-gray-500" : "border-gray-300", dark && "bg-[#222]")}>
            <div className="flex items-center mt-8 mb-8">
                <h2 className={classNames("text-3xl font-light opacity-50", dark && "text-white")}>{decodeSemester(sem)}</h2>
                {[sems[0], sems[sems.length - 1]].includes(sem) && (
                    <button className={classNames("ml-auto opacity-50 hover:opacity-100 text-gray-500")} onClick={() => {
                        setSems(prev => prev.filter(d => d !== sem));
                        // @ts-ignore
                        window.umami && window.umami("Remove semester");
                    }}><FiX/></button>
                )}
            </div>
            {appState.filter(d => d.sem === sem).map(d => (
                <SemPos semState={d} key={d.id} setAppState={setAppState}/>
            ))}
            {children}
            <BigButton className="p-4 mt-6" onClick={addPos}>
                <UpperH>+ Add possibility</UpperH>
            </BigButton>
        </div>
    )
}