import React, { useContext, useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import DashboardRoutes from './DashboardRoutes';
import { firebase } from '../firebase/firebase-config';
import Spinner from '../components/ui/Spinner';
import { context } from '../createContext';
import { types } from '../types/types';
import ForgotPasswordScreen from '../components/auth/ForgotPasswordScreen';
import { usersRef } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import Swal from 'sweetalert2';

export default function AppRouter() {

  const {dispatchAuth, isLoggedIn, setIsLoggedIn} = useContext(context);

  const [checking, setChecking] = useState(true); 

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async user => { 
      
      if(user?.uid){

        if(user.providerData[0].providerId === 'google.com'){

          try {
            const arrUsers = await usersRef.get().then(returnDocuments);
            const existUser = arrUsers.filter(el => el.uid === user.uid);
            
            if(arrUsers.length){
              if(!existUser.length){

                Swal.fire({
                  allowOutsideClick: false,
                  title: 'Select a name',
                  input: 'text',
                  inputPlaceholder: 'E.g. Franco Juri',
                  inputAttributes: {
                      autocapitalize: 'off',
                      maxLength: 30,
                  },
                  confirmButtonText: 'Submit',
                  showLoaderOnConfirm: true,
                  preConfirm: async (name) => {
                      return arrUsers.forEach((e) => {
                          if(name.trim().length <= 3){
                              Swal.showValidationMessage('The name must be at least 4 characters');
                          } else if(e.name.trim().toLowerCase() === name.trim().toLowerCase()){
                              Swal.showValidationMessage('The name is already used');
                          } 
                      })
                  }
                }).then((result) => {
                  if(result.isConfirmed){
                      user.updateProfile({
                        displayName: result.value.trim(),
                        photoURL: user.photoURL,
                      }).then( async () => {
  
                        const userObject = {
                            bio: null,
                            name: user.displayName,
                            uid: user.uid,
                            favorites: [],
                            dislikes: [],
                            likes: [],
                            followers: [],
                            following: [],
                            reviews: [],
                            photoURL: user.photoURL,
                        }
      
                        usersRef.add(userObject)
                        .then(() => {
                            dispatchAuth({
                              type: types.login,
                              payload: {
                                  uid: user.uid,
                                  displayName: user.displayName,
                                  photoURL: user.photoURL,
                              }
                            })
                            
                            setIsLoggedIn(true);
                        })
                        .catch(() => {
                          Swal.fire(
                              'Error',
                              'Account could not be created, try again later',
                              'error',
                          )
                        })
  
                      })
                  }
                })
              } else {
  
                  dispatchAuth({
                      type: types.login,
                      payload: {
                      uid: user.uid,
                      displayName: user.displayName,
                      photoURL: user.photoURL,
                      }
                  })
                  
                  setIsLoggedIn(true);
  
              }
            } else{
              window.location.reload();
            }
            
          } catch (error) {
            Swal.fire('An error has occurred an error occurred signing in')
            console.log(error);
          }

        } else {

          dispatchAuth({
            type: types.login,
            payload: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            }
          })
           
          setIsLoggedIn(true);

        }

      } else{
        setIsLoggedIn(false);
      }

      setChecking(false);
      
    });
  }, [dispatchAuth, setChecking, setIsLoggedIn]) 

  if(checking){
    return (
      <Spinner /> 
    )
  }

  return (
    <Router basename={window.location.pathname}>


      <div>

        <Switch>
    
          {
            (!isLoggedIn)
            &&
            <Switch>
              <Route exact path='/auth/login' component={LoginScreen} setIsLoggedIn={setIsLoggedIn} />
              <Route exact path='/auth/register' component={RegisterScreen} />
              <Route exact path='/auth/forgot-password' component={ForgotPasswordScreen} />
              <Redirect to='/auth/login' />
            </Switch>
          }

          {
            (isLoggedIn)
            &&
            <Route path='/' component={DashboardRoutes} />
          }

        </Switch>

      </div>

    </Router>
  );
}