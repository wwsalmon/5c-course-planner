import {Dispatch, SetStateAction, useState} from "react";
import UpperH from "./UpperH";
import classNames from "classnames";
import Input from "./Input";
import SemCourse, {colors} from "./SemCourse";
import fuzzysort from "fuzzysort";
import data from "../data_5scheduler.json";
import MyModal from "./MyModal";
import {CourseKey} from "../pages";

export default function AddCourseModal({isOpen, setIsOpen, onAddCustom, onAdd, existingList, onAddRegex}: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, onAdd: (courseKey: string) => void, onAddCustom: (title: string, id: string, source: string) => void, existingList: CourseKey[], onAddRegex: (regex: string) => void}) {
    const [search, setSearch] = useState<string>("");
    const [tab, setTab] = useState<string>("Catalog");
    const [title, setTitle] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [source, setSource] = useState<string>("");
    const [regex, setRegex] = useState<string>("");

    const canAddCustom = id && title && source;

    let tabs = ["Catalog", "Custom"];
    if (onAddRegex) tabs.push("Regex");

    return (
        <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <UpperH className="mb-4">Add course</UpperH>
            <div className="flex items-center text-sm mb-4">
                {tabs.map(d => (
                    <button className={classNames("w-1/2 pb-1", (tab === d) && "font-bold border-b border-black")} onClick={() => setTab(d)} key={d}>{d}</button>
                ))}
            </div>
            {{
                Catalog: (
                    <>
                        <Input placeholder="Search by name or code" value={search} onChange={e => setSearch(e.target.value)}/>
                        {fuzzysort.go(search, data.filter(d => !existingList.includes(d.identifier)), {keys: ["title", "identifier"], limit: 10}).map(d => (
                            <SemCourse courseKey={d.obj.identifier} key={d.obj.identifier} onAdd={(courseKey: string) => {
                                onAdd(courseKey);
                                setSearch("");
                            }}/>
                        ))}
                    </>
                ),
                Custom: (
                    <>
                        <Input placeholder="Course ID" value={id} onChange={e => setId(e.target.value)}/>
                        <Input placeholder="Course name" value={title} onChange={e => setTitle(e.target.value)}/>
                        <div className="flex items-center mb-4">
                            <label className="text-xs opacity-75 mr-4">School</label>
                            {Object.entries(colors).map(d => (
                                <button className={classNames("w-6 h-6 mr-2 text-white text-xs transition", d[0] === source ? "transform scale-110" : "opacity-50 hover:opacity-80")} style={{backgroundColor: d[1]}} key={d[0]} onClick={() => setSource(d[0])}>
                                    {d[0].substring(0,2)}
                                </button>
                            ))}
                        </div>
                        <button disabled={!canAddCustom} className={classNames("w-full py-1 text-sm disabled:opacity-50 bg-[#222] text-white", canAddCustom && "hover:bg-black")} onClick={() => {
                            onAddCustom(title, id, source);
                            setTitle("");
                            setId("");
                            setSource("");
                        }}>Add course</button>
                    </>
                ),
                Regex: (
                    <>
                        <Input placeholder="Regex string" value={regex} onChange={e => setRegex(e.target.value)}/>
                        <button disabled={!regex} className={classNames("w-full py-1 text-sm disabled:opacity-50 bg-[#222] text-white", regex && "hover:bg-black")} onClick={() => {
                            onAddRegex(regex);
                            setRegex("");
                        }}>Add regex</button>
                    </>
                )
            }[tab]}
        </MyModal>
    )
}