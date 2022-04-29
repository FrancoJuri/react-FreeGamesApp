import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { context } from '../../createContext';
import { types } from '../../types/types';
import { firebase } from '../../firebase/firebase-config';
import CategoriesModal from '../CategoriesModal';
import DefaultUserImg from '../DefaultUserImg';
import { svgAccount, svgSettingsAccount, svgLogout, svgFavorite, notificationsIcon } from '../../assets/svgs';
import SearchIcon from '../SearchIcon';

const NavBar = ({userInfo, setIsLoggedIn}) => {

    const { dispatchAuth, unseenNotifications } = useContext(context);
    const currentUser = firebase.auth().currentUser;

    const handleLogout = () => {
        dispatchAuth({
            type: types.logout,
        })
        setIsLoggedIn(false);
        firebase.auth().signOut();
    }

    useEffect(() => {

        if(window.matchMedia('(max-width: 991px)').matches){
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    document.querySelector('.navbar-toggler').click();
                });
            })
        }

    }, [])

    useEffect(() => {
        if(window.location.pathname.includes('/category')){
            document.querySelector('.categories-dropdown').classList.add('active');
        } else{
            document.querySelector('.categories-dropdown').classList.remove('active');
        }
    })
    

    return (
        <>
            <nav className='fadeIn navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top'>
                <div className='container-fluid'>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarTogglerDemo03' aria-controls='navbarTogglerDemo03' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <Link className='navbar-brand inter-font' to='/'>Free Games</Link>
                    <div className='collapse navbar-collapse' id='navbarTogglerDemo03'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <NavLink exact activeClassName='active' className='nav-link inter-font' to='/home'>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink activeClassName='active' to='/all' className='nav-link inter-font'>All Games</NavLink>
                            </li>
                            <li className='nav-item dropdown'>
                                <div className='categories-dropdown nav-link dropdown-toggle inter-font' id='navbarScrollingDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Categories
                                </div>
                                <ul className='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarScrollingDropdown'>
                                    <li><Link to='/category/shooter' className='dropdown-item inter-font'>Shooter</Link></li>
                                    <li><Link to='/category/mmorpg' className='dropdown-item inter-font'>Mmorpg</Link></li>
                                    <li><hr className='dropdown-divider'/></li>
                                    <li className='dropdown-item pointer inter-font' data-bs-toggle='modal' data-bs-target='#exampleModal'>All categories</li>
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <NavLink activeClassName='activeSearchIcon' to='/search/games' className='nav-link'><SearchIcon /></NavLink>
                            </li>
                            <li className='nav-item'>
                                <div className='nav-link disabled inter-font'>Recomendations</div>
                            </li>
                        </ul>
                        <div className='btn-group dropdown mt-lg-0 py-1 mt-3'>
                            <button id='user-button' type='button' className='btn btn-secondary dropdown-toggle d-flex align-items-center' data-bs-toggle='dropdown' aria-expanded='false' style={{transition: 'all 270ms'}}>
                                {
                                    (userInfo.photoURL)
                                    ?
                                    <div className='user-photo d-flex me-2'>
                                        <img src={`${userInfo.photoURL}`} alt='Profile' />
                                    </div>
                                    :
                                    <DefaultUserImg profileScreenPhoto={false} />
                                }
                                
                                {
                                    (unseenNotifications >= 1)
                                    &&
                                    <span className='position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
                                        <span className='visually-hidden'>New alerts</span>
                                    </span>
                                }
                            </button>
                            <ul className='user-dropdown-menu dropdown-menu dropdown-menu-sw dropdown-menu-dark'>
                                <li>
                                    <Link to={`/user/${currentUser.uid}`} className='dropdown-item inter-font'>
                                        {svgAccount}  &nbsp;Your profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/favorites' className='dropdown-item inter-font'>
                                        {svgFavorite}  &nbsp;Favorites
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/notifications' className='dropdown-item inter-font d-flex align-items-center justify-content-start'>
                                        {notificationsIcon}  &nbsp;Notifications&nbsp;&nbsp;
                                        {
                                            (unseenNotifications >= 1)
                                            &&
                                            <span className='p-2 bg-danger border border-light rounded-circle'>
                                                <span className='visually-hidden'>New alerts</span>
                                            </span>
                                        }
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/settings' className='dropdown-item inter-font'>
                                        {svgSettingsAccount}  &nbsp;Settings
                                    </Link>
                                </li>
                                <li><hr className='dropdown-divider' /></li>
                                <li className='dropdown-item inter-font pointer' onClick={handleLogout}>
                                    {svgLogout}  &nbsp;Sign out
                                </li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </nav> 
            <CategoriesModal />
        </>
    )
}

export default NavBar; 
