import { useEffect, useState, useRef } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
// import { Todo } from "../models/models";
import { Draggable } from 'react-beautiful-dnd'

const SingleTodo = ({ index, todo, todos, setTodos }) => {
    const [edit, setEdit] = useState(false)
    const [editTodo, setEditTodo] = useState(todo.todo)

    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const handleEdit = (e, id) => {
        e.preventDefault()
        setTodos(todos.map((t) => (t.id === id ? { ...t, todo: editTodo } : t)))
        setEdit(false)
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((t) => t.id !== id))
    }

    const handleDone = (id) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)))
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
                >
                    {edit ? (
                        <input
                            value={editTodo}
                            onChange={(e) => setEditTodo(e.target.value)}
                            className='todos__single--text'
                            ref={inputRef}
                        />
                    ) : todo.isDone ? (
                        <s className='todos__single--text'>{todo.todo}</s>
                    ) : (
                        <span className='todos__single--text'>{todo.todo}</span>
                    )}
                    <div>
                        <span
                            role='presentation'
                            className='icon'
                            onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit)
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                        <span
                            role='presentation'
                            className='icon'
                            onClick={() => handleDelete(todo.id)}
                        >
                            <AiFillDelete />
                        </span>
                        <span
                            role='presentation'
                            className='icon'
                            onClick={() => handleDone(todo.id)}
                        >
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo
