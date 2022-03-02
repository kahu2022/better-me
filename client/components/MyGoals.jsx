import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'

import { useAuth0 } from '@auth0/auth0-react'
import {
  thunkGetAllGoals,
  thunkUpdateGoals,
  thunkDelGoal
} from '../actions/goals'

const MyGoals = () => {
  const dispatch = useDispatch()
  const [complete, setComplete] = useState(!complete)

  useEffect(() => {
    dispatch(thunkGetAllGoals())
  }, [complete])

  const { isAuthenticated } = useAuth0()
  const results = useSelector((globalState) => globalState.goals)

  const submitCompleteHandler = (id) => {
    setComplete(!complete)
    dispatch(thunkUpdateGoals(id, complete))
  }

  const deleteHandler = (id) => {
    dispatch(thunkDelGoal(id))
  }
  return (
    isAuthenticated && (
      <>
        <div className="mygoals-card">
          <h3>
            <u>My Goals</u>
          </h3>

          {/* To display goals */}
          <div className="myGoalsContainer">
            <ul className="addedgoals">
              {results.map((goals) => {
                console.log(goals)
                if (goals.completed === 0) {
                  return (
                    <li key={goals.details}>
                      {goals.details}
                      <button onClick={() => submitCompleteHandler(goals.id)}>
                        <i className="fas fa-check"></i>
                      </button>
                      <button onClick={() => deleteHandler(goals.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </li>
                  )
                } else {
                  return (
                    <li key={goals.details}>
                      <del>{goals.details}</del>
                      <button onClick={() => submitCompleteHandler(goals.id)}>
                        <i className="fas fa-check"></i>
                      </button>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
        <Footer />
      </>
    )
  )
}

export default MyGoals
