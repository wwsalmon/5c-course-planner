import Input from "../components/Input";
import {ComponentProps, useState} from "react";
import BigButton from "../components/BigButton";
import {FiX} from "react-icons/fi";
import classNames from "classnames";
import {Req, ReqSet} from "../components/Major";

function Label(props: ComponentProps<"label">) {
    let thisProps = {...props};
    thisProps.className = classNames("font-bold mb-4 mt-10 block", props.className);

    return (
        <label {...thisProps}/>

    )
}

function AdminButton(props: ComponentProps<"button">) {
    let thisProps = {...props};
    thisProps.className = classNames("py-1 text-sm my-2", props.className);

    return (
        <BigButton {...thisProps}/>
    )
}

export default function EditMajor() {
    const [name, setName] = useState<string>("");
    const [websites, setWebsites] = useState<string[]>([]);
    const [reqs, setReqs] = useState<Req[]>([]);
    const [reqSets, setReqSets] = useState<ReqSet[]>([]);

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-4xl mt-8 mb-4">Major requirement editor</h1>
            <Label>Name</Label>
            <Input placeholder="ex. Pomona Music major" value={name} onChange={e => setName(e.target.value)}/>
            <Label>Website(s)</Label>
            {websites.map((d, i) => (
                <div className="flex items-center">
                    <Input key={i} value={d} onChange={e => setWebsites(prev => {
                        let newWebsites = [...prev];
                        newWebsites[i] = e.target.value;
                        return newWebsites;
                    })} placeholder="ex. https://catalog.pomona.edu/preview_entity.php?catoid=43&ent_oid=2293"/>
                    <button className="p-1 opacity-50 hover:opacity-100 mb-2" onClick={() => {
                        setWebsites(prev => {
                            let newWebsites = [...prev];
                            newWebsites.splice(i,1);
                            return newWebsites;
                        })
                    }}><FiX/></button>
                </div>
            ))}
            <AdminButton onClick={() => setWebsites(prev => [...prev, ""])}>+ Add website</AdminButton>
            <hr className="my-10"/>
            <Label>Fixed requirements (required for all majors)</Label>
            {reqs.map((d, i) => (
                <div className="p-4 bg-white my-4 border shadow-md" key={i}>
                    <label className="font-medium mb-2 text-sm block">Requirement name</label>
                    <Input value={d.name} onChange={e => setReqs(prev => {
                        let newReqs = [...prev];
                        newReqs[i].name = e.target.value;
                        return newReqs;
                    })} placeholder="ex. Introductory sequence"/>
                    <label className="font-medium mb-2 text-sm block">Number of courses required</label>
                    <Input type="number" value={d.number} onChange={e => setReqs(prev => {
                        let newReqs = [...prev];
                        newReqs[i].number = +e.target.value;
                        return newReqs;
                    })}/>
                    <label className="font-medium mb-2 text-sm block">Courses that satisfy this requirement</label>
                    <AdminButton>+ Add course</AdminButton>
                </div>
            ))}
            <AdminButton onClick={() => setReqs(prev => [...prev, {name: "", number: 0, options: []}])}>+ Add requirement section</AdminButton>
            <hr className="my-10"/>
            <Label>Tracked requirements (sets of tracks, only one of which needs to be satisfied)</Label>
            <AdminButton onClick={() => setReqSets(prev => [...prev, {overallName: "", options: []}])}>+ Add requirement track set </AdminButton>
            <hr className="my-10"/>
        </div>
    )
}