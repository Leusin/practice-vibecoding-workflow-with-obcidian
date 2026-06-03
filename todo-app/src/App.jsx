import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  function handleAdd(text) {
    setTodos([...todos, { id: Date.now(), text, done: false }])
  }

  function handleToggle(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <h1>할일 앱</h1>
      <TodoInput onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}

export default App
