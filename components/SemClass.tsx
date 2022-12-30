import {Course} from "../pages";

export default function SemClass({course}: { course: Course }) {
    return (
        <div className="px-2 py-1 mt-3 leading-[1.15] text-sm" style={{backgroundColor: "#8ae8e9"}}>
            <p className="font-bold">MS 148 PO</p>
            <p className="truncate">Powers of Pleasure</p>
        </div>
    )
}