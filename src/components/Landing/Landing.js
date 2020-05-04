import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

class Landing extends Component {
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

    componentDidMount(){
        if(this.props.user.email){
            this.props.history.push('/posts')
        }
    }

    handleRegister = () =>{
        const {username, email, password, verPassword, picture, admin} = this.state;
        if(password !== '' && password === verPassword){
            axios.post('/auth/register', {username, email, password, admin, picture})
                 .then(res =>{
                    this.props.getUser(res.data);
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
                 this.props.getUser(res.data);
                 this.props.history.push('/posts');
             })
             .catch(err =>console.log(err));
    }

    render() {
        // console.log(this.props);
        return (
            <>
                <div className="bg-fixed bg-center bg-no-repeat py-32 flex justify-center" style={{'backgroundImage': 'url(https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)'}}>
                    <section className="w-full bg-white rounded p-6 m-4 md:max-w-md md:mx-auto overflow-hidden shadow-lg bg-opacity-75">
                        <div className="divide-y divide-gray-400">
                                <h1 className="text-4xl font-bold block w-full text-center text-gray-800 mb-6">Welcome to Beanafide</h1>
                        </div>
                        <div className="mb-3 md:flex md:flex-wrap md:justify-between">
                            {this.state.registerView ? 
                                <h3 className="block w-full text-base text-center text-gray-800 mb-6">Register Here</h3>
                                : 
                                <h3 className="block w-full text-base text-center text-gray-800 mb-6">Login Here</h3>
                            }
                            <div className="flex flex-col mb-4 md:w-full">
                                <label className="mb-2 uppercase font-bold text-lg text-gray-900">Email</label>
                                <input className="border py-2 px-3 text-gray-800" type="text" value={this.state.email} name='email' placeholder='Email' onChange={(e)=> this.handleInput(e)}/>
                            </div>
                            <div className="flex flex-col mb-4 md:w-full">
                                <label className="mb-2 uppercase font-bold text-lg text-gray-900">Password</label>
                                <input className="border py-2 px-3 text-gray-800" type="password" value={this.state.password} name='password' placeholder='Password' onChange={(e)=> this.handleInput(e)}/>
                            </div>
                            {this.state.registerView
                            ? (<>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 uppercase font-bold text-lg text-gray-900">Verify Password</label>
                                        <input className="border py-2 px-3 text-gray-800" type="password" value={this.state.verPassword} name='verPassword' placeholder='Verify Password' onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 uppercase font-bold text-lg text-gray-900">Username</label>
                                        <input className="border py-2 px-3 text-gray-800" type="text" value={this.state.username} name='username' placeholder='Username' onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 uppercase font-bold text-lg text-gray-900">Profile Image</label>
                                        <input className="border py-2 px-3 text-gray-800" type="text" value={this.state.picture} name='picture' placeholder='Profile Image URL' onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                        <button className="block bg-orange-700 hover:bg-orange-500 text-white uppercase text-lg mx-auto p-2 rounded" onClick={this.handleRegister}>Register</button>
                                        <p className="mt-2 block w-full text-center no-underline text-sm text-gray-500 hover:text-gray-600">Have an account? <span onClick={this.handleToggle}>Login Here</span></p>
                                </>
                                )
                                :(<>
                                    <button className="block bg-orange-700 hover:bg-orange-500 text-white uppercase text-lg mx-auto p-2 rounded" onClick={this.handleLogin}>Login</button>
                                    <p className="mt-2 block w-full text-center no-underline text-sm text-gray-500 hover:text-gray-600">Don't have an account? <span onClick={this.handleToggle}>Create an account</span></p>
                                </>)
                            }
                        </div>
                    </section>
                </div>
                <section className="bg-gray-100">
                    <div className="container mx-auto px-6 py-20">
                        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                            What is Beanafide?
                        </h2>
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-white p-8 text-center inline-flex items-center justify-center w-full h-full mb-5 shadow-lg rounded bg-red-400">
                                                <h6 className="text-xl font-semibold">Coffee Lovers</h6>
                                            </div>
                                            
                                            <p className="mt-2 mb-4 text-gray-600">
                                                A blog made for coffee lovers who share the same interests regarding coffee.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-white p-8 text-center inline-flex items-center justify-center w-full h-full mb-5 shadow-lg rounded bg-blue-400">
                                                <h6 className="text-xl font-semibold">
                                                    Coffee Contact
                                                </h6>
                                            </div>
                                            <p className="mt-2 mb-4 text-gray-600">
                                                Want to contact the author to give him ideas on what coffee related thing he should review next? Feel free to hit the contact section.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-4/12 px-4 text-center">
                                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-white p-8 text-center inline-flex items-center justify-center w-full h-full mb-5 shadow-lg rounded bg-green-400">
                                                <h6 className="text-xl font-semibold">
                                                    Coming Soon!
                                                </h6>
                                            </div>
                                            <p className="mt-2 mb-4 text-gray-600">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quae qui natus officia velit adipisci quisquam sit alias. Necessitatibus unde consequuntur fuga ipsum aliquid porro voluptates nostrum repudiandae expedita est.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Landing);
