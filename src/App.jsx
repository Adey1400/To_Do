import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodoForm from './components/addTodo'
import SimpleTodo from './components/simpleTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<AddTodoForm/>
<SimpleTodo/>
    </>
  )
}

export default App
