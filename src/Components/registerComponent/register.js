import React,{Component} from 'react'
import './register.css'
import Axios from 'axios'
import config from '../../config'

export default class Register extends Component {

    constructor(props){
        super(props)

        this.state= {
            name: "",
            email: "",
            password: "",
            error : '',
            role : [],
            roleValue: ""
            
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);

        
        this.onSubmit = this.onSubmit.bind(this);
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

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }
    onChangeEmail(e){
       this.setState({
           email: e.target.value
       });
   }
   onChangePassword(e){
       this.setState({
           password: e.target.value
       });
   }
   onChangeRole(e){
       this.setState({
           roleValue : e.target.value
       })
   }
   onSubmit(e){
    e.preventDefault();
    this.setState({
        error: ''
    });  
        const userRole = this.state.role.find( role => role.title === this.state.roleValue)
        const {history} = this.props;
                    const userRegister = {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                        role_id: userRole.id
                    }
                   
                    Axios.post(config.base_url+'admin/api/user/register', userRegister)
                        .then( data => {
                            if(data.data.token){
                                localStorage.setItem('token', data.data.token)
                            }
                            this.props.onLoggingIn()
                            this.setState({
                                name: "",
                                email: "",
                                password: ""
                            });
                            history.push("/login");
                        })
                        .catch( err => {
                            console.log(err)
                            console.log(err.response.data)
                            this.setState({
                                error: err.response.data
                            })

                        })
    }


    render(){
        return (
            <div className="register-container">
            <form onSubmit = {this.onSubmit}>
                <h1 className = "title-h1">Register</h1>
                <div className = "form-group">
                <label htmlFor = "Username">Username</label>
                <input type="text"
                className = "form-control"
                name = "Username"
                placeholder = "Username"
                value = {this.state.name}
                onChange = {this.onChangeName}
                required/>
                </div>
                <div className= "form-group">
                <label htmlFor = "Email">Email</label>
                <input type="email"
                className = "form-control"
                name = "Email"
                placeholder = "Email"
                value = {this.state.email}
                onChange = {this.onChangeEmail}
                required/>
                </div>
                <div className = "form-group">
                <label htmlFor = "CreatePassword">Password</label>
                <input type="password"
                className = "form-control"
                name = "CreatePassword"
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
                <div className="from-group">
                <input className = "btn btn-primary"
                type="submit"
                value = "Register"
                onChange = {this.onSubmit}
                required/>
                </div>
            </form>
            <div className = "error-register">
                {this.state.error}
            </div>
         </div>
        )
    }

}