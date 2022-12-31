import {Course} from "../pages";
import data from "../data_5scheduler.json";

export default function SemClass({course}: { course: Course }) {
    const thisCourse = data.find(d => d.identifier === course);

    return (
        <div className="px-2 py-1 mt-3 leading-[1.15] text-sm" style={{backgroundColor: "#8ae8e9"}}>
            <p className="font-bold">{thisCourse.identifier}</p>
            <p className="truncate">{thisCourse.title}</p>
        </div>
    )
}