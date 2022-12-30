import {Dispatch, ReactNode, SetStateAction} from "react";
import BigButton from "./BigButton";
import UpperH from "./UpperH";
import classNames from "classnames";
import {decodeSemester, SemState} from "../pages";
import short from "short-uuid";
import SemPos from "./SemPos";

export default function SemCol({children, sem, dark, appState, setAppState}: {children?: ReactNode, sem: number, dark?: boolean, appState: SemState[], setAppState: Dispatch<SetStateAction<SemState[]>>}) {
    function addPos() {
        setAppState(prev => [...prev, {title: "Untitled", sem, id: short.generate(), classes: []}]);
    }

    return (
        <div className={classNames("w-72 px-4 border-r overflow-y-auto py-6 flex-shrink-0", dark ? "border-gray-500" : "border-gray-300", dark && "bg-[#222]")}>
            <h2 className={classNames("mb-8 text-4xl font-light opacity-50", dark && "text-white")}>{decodeSemester(sem)}</h2>
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