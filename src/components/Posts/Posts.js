import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Articles from '../Articles/Articles';


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
            rating: 1,
            likes: 0,
            addPost: false,
        }
    }

    componentDidMount(){
        this.getAllPosts();
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
        const d  = new Date();
        const d_str = `${d.getMonth()+1}/${d.getDate()}/${d.getYear()} @ ${d.getHours()}:${d.getMinutes} CT`;
        this.setState({date_added: d_str});
        const {title, image, content, date_added, rating, likes} = this.state;
        console.log(this.props.user.user_id);
        console.log(this.state);
        if(image !== '' || content !== ''){
            axios.post('/api/post', {user_id:this.props.user.user_id,title, image, content, date_added, rating, likes})
                 .then(() =>{
                    this.getAllPosts();
                    this.setState({
                        title: '',
                        image: '',
                        content: '',
                        date_added: '',
                        rating: 0,
                    });
                 })
                 .catch(err => console.log(err));
        }
        else{
            alert("Please fill out all fields to create a post.");
        }
    }

    render() {
        
        // const mappedPosts = this.state.posts.map((post, i)=>{
        //     let limitCont = post.content;
        //     if(limitCont.length > 200){
        //         limitCont = limitCont.substring(0,200);
        //         console.log(limitCont);
        //     }
        //     return(
        //         <div class='post-box'>
        //             <img key={i} src={post.image} alt="blog-post"/>
        //             <h3>{post.title}</h3>
        //             <article>{limitCont}</article>
        //             {/* <span>{post.likes} Likes</span> */}
        //             <span>Created by {post.username}</span>
        //             {this.props.user.admin ?
        //                 ( <div>
        //                     <button>Edit</button>
        //                     <button>Delete</button>
        //                 </div>
        //                 ) : null
        //             }
        //         </div>
        //     )
        // })

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
                {this.state.posts.map((post ,i) => <Articles key={i} post={post} admin={this.props.user.admin} getAllPosts={this.getAllPosts}/>)}
                {/* {mappedPosts} */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Posts);