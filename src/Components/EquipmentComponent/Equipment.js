import Axios from 'axios'
import React, { Component } from 'react'
import config from '../../config'
import { Link } from 'react-router-dom'
import './Equipment.css'




//render equipment table items
const RenderEquipment = (props) => {

    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.equipment.equipment_name.toUpperCase()}</td>
            <td><Link className="btn btn-sm btn-outline-dark link-button" to={`/equipment/update/${props.equipment.id}`}>edit
            </Link><button className="btn btn-sm btn-outline-dark link-button" onClick={() => props.deleteEquipment(props.equipment.id)}>delete</button>
            </td>
        </tr>

    )
}



// Exercise component
export default class Equipment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            equipments: [],
            errorMessage: ''
        }
        this.onDelete = this.onDelete.bind(this)
    }

    async componentDidMount() {
        const token = localStorage.getItem('token')
        if(token){
        try {
            const data = await Axios.get(config.base_url + 'admin/api/equipment/', {headers: {Authorization: 'Bearer ' + token}})
            this.setState({
                equipments: data.data
            })
        } catch (err) {
            console.log(err)
        }}
    }

    async onDelete(id) {
        this.setState({
            errorMessage: ''
        })
        const token = localStorage.getItem('token')
        try {
            const data = await Axios.delete(config.base_url + 'admin/api/equipment/delete/' + id, {headers: {Authorization: 'Bearer ' + token}})
            this.setState({
                equipments: this.state.equipments.filter(equipment => equipment.id !== id),
            })
        } catch (err) {
            console.log(err)
            console.log(err.response.data)
            this.setState({
                errorMessage: err.response.data
            })
        }
    }

    equipmentList() {
        return (this.state.equipments.sort((a, b) => { return a.id - b.id }).map((equipment, index) => {
            return <RenderEquipment errorMsg={this.state.errorMessage} equipment={equipment} deleteEquipment={this.onDelete} index={index} key={equipment.id} />
        }))
    }

    render() {
        return (
            <div className="equipment-container">
                <h1 className="equipment-header">Equipments</h1>
                <Link to='/equipment/add' className="btn btn-success add-equipment-button"> Add Equipment</Link>
                <p className="error-message">{this.state.errorMessage}</p>

                <div className='table-div'>
                    <table className='table table-body'>
                        <thead>
                            <tr className='table-text-color'>
                                <th scope="col">Sl.No</th>
                                <th scope="col">Equipment</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody className="table-text-color">
                            {this.equipmentList()}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }

}