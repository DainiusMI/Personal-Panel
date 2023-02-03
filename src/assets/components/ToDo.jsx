import React, { useState, useEffect} from "react";
import "../css/ToDo.css"

export default function ToDo() {

    const [toDoData, setToDoData] = useState([
        {
            text: "First To Do is to check text wrap",
            isActive: false
        },
        {
            text: "First To Do is to check text wrap",
            isActive: false
        }
    ])

    const [addNote, setAddNote] = useState({
        text: "",
        input_hidden: true
    })

    const handleInput = (e) => {
        setAddNote(prevState => ({
            ...prevState,
            text: e.target.value
        }))
    }

    const addToDo = () => {
        if (addNote.input_hidden) {
            setAddNote(prevState => ({
                ...prevState,
                input_hidden: false
            }))
        }
        else {
            setToDoData(prevData => ([
                ...prevData,
                {
                    text: addNote.text,
                    isActive: false
                }
            ]))
            setAddNote({
                text: "",
                input_hidden: true
            })
        }
    }

    const handleColumns = () => {
        const notes = toDoData.length
        if (notes < 4) {
            return {
                gridTemplateColumns: "1fr ".repeat(notes)
            }
        }
        else {
            return {
                gridTemplateColumns: "1fr ".repeat(4)
            }
        }
    }

    return (
        <div className="todo">
            <div className="add_note">
                <i 
                    className="fa-solid fa-plus"
                />
                <p className="todo__add__dummy__text"> Add</p>
            </div>

            <ul 
                className="note__grid"
                style={handleColumns()}
            >
            {
                
                toDoData.map((item, idx) => {
                    return <Note
                        key={`todo-${idx}`}
                        id={idx}
                        item={item}
                        toDoData={toDoData}
                        setToDoData={setToDoData}
                    />
                })
                
            }
            </ul>
            
        </div>
    )
}



function Note({id, item, toDoData, setToDoData}) {

    const [focusedToDo, setFocusedToDo] = useState()

    return (
        <li className="note">
            <p className="note__id">#{id+1}</p>
            <p className="note__text">{item.text}</p>
            <div className="note__actions">
                <i className="fa-solid fa-pen-to-square"/>
                <i className="fa-solid fa-trash"/>
            </div>
        </li>
    )
}