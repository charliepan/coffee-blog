import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Comments extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: this.props.comment.comment,
            editView: false
        }
    }

    handleToggle = () =>{
        this.setState({editView: !this.state.editView});
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    editComment = () =>{
        const {comment} = this.state;
        axios.put(`/api/comments/${this.props.comment.comment_id}`, {comment})
        .then(res => {
            console.log("This is inside edit Post: " + res.data);
            this.props.getComments();
            this.handleToggle();
        })
        .catch(err => console.log(err));
    }

    deleteComment = () =>{
        axios.delete(`/api/comments/${this.props.comment.comment_id}`)
        .then(res => {
            console.log("This is inside Delete comment: " + res.data);
            this.props.getComments();
        })
        .catch(err => console.log(err));
    }

    conditionalViews(){

        if(this.props.user_id !== undefined && this.props.comment.user_id === this.props.user_id && this.state.editView === false){
            return ( 
                <div className="flex items-center justify-end p-2">
                    <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={this.handleToggle}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={this.deleteComment}
                    >
                        Delete
                    </button>
                </div>
            )
        }
        else if(this.state.editView){
            return (
                    <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl w-1/2">
                        {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-30">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit A Comment
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={this.handleToggle}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </button>
                                </div>
                                {/*Inputs*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Comment</label>
                                        <input className="border py-2 px-3 text-gray-800"  value={this.state.comment} name='comment' type="text" placeholder="Comment" onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.editComment}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.handleToggle}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-10 bg-black"></div>
                </>

            )
        }

        return (
            null
        )
    }

    render() {
        console.log(this.props);

        return (

            <div className="flex justify-center max-w-sm w-full max-w-full flex mt-10">
                <div className="w-3/4 border shadow-lg border-gray-400 border-l-0 border-t bg-white rounded p-4 flex flex-col justify-between leading-normal">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={`${this.props.comment.profile_pic}`} alt={`Avatar of ${this.props.comment.username}`} />
                        <div className="text-sm">
                            <p className="text-gray-800 leading-none">{this.props.comment.username} Says:</p>
                            <p className="text-gray-700 text-base">{this.props.comment.comment}</p>
                        </div>
                    </div>
                    {this.conditionalViews()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Comments);
