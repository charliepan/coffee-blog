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
                    <button>Delete</button>
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
            console.log(limitCont);
        }
        console.log(this.props);
        return(
            <div className='post-box'>
                <img src={this.props.post.image} alt="blog-post"/>
                <h3>{this.props.post.title}</h3>
                <article>{limitCont}</article>
                <span>Created by {this.props.post.username}</span>
                {this.conditionalViews()}
            </div>
        )
    }
}

