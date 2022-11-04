import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebase, usersRef } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import ScreenErrorDiv from './ScreenErrorDiv';
import Spinner from './ui/Spinner';
import FollowSection from './FollowSection';
import UserCardHeader from './UserCardHeader';
import UserBio from './UserBio';
import UserInfoLinks from './UserInfoLinks';
import UserLikesAndDislikes from './UserLikesAndDislikes';
import ImageModal from './ImageModal';
import BackTop from './BackTop';
import RatingModal from './RatingModal';

const UserScreen = ({history}) => {

    const { uid } = useParams();
    const currentUser = firebase.auth().currentUser;

    const urlParams = new URLSearchParams(history.location.search);
    const tab = urlParams.get('tab') || '';

    const [screenLoading, setScreenLoading] = useState(true);
    const [screenError, setScreenError] = useState(false);
    const [quantityFollowers, setQuantityFollowers] = useState(null);
    const [quantityFollowing, setQuantityFollowing] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState(false);
    const [activeSection, setActiveSection] = useState('Likes');
    const [followersData, setFollowersData] = useState([]);
    const [followingData, setFollowingData] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalLoading, setModalLoading] = useState(true);
    const [ratingSelected, setRatingSelected] = useState('Followers');

    const userInfo = useRef(null);
    const loggedUser = useRef(null);
    const containerRef = useRef();

    const tryAgainFn = () => {
        getDbData();
        setScreenLoading(true);
        setScreenError(false);
    }

    const handleScroll = () => {
        if(!containerRef.current) {
            return;
        }
        if(containerRef.current.getBoundingClientRect().top < -350){
            document.querySelector('.back-top').style.display = 'block';
        } else{
            document.querySelector('.back-top').style.display = 'none';
        }
    }

    const getDbData = useCallback( async () => {
        try {
            setScreenLoading(true);
            setModalLoading(true);

            userInfo.current = await usersRef.where('uid', '==', uid).get().then(returnDocuments);
            if(!userInfo.current.length){
                setScreenError(true);
                return;
            }

            loggedUser.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            if(!loggedUser.current.length){
                setScreenError(true);
                return;
            }

            const usersInfo = await usersRef.get().then(returnDocuments);

            const followers = usersInfo.filter(el => el.following.some(el => el.uid === uid));
            if(followers.length){
                followers.forEach(el => {
                    setFollowersData(c => [{
                        photoURL: el.photoURL,
                        name: el.name,
                        bio: el.bio,
                        uid: el.uid,
                        followers: el.followers,
                        following: el.following,
                    }, ...c])
                })
            }

            const following = usersInfo.filter(el => el.followers.some(el => el.uid === uid));
            if(following.length){
                following.forEach(el => {
                    setFollowingData(c => [{
                        photoURL: el.photoURL,
                        name: el.name,
                        bio: el.bio,
                        uid: el.uid,
                        followers: el.followers,
                        following: el.following,
                    }, ...c])
                })
            }

            setQuantityFollowers(followers.length);
            setQuantityFollowing(following.length);

            const isFollowingLoggedUser = userInfo.current[0].following.some(el => el.uid === currentUser.uid);
            if(isFollowingLoggedUser){
                setIsFollowing(true);
            }

            const isCurrentUserFollowingArr = loggedUser.current[0].following.some(el => el.uid === uid);
            if(isCurrentUserFollowingArr){
                setIsCurrentUserFollowing(true);
            }

            setScreenLoading(false);
            setModalLoading(false);
        } catch (error) {
            setScreenError(true);
        }
    }, [currentUser.uid, uid])

    useEffect(() => {
        
        getDbData();

        return () => {
            setScreenLoading(true);
            setScreenError(false);
            setQuantityFollowers(null);
            setQuantityFollowing(null);
            setIsFollowing(false);
            setIsCurrentUserFollowing(false);
            setActiveSection('Likes');
            setFollowersData([]);
            setFollowingData([]);
            setButtonLoading(false);
            setModalLoading(true);
            setRatingSelected('Followers');
            userInfo.current = null;
            loggedUser.current = null;
            containerRef.current = null;
        }

    }, [getDbData]);

    useEffect(() => {
        if(tab.trim() === ''){
            setActiveSection('Likes');
        } else if(tab.trim() === 'Dislikes'){
            setActiveSection('Dislikes');
        }
    }, [tab]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    });

    if(screenError){
        return (
            <ScreenErrorDiv fn={tryAgainFn} userScreen={true} />
        )
    }

    if(screenLoading){
        return (
            <Spinner />
        )
    }

    if(!screenLoading){
        history.listen(() => {
            if(document.querySelector('body').classList.contains('modal-open')){
                document.querySelector('body').classList.remove('modal-open');
                document.querySelector('body').style.overflow = 'auto';
                document.querySelector('body').style.paddingRight = '0px';
                document.querySelector('nav').classList.add('sticky-top');
            }

            if(document.querySelector('.swal2-container')){
                document.querySelector('.swal2-container').remove();
                document.querySelector('body').classList.remove('swal2-shown', 'swal2-height-auto');
                document.querySelector('html').classList.remove('swal2-shown', 'swal2-height-auto');
                document.querySelector('body').style.paddingRight = '0px';
            }
        })
    }

    return (
        <div className='mt-5' ref={containerRef}>

            <BackTop />
            
            <div className='card text-white bg-dark mb-5'> 

                <div className='card-header'>

                    <UserCardHeader 
                        userInfo={userInfo} 
                        loggedUser={loggedUser}
                        isFollowing={isFollowing} 
                        isCurrentUserFollowing={isCurrentUserFollowing}
                        setIsCurrentUserFollowing={setIsCurrentUserFollowing}
                        buttonLoading={buttonLoading}
                        setButtonLoading={setButtonLoading}
                        followersData={followersData}
                        setFollowersData={setFollowersData}
                        setQuantityFollowers={setQuantityFollowers}
                        setModalLoading={setModalLoading}
                    />

                </div>

                <ul className='list-group list-group-flush'>
                    <li className='list-group-item bg-dark'>
                        <FollowSection 
                            quantityFollowers={quantityFollowers} 
                            quantityFollowing={quantityFollowing} 
                            setRatingSelected={setRatingSelected}
                        />
                    </li>
                </ul>

                <div className='card-body d-flex flex-column gap-2'>
                    <UserBio userInfo={userInfo} />
                </div>

            </div>

            <UserInfoLinks 
                userInfo={userInfo} 
                loggedUser={loggedUser} 
                activeSection={activeSection} 
                history={history} 
            />

            <UserLikesAndDislikes activeSection={activeSection} userInfo={userInfo} />

            <ImageModal />

            <RatingModal 
                type={ratingSelected} 
                modalLoading={modalLoading} 
                followersData={followersData} 
                followingData={followingData} 
            />
        </div>
    )
}

export default UserScreen;
