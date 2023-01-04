import Input from "./Input";
import AddCourseModal from "./AddCourseModal";
import RegexMatch from "./RegexMatch";
import SemCourse from "./SemCourse";
import {useState} from "react";
import {Req} from "./Major";
import {AdminButton} from "../pages/edit-major";

export default function EditReq({req, setReq, onDelete}: {req: Req, setReq: (operation: (prev: Req) => Req) => void, onDelete: () => void}) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div className="p-4 bg-white my-4 border shadow-md">
            <label className="font-medium mb-2 text-sm block">Requirement name</label>
            <Input value={req.name} onChange={e => setReq(newReq => {
                newReq.name = e.target.value;
                return newReq;
            })} placeholder="ex. Introductory sequence"/>
            <label className="font-medium mb-2 text-sm block">Number of courses required</label>
            <Input type="number" value={req.number} onChange={e => setReq(newReq => {
                newReq.number = +e.target.value;
                return newReq;
            })}/>
            <label className="font-medium mb-2 text-sm block">Courses that satisfy this requirement</label>
            <AddCourseModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onAdd={courseKey => {
                setReq(newReq => {
                    newReq.options.push(courseKey);
                    return newReq;
                });
                setIsModalOpen(false);
            }} onAddCustom={(title, id, source) => {
                setReq(newReq => {
                    newReq.options.push({title, identifier: id, source, custom: true});
                    return newReq;
                });
                setIsModalOpen(false);
            }} existingList={req.options} onAddRegex={(regex) => setReq(newReq => {
                newReq.options.push(regex);
                return newReq;
            })}/>
            {req.options.map(x => (typeof x === "string" && x.substring(0, 1) === "^") ? (
                <RegexMatch regexString={x} onRemove={(regexString) => {
                    setReq(newReq => {
                        newReq.options = newReq.options.filter(option => option !== regexString);
                        return newReq;
                    });
                    setIsModalOpen(false);
                }}/>
            ) : (
                <SemCourse courseKey={x} onDelete={(courseKey) => {
                    setReq(newReq => {
                        newReq.options = newReq.options.filter(y => (typeof y === "string" ? y : y.identifier) !== (typeof courseKey === "string" ? courseKey : courseKey.identifier));
                        return newReq;
                    });
                    setIsModalOpen(false);
                }}/>
            ))}
            <AdminButton onClick={() => setIsModalOpen(true)}>+ Add course</AdminButton>
            <hr className="my-4"/>
            <AdminButton onClick={onDelete} className="text-red-500 border-red-500">Delete requirement</AdminButton>
        </div>
    )
}