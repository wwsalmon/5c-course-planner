import {ReactNode} from "react";
import UpperH from "./UpperH";
import BigButton from "./BigButton";

export default function SemPos({title, children}: {title: string, children?: ReactNode}) {
    return (
        <div className="p-4 shadow-md bg-white w-full mb-6">
            <UpperH className="opacity-50">{title}</UpperH>
            {children}
            <BigButton className="px-2 py-1 text-sm mt-3">
                <span>+ Add course</span>
            </BigButton>
        </div>
    )
}