import {Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";
import {Course, SemState} from "../pages";
import SemClass, {colors} from "./SemClass";
import {FiX} from "react-icons/fi";
import MyModal from "./MyModal";
import data from "../data_5scheduler.json";
import fuzzysort from "fuzzysort";
import classNames from "classnames";

export default function SemPos({semState, setAppState}: {semState: SemState, setAppState: Dispatch<SetStateAction<SemState[]>>}) {
    function onRemove() {
        setAppState(prev => prev.filter(d => d.id !== semState.id));
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [isCustom, setIsCustom] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [source, setSource] = useState<string>("");

    const canAddCustom = id && title && source;

    function onAdd() {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semState.id);
            newAppState[thisIndex].courses.push({title, identifier: id, source, custom: true});
            return newAppState;
        });

        setModalOpen(false);
        setTitle("");
        setId("");
        setSource("");
    }

    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <div className="flex items-center">
                <UpperH className="opacity-50">{semState.title}</UpperH>
                <button className="ml-auto opacity-50 hover:opacity-100" onClick={onRemove}><FiX/></button>
            </div>
            {semState.courses.map((d, i) => (
                <SemClass course={d} setAppState={setAppState} semId={semState.id} key={typeof d === "string" ? d : d.identifier}/>
            ))}
            <BigButton className="px-2 py-1 text-sm mt-3" onClick={() => setModalOpen(true)}>
                <span>+ Add course</span>
            </BigButton>
            <MyModal isOpen={modalOpen} setIsOpen={setModalOpen}>
                <UpperH className="mb-4">Add course</UpperH>
                <div className="flex items-center text-sm mb-4">
                    <button className={classNames("w-1/2 pb-1", !isCustom && "font-bold border-b border-black")} onClick={() => setIsCustom(false)}>Catalog</button>
                    <button className={classNames("w-1/2 pb-1", isCustom && "font-bold border-b border-black")} onClick={() => setIsCustom(true)}>Custom</button>
                </div>
                {isCustom ? (
                    <>
                        <input type="text" placeholder="Course ID" className="px-2 py-1 border border-gray-400 w-full text-sm mb-2" value={id} onChange={e => setId(e.target.value)}/>
                        <input type="text" placeholder="Course name" className="px-2 py-1 border border-gray-400 w-full text-sm mb-2" value={title} onChange={e => setTitle(e.target.value)}/>
                        <div className="flex items-center mb-4">
                            <label className="text-xs opacity-75 mr-4">School</label>
                            {Object.entries(colors).map(d => (
                                <button className={classNames("w-6 h-6 mr-2 text-white text-xs transition", d[0] === source ? "transform scale-110" : "opacity-50 hover:opacity-80")} style={{backgroundColor: d[1]}} key={d[0]} onClick={() => setSource(d[0])}>
                                    {d[0].substring(0,2)}
                                </button>
                            ))}
                        </div>
                        <button disabled={!canAddCustom} className={classNames("w-full py-1 text-sm disabled:opacity-50 bg-[#222] text-white", canAddCustom && "hover:bg-black")} onClick={onAdd}>Add course</button>
                    </>
                ) : (
                    <>
                        <input type="text" placeholder="Search by name or code" className="px-2 py-1 border border-gray-400 w-full text-sm"
                               value={search} onChange={e => setSearch(e.target.value)}/>
                        {fuzzysort.go(search, data.filter(d => !semState.courses.includes(d.identifier)), {keys: ["title", "identifier"], limit: 10}).map(d => (
                            <SemClass course={d.obj.identifier} key={d.obj.identifier} setAppState={setAppState} callback={() => {
                                setModalOpen(false);
                                setSearch("");
                            }} isSearch={true} semId={semState.id}/>
                        ))}
                    </>
                )}
            </MyModal>
        </div>
    )
}