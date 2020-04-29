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
            postImage: ''
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.user.admin ? 
                (
                    <div>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <button>Add Post</button>
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