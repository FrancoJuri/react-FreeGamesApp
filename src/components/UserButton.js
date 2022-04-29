import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usersRef, firebase } from '../firebase/firebase-config';

const UserButton = ({ loggedUser, userInfo, isCurrentUserFollowing, setIsCurrentUserFollowing, buttonLoading, setButtonLoading, followersData, setFollowersData, setQuantityFollowers, setModalLoading }) => {

    const currentUser = firebase.auth().currentUser;

    const setFollow = () => {
        setButtonLoading(true);
        setModalLoading(true);
        usersRef.doc(userInfo.current[0].docId).update({
            followers: firebase.firestore.FieldValue.arrayUnion({
                uid: currentUser.uid,
            })
        }).then(() => {
            setQuantityFollowers(c => c + 1);
            setIsCurrentUserFollowing(true);
            setFollowersData(c => [{
                photoURL: loggedUser.current[0].photoURL,
                uid: currentUser.uid,
                name: loggedUser.current[0].name,
                followers: loggedUser.current[0].followers,
                bio: loggedUser.current[0].bio,
            }, ...c])
        }).catch(() => {
            Swal.fire('An error has occurred following this user', '', 'error');
        }).finally(() => {
            setButtonLoading(false);
            setModalLoading(false);
        })
    }

    const unSetFollow = () => {
        setButtonLoading(true);
        setModalLoading(true);
        const filteredArr = userInfo.current[0].followers.filter(el => el.uid !== currentUser.uid);
        usersRef.doc(userInfo.current[0].docId).update({
            followers: filteredArr,
        }).then(() => {
            setQuantityFollowers(c => c - 1);
            setIsCurrentUserFollowing(false);
            const filteredFollowersData = followersData.filter(el => el.uid !== currentUser.uid);
            setFollowersData(filteredFollowersData);
        }).catch(() => {
            Swal.fire('An error has occurred unfollowing this user', '', 'error');
        }).finally(() => {
            setButtonLoading(false);
            setModalLoading(false);
        })
    }

    const setLoggedUserFollowing = () => {
        setButtonLoading(true);
        setModalLoading(true);
        const date = new Date().getTime();
        usersRef.doc(loggedUser.current[0].docId).update({
            following: firebase.firestore.FieldValue.arrayUnion({
                uid: userInfo.current[0].uid,
                viewed: false,
                date,
            })
        }).then(() => {
            setIsCurrentUserFollowing(true);
        }).catch(() => {
            Swal.fire('An error has occurred following this user', '', 'error');
        }).finally(() => {
            setButtonLoading(false);
            setModalLoading(false);
        })
    }
    
    const unSetLoggedUserFollowing = () => {
        setButtonLoading(true);
        setModalLoading(true);
        const filteredArr = loggedUser.current[0].following.filter(el => el.uid !== userInfo.current[0].uid);
        usersRef.doc(loggedUser.current[0].docId).update({
            following: filteredArr,
        }).then(() => {
            setIsCurrentUserFollowing(false);
        }).catch(() => {
            Swal.fire('An error has occurred unfollowing this user', '', 'error');
        }).finally(() => {
            setButtonLoading(false);
            setModalLoading(false);
        })
    }
    
    let component;

    if(userInfo.current[0].uid === loggedUser.current[0].uid){
        component = 
        <Link to='/settings' className='edit-profile-btn p-2 px-4 inter-font' >
            Edit Profile
        </Link> 
        
    } else if(isCurrentUserFollowing){
        component = 
        <button 
        className={`${(buttonLoading) && 'disabled'} following-profile-btn p-2 px-4 inter-font text-white`}
        disabled={buttonLoading}
        onClick={() => {
            Swal.fire({
                title: `Are you sure to unfollow @${userInfo.current[0].name}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, unfollow', 
            }).then( (result) => {
                if(result.isConfirmed){
                    unSetFollow();
                    unSetLoggedUserFollowing();
                }
            })
        }}>
            <span>Following</span>
        </button>
    } else {
        component = 
        <button 
        className={`${(buttonLoading) && 'disabled'} follow-profile-btn p-2 px-4 inter-font`}
        disabled={buttonLoading}
        onClick={() => {
            setFollow();
            setLoggedUserFollowing();
        }}>
            <strong>Follow</strong>
        </button>
    }

    return (component)
}

export default UserButton;
