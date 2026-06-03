import { CATEGORIES } from '../App'

function TodoItem({ todo, onToggle, onDelete }) {
  const today = new Date().toISOString().split('T')[0]
  const isOverdue = todo.dueDate && !todo.done && todo.dueDate < today
  const categoryColor = CATEGORIES.find(c => c.name === todo.category)?.color ?? '#aaa'

  return (
    <li className={`todo-item ${todo.done ? 'done' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        className="category-badge"
        style={{ backgroundColor: categoryColor }}
      >
        {todo.category}
      </span>
      <span className="todo-text">{todo.text}</span>
      {todo.dueDate && (
        <span className="due-date">
          {isOverdue ? '⚠️ ' : '📅 '}{todo.dueDate}
        </span>
      )}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  )
}

export default TodoItem
