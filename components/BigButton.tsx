import {ReactNode} from "react";
import classNames from "classnames";

export default function BigButton({className, children}: {className: string, children: ReactNode}) {
    return (
        <div className={classNames("border border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-600 text-center", className)}>
            {children}
        </div>
    )
}