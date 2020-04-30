import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


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
            title: '',
            image: '',
            content: '',
            date_added: '',
            rating: 0,
            likes: 0,
            addPost: false,
        }
    }

    getAllPosts = () =>{
        axios.get('/api/posts')
        .then(res => this.setState({posts:res.data}))
        .catch(err => console.log(err));
    }

    handleToggle = () =>{
        this.setState({registerView: !this.state.addPost});
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    }

    createPost = () =>{
        let d  = new Date();
        this.setState({date_added: `${d.getMonth()+1}/${d.getDate()}/${d.getYear()} @ ${d.getHours()}:${d.getMinutes} CT`});
        const {title, image, content, date_added, rating, likes} = this.state;
        if(image !== '' || content !== ''){
            axios.post('/api/post', {user_id:this.props.user.user_id,title, image, content, date_added, rating, likes})
                 .then(res =>{
                    this.getAllPosts();
                 })
                 .catch(err => console.log(err));
        }
        else{
            alert("Please fill out all fields to create a post.");
        }
    }

    render() {
        
        const mappedPosts = this.state.posts.map((post, i)=>{
            let limitCont = post.content;
            if(limitCont.length > 200){
                limitCont = limitCont.substring(0,200);
            }
            return(
                <div class='post-box'>
                    <img key={i} src={post.image} alt="blog-post"/>
                    <h3>{post.title}</h3>
                    <article>{limitCont}</article>
                    <span>{post.likes} Likes</span>
                    <span>Create on {post.date_added}</span>
                    {this.props.user.admin ?
                        ( <div>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                        ) : null
                    }
                </div>
            )
        })

        return (
            <div>
                {this.props.user.admin ? 
                (
                    <div>    
                        <input value={this.state.title} name='title' type="text" placeholder="title" onChange={(e)=> this.handleInput(e)}/>
                        <input value={this.state.image} name='image' type="text" placeholder="image" onChange={(e)=> this.handleInput(e)}/>
                        <select name="rating" id="" onChange={(e)=> this.handleInput(e)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <textarea value={this.state.content} name="content" id="" cols="30" rows="10" placeholder="Post content here" onChange={(e)=> this.handleInput(e)}></textarea>
                        <button onClick={this.createPost}>Submit</button>
                        <button onClick={this.handleToggle}>Add Post</button>
                    </div>
                ) : null
                }
                <h1>Recent Posts</h1>
                {mappedPosts}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Posts);