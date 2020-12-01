import React from 'react'
import {Link } from 'react-router-dom'

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

export default function Table(props){
    const exerciseList = () => {
        return (props.arrary.sort((a, b) => { return a.id - b.id }).map((exercise, index) => {
            return <RenderExercise exercise={props.array} deleteExercise={this.onDelete} index={index} key={exercise.id} />
        }))
    }
    return(
        <div className = 'table-div'>
                    <table className='table table-body'>
                        <thead>
                            <tr className = 'table-text-color'>
                                <th scope="col">Sl.No</th>
                                <th scope="col">props.column1</th>
                                <th scope="col">props.column2</th>
                                <th scope="col">props.column3</th>
                                <th scope="col">props.column4</th>
                            </tr>
                        </thead>
                        <tbody className = "table-text-color">
                            {exerciseList()}
                        </tbody>
                    </table>

                </div>
    )
}