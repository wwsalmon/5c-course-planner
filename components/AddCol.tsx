import {FiPlus} from "react-icons/fi";
import classNames from "classnames";

export default function AddCol({dark, onClick}: {dark?: boolean, onClick: () => void}) {
    return (
        <button onClick={onClick} className={classNames("w-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-100 text-gray-500 text-sm", dark && "bg-[#222] border-r border-gray-500 text-gray-400 hover:text-gray-500")}>
            <FiPlus/>
        </button>
    )
}