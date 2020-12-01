import Axios from 'axios'
import React, { Component } from 'react'

import config from '../../config'
import './AddEquipment.css'

class AddEquipment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            actionTitle: '',
            equipmentName: '',
            errorMessage: ''
        }

        this.onEquipmentNameChange = this.onEquipmentNameChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        this.setState({
            errorMessage: ''
        })

        if (this.props.match.params.id) {
            this.setState({
                actionTitle: "Update"
            })
            const id = this.props.match.params.id
            const token = localStorage.getItem('token')
            try {
                const data = await Axios.get(config.base_url + 'admin/api/equipment/' + id, {headers: {Authorization : 'Bearer '+token }})
                this.setState({
                    equipmentName: data.data.equipment_name
                })
            } catch (err) {
                console.log(err)
                console.log(err.response.data)
            }
        }
        else {
            this.setState({
                actionTitle: "Add"
            })
        }
    }

    onEquipmentNameChange(e) {
        this.setState({
            equipmentName: e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        const equipment_name = { name: this.state.equipmentName }
        const token = localStorage.getItem('token')
        if (this.props.match.params.id) {
            const id = this.props.match.params.id
            try {
                await Axios.put(config.base_url + 'admin/api/equipment/update/' + id, equipment_name, {headers: {Authorization : 'Bearer '+token }})
                this.setState({
                    equipmentName: ""
                })
                this.props.history.push('/equipment')
            } catch (err) {
                console.log(err)
                console.log(err.response.data)
                this.setState({
                    errorMessage: err.response.data + ''
                })
            }
        } else {
            try {
                await Axios.post(config.base_url + 'admin/api/equipment/add', equipment_name, {headers: {Authorization : 'Bearer '+token }})
                this.setState({
                    equipmentName: ""
                })
                this.props.history.push('/equipment')
            } catch (err) {
                console.log(err)
                console.log(err.response.data)
                this.setState({
                    errorMessage: err.response.data + ''
                })
            }
        }
    }

    render() {
        return (
            <div className='add-equipment-container'>
                <h1>{this.state.actionTitle} Equipment</h1>
                <form onSubmit = {this.onSubmit} className="equipment-form-container">
                    <div className='form-group'>
                        <label htmlFor='equipment name'>Enter Equipment Name</label>
                        <input placeholder="eg: 'treadmil'" className='form-control' name='equipment name' type='text' value={this.state.equipmentName} onChange={this.onEquipmentNameChange} required />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary " value="Submit" onSubmit={this.onSubmit} />
                    </div>
                    <span className = "error-message">{this.state.errorMessage}</span>
                </form>
            </div>
        )
    }
}

export default AddEquipment