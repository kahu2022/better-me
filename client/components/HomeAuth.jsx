import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SetGoals from './SetGoals'

import { thunkAddNewGoal, thunkGetAllGoals } from '../actions/goals'
import { useAuth0 } from '@auth0/auth0-react'

function HomeAuth () {
  const { isAuthenticated } = useAuth0()
  const dispatch = useDispatch()
  const results = useSelector((globalState) => globalState.goals)
  const newGoals = useSelector((globalState) => globalState.newGoals)
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [inputText, setInputText] = useState('') // state for form to add new goal
  const [filteredGoals, setFilteredGoals] = useState([])

  // On load when the app runs
  useEffect(() => {
    dispatch(thunkGetAllGoals())
  }, [])

  useEffect(() => {
    filterHandler()
  }, [todos, status])

  const inputTextHandler = (evt) => {
    setInputText(evt.target.value)
  }

  const submitGoalHandler = (evt) => {
    evt.preventDefault()
    setTodos(
      [
        ...todos,
        {
          details: inputText,
          completed: false
        }
      ],
      dispatch(thunkAddNewGoal(inputText))
    )
    setInputText('')
  }

  const filteredResults = results.filter((goal) => {
    const id = goal.id
    return newGoals.includes(id)
  })

  // function to keep completed task and display when selected
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredGoals(todos.filter((todo) => todo.completed === true))
        break
      case 'uncompleted':
        setFilteredGoals(todos.filter((todo) => todo.uncompleted === false))
        break
      default:
        setFilteredGoals(todos)
    }
  }

  return (
    isAuthenticated && (
      <>
        <form>
          <input onChange={inputTextHandler} value={inputText} className="goalInput-text-box" type="text" placeholder="Enter your goal here..."></input>
        </form>

        <div className="goals-card">
          {/* To display goals */}
          <div>
            <div className="todo-container">
              <ul className="todo-list"></ul>
              {filteredResults.map((todo) => (
                <SetGoals
                  key={todo.id}
                  setTodos={setTodos}
                  todos={todos}
                  todo={todo}
                  details={todo.details}
                  filteredGoals={filteredGoals}
                />
              ))}
            </div>
          </div>

          <div>
            <button onClick={submitGoalHandler} type="submit" className="goals-card-button">
            Submit
            </button>
          </div>
        </div>
      </>
    )
  )
}

export default HomeAuth
