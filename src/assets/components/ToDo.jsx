import React, { useState, useEffect} from "react";
import "../css/ToDo.css"

export default function ToDo() {

    const [toDoData, setToDoData] = useState([
        {
            text: "First To Do is to check text wrap",
            isFocused: false,
            input_active: false
        },
        {
            text: "First To Do is to check text wrap",
            isFocused: false,
            input_active: false
        }
    ])


    
    const addNote = () => {
        const notActive = toDoData.map(note => {
            return {...note, isFocused: false, input_active: false}
        })
        setToDoData([
            ...notActive,
            {
                text: "",
                isFocused: true,
                input_active: true
            }
        ])
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
    console.log(toDoData)
    return (
        <div className="todo">
            <div 
                className="add_note" 
                onClick={addNote}
            >
                <i className="fa-solid fa-plus"/>
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

    const [noteData, setNoteData] = useState(toDoData[id])
    useEffect(() => {
        setNoteData(toDoData[id])
    }, [toDoData[id]])

    const handleInput = (e) => {
        setNoteData(prevState => ({
            ...prevState,
            text: e.target.value
        }))
    }
    const saveNote = () => {
        const data = [...toDoData]
        data[id] = {
            text: noteData.text,
            isFocused: true,
            input_active: false
        }
        setToDoData(data)
    }
    const focusNote = () = {
        
    }

    return (
        <li className="note">
            <p className="note__id">#{id+1}</p>
            {
                toDoData[id].input_active && 
                <textarea  
                    type="text"
                    className="note__textarea"
                    autoFocus
                    value={noteData.text}
                    onChange={handleInput}
                />
            }
            <p className="note__text">{item.text}</p>
            {
                toDoData[id].isFocused && 
                <div className="note__actions">
                    <i className="fa-solid fa-pen-to-square"/>
                    <i className="fa-solid fa-trash"/>
                </div>
            }
            {
                toDoData[id].input_active && 
                <i 
                    className="save fa-solid fa-check"
                    data-note={id}
                    onClick={saveNote}
                />
            }
        </li>
    )
}