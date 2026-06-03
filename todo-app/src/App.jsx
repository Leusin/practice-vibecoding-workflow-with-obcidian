import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

export const CATEGORIES = [
  { name: '업무', color: '#4f8ef7' },
  { name: '개인', color: '#9b59b6' },
  { name: '학습', color: '#27ae60' },
  { name: '건강', color: '#e67e22' },
]

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [filterCategory, setFilterCategory] = useState('전체')
  const [filterStatus, setFilterStatus] = useState('전체')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleAdd(text, dueDate, category) {
    setTodos([...todos, { id: Date.now(), text, done: false, dueDate, category }])
  }

  function handleToggle(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ))
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filtered = todos.filter(todo => {
    const categoryMatch = filterCategory === '전체' || todo.category === filterCategory
    const statusMatch =
      filterStatus === '전체' ||
      (filterStatus === '미완료' && !todo.done) ||
      (filterStatus === '완료' && todo.done)
    return categoryMatch && statusMatch
  })

  return (
    <div className="app">
      <h1>할일 앱</h1>
      <TodoInput onAdd={handleAdd} />

      <div className="filters">
        <div className="filter-group">
          <span className="filter-label">카테고리</span>
          {['전체', ...CATEGORIES.map(c => c.name)].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-label">상태</span>
          {['전체', '미완료', '완료'].map(s => (
            <button
              key={s}
              className={`filter-btn ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <TodoList todos={filtered} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}

export default App
