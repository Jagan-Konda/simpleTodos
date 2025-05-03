import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    isChecked: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    isChecked: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isChecked: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    isChecked: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    isChecked: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    isChecked: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    isChecked: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    isChecked: false,
  },
]

class SimpleTodos extends Component {
  state = {todosList: initialTodosList, newTodo: ''}

  onChangingNewTodo = event => {
    this.setState({newTodo: event.target.value})
  }

  onAddingTodo = () => {
    const {newTodo} = this.state

    if (newTodo) {
      const words = newTodo.trim().split(' ')

      const num = Number(words[words.length - 1])

      if (!Number.isNaN(num)) {
        const todoTitle = words.slice(0, words.length - 1).join(' ')
        this.setState(prevState => {
          const newTodos = []

          for (let i = 0; i < num; i += 1) {
            newTodos.push({
              id: uuidv4(),
              isChecked: false,
              title: todoTitle,
            })
          }

          return {todosList: [...prevState.todosList, ...newTodos], newTodo: ''}
        })
      } else {
        this.setState(prevState => ({
          todosList: [
            ...prevState.todosList,
            {
              id: uuidv4(),
              title: prevState.newTodo,
              isChecked: false,
            },
          ],
          newTodo: '',
        }))
      }
    }
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const filteredTodoList = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({todosList: filteredTodoList})
  }

  onCheckbox = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isChecked: !eachTodo.isChecked}
        }
        return {...eachTodo}
      }),
    }))
  }

  onUpdatingATodo = todo => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo => {
        if (eachTodo.id === todo.id) {
          return {...eachTodo, title: todo.title}
        }
        return {...eachTodo}
      }),
    }))
  }

  render() {
    const {todosList, newTodo} = this.state

    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              type="text"
              className="add-todo-input-container"
              onChange={this.onChangingNewTodo}
              value={newTodo}
            />
            <button
              type="button"
              className="add-todo-button"
              onClick={this.onAddingTodo}
            >
              Add
            </button>
          </div>
          <ul className="lists-container">
            {todosList.map(eachTodo => (
              <TodoItem
                todo={eachTodo}
                key={eachTodo.id}
                deleteTodo={this.deleteTodo}
                onCheckbox={this.onCheckbox}
                onUpdatingATodo={this.onUpdatingATodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
