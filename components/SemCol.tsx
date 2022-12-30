import {ReactNode} from "react";
import BigButton from "./BigButton";
import UpperH from "./UpperH";

export default function SemCol({children, title}: {children: ReactNode, title: string}) {
    return (
        <div className="w-72 px-4 border-r border-gray-300 overflow-y-auto py-6 flex-shrink-0">
            <h2 className="mb-8 text-4xl font-light opacity-50">{title}</h2>
            {children}
            <BigButton className="p-4 mt-6">
                <UpperH>+ Add possibility</UpperH>
            </BigButton>
        </div>
    )
}