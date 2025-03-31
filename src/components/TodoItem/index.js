import './index.css'

const TodoItem = props => {
  const {todo, deleteTodo} = props
  const {title, id} = todo
  const onDelete = () => {
    deleteTodo(id)
  }
  return (
    <li className="list-container">
      <p className="title">{title}</p>
      <button onClick={onDelete} type="button" className="button">
        Delete
      </button>
    </li>
  )
}

export default TodoItem
