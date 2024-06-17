// This is a general UI element that wraps some content - order summary
import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

function Modal(props: any) {
    return (
        <>
            <Backdrop show = {props.show} clicked={props.modalClosed}/>
            <div 
                className="fixed z-[500] bg-white w-[70%] border border-[#ccc] p-[16px] left-[15%] top-[10%] box-border transition-all
                ease-out duration-300 translate-y-[-100vh] rounded sm:w-[500px] sm:left-[calc(50% - 250px)]"
                style={{
                    transform: props.show? "translateY(0)": "translateY(-100vh)",
                    opacity: props.show? "1": "0"
                }}
            >
                {props.children}
            </div>
        </>
    )
}
 
export default Modal;