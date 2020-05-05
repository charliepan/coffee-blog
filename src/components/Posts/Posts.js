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
        this.setState({addPost: !this.state.addPost});
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
                        rating: 0
                    });
                 })
                 .catch(err => console.log(err));

            this.handleToggle();
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
            <div className="container mx-auto px-6 py-16 bg-white h-screen">
                {/* If admin user button will be available */}
                {this.props.user.admin ? 
                (
                    <div className="relative">    
                        <button className="absolute top-0 right-0 bg-orange-700 hover:bg-orange-500 text-white text-lg mx-auto p-2 rounded" onClick={this.handleToggle}>Add Post</button>
                    </div>
                ) : null
                }

                <div className="text-4xl font-bold text-center text-gray-800">
                    <h1 className="no-underline hover:underline">Recent Posts</h1>
                </div>
                {/* Toggle for create post */}
                {this.state.addPost ?
                (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl w-1/2">
                            {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none z-30">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Create A Post
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
                                            onClick={this.createPost}
                                        >
                                            Add Post
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
                ) : null
                }
                {this.state.posts.map((post ,i) => <Articles key={i} post={post} admin={this.props.user.admin} getAllPosts={this.getAllPosts}/>)}
                {/* {mappedPosts} */}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Posts);