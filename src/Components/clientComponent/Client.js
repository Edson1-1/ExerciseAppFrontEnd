import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import config from '../../config'
import './Client.css'
import Loader from '../LoaderComponent/Loader'


export const TableBody = (props) => {
    return (
        <tr>
            <th scope='row'>{props.index + 1}</th>
            <td> {props.exercise.exercises.exercise_name.toUpperCase()}</td>
            <td> {props.exercise.duration} mins</td>
            <td> {props.exercise.date}</td>
            <td><button className="btn btn-outline-danger" onClick={() => { props.onDelete(props.exercise.exercise_id, props.exercise.createdAt) }}>Delete</button></td>

        </tr>
    )
}





function Client(props) {
    const [exercises, setExercises] = useState([])
    const [username, setUsername] = useState('')
    const [trainerName, setTrainerName] = useState('')

    const [error, setError] = useState('')
    const [searchKey, setSearchkey] = useState('')
    const [searchDate, setSearchDate] = useState('')


    useEffect(() => {
        setError('')
        let ignore = false
        const token = localStorage.getItem('token')
        async function getLoggedExercise() {
            try {
                const data = await Axios.get(config.base_url + 'customer/api/getallexercises', { headers: { Authorization: 'Bearer ' + token } })
                if (!ignore) {
                    if (data.data[0].user) {
                        setUsername(data.data[0].user.username)
                        if (data.data[0].user.trainers) {
                            setTrainerName(data.data[0].user.trainers.username)
                        }
                    }
                    else {
                        setUsername(data.data[0].username)
                        setTrainerName(data.data[0].trainers.username)
                    }
                    setExercises(data.data)

                }
            } catch (err) {
                console.log(err)
                if (err.response) {
                    console.log(err.response.data + '')
                    setError(err.response.data + '')
                }
            }
        }

        getLoggedExercise()
        return () => ignore = true
    }, [])

    const onDelete = (id, created_at) => {
        const token = localStorage.getItem('token')
        Axios.delete(config.base_url + `customer/api/delete_logged_exercise?exercise_id=${id}&created_at=${created_at}`, { headers: { Authorization: 'Bearer ' + token } })
            .then(() => {
                setExercises(exercises.filter(exercise => exercise.createdAt !== created_at))
            })
            .catch(err => {
                console.log(err)
                if (err.response) {
                    console.log(err.response)
                    console.log(err.response.data)
                    setError(err.response.data + '')
                }
            })

    }

    const onSearch = async (e) => {
        e.preventDefault()
        setError('')
        const token = localStorage.getItem('token')
        if (searchKey || searchDate) {
            try {
                const data = await Axios.post(config.base_url + `search/api/customersexercise?name=${searchKey}&date=${searchDate}`, {}, { headers: { Authorization: 'Bearer ' + token } })
                setExercises(data.data)
            } catch (err) {
                console.log(err)
                if (err.response) {
                    console.log(err.response.data + '')
                    setError(err.response.data + '')
                }
            }

        } else {
            try {
                const data = await Axios.get(config.base_url + 'customer/api/getallexercises', { headers: { Authorization: 'Bearer ' + token } })
                setExercises(data.data)


            } catch (err) {
                console.log(err)
                if (err.response) {
                    console.log(err.response.data + '')
                    setError(err.response.data + '')
                }

            }
        }
    }
    return (
        <div>
            <div className='header-user'>
                <h1> {username.toUpperCase()}</h1>
                <h3>Logged Exercises</h3>
                {trainerName ? <h5> Your trainer is {trainerName.toUpperCase()}</h5> : <h5> A trainer has not yet been assigned to you...</h5>}
            </div>
            <form className="search-form-container" onSubmit={onSearch}>
                <div className='form-group'>
                    <input className='search-client-searchBox' type='date' value={searchDate} onChange={e => setSearchDate(e.target.value)} />
                    <button className="btn btn-outline-dark btn-sm search-client-searchButton" onClick={e => { e.preventDefault(); setError(''); setSearchDate('') }}>Reset Date</button>
                </div>
                <div className="form-group">
                    <input className='search-client-searchBox' type='text' placeholder='Search' value={searchKey} onChange={e => setSearchkey(e.target.value)} />
                    <input type='submit' className="btn btn-success btn-sm search-client-searchButton" value='Search' onSubmit={onSearch} />
                </div>
            </form>
            <p className='error-message'>{error}</p>
            <div className='table-div'>
                <table className='table table-body'>
                    <thead>
                        <tr className='table-text-color'>
                            <th scope="col">Sl.No</th>
                            <th scope="col">Exercise</th>
                            <th scope="col">Duration(in minutes)</th>
                            <th scope="col">Date</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody className="table-text-color">
                        {exercises.length > 0 && !exercises[0].username ? (exercises.map((exercise, index) => { return <TableBody onDelete={onDelete} key={index} index={index} exercise={exercise} /> })) :
                            <tr></tr>
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Client
