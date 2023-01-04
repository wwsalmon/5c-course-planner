import Input from "../components/Input";
import {ComponentProps, useState} from "react";
import BigButton from "../components/BigButton";
import {FiX} from "react-icons/fi";
import classNames from "classnames";
import {Req, ReqSet} from "../components/Major";
import EditReq from "../components/EditReq";
import Head from "next/head";

function Label(props: ComponentProps<"label">) {
    let thisProps = {...props};
    thisProps.className = classNames("font-bold mb-4 mt-10 block", props.className);

    return (
        <label {...thisProps}/>

    )
}

export function AdminButton(props: ComponentProps<"button">) {
    let thisProps = {...props};
    thisProps.className = classNames("py-1 text-sm my-2", props.className);

    return (
        <BigButton {...thisProps}/>
    )
}

export default function EditMajor() {
    const [importCode, setImportCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [websites, setWebsites] = useState<string[]>([]);
    const [reqs, setReqs] = useState<Req[]>([]);
    const [reqSets, setReqSets] = useState<ReqSet[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <Head>
                <title>Major requirement editor | 5Planner</title>
            </Head>
            <h1 className="text-4xl mt-8 mb-4">Major requirement editor</h1>
            <p>Hi! You shouldn't be on this page unless you're helping create major requirement code for this app. If you are, thanks for helping out! Fill out the fields below, then copy and paste the generated code at the bottom and send it to me.</p>
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
            <Label>Fixed requirements</Label>
            {reqs.map((req, i) => (
                <EditReq req={req} setReq={(operation) => setReqs(prev => {
                    let newReqs = [...prev];
                    newReqs[i] = operation(newReqs[i]);
                    return newReqs;
                })} onDelete={() => setReqs(prev => {
                    let newReqs = [...prev];
                    newReqs.splice(i,1);
                    return newReqs;
                })} key={i}/>
            ))}
            <AdminButton onClick={() => setReqs(prev => [...prev, {name: "", number: 0, options: []}])}>+ Add requirement section</AdminButton>
            <hr className="my-10"/>
            <Label>Requirement sets, e.g. tracks, only one of which needs to be satisfied</Label>
            {reqSets.map((reqSet, i) => (
                <div className="p-4 border bg-[#222] my-6" key={i}>
                    <label className="font-medium mb-2 text-sm block text-white">Requirement set name</label>
                    <Input placeholder="ex. Intro tracks" value={reqSet.overallName} onChange={e => setReqSets(prev => {
                        let newReqSets = [...prev];
                        newReqSets[i].overallName = e.target.value;
                        return newReqSets;
                    })}/>
                    <label className="font-medium mt-6 mb-2 text-sm block text-white">Requirements that satisfy this requirement set</label>
                    {reqSet.options.map((req, j) => (
                        <EditReq req={req} setReq={(operation) => setReqSets(prev => {
                            let newReqSets = [...prev];
                            newReqSets[i].options[j] = operation(newReqSets[i].options[j]);
                            return newReqSets;
                        })} onDelete={() => setReqSets(prev => {
                            let newReqSets = [...prev];
                            newReqSets[i].options.splice(j,1);
                            return newReqSets;
                        })} key={j}/>
                    ))}
                    <AdminButton onClick={() => setReqSets(prev => {
                        let newReqSets = [...prev];
                        newReqSets[i].options.push({name: "", number: 0, options: []});
                        return newReqSets;
                    })}>+ Add requirement</AdminButton>
                    <hr className="my-4"/>
                    <AdminButton className="text-red-500 border-red-500" onClick={() => {
                        setReqSets(prev => {
                            let newReqSets = [...prev];
                            newReqSets.splice(i, 1);
                            return newReqSets;
                        });
                    }}>Delete requirement set</AdminButton>
                </div>
            ))}
            <AdminButton onClick={() => setReqSets(prev => [...prev, {overallName: "", options: []}])}>+ Add requirement set </AdminButton>
            <hr className="my-10"/>
            <Label>Export code (copy from below)</Label>
            <textarea readOnly={true} className="w-full h-48 p-2 border whitespace-pre" value={JSON.stringify({
                    name, websites, reqs: [...reqs, ...reqSets]
                }, null, "\t")}/>
            <hr className="my-10"/>
            <Label>Import code (experimental, may crash)</Label>
            <textarea className="w-full h-48 p-2 border whitespace-pre" value={importCode} onChange={e => setImportCode(e.target.value)}/>
            <AdminButton onClick={() => {
                const thisData = JSON.parse(importCode);
                setName(thisData.name);
                setWebsites(thisData.websites);
                setReqs(thisData.reqs.filter(d => "name" in d));
                setReqSets(thisData.reqs.filter(d => "overallName" in d));
            }}>Import</AdminButton>
        </div>
    )
}