import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class Articles extends Component {
    constructor(props){
        super(props);
        this.state={
            title: this.props.post.title,
            image: this.props.post.image,
            content: this.props.post.content,
            rating: this.props.post.rating,
            editView: false
        }
    }


    // componentDidMount(){
    //     this.props.getAllPosts();
    // }

    // componentDidUpdate(){
    //     this.setState({
    //         title: this.props.post.title,
    //         image: this.props.post.image,
    //         content: this.props.post.content,
    //         rating: this.props.post.rating,
    //     })
    // }
    postLink = () =>{
        this.props.history.push(`/post/${this.props.post.post_id}`);
    }

    editPost = () =>{
        const {title, image, content, rating} = this.state;
        axios.put(`/api/posts/${this.props.post.post_id}`, {title, image, content, rating})
        .then(res => {
            console.log("This is inside edit Post: " + res.data);
            this.props.getAllPosts();
            this.handleToggle();
        })
        .catch(err => console.log(err));
    }

    deletePost = () =>{
        axios.delete(`/api/posts/${this.props.post.post_id}`)
        .then(res => {
            console.log("This is inside Delete Post: " + res.data);
            this.props.getAllPosts();
        })
        .catch(err => console.log(err));
    }

    handleToggle = () =>{
        this.setState({editView: !this.state.editView});
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    conditionalViews(){

        if(this.props.admin && this.state.editView === false){
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
                        onClick={this.deletePost}
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
                                        Edit A Post
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
                                        <label className="mb-2 font-bold text-lg text-gray-900">Title</label>
                                        <input className="border py-2 px-3 text-gray-800"  value={this.state.title} name='title' type="text" placeholder="Title" onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Image</label>
                                        <input className="border py-2 px-3 text-gray-800" value={this.state.image} name='image' type="text" placeholder="Image" onChange={(e)=> this.handleInput(e)}/>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Rating</label>
                                        <select className="border py-2 px-3 text-gray-800" name="rating" id="" onChange={(e)=> this.handleInput(e)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col mb-4 md:w-full">
                                        <label className="mb-2 font-bold text-lg text-gray-900">Content</label>
                                        <textarea className="border py-2 px-3 text-gray-800" value={this.state.content} name="content" id="" cols="30" rows="10" placeholder="Post content here..." onChange={(e)=> this.handleInput(e)}></textarea>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.editPost}
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
        let limitCont = this.props.post.content;
        if(limitCont.length > 200){
            limitCont = limitCont.substring(0,200);
            limitCont = limitCont + '...';
            console.log(limitCont);
        }
        // console.log(this.props);
        return(

            <div className="flex justify-center max-w-sm w-full max-w-full flex my-10">
                <div className="h-48 h-auto w-48 flex-none bg-cover rounded-t-none rounded-l text-center overflow-hidden" style={{'backgroundImage': `url(${this.props.post.image})`}} title="Post Image" onClick={this.postLink}>
                </div>
                <div className="w-1/2 border-r border-b border-gray-400 border-l-0 border-t bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-800 font-bold text-xl mb-2" onClick={this.postLink}>{this.props.post.title}</div>
                        <p className="text-gray-700 text-base">{limitCont}</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={`${this.props.post.profile_pic}`} alt={`Avatar of ${this.props.post.username}`} />
                        <div className="text-sm">
                            <p className="text-gray-800 leading-none">{this.props.post.username}</p>
                        </div>
                    </div>
                    {this.conditionalViews()}
                </div>
            </div>
        )
    }
}

export default withRouter(Articles)