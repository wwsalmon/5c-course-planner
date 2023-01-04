import BigButton from "./BigButton";
import UpperH from "./UpperH";
import classNames from "classnames";
import MyModal from "./MyModal";
import {Dispatch, SetStateAction, useState} from "react";
import Input from "./Input";
import majors from "../majors.json";
import fuzzysort from "fuzzysort";
import {FiPlus} from "react-icons/fi";
import Major from "./Major";
import {SemState} from "../pages";

export default function Sidebar({isOpen, appState, selectedMajors, setSelectedMajors}: {isOpen: boolean, appState: SemState[], selectedMajors: string[], setSelectedMajors: Dispatch<SetStateAction<string[]>>}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [majorSearch, setMajorSearch] = useState<string>("");

    return (
        <>
            {isOpen && (
                <div className="sm:hidden fixed w-full h-full left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.8)]"/>
            )}
            <div className={classNames("w-80 border-box flex-shrink-0 border-l border-gray-400 bg-[#222] pt-14 px-4 fixed h-screen shadow-xl md:shadow-none md:static transition-all overflow-y-auto", isOpen ? "right-0" : "-right-80 md:-mr-80")}>
                <BigButton className="p-4" onClick={() => setIsModalOpen(true)}>
                    <UpperH>+ Add major or minor</UpperH>
                </BigButton>
                <p className="text-white mt-6 mb-4 text-sm opacity-75">Note: this part is WIP! I'm working on plugging in Pomona majors</p>
                <p className="text-white opacity-75 text-sm">The requirements and courses that satisfy them listed here are not guaranteed to be complete or accurate. Always double-check with official requirements when making decisions.</p>
                {selectedMajors.map(d => (
                    <Major name={d} setSelectedMajors={setSelectedMajors} appState={appState}/>
                ))}
                <MyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                    <Input value={majorSearch} onChange={e => setMajorSearch(e.target.value)} placeholder="Search for major or minor"/>
                    {fuzzysort.go(majorSearch, majors.filter(d => !selectedMajors.includes(d.name)), {key: "name"}).map(({obj: d}) => (
                        <button key={d.name} onClick={() => {
                            setSelectedMajors(prev => [...prev, d.name]);
                            setIsModalOpen(false);
                        }} className="py-1 px-2 block w-full bg-gray-300 text-sm flex items-center my-2">
                            {d.name}
                            <span className="ml-auto">
                                <FiPlus/>
                            </span>
                        </button>
                    ))}
                </MyModal>
            </div>
        </>
    )
}