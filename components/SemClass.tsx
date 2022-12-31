import {Course} from "../pages";
import data from "../data_5scheduler.json";

const colors = {
    Pomona: "#00549A",
    Pitzer: "#F4921C",
    HarveyMudd: "#333333",
    Scripps: "#33735B",
    ClaremontMckenna: "#98012E",
}

export default function SemClass({course}: { course: Course }) {
    const thisCourse = data.find(d => d.identifier === course);

    return (
        <div className="px-2 py-1 mt-3 leading-[1.15] text-sm" style={{backgroundColor: (thisCourse.source in colors ? colors[thisCourse.source] : "#222222") + "70"}}>
            <p className="font-bold opacity-75">{thisCourse.identifier}</p>
            <p className="truncate opacity-75">{thisCourse.title}</p>
        </div>
    )
}