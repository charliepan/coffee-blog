import React, { Component } from 'react';
import {connect} from 'react-redux';

class Posts extends Component {
    // check if there's a user logged in
    // componentDidMount(){
    //     if(!this.props.user.email){

    //     }
    // }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Recent Posts</h1>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Posts);