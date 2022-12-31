import Modal from "react-modal";
import {Dispatch, ReactNode, SetStateAction} from "react";

export default function MyModal({isOpen, setIsOpen, children}: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, children: ReactNode}) {
    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={{
            overlay: {
                backgroundColor: "rgba(0,0,0,0.6)",
            },
            content: {
                position: "absolute",
                background: "white",
                left: "50%",
                top: "50%",
                bottom: "unset",
                right: "unset",
                transform: "translate(-50%, -50%)",
                padding: 16,
                borderRadius: 4,
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // tailwind shadow-md
            }
        }}>
            <div className="w-72">
                {children}
            </div>
        </Modal>
    )
}