import React, { Component } from 'react';
import {connect} from 'react-redux';

class Profile extends Component {

    // check if there's a user logged in
    componentDidMount(){
        if(!this.props.user.email){
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <div className="container mx-auto px-6 py-16 bg-white h-screen">
                <div className="text-4xl font-bold text-center text-gray-800">
                    <h1 className="no-underline hover:underline">Profile</h1>
                </div>
                <div className="flex relative justify-center py-2">
                    <img
                    alt="..."
                    src={this.props.user.profile_pic}
                    className="shadow-xl rounded h-auto items-center align-middle border-none"
                    style={{ maxWidth: "200px" }}
                    />
                </div>
                <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                        Welcome, {this.props.user.username}!
                    </h3>
                </div>
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">
                        Recent Comments
                    </h3>
                </div>
                <div className="flex justify-center max-w-sm w-full max-w-full flex mt-10">
                <div className="w-3/4 border shadow-lg border-gray-400 border-l-0 bg-white rounded p-12 flex flex-col justify-between leading-normal">
                    <div className="flex justify-center">
                        <div className="text-md">
                            <p className="text-gray-500 text-base text-center">Coming Soon...</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            

        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);
