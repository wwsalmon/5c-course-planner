import {ComponentProps} from "react";
import classNames from "classnames";

export default function Input(props: ComponentProps<"input">) {
    let thisProps = {...props};
    thisProps.className = classNames(props.className, "px-2 py-1 border border-gray-400 w-full text-sm mb-2");

    return (
        <input {...thisProps}/>
    )
}