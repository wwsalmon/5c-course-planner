import {Dispatch, SetStateAction, Fragment, useState} from "react";
import majors from "../majors.json";
import {FiX} from "react-icons/fi";
import MajorReq from "./MajorReq";
import {SemState} from "../pages";

export interface Major {
    name: string,
    websites: string[],
    reqs: (ReqSet | Req)[],
}

export interface ReqSet {
    overallName: string,
    options: Req[],
}

export interface Req {
    name: string,
    number: number,
    options: string[],
}

export default function Major({name, setSelectedMajors, appState}: {name: string, setSelectedMajors: Dispatch<SetStateAction<string[]>>, appState: SemState[]}) {
    const thisMajor: Major = majors.find(d => d.name === name);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="p-2 bg-white my-4">
            <div className="flex items-center">
                <p>{thisMajor.name}</p>
                <button className="ml-auto" onClick={() => setSelectedMajors(prev => prev.filter(d => d !== name))}><FiX/></button>
            </div>
            {thisMajor.reqs.map(d => (
                <Fragment key={"name" in d ? d.name : d.overallName}>
                    {"name" in d ? (
                        <MajorReq thisReq={d} appState={appState}/>
                    ) : (
                        <p>bs</p>
                    )}
                </Fragment>
            ))}
        </div>
    )
}