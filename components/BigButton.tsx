import {ComponentProps} from "react";
import classNames from "classnames";

export default function BigButton(props: ComponentProps<"button">) {
    let thisProps = {...props};
    thisProps.className = classNames("block w-full border border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-600 text-center", thisProps.className);
    return (
        <button {...thisProps}/>
    )
}