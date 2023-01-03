import BigButton from "./BigButton";
import UpperH from "./UpperH";
import classNames from "classnames";
import MyModal from "./MyModal";
import {useEffect, useRef, useState} from "react";
import Input from "./Input";
import majors from "../majors.json";
import fuzzysort from "fuzzysort";
import {FiPlus} from "react-icons/fi";
import Major from "./Major";
import {SemState} from "../pages";

export default function Sidebar({isOpen, appState}: {isOpen: boolean, appState: SemState[]}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [majorSearch, setMajorSearch] = useState<string>("");
    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
    const loaded = useRef<boolean>(false);

    useEffect(() => {
        const localSelectedMajors = window.localStorage.getItem("5c-course-planner-selectedmajors");
        setSelectedMajors(JSON.parse(localSelectedMajors) || []);
        loaded.current = true;
    }, []);

    useEffect(() => {
        if (loaded.current) window.localStorage.setItem("5c-course-planner-selectedmajors", JSON.stringify(selectedMajors));
    }, [selectedMajors]);

    return (
        <>
            {isOpen && (
                <div className="sm:hidden fixed w-full h-full left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.8)]"/>
            )}
            <div className={classNames("w-72 flex-shrink-0 border-l border-gray-400 bg-[#222] pt-12 px-2 fixed h-screen shadow-xl md:shadow-none md:static transition-all overflow-y-auto", isOpen ? "right-0" : "-right-72 md:-mr-72")}>
                <BigButton className="p-4" onClick={() => setIsModalOpen(true)}>
                    <UpperH>+ Add major or minor</UpperH>
                </BigButton>
                {selectedMajors.map(d => (
                    <Major name={d} setSelectedMajors={setSelectedMajors} appState={appState}/>
                ))}
                <MyModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                    <Input value={majorSearch} onChange={e => setMajorSearch(e.target.value)} placeholder="Search for major or minor"/>
                    {fuzzysort.go(majorSearch, majors.filter(d => !selectedMajors.includes(d.name)), {key: "name"}).map(({obj: d}) => (
                        <button key={d.name} onClick={() => {
                            setSelectedMajors(prev => [...prev, d.name]);
                            setIsModalOpen(false);
                        }} className="py-1 px-2 block w-full bg-gray-300 text-sm flex items-center">
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