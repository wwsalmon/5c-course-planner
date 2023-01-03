import {Dispatch, SetStateAction, useState} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";
import {CourseKey, SemState} from "../pages";
import SemCourse from "./SemCourse";
import {FiX} from "react-icons/fi";
import AddCourseModal from "./AddCourseModal";

export default function SemPos({semState, setAppState}: {semState: SemState, setAppState: Dispatch<SetStateAction<SemState[]>>}) {
    function onRemove() {
        // @ts-ignore
        window.umami && window.umami("Remove possibility");
        setAppState(prev => prev.filter(d => d.id !== semState.id));
    }

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function onAddCustom(title: string, id: string, source: string) {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semState.id);
            newAppState[thisIndex].courses.push({title, identifier: id, source, custom: true});
            return newAppState;
        });
        // @ts-ignore
        window.umami && window.umami("Add custom course");

        setModalOpen(false);
    }

    function onAdd(courseKey: CourseKey) {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semState.id);
            newAppState[thisIndex].courses.push(courseKey);
            return newAppState;
        });
        setModalOpen(false);

        // @ts-ignore
        window.umami && window.umami("Add catalog course");
    }

    function onDelete(courseKey: CourseKey) {
        setAppState(prev => {
            let newAppState = [...prev];
            const thisIndex = newAppState.findIndex(d => d.id === semState.id);
            newAppState[thisIndex].courses = newAppState[thisIndex].courses.filter(d => d !== courseKey);
            return newAppState;
        });

        // @ts-ignore
        window.umami && window.umami("Remove course");
    }

    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <div className="flex items-center">
                <UpperH className="opacity-50">
                    <input type="text" className="uppercase" value={semState.title} onChange={e => {
                        setAppState(prev => {
                            let newAppState = [...prev];
                            const thisIndex = newAppState.findIndex(d => d.id === semState.id);
                            newAppState[thisIndex].title = e.target.value;
                            return newAppState;
                        });
                    }}/>
                </UpperH>
                <button className="ml-auto opacity-50 hover:opacity-100" onClick={onRemove}><FiX/></button>
            </div>
            {semState.courses.map((d, i) => (
                <SemCourse courseKey={d} onDelete={onDelete} key={typeof d === "string" ? d : d.identifier}/>
            ))}
            <BigButton className="px-2 py-1 text-sm mt-3" onClick={() => {
                setModalOpen(true);
                // @ts-ignore
                window.umami && window.umami("Open add course modal");
            }}>
                <span>+ Add course</span>
            </BigButton>
            <AddCourseModal isOpen={modalOpen} setIsOpen={setModalOpen} onAdd={onAdd} onAddCustom={onAddCustom}
                            existingList={semState.courses}/>
        </div>
    )
}