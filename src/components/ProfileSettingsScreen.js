import React, { useCallback, useEffect, useRef, useState } from 'react';
import { firebase, usersRef } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import DeleteAccount from './DeleteAccount';
import EditProfileCard from './EditProfileCard';
import EmailStatus from './EmailStatus';
import ScreenErrorDiv from './ScreenErrorDiv';
import Spinner from './ui/Spinner';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';

const ProfileSettingsScreen = ({history}) => {

    const currentUser = firebase.auth().currentUser;

    const [screenLoading, setScreenLoading] = useState(true);
    const [screenError, setScreenError] = useState(false);

    const userInfo = useRef(null);

    const tryAgainFn = () => {
        getDbData();
        setScreenLoading(true);
        setScreenError(false);
    }

    const getDbData = useCallback( async () => {
        try {
            setScreenLoading(true);
            userInfo.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            if(!userInfo.current.length){
                setScreenError(true);
                return;
            }

            setScreenLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [currentUser.uid])

    useEffect(() => {

        getDbData();

        return () => {
            setScreenLoading(null);
            setScreenError(null);
            userInfo.current = null;
        }

    }, [getDbData]);

    if(screenError){
        return (
            <ScreenErrorDiv fn={tryAgainFn} />
        )
    }

    if(screenLoading){
        return (
            <Spinner />
        )
    }

    history.listen(() => {
        if(document.querySelector('.swal2-container')){
            document.querySelector('.swal2-container').remove();
            document.querySelector('body').classList.remove('swal2-shown', 'swal2-height-auto');
            document.querySelector('html').classList.remove('swal2-shown', 'swal2-height-auto');
            document.querySelector('body').style.paddingRight = '0px';
        }
    })

    return (
        <div className='mt-5 mb-5'>

            <EditProfileCard userInfo={userInfo.current[0]} />
            <EmailStatus />
            <UpdateEmail />
            <UpdatePassword />
            <DeleteAccount userInfo={userInfo.current[0]} />

        </div>
    )
}

export default ProfileSettingsScreen;
