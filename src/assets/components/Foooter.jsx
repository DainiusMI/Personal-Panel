import React, {useState} from "react";
import "../css/Footer.css"

export default function Footer({openedTab, setOpenedTab}) {
    const openToDo = () => {
        if (openedTab === "todo") {
            setOpenedTab("none")
        }
        else setOpenedTab("todo")
    }
    return (
        <footer>
            <div 
                className={openedTab === "todo" ? "open__notes top" : "open__notes bottom"}
                onClick={openToDo}
            >
                <i className={openedTab === "todo" ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-up"}/>
                <p className="open__notes__text">{openedTab === "todo" ? "Close notes" : "Open Notes"}</p>
            </div>
        </footer>
    )
}