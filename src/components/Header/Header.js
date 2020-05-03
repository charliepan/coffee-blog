import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {clearUser} from '../../redux/reducer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'

class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            toggleMenu: false
        }
    }

    handleLogout = () =>{
        axios.get('/auth/logout')
             .then(()=>{
                 // Clear user
                this.props.clearUser();
                this.props.history.push('/');
             })
             .catch(err=>console.log(err));
        this.handleClick();
    }

    handleClick = () =>{
        this.setState({toggleMenu: !this.state.toggleMenu});
    }

    render() {
        return (
            <nav className="bg-orange-700 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-2">
                <div className="flex items-center justify-between px-4 py-2 sm:p-0">
                    <div className='px-2'>
                        <FontAwesomeIcon icon="coffee" color="white"/>
                        <span className="h-8 text-white px-2">Beanafide</span>
                    </div>
                    <div className="sm:hidden">
                        <button className={`px-3 rounded ${this.state.toggleMenu ? 'bg-orange-500':'bg-orange-700'}`} onClick={()=> this.setState({toggleMenu: !this.state.toggleMenu})}>
                            { this.state.toggleMenu ? <FontAwesomeIcon icon="times" color="white"/> : <FontAwesomeIcon icon="bars" color="white"/>}
                        </button>
                    </div>
                </div>
                {JSON.stringify(this.props.user) !== '{}' ?
                (
                        <div className={`px-4 pt-2 pb-4 ${this.state.toggleMenu ? 'block':'hidden'} sm:flex sm:p-0`}>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 rounded" to='/posts' onClick={this.handleClick} >Posts</Link>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 mt-1 rounded sm:mt-0 sm:ml-2" to='/contact' onClick={this.handleClick} >Contact</Link>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 mt-1 rounded sm:mt-0 sm:ml-2" to='' onClick={this.handleClick} >Socialize</Link>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 mt-1 rounded sm:mt-0 sm:ml-2" to='/profile' onClick={this.handleClick} >Profile</Link>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 mt-1 rounded sm:mt-0 sm:ml-2" to='/' onClick={this.handleLogout}>Logout</Link>
                        </div>
                ) :
                (
                        <div className={`px-4 pt-2 pb-4 ${this.state.toggleMenu ? 'block':'hidden'} sm:flex sm:p-0`}>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 rounded" to='/' onClick={this.handleClick} >Home</Link>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 mt-1 rounded sm:mt-0 sm:ml-2" to='/posts' onClick={this.handleClick} >Posts</Link>
                            <Link className="text-white block font-semibold hover:bg-orange-500 px-2 py-1 mt-1 rounded sm:mt-0 sm:ml-2" to='/contact' onClick={this.handleClick} >Contact</Link>
                        </div>
                )}

            </nav>
        )
    }
}


// const Header = props => {
//     let toggleMenu = false;
// const handleLogout = () =>{
//     axios.get('/auth/logout')
//          .then(()=>{
//              // Clear user
//             props.clearUser();
//             props.history.push('/');
//          })
//          .catch(err=>console.log(err));
// }

//         console.log(props);
//         return (
//             <nav className="bg-orange-700">
//                 <div className="flex items-center justify-between px-4 py-2">
//                     <div className='px-2'>
//                         <FontAwesomeIcon icon="coffee" color="white"/>
//                         <span className="h-8 text-white px-2">Beanafide</span>
//                     </div>
//                     <div>
//                         <button className="px-3" onClick={()=> toggleMenu = !toggleMenu}>
//                             <FontAwesomeIcon icon="bars" color="white"/>
//                         </button>
//                     </div>
//                 </div>
//                 {JSON.stringify(props.user) !== '{}' ?
//                 (
//                         <div className="px-4 pt-2 pb-4">
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 rounded" to='/posts'>Posts</Link>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 mt-1 rounded" to='/contact'>Contact</Link>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 mt-1 rounded" to=''>Socialize</Link>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 mt-1 rounded" to='/profile'>Profile</Link>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 mt-1 rounded" to='/' onClick={()=>handleLogout()}>Logout</Link>
//                         </div>
//                 ) :
//                 (
//                         <div className={`px-4 pt-2 pb-4 ${toggleMenu ? 'block':'hidden'}`}>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 rounded" to='/'>Home</Link>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 mt-1 rounded" to='/posts'>Posts</Link>
//                             <Link className="text-white block font-semibold hover:bg-orange-600 px-2 py-1 mt-1 rounded" to='/contact'>Contact</Link>
//                         </div>
//                 )}

//             </nav>
//         )
// }

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps,{clearUser})(Header))