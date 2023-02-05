import React, { useState, useEffect} from "react";
import "../css/ToDo.css"

export default function ToDo() {

    const [toDoData, setToDoData] = useState([])
    const setInactive = () => {
        return toDoData.map(note => {
            return {
                ...note,
                isFocused: false,
                input_active: false
            }
        })
    }
    const addNote = () => {
        setToDoData([
            ...setInactive(),
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
                
                toDoData.map((item, index) => {
                    return <Note
                        key={`todo-${index}`}
                        id={index}
                        toDoData={toDoData}
                        setToDoData={setToDoData}
                        setInactive={setInactive}
                    />
                })
                
            }
            </ul>
        </div>
    )
}


function Note({id, toDoData, setToDoData, setInactive}) {

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
            isFocused: false,
            input_active: false
        }
        setToDoData(data)
    }
    
    const cancelNote = () => {
        if (noteData.text.length === 0) {
            deleteNote()
        }
        else {
            setToDoData(setInactive())
        }
    }



    const focusNote = () => {
        if (toDoData[id].isFocused === false && toDoData[id].input_active === false) {
            const data = setInactive()
            data[id] = {
                ...data[id],
                isFocused: true
            }
            setToDoData(data)
        }
    }

    const editNote = () => {
        const data = setInactive()
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
    const direction = Math.random() > 0.5 ? -1 : 1
    const [noteStyle, setNoteStyle] = useState({

    })
    useEffect(() => {
        noteData.isFocused == false &&
        setNoteStyle({
            angle: Math.floor(Math.random() * 6 + 2) * direction,
            position: Math.floor(Math.random() * 10) * direction
        })
    }, [noteData.isFocused])

    const notesStyle = () => {
        return noteData.isFocused || noteData.input_active ?
            {
                transform: `scale(1.1)`
            }:
            {
                transform: `rotate(${noteStyle.angle}deg)`,
                top: `${noteStyle.position}px`,
                cursor: `pointer`
            }
    }

    return (
        <li 
            id={id}
            className={toDoData[id].isFocused || toDoData[id].input_active  ? "focused note" : "note"}
            onClick={focusNote}
            style={notesStyle()}
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
                <div className="note__actions actions__top">
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
                <div className="note__actions actions__bottom">
                    <i 
                        className="save fa-solid fa-check"
                        onClick={saveNote}
                    />
                    <i 
                        className="fa-solid fa-xmark"
                        onClick={cancelNote}
                    />
                </div>
                
            }
        </li>
    )
}