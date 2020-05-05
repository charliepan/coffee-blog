import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {

    constructor(props){
        super(props)
        this.state ={
            name: '',
            email: '',
            subject: '',
            question: ''
        }
    }
    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    contactEmail = () =>{
        const {name, email, subject, question} = this.state;
        axios.post('/contact/blog', {name, email, subject, question})
             .then(res =>{
                console.log(res);
             })
            .catch(err => console.log(err));
    }
    receiveEmail = () =>{
        const {name, email, subject, question} = this.state;
        axios.post('/contact/response', {name, email, subject, question})
             .then(res =>{
                console.log(res);
             })
             .catch(err => console.log(err));
    }
    

    handleSubmit = () =>{
        const {name, email, subject, question} = this.state;
        if(name !== '' && email !== '' && subject !== '' && question !== ''){
            this.contactEmail();
            this.receiveEmail();
            this.setState({
                name: '',
                email: '',
                subject: '',
                question: ''
            });
        }
        else{
            alert("Please fill out all fields");
        }
    }

    render() {
        return (
            <div className="container mx-auto px-6 py-12 bg-white h-screen">
                <div className="justify-center items-center flex overflow-x-hidden inset-0 z-20 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto w-5/6">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-30">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Ask Away
                                    </h3>
                                </div>
                                {/*Inputs*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Your Name</label>
                                        <input className="border py-2 px-3 text-gray-800"  value={this.state.name} name='name' type="text" placeholder="Enter your name" onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Your Email</label>
                                        <input className="border py-2 px-3 text-gray-800"  value={this.state.email} name='email' type="text" placeholder="Enter your email" onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Subject</label>
                                        <input className="border py-2 px-3 text-gray-800" value={this.state.subject} name='subject' type="text" placeholder="Enter a subject" onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Question</label>
                                        <textarea className="border py-2 px-3 text-gray-800" value={this.state.question} name="question" id="" cols="30" rows="6" placeholder="Enter your question here" onChange={(e)=> this.handleInput(e)}></textarea>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
