import BigButton from "./BigButton";
import UpperH from "./UpperH";
import classNames from "classnames";

export default function Sidebar({isOpen}: {isOpen: boolean}) {
    return (
        <>
            {isOpen && (
                <div className="sm:hidden fixed w-full h-full left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.8)]"/>
            )}
            <div className={classNames("w-72 flex-shrink-0 border-l border-gray-400 bg-[#222] pt-12 px-2 fixed h-screen shadow-xl md:shadow-none md:static transition-all", isOpen ? "right-0" : "-right-72 md:-mr-72")}>
                <BigButton className="p-4">
                    <UpperH>+ Add major or minor</UpperH>
                </BigButton>
            </div>
        </>
    )
}