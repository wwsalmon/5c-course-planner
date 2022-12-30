export default function SemClass({id, title, bgColor}: {id: string, title: string, bgColor: string}) {
    return (
        <div className="px-2 py-1 mt-3 leading-[1.15] text-sm" style={{backgroundColor: bgColor}}>
            <p className="font-bold">{id}</p>
            <p className="truncate">{title}</p>
        </div>
    )
}