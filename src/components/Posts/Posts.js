import React, { Component } from 'react';
import {connect} from 'react-redux';

class Posts extends Component {
    // check if there's a user logged in
    // componentDidMount(){
    //     if(!this.props.user.email){

    //     }
    // }

    constructor(props){
        super(props);
        this.state={
            posts:[],
            title: 0,
            image: '',
            content: '',
            date: '',
            rating: 0,
            likes: 0,
            addPost: false,
        }
    }

    handleToggle = () =>{
        this.setState({registerView: !this.state.addPost})
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.user.admin ? 
                (
                    <div>    
                        <input value={this.state.title} name='title' type="text" placeholder="title" onChange={(e)=> this.handleInput(e)}/>
                        <input value={this.state.image} name='image' type="text" placeholder="image" onChange={(e)=> this.handleInput(e)}/>
                        <textarea value={this.state.content} name="content" id="" cols="30" rows="10" placeholder="Post content here" onChange={(e)=> this.handleInput(e)}></textarea>
                        <button>Submit</button>
                        <button onClick={this.handleToggle}>Add Post</button>
                    </div>
                ) : null
                }
                <h1>Recent Posts</h1>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Posts);