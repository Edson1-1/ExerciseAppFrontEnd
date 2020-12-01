import Axios from 'axios'
import React, { Component } from 'react'
import config from '../../config'
import { Link } from 'react-router-dom'
import './Exercise.css'




//render exercise table items
const RenderExercise = (props) => {

    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.exercise.exercise_name.toUpperCase()}</td>
            <td>{props.exercise.type.exercise_type.toUpperCase()}</td>
            <td>{props.exercise.equipment.equipment_name.toUpperCase()}</td>
            <td><Link className="btn btn-sm btn-outline-dark link-button" to={`/exercise/update/${props.exercise.id}`}>edit
            </Link><button className="btn btn-sm btn-outline-dark link-button" onClick={() => props.deleteExercise(props.exercise.id)}>delete</button>
            </td>
        </tr>
    )
}



// Exercise component
export default class Exercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [],
            errorMessage: ''
        }
        this.onDelete = this.onDelete.bind(this)
    }

    async componentDidMount() {
        const token = localStorage.getItem('token')
        try {
            const data = await Axios.get(config.base_url + 'admin/api/exercise/', {headers: {Authorization: 'Bearer ' + token}})
            this.setState({
                exercises: data.data
            })
        } catch (err) {
            console.log(err)
            if(err.response){
                this.setState({
                    errorMessage: err.response.data+''
                })
            }else{
                this.setState({
                    errorMessage: err
                })
            }
        }
    }

    async onDelete(id) {
        const token = localStorage.getItem('token')
        try {
            const data = await Axios.delete(config.base_url + 'admin/api/exercise/delete/' + id, {headers: {Authorization: 'Bearer ' + token}})
            console.log(data.data)
            this.setState({
                exercises: this.state.exercises.filter(exercise => exercise.id !== id),
            })
        } catch (err) {
            console.log(err)
            if(err.response){
                this.setState({
                    errorMessage: err.response.data+''
                })
            }else{
                this.setState({
                    errorMessage: err
                })
            }
        }
    }

    exerciseList() {
        return (this.state.exercises.sort((a, b) => { return a.id - b.id }).map((exercise, index) => {
            return <RenderExercise exercise={exercise} deleteExercise={this.onDelete} index={index} key={exercise.id} />
        }))
    }

    render() {
        return (
            <div className = "exercise-container">
                <h1 className = "exercise-header">Exercises</h1>
                <Link to ='/exercise/add' className = "btn btn-success add-exercise-button"> Add Exercise</Link>
                <p className = 'error-message'>{this.state.errorMessage}</p>
                <div className = 'table-div'>
                    <table className='table table-body'>
                        <thead>
                            <tr className = 'table-text-color'>
                                <th scope="col">Sl.No</th>
                                <th scope="col">Exercise</th>
                                <th scope="col">Type</th>
                                <th scope="col">Equipment</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody className = "table-text-color">
                            {this.exerciseList()}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }

}