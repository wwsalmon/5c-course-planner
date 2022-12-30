import {Dispatch, ReactNode, SetStateAction} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";
import {SemState} from "../pages";
import SemClass from "./SemClass";
import {FiX} from "react-icons/fi";

export default function SemPos({semState, setAppState}: {semState: SemState, setAppState: Dispatch<SetStateAction<SemState[]>>}) {
    function onRemove() {
        setAppState(prev => prev.filter(d => d.id !== semState.id));
    }

    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <div className="flex items-center">
                <UpperH className="opacity-50">{semState.title}</UpperH>
                <button className="ml-auto opacity-50 hover:opacity-100" onClick={onRemove}><FiX/></button>
            </div>
            {semState.classes.map((d, i) => (
                <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#0026ff"/>
            ))}
            <BigButton className="px-2 py-1 text-sm mt-3">
                <span>+ Add course</span>
            </BigButton>
        </div>
    )
}