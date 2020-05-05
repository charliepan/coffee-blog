import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Comments from '../Comments/Comments';

class Article extends Component {
    constructor(props){
        super(props);
        this.state={
            post:{},
            comments:[],
            comment: ''
        }
    }

    componentDidMount(){
        this.getPost();
        this.getComments();
    }

    handleInput = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    createComment = () =>{
        // console.log(this.props);
        const {id} = this.props.match.params,
              {comment} = this.state;
        // console.log(id);
        axios.post('/api/comments', {user_id: this.props.user.user_id , post_id: id, comment})
        .then(() => {
            this.getComments();
            this.setState({comment:''});
        })
        .catch(err => console.log(err));
    }

    getPost = () =>{
        // console.log(this.props);
        const {id} = this.props.match.params;
        // console.log(id);
        axios.get(`/api/posts/${id}`)
        .then(res => this.setState({post:res.data}))
        .catch(err => console.log(err));
    }

    getComments = () =>{
        // console.log(this.props);
        const {id} = this.props.match.params;
        // console.log(id);
        axios.get(`/api/post/comments/${id}`)
        .then(res => this.setState({comments:res.data}))
        .catch(err => console.log(err));
    }

    render() {
        // console.log(this.props);
        return(
            <>
                { JSON.stringify(this.state.post) !== '{}' ?
                    (<div className="container mx-auto px-6 py-16 bg-white h-1/2">
                        <div className="flex justify-center max-w-sm w-full max-w-full flex my-10">
                            <div className="h-48 h-auto w-48 flex-none bg-cover rounded-t-none rounded-l text-center overflow-hidden" style={{'backgroundImage': `url(${this.state.post[0].image})`}} title="Post Image">
                            </div>
                            <div className="w-1/2 border-r border-b border-gray-400 border-l-0 border-t bg-white rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal">
                                <div className="mb-8">
                                    <div className="text-gray-800 font-bold text-xl mb-2">{this.state.post[0].title}</div>
                                    <p className="text-gray-700 text-base">{this.state.post[0].content}</p>
                                </div>
                                <div className="flex items-center justify-end">
                                    <img className="w-10 h-10 rounded-full mr-4" src={`${this.state.post[0].profile_pic}`} alt={`Avatar of ${this.state.post[0].username}`} />
                                    <div className="text-sm">
                                        <p className="text-gray-800 leading-none">{this.state.post[0].username}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                :null
                }
                    <div className="container mx-auto px-6 bg-white h-screen">
                        <div className="justify-center items-center flex overflow-x-hidden inset-0 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto w-full">
                                <div className="border-0 relative flex flex-col w-full bg-white z-30">
                                    <div className="flex items-center p-6 border-b border-solid border-gray-300 rounded-b">
                                        <h3 className="text-3xl font-semibold">
                                            Comments
                                        </h3>
                                    </div>
                                { this.props.user.username ?
                                (
                                    <div className="p-6 w-full">
                                        <div className="flex flex-wrap mb-4 w-full">
                                            <label className="mb-2 font-bold text-lg text-gray-900">Your Comment</label>
                                            <textarea className="border py-2 px-3 text-gray-800 w-full" value={this.state.comment} name="comment" id="" cols="20" rows="5" placeholder="Enter your comments here" onChange={(e)=> this.handleInput(e)}></textarea>
                                        </div>
                                        <div className="flex justify-end flex-wrap mb-4 w-full">
                                           <button
                                                className="w-24 bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }} onClick={this.createComment}>Submit</button>
                                        </div>
                                    </div>
                                    ) : null
                                }
                                {this.state.comments.map((comment ,i) => <Comments key={i} comment={comment} user_id={this.props.user.user_id} getComments={this.getComments}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Article);
