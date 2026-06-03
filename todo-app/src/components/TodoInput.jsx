import { useState } from 'react'
import { CATEGORIES } from '../App'

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].name)

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim(), dueDate, category)
    setText('')
    setDueDate('')
    setCategory(CATEGORIES[0].name)
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        className="input-text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="할일을 입력하세요"
      />
      <select
        className="input-category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        {CATEGORIES.map(c => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
      <input
        className="input-date"
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  )
}

export default TodoInput
