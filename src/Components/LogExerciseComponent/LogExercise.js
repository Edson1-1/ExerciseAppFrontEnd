import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import config from '../../config'
import './LogExercise.css'

function LogExercise(props) {
    const [exercises, setExercises] = useState([])
    const [exercise, setExercise] = useState('')
    const [duration, setDuration] = useState('')
    const [date, setDate] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        let ignore = false
        setError('')
        const token = localStorage.getItem('token')
        function fetchExercise() {
            Axios.get(config.base_url + 'admin/api/exercise/', { headers: { Authorization: 'Bearer ' + token } })
                .then((data) => {
                    if (!ignore) {
                        console.log(data.data)
                        setExercises(data.data)
                        setExercise(data.data[0].exercise_name)
                    }
                })
                .catch(err => {
                    console.log(err)
                    console.log(err.response.data + '')

                })
        }

        fetchExercise()
        return () => ignore = true

    }, [])

    const onChangeExercise = (e) => {
        setExercise(e.target.value)
    }
    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const exerciseId = exercises.find(exr => exr.exercise_name === exercise).id
        const loggedExercise = { id: exerciseId, date: date, duration: parseInt(duration) }

        Axios.post(config.base_url + 'customer/api/logexercise', loggedExercise, { headers: { Authorization: 'Bearer ' + token } })
            .then(data => {

                props.history.push('/client')

            })
            .catch(err => {
                console.log(err)
                if (err.response) {
                    console.log(err.response.data + '')
                    setError(err.response.data + '')
                }
            })


    }

    return (
        <div className="container">

            <h1>Create Exercise Log</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label> Exercise</label>
                    <select className="form-control" required value={exercise} onChange={onChangeExercise}>
                        {exercises.map(exercise => {
                            return <option key={exercise.id}> {exercise.exercise_name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Duration(in minutes)</label>
                    <input placeholder = 'eg: 60' className="form-control" type="text" required value={duration} onChange={onChangeDuration} />
                </div>
                <div className='form-group'>
                    <label>Date</label>
                    <div>
                        <input required type='date' value={date} onChange={e => {
                            setDate(e.target.value)
                        }} />
                    </div>
                </div>
                <div className="form-group">
                    <input onSubmit={onSubmit} type='submit' value='Submit' className='btn btn-primary' />
                </div>
            </form>
            <p className = "error-message">{error}</p>
        </div>
    )
}

export default LogExercise
