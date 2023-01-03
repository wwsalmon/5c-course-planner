import {Major, Req} from "./Major";
import {useState} from "react";
import MajorCourse from "./MajorCourse";
import {SemState} from "../pages";

export default function MajorReq({thisReq, appState}: {thisReq: Req, appState: SemState[]}) {
    const [isOpen, setIsOpen] = useState<boolean>(thisReq.options.length < 4);

    return (
        <>
            <p>{thisReq.name}</p>
            {thisReq.options.map(d => (
                <MajorCourse courseKey={d} key={d} appState={appState}/>
            ))}
        </>
    )
}