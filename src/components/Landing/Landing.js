import React, { Component } from 'react';
import axios from 'axios';

export default class Landing extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            email: '',
            password: '',
            verPassword: '',
            picture: '',
            admin: false,
            registerView: false,
        }
    }
    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleToggle = () =>{
        this.setState({registerView: !this.state.registerView})
    }

    handleRegister = () =>{
        const {username, email, password, verPassword, picture, admin} = this.state;
        if(password !== '' && password === verPassword){
            axios.post('/auth/register', {username, email, password, admin, picture})
                 .then(res =>{
                    this.props.history.push('/posts');
                 })
                 .catch(err => console.log(err));
        }
        else{
            alert("Passwords don't match");
        }
    }

    handleLogin = () =>{
        const {email,password} = this.state;
        axios.post('/auth/login', {email, password})
             .then(res=>{
                 this.props.history.push('/posts');
             })
             .catch(err =>console.log(err));
    }

    render() {
        console.log(this.props);
        return (
            <div className="landing-container">
                <section className="authentication-info">
                    <h1>Welcome to Beanafide</h1>
                    {this.state.registerView
                    ? (<div>
                        <h3>Register</h3>
                        <input type="text" value={this.state.username} name='username' placeholder='Username' onChange={(e)=> this.handleInput(e)}/>
                    </div>) 
                    : <h3>Login</h3>}
                    <input type="text" value={this.state.email} name='email' placeholder='Email' onChange={(e)=> this.handleInput(e)}/>
                    <input type="password" value={this.state.password} name='password' placeholder='Password' onChange={(e)=> this.handleInput(e)}/>
                    {this.state.registerView
                    ? (<div>
                        <input type="password" value={this.state.verPassword} name='verPassword' placeholder='Verify Password' onChange={(e)=> this.handleInput(e)}/>
                        <input type="text" value={this.state.picture} name='picture' placeholder='Profile image URL' onChange={(e)=> this.handleInput(e)}/>
                        <button onClick={this.handleRegister}>Register</button>
                        <p>Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                       </div>
                        )
                        :(<div>
                            <button onClick={this.handleLogin}>Login</button>
                            <p>Don't have an account? <span onClick={this.handleToggle}>Register Here</span></p>
                        </div>)
                    }
                </section>
            </div>
        )
    }
}
