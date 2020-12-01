import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import './login.css'
import config from '../../config';

export default class Login extends Component{

    constructor(props){
        super(props)

        this.state = {
            name: '',
            password: '',
            role: [],
            roleValue: '',
            error: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.clickMe = this.clickMe.bind(this)

    }

    async componentDidMount(){

        if(localStorage.getItem('token')){
            this.props.history.push('/')
        }

        try{
            const data = await Axios.get(config.base_url+'admin/api/role/all')
            if(data){
                this.setState({
                    role: data.data,
                    roleValue: data.data[0].title
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    clickMe(){
        this.props.onLoggingIn()
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            error: '',
        });
        const userRole = this.state.role.find( role => role.title === this.state.roleValue)
        const {history} = this.props;
        const userLogin = {
            name: this.state.name,
            password: this.state.password,
            role_id : userRole.id
        }

        try{
            const data = await Axios.post(config.base_url+'admin/api/user/login', userLogin);
            console.log(data.data.token)
            console.log(data.data.message)
            if(data.data.token){
                localStorage.setItem('token', data.data.token)
                localStorage.setItem('role', this.state.roleValue)
            }else{
                throw new Error("Authentication failed")
            }
            this.clickMe()
            this.setState({
                name: "",
                password: "",
            });
            history.push('/')
        }catch(err) {
            console.log("Error is"+ err);
            const error = err.response.data+'';
            console.log('error is: ', error);
            this.setState({
                error: error
            })
        }
        
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }
    onChangeRole(e){
        this.setState({
            roleValue : e.target.value
        })
    }

    render() {
        
        return (
            <div>
                    <div className="login-container">
                        <form onSubmit={this.onSubmit} >
                        <h1 className = "title-h1">Login</h1>
                        <div className = "form-group">
                            <label htmlFor = "id">Username</label>
                            <input type = "text" 
                            className = "form-control"
                            name = "id" 
                            placeholder = "Username" 
                            value={this.state.name} 
                            onChange={this.onChangeName}
                            required/>
                        </div>
                        <div className = "form-group">
                            <label htmlFor = "Password">Password</label>
                            <input type = "password"
                            className = "form-control" 
                            name="Password" 
                            placeholder = "Password"
                            value = {this.state.password}
                            onChange = {this.onChangePassword}
                            required/>
                        </div>
                        <div className = "form-group"> 
                        <label htmlFor = "Role">Role</label>
                         <select required 
                            className = 'form-control'
                            value = {this.state.roleValue}
                            onChange = {this.onChangeRole}>
                                {
                                    this.state.role.map(role => {
                                        return(
                                            <option key = {role.id} value = {role.title}>
                                                {role.title}
                                            </option>
                                        )
                                    })
                                }
                    </select>
                </div>
                        <div className = "form-group">
                            <input className = "btn btn-primary" type = "submit" value="Login" onSubmit = {this.onSubmit} />
                        </div>
                        </form>
                        <div>
                           <span className = "error-login">{this.state.error} </span>
                           <p className="signup-link">Don't have an account?  <Link className = "regLink" to = '/register'> Sign up here!</Link></p>
                        </div>
                    </div>
            </div>
        )
    }

}