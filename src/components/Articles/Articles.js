import React, { Component } from 'react';
import axios from 'axios';

export default class Articles extends Component {
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
    //     this.setState({
    //         title: this.props.post.title,
    //         image: this.props.post.image,
    //         content: this.props.post.content,
    //         rating: this.props.post.rating,
    //     })
    // }


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
                <div>
                    <button onClick={this.handleToggle}>Edit</button>
                    <button onClick={this.deletePost}>Delete</button>
                </div>
            )
        }
        else if(this.state.editView){
            return (
                <div>    
                    <input value={this.state.title} name='title' type="text" onChange={(e)=> this.handleInput(e)}/>
                    <input value={this.state.image} name='image' type="text" onChange={(e)=> this.handleInput(e)}/>
                    <select name="rating" id="" onChange={(e)=> this.handleInput(e)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <textarea value={this.state.content} name="content" id="" cols="30" rows="10" onChange={(e)=> this.handleInput(e)}></textarea>
                    <button onClick={this.editPost}>Submit</button>
                </div>
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
        console.log(this.props);
        return(

            <div className="flex justify-center max-w-sm w-full max-w-full flex">
                <div className="h-48 h-auto w-48 flex-none bg-cover rounded-t-none rounded-l text-center overflow-hidden" style={{'backgroundImage': `url(${this.props.post.image})`}} title="Post Image">
                </div>
                <div className="w-1/2 border-r border-b border-gray-400 border-l-0 border-t bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <div className="text-gray-800 font-bold text-xl mb-2">{this.props.post.title}</div>
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

