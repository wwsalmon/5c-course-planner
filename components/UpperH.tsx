import {HTMLProps} from "react";
import classNames from "classnames";

export default function UpperH(props: HTMLProps<HTMLHeadingElement>) {
    let thisProps = {...props};
    thisProps.className = classNames(props.className, "uppercase text-xs tracking-wider font-bold");

    return (
        <h3 {...thisProps}>{props.children}</h3>
    )
}