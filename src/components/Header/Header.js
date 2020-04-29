import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser} from '../../redux/reducer';

const Header = props => {

const handleLogout = () =>{
    axios.get('/auth/logout')
         .then(()=>{
             // Clear user
            props.clearUser();
            props.history.push('/');
         })
         .catch(err=>console.log(err));
}

        console.log(props);
        return (
            <div>
                <div>Beanfide</div>
                {JSON.stringify(props.user) !== '{}' ?
                (
                    <nav>
                        <Link to='/posts'>Posts</Link>
                        <Link to='/contact'>Contact</Link>
                        <Link to=''>Socialize</Link>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/' onClick={()=>handleLogout()}>Logout</Link>
                    </nav>
                ) :
                (
                    <nav>
                        <Link to='/posts'>Posts</Link>
                        <Link to='/contact'>Contact</Link>
                    </nav>
                )}
            </div>
        )
}

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps,{clearUser})(Header))