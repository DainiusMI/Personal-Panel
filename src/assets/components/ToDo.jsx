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
                        toDoData={toDoData}
                        setToDoData={setToDoData}
                    />
                })
                
            }
            </ul>
        </div>
    )
}



function Note({id, toDoData, setToDoData}) {

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
    const focusNote = () => {
        if (toDoData[id].isFocused === false && toDoData[id].input_active === false) {
            const data = toDoData.map(note => {
                return {
                    ...note,
                    isFocused: false,
                    input_active: false
                }
            })
            data[id] = {
                ...data[id],
                isFocused: true
            }
            setToDoData(data)
        }
    }
    const editNote = () => {
        const data = toDoData.map(note => {
            return {
                ...note,
                isFocused: false,
                input_active: false
            }
        })
        data[id] = {
            ...data[id],
            input_active: true
        }
        setToDoData(data)
    }
    const deleteNote = () => {
        const data = toDoData.filter((note, idx) => id !== idx && note)
        setToDoData(data)
    }
    return (
        <li 
            id={id}
            className={toDoData[id].isFocused || toDoData[id].input_active  ? "focused note" : "note"}
            onClick={focusNote}
        >
            <p className="note__id">#{id+1}</p>
            <textarea  
                type="text"
                className="note__textarea"
                autoFocus
                readOnly={!toDoData[id].input_active}
                value={noteData.text}
                onChange={handleInput}
            />
            {
                toDoData[id].input_active === false && toDoData[id].isFocused && 
                <div className="note__actions">
                    <i 
                        className="fa-solid fa-pen-to-square"
                        onClick={editNote}
                    />
                    <i 
                        className="fa-solid fa-trash"
                        onClick={deleteNote}
                    />
                </div>
            }
            {
                toDoData[id].input_active && 
                <i 
                    className="save fa-solid fa-check"
                    onClick={saveNote}
                />
            }
        </li>
    )
}