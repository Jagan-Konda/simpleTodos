import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todo, deleteTodo, onCheckbox, onUpdatingATodo} = props
  const {title, id, isChecked} = todo
  const titleStyling = isChecked ? 'title checked-title' : 'title'

  const [isTodoInEditingView, setTodoView] = useState(false)
  const [updatedTodo, setUpdatedTodo] = useState(title)

  const onDelete = () => {
    deleteTodo(id)
  }

  const onChangingCheckbox = () => {
    onCheckbox(id)
  }

  const onChangingTodo = event => {
    setUpdatedTodo(event.target.value)
  }

  const onEditingATodo = () => {
    setTodoView(true)
  }

  const onSavingATodo = () => {
    onUpdatingATodo({id, isChecked, title: updatedTodo})
    setTodoView(false)
  }

  const renderEditingView = () => (
    <li className="list-container">
      <div className="checkbox-title-container">
        <input
          type="text"
          value={updatedTodo}
          onChange={onChangingTodo}
          className="editing-input"
        />
      </div>
      <div>
        <button
          type="button"
          className="button edit-button"
          onClick={onSavingATodo}
        >
          Save
        </button>
        <button onClick={onDelete} type="button" className="button">
          Delete
        </button>
      </div>
    </li>
  )

  const renderNormalView = () => (
    <li className="list-container">
      <div className="checkbox-title-container">
        <input
          type="checkbox"
          className="checkbox"
          onChange={onChangingCheckbox}
          checked={isChecked}
        />
        <p className={titleStyling}>{title}</p>
      </div>
      <div>
        <button
          type="button"
          className="button edit-button"
          onClick={onEditingATodo}
        >
          Edit
        </button>
        <button onClick={onDelete} type="button" className="button">
          Delete
        </button>
      </div>
    </li>
  )
  return <>{isTodoInEditingView ? renderEditingView() : renderNormalView()}</>
}

export default TodoItem
