import React, { Component } from 'react'
import PlusButton from '../plusButton'
import MinusButton from '../minusButton'
import Axios from 'axios'
import config from '../../config'

import './AddExercise.css'


class AddExercise extends Component {
    constructor(props) {
        super(props)

        this.state = {
            exercise: [],
            equipment: [],
            types: [],
            actionTitle: '',
            exerciseName: '',
            exerciseType: '',
            exerciseEquipment: '',
            typeBoxSelection: false,
            errorMessage: ''
        }
        this.onChangeExerciseName = this.onChangeExerciseName.bind(this)
        this.plusOnClick = this.plusOnClick.bind(this)
        this.onChangeEquipment = this.onChangeEquipment.bind(this)
        this.onChangeExerciseType = this.onChangeExerciseType.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        this.setState({ errorMessage: '' })
        const token = localStorage.getItem('token')
        //get equipments
        try {
            const data = await Axios.get(config.base_url + 'admin/api/equipment/', {headers: {Authorization : 'Bearer '+token }})
            if (data.data.length === 0) {
                throw new Error("No Equipments found")
            }
            this.setState({
                equipment: data.data
            })
        } catch (err) {
            console.log(err)
            if (err.response) {
                console.log(err.response)
                if (err.response.data) {
                    this.setState({ errorMessage: err.response.data + '' })
                }
                else {
                    this.setState({ errorMessage: err.response + '' })
                }
            }
            else {
                this.setState({ errorMessage: err + '' })
            }


        }
        //get types
        try {
            const data = await Axios.get(config.base_url + 'admin/api/exercise/type/', {headers: {Authorization : 'Bearer '+token }})
            this.setState({
                types: data.data,
            })
        } catch (err) {
            console.log(err)
            if (err.response) {
                console.log(err.response)
                if (err.response.data) {
                    this.setState({ errorMessage: err.response.data + '' })
                }
                else {
                    this.setState({ errorMessage: err.response + '' })
                }
            }
            else {
                this.setState({ errorMessage: err + '' })
            }

        }
        if (id) {
            //if update
            this.setState({ actionTitle: 'Update' })
            try {
                const data = await Axios.get(config.base_url + 'admin/api/exercise/' + id, {headers: {Authorization : 'Bearer '+token }})
                this.setState({
                    exerciseName: data.data.exercise_name,
                    exerciseEquipment: data.data.equipment.equipment_name,
                    exerciseType: data.data.type.exercise_type
                })
            } catch (err) {
                console.log(err)
                if (err.response) {
                    console.log(err.response)
                    if (err.response.data) {
                        this.setState({ errorMessage: err.response.data + '' })
                    }
                    else {
                        this.setState({ errorMessage: err.response + '' })
                    }
                }
                else {
                    this.setState({ errorMessage: err + '' })
                }

            }
        } else {
            // if add new
            this.setState({ actionTitle: 'Add' })
        }
    }
    onChangeExerciseName(e) {
        this.setState({ exerciseName: e.target.value })
    }
    plusOnClick(e) {
        this.setState({ typeBoxSelection: !this.state.typeBoxSelection })
    }
    onChangeEquipment(e) {
        this.setState({ exerciseEquipment: e.target.value })
    }
    onChangeExerciseType(e) {
        this.setState({ exerciseType: e.target.value })
    }
    async onSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const exerciseEquipment = this.state.equipment.find(equipment => equipment.equipment_name === this.state.exerciseEquipment)
        const exerciseForm = {
            name: this.state.exerciseName,
            type: this.state.exerciseType,
            equipment: exerciseEquipment.id
        }
        const id = this.props.match.params.id
        if (id) {
            //updateing existing exercise
            try {
                await Axios.put(config.base_url + 'admin/api/exercise/update/' + id, exerciseForm, {headers: {Authorization : 'Bearer '+token }})
                this.setState({
                    exerciseName: '',
                    exerciseType: '',
                    exerciseEquipment: '',
                })
                this.props.history.push('/exercise')
            } catch (err) {
                console.log(err)
                if (err.response) {
                    console.log(err.response)
                    if (err.response.data) {
                        this.setState({ errorMessage: err.response.data + '' })
                    }
                    else {
                        this.setState({ errorMessage: err.response + '' })
                    }
                }
                else {
                    this.setState({ errorMessage: err + '' })
                }

            }
        } else {
            //creating new exericse
            try {
                await Axios.post(config.base_url + 'admin/api/exercise/add', exerciseForm, {headers: {Authorization : 'Bearer '+token }})
                this.setState({
                    exerciseName: '',
                    exerciseType: '',
                    exerciseEquipment: '',
                })
                this.props.history.push('/exercise')
            } catch (err) {
                console.log(err)
                if (err.response) {
                    console.log(err.response)
                    if (err.response.data) {
                        this.setState({ errorMessage: err.response.data + '' })
                    }
                    else {
                        this.setState({ errorMessage: err.response + '' })
                    }
                }
                else {
                    this.setState({ errorMessage: err + '' })
                }

            }
        }


    }
    render() {
        return (
            <div className='add-exercise-container'>
                <h1>{this.state.actionTitle} Exercise</h1>
                <form onSubmit={this.onSubmit} className='add-exercise-form-container'>
                    {/* exercise name */}
                    <div className='form-group'>
                        <label>Exercise Name</label>
                        <input className="form-control"
                            value={this.state.exerciseName}
                            onChange={this.onChangeExerciseName} placeholder="eg: 'Run' " />
                    </div>
                    <div className='form-group'>
                        {this.state.typeBoxSelection ? (<div>
                            <span className="green-text">click on minus button to select from available types</span>
                            <span onClick={this.plusOnClick} className='select-button'><MinusButton /></span>

                        </div>) : (<div>
                            <span className="blue-text">click on plus button to manually add a new exercise type</span>
                            <span onClick={this.plusOnClick} className='select-button'><PlusButton /></span>
                        </div>)}
                        {/* exercise type */}
                        <label>Exercise Type</label>
                        {this.state.typeBoxSelection ?
                            (
                                <div className='form-group'>
                                    <input className="form-control"
                                        value={this.state.exerciseType}
                                        onChange={this.onChangeExerciseType} placeholder="eg: 'endurance' " />
                                </div>
                            )
                            :
                            (
                                <div className='form-group'>
                                    <select required className="form-control" value={this.state.exerciseType} onChange={this.onChangeExerciseType}>
                                        <option></option>
                                        {this.state.types.map(type => {
                                            return (
                                                <option key={type.id}> {type.exercise_type}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )}
                    </div>
                    <div className='form-group'>
                        <label>Equipment</label>
                        <select required className="form-control" value={this.state.exerciseEquipment} onChange={this.onChangeEquipment}>
                            <option></option>
                            {this.state.equipment.map(equipment => {
                                return (
                                    <option key={equipment.id}> {equipment.equipment_name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <input type='submit' className="btn btn-primary" value="Submit" onSubmit={this.onSumbit} />
                    </div>
                </form>
                <p className="error-message">{this.state.errorMessage}</p>
            </div>
        )
    }
}

export default AddExercise