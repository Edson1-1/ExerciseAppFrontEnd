import Axios from 'axios'
import React, { Component,useState,useEffect } from 'react'
import config from '../../config'
import './user.css'




//render exercise table items
const RenderCustomer = (props) => {
    const [trainer, setTrainer] = useState('hi');
    useEffect( () => {
        let ignore = false
        if(!ignore){
        (props.trainers.length !== 0 )? setTrainer(props.trainers[0].username) : setTrainer('');
}
        return ( ) => ignore = true
    }, [props])

    const onChangeTrainer = (e) => {
        setTrainer(e.target.value)
    }

    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.customer.username.toUpperCase()}</td>
            <td>{props.customer.email.toLowerCase()}</td>
            {props.customer.trainers ? 
            <td>{props.customer.trainers.username.toUpperCase()}</td> 
            :
             <td></td> }
            <td> 
                <select className = 'btn btn-outline-dark' onChange = {onChangeTrainer}> 
                    {props.trainers.map( trainer => {
                        return (<option key = {trainer.id}>
                            {trainer.username}
                        </option>)
                    })}
                </select>
                <button className= " btn btn-outline-dark btn-sm button-margin" onClick = {(e) => {
                    e.preventDefault()
                    const trn =  props.trainers.find( trnr => trnr.username === trainer)
                    props.assignTrainer(trn.id, props.customer.id)}}>assign</button>
            </td>
            <td><button className = 'btn btn-outline-danger' onClick = { (e) => {
                props.assignTrainer(null, props.customer.id)
            }}>unassign</button></td>
        </tr>
    )
}



// Exercise component
export default class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            trainers: [],
            errorMessage: '',
            searchKey: '',
        }
        // this.onDelete = this.onDelete.bind(this)
        this.assignTrainer = this.assignTrainer.bind(this)
        this.onSearchKeyChange = this.onSearchKeyChange.bind(this)
        this.onSearch = this.onSearch.bind(this)

    }

    async componentDidMount() {
        const token = localStorage.getItem('token')
        this.setState({errorMessage: ''})
        //get customers and trainers
        try {
            const data = await Axios.get(config.base_url + 'admin/api/user/customers', {headers: {Authorization: 'Bearer ' + token}})
            this.setState({
                customers: data.data
            })
            const trainers = await Axios.get(config.base_url+'admin/api/user/fetchtrainers', {headers: {Authorization: 'Bearer ' + token}})
            this.setState({
                trainers: trainers.data
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

    async assignTrainer(trainerId, customerId){
        const token = localStorage.getItem('token')
        try{
            console.log(trainerId, "--", customerId)
            const data = await Axios.put(config.base_url+'admin/api/user/addtrainer/'+customerId, {trainer: trainerId},{headers: {Authorization: 'Bearer ' + token}} )
            const updatedCustomer = this.state.customers.map( customer => {
                if(customer.id === customerId){
                    customer.trainers = data.data.trainers
                }
                return customer
            })
            this.setState({
                customers: updatedCustomer
            })

            
        }catch(err){
            console.log(err)
            if(err.response){
                console.log(err.response.data+'')
                this.setState({errorMessage: err.response.data+""})
            }
        }


    }

    customerList() {
        return (this.state.customers.sort((a, b) => { return a.id - b.id }).map((customer, index) => {
            return <RenderCustomer assignTrainer ={this.assignTrainer} trainers = {this.state.trainers} customer={customer} index={index} key={customer.id} />
        }))
    }

    onSearchKeyChange(e){
        this.setState({
            searchKey: e.target.value
        })
    }
    
    async onSearch(e){
        e.preventDefault()
        this.setState({errorMessage: ''})
        const token = localStorage.getItem('token')
        const search = {name: this.state.searchKey}
        try{
            if(this.state.searchKey ===''){
                const data = await Axios.get(config.base_url + 'admin/api/user/customers', {headers: {Authorization: 'Bearer ' + token}})
            this.setState({
                customers: data.data
            })
            }else{
                const data = await Axios.post(config.base_url + 'search/api/searchcustomer', search, {headers: {Authorization: 'Bearer ' + token}} )
                this.setState({
                    customers: data.data,
                    searchKey: ''
                })
            }

        }catch(err){
            console.log(err)
            if (err.response) {
                this.setState({
                    errorMessage: err.response.data + ''
                })
            } else {
                this.setState({
                    errorMessage: err
                })
            }
        }

    }

    render() {
        return (
            <div className = "exercise-container">
                <h1 className = "exercise-header">Customers</h1>
                <p className = 'error-message'>{this.state.errorMessage}</p>
                <form onSubmit = {this.onSearch}>
                    <div className = 'form-group'>
                        <input className = "search-customer-searchBox" type='text' placeholder='Search' value = {this.state.searchKey} onChange = {this.onSearchKeyChange} />
                        <input type='submit' value = "Search" className = "btn btn-success btn-sm search-customer-searchButton" onSubmit = {this.onSearch}/>

                    </div>
                </form>
                <div className = 'table-div'>
                    <table className='table table-body'>
                        <thead>
                            <tr className = 'table-text-color'>
                                <th scope="col">Sl.No</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Trainer</th>
                                <th scope="col">Assign Trainer</th>
                                <th scope="col">Unassign Trainer</th>
                            </tr>
                        </thead>
                        <tbody className = "table-text-color">
                            {this.customerList()}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }

}