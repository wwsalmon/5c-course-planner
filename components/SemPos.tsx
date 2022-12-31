import {Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";
import {Course, SemState} from "../pages";
import SemClass from "./SemClass";
import {FiX} from "react-icons/fi";
import MyModal from "./MyModal";
import data from "../data_5scheduler.json";
import fuzzysort from "fuzzysort";

export default function SemPos({semState, setAppState}: {semState: SemState, setAppState: Dispatch<SetStateAction<SemState[]>>}) {
    function onRemove() {
        setAppState(prev => prev.filter(d => d.id !== semState.id));
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <div className="flex items-center">
                <UpperH className="opacity-50">{semState.title}</UpperH>
                <button className="ml-auto opacity-50 hover:opacity-100" onClick={onRemove}><FiX/></button>
            </div>
            {semState.courses.map((d, i) => (
                <SemClass course={d} setAppState={setAppState} semId={semState.id}/>
            ))}
            <BigButton className="px-2 py-1 text-sm mt-3" onClick={() => setModalOpen(true)}>
                <span>+ Add course</span>
            </BigButton>
            <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
                <UpperH className="mb-4">Add course</UpperH>
                <input type="text" placeholder="Search for course" className="px-2 py-1 border border-gray-400 w-full text-sm"
                       value={search} onChange={e => setSearch(e.target.value)}/>
                {fuzzysort.go(search, data.filter(d => !semState.courses.includes(d.identifier)), {keys: ["title", "identifier"], limit: 10}).map(d => (
                    <SemClass course={d.obj.identifier} key={d.obj.identifier} setAppState={setAppState} callback={() => {
                        setModalOpen(false);
                        setSearch("");
                    }} isSearch={true} semId={semState.id}/>
                ))}
            </MyModal>
        </div>
    )
}