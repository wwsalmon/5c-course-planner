import {ReactNode} from "react";
import BigButton from "./BigButton";
import UpperH from "./UpperH";
import classNames from "classnames";

export default function SemCol({children, title, dark}: {children: ReactNode, title: string, dark?: boolean}) {
    return (
        <div className={classNames("w-72 px-4 border-r overflow-y-auto py-6 flex-shrink-0 border-gray-300", dark && "bg-[#222]")}>
            <h2 className={classNames("mb-8 text-4xl font-light opacity-50", dark && "text-white")}>{title}</h2>
            {children}
            <BigButton className="p-4 mt-6">
                <UpperH>+ Add possibility</UpperH>
            </BigButton>
        </div>
    )
}