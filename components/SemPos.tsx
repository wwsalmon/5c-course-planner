import {ReactNode} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";
import {SemState} from "../pages";
import SemClass from "./SemClass";

export default function SemPos({semState}: {semState: SemState}) {
    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <UpperH className="opacity-50">{semState.title}</UpperH>
            {semState.classes.map((d, i) => (
                <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#0026ff"/>
            ))}
            <BigButton className="px-2 py-1 text-sm mt-3">
                <span>+ Add course</span>
            </BigButton>
        </div>
    )
}