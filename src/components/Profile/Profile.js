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
            <div className="flex items-center justify-center max-w-sm w-1/2 max-w-full flex h-screen">
                <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <div className="relative">
                                <img
                                alt="..."
                                src={this.props.user.profile_pic}
                                className="shadow-xl rounded h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                style={{ maxWidth: "200px" }}
                                />
                            </div>
                            </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                                    {this.props.user.username}
                                </h3>
                            </div>
                            <div className="mt-10 py-10 border-t border-gray-300 text-center"></div>
                    </div>
                </div>
            </div>
            

        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);
