import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdvancedGameFiltersScreen from '../components/AdvancedGameFiltersScreen';
import AllGamesScreen from '../components/AllGamesScreen';
import CategoryScreen from '../components/CategoryScreen';
import FavoritesScreen from '../components/FavoritesScreen';
import GameScreen from '../components/GameScreen';
import HomeScreen from '../components/HomeScreen';
import NotificationsScreen from '../components/NotificationsScreen';
import ProfileSettingsScreen from '../components/ProfileSettingsScreen';
import SearchScreen from '../components/SearchScreen';
import SearchUsersScreen from '../components/SearchUsersScreen';
import NavBar from '../components/ui/NavBar';
import Spinner from '../components/ui/Spinner';
import UserScreen from '../components/UserScreen';
import { context } from '../createContext';
import { firebase, usersRef } from '../firebase/firebase-config'; 
import { returnDocuments } from '../helpers/returnDocuments';

const DashboardRoutes = () => {

    const currentUser = firebase.auth().currentUser;

    const { setIsLoggedIn, setNotifications, setUnseenNotifications } = useContext(context);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const userInfo = useRef(null);

    const getDbData = useCallback( async () => {

        try {
            setLoading(true);
            userInfo.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            if(!userInfo.current.length){
                setError(true);
                return;
            }

            const usersInfo = await usersRef.get().then(returnDocuments);

            const notificationsArr = usersInfo.filter(el => el.following.some(el => el.uid === currentUser.uid));
            notificationsArr.sort((a, b) => {
                const dateA = a.following.filter(el => el.uid === currentUser.uid);
                const dateB = b.following.filter(el => el.uid === currentUser.uid);
                if(dateA[0].date < dateB[0].date){
                    return 1;
                }

                if(dateA[0].date > dateB[0].date){
                    return -1;
                }
                
                return 0;
            })
            setNotifications(notificationsArr);
            setUnseenNotifications(notificationsArr.filter(el => el.following.some(el => !el.viewed)).length);
            
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
        }

    }, [currentUser.uid, setNotifications, setUnseenNotifications])

    useEffect(() => {
        
        getDbData();

        return () => {
            setLoading(true);
            setError(false);
            userInfo.current = null;
        }
        
    }, [getDbData]);

    useEffect(() => {
        if(error){
            getDbData();
            setError(false);
        }
    }, [error, getDbData, setError]);
    
    if(loading){
        return (
            <Spinner />
        )
    }

    return (
        <>
            <NavBar userInfo={userInfo.current[0]} setIsLoggedIn={setIsLoggedIn} />
            <div className='container'>
                <Switch>
                    <Route exact path='/home' component={HomeScreen} />
                    <Route exact path='/category/:category' component={CategoryScreen} />
                    <Route exact path='/all' component={AllGamesScreen} />
                    <Route exact path='/advancedFilters' component={AdvancedGameFiltersScreen} />
                    <Route exact path='/game/:id' component={GameScreen} />
                    <Route exact path='/search/games' component={SearchScreen} />
                    <Route exact path='/search/users' component={SearchUsersScreen} />
                    <Route exact path='/favorites' component={FavoritesScreen} />
                    <Route exact path='/user/:uid' component={UserScreen} />
                    <Route exact path='/notifications' component={NotificationsScreen} />
                    <Route exact path='/settings' component={ProfileSettingsScreen} />

                    <Redirect to='/home' />
                </Switch> 
            </div>
        </>
    )
}

export default DashboardRoutes;
