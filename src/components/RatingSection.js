import React, { useCallback, useEffect, useRef, useState } from 'react';
import DislikeButton from './DislikeButton';
import LikeButton from './LikeButton';
import { firebase, usersRef } from '../firebase/firebase-config';
import RatingModal from './RatingModal';
import { returnDocuments } from '../helpers/returnDocuments';
import Swal from 'sweetalert2';
import TryAgainButton from './TryAgainButton';

const RatingSection = ({setQuantityLikes, setQuantityDislikes, quantityLikes, quantityDislikes, userDocRef, id, content}) => {
                        
    const [activeLikes, setActiveLikes] = useState(false);
    const [activeDislikes, setActiveDislikes] = useState(false);
    const [likeData, setLikeData] = useState([]);
    const [dislikeData, setDislikeData] = useState([]);
    const [modalLoading, setModalLoading] = useState(true);
    const [ratingLoading, setRatingLoading] = useState(true);
    const [ratingSelected, setRatingSelected] = useState('Likes');
    const [error, setError] = useState(false);
    const currentUser = firebase.auth().currentUser;
    const userInfo = useRef();

    const setLike = () => {
        setModalLoading(true); 
        usersRef.doc(userDocRef).update({
            likes: firebase.firestore.FieldValue.arrayUnion({
                genre: content.genre,
                id,
                shortDescription: content.short_description,
                thumbnail: content.thumbnail,
                title: content.title,
            })
        }).then(() => {
            setLikeData(c => [{
                photoURL: userInfo.current[0].photoURL,
                name: currentUser.displayName,
                bio: userInfo.current[0].bio,
                uid: currentUser.uid,
                followers: userInfo.current[0].followers,
                following: userInfo.current[0].following,
            }, ...c]);
        }).catch(() => {
            Swal.fire('An error has occurred, try again later', '', 'error');
        }).finally(() => {
            setModalLoading(false);
        })
    }

    const unSetLike = () => {
        setModalLoading(true);
        const filteredLikeArr = likeData.filter(el => el.uid !== currentUser.uid);
        const filteredUserArr = userInfo.current[0].likes.filter(el => el.id !== id);
        usersRef.doc(userDocRef).update({
            likes: filteredUserArr,
        }).then(() => {
            setLikeData(filteredLikeArr);
        }).catch(() => {
            Swal.fire('An error has occurred, try again later', '', 'error');
        }).finally(() => {
            setModalLoading(false);
        })
    }

    const setDislike = () => {
        setModalLoading(true);
        usersRef.doc(userDocRef).update({
            dislikes: firebase.firestore.FieldValue.arrayUnion({
                genre: content.genre,
                id,
                shortDescription: content.short_description,
                thumbnail: content.thumbnail,
                title: content.title,
            })
        }).then(() => {
            setDislikeData(c => [{
                photoURL: userInfo.current[0].photoURL,
                name: currentUser.displayName,
                bio: userInfo.current[0].bio,
                uid: currentUser.uid,
                followers: userInfo.current[0].followers,
                following: userInfo.current[0].following,
            }, ...c])
        }).catch(() => {
            Swal.fire('An error has occurred, try again later', '', 'error');
        }).finally(() => {
            setModalLoading(false);
        })
    }

    const unSetDislike = () => {
        setModalLoading(true);
        const filteredDislikeArr = dislikeData.filter(el => el.uid !== currentUser.uid);
        const filteredUserArr = userInfo.current[0].dislikes.filter(el => el.id !== id);
        usersRef.doc(userDocRef).update({
            dislikes: filteredUserArr,
        }).then(() => {
            setDislikeData(filteredDislikeArr);
        }).catch(() => {
            Swal.fire('An error has occurred, try again later', '', 'error');
        }).finally(() => {
            setModalLoading(false);
        })
    }

    const getDbData = useCallback( async () => {
        try {
            userInfo.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            const userLikes = userInfo.current[0].likes.filter(el => el.id === id);
            userLikes.length && setActiveLikes(true);
            const userDislikes = userInfo.current[0].dislikes.filter(el => el.id === id);
            userDislikes.length && setActiveDislikes(true);
            const usersInfo = await usersRef.get().then(returnDocuments);
            const likesArrays = usersInfo.map(data => {
                return data.likes.filter(el => el.id === id);
            })
            
            const likes = likesArrays.filter(el => el.length)
            setQuantityLikes(likes.length);
            
            const dislikesArrays = usersInfo.map(data => {
                return data.dislikes.filter(el => el.id === id);
            })
            const dislikes = dislikesArrays.filter(el => el.length);
            setQuantityDislikes(dislikes.length);

            usersInfo.forEach(el => {
                if(el.likes?.length){
                    const filteredLikesArr = el.likes.filter(el => el.id === id);
                    if(filteredLikesArr.length){
                        setLikeData(c => [{
                            photoURL: el.photoURL,
                            name: el.name,
                            bio: el.bio,
                            uid: el.uid,
                            followers: el.followers,
                            following: el.following,
                        }, ...c])
                    }
                }

                if(el.dislikes?.length){
                    const filteredDislikesArr = el.dislikes.filter(el => el.id === id);
                    if(filteredDislikesArr.length){
                        setDislikeData(c => [{
                            photoURL: el.photoURL,
                            name: el.name,
                            bio: el.bio,
                            uid: el.uid,
                            followers: el.followers,
                            following: el.following
                        }, ...c])
                    }
                }
                
                setRatingLoading(false);
                setModalLoading(false);
            })
        } catch (error) {
            Swal.fire('An error has occurred loading the likes and dislikes, try again later', '', 'error');
            setRatingLoading(false);
            setModalLoading(false);
            setError(true);
        } 
    }, [currentUser.uid, id, setQuantityLikes, setQuantityDislikes])

    useEffect(() => {

        getDbData();

        return () => {
            userInfo.current = null;
            setQuantityLikes(null)
            setQuantityDislikes(null);
            setActiveLikes(false);
            setActiveDislikes(false);
            setLikeData([]);
            setDislikeData([]);
            setModalLoading(true);
            setRatingLoading(true);
            setRatingSelected('Likes');
            setError(false);
        }
    }, [id, setQuantityDislikes, setQuantityLikes, currentUser.uid, getDbData])

    if(ratingLoading){
        return (
            <div style={{ height: '200px', display: 'grid', placeContent: 'center' }}>
                <div className='spinner-grow text-primary text-center' style={{width: '6.5rem', height: '6.5rem'}} role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        )
    }

    if(error){
        return (
            <TryAgainButton fn={getDbData} setError={setError} setLoading={setRatingLoading} setModalLoading={setModalLoading}  />
        )
    }

    return (
        <>
            <div className='fadeIn game-rating d-flex justify-content-center gap-5 quicksand-font'>
                    
                <div className='like-rating d-flex flex-column'>
                    <div className='like-button pointer' onClick={() => {
                        if(activeLikes){
                            setActiveLikes(false);
                            setQuantityLikes(c => c - 1);
                            unSetLike();
                        } else{
                            setActiveLikes(true);
                            setQuantityLikes(c => c + 1);
                            setLike();
                            if(activeDislikes) {
                                setActiveDislikes(false);
                                setQuantityDislikes(c => c - 1);
                                unSetDislike();
                            }
                        }
                    }}>
                        <LikeButton disabled={modalLoading} active={activeLikes} />
                    </div>
                    <span className='text-center'>{quantityLikes}</span>
                    <p className='text-center link pointer' onClick={() => {
                        setRatingSelected('Likes');
                        document.querySelector('nav').classList.remove('sticky-top');
                    }} data-bs-toggle='modal' data-bs-target='#ratingModal'>Likes</p>
                </div>

                <div className='dislike-rating d-flex flex-column'>
                    <div className='like-button pointer' onClick={() => {
                        if(activeDislikes){
                            setQuantityDislikes(c => c - 1);
                            setActiveDislikes(false);
                            unSetDislike();
                        } else{
                            setActiveDislikes(true);
                            setQuantityDislikes(c => c + 1);
                            setDislike();
                            if(activeLikes) {
                                setActiveLikes(false);
                                setQuantityLikes(c => c - 1);
                                unSetLike();
                            }
                        }
                    }}>
                        <DislikeButton disabled={modalLoading} active={activeDislikes} />
                    </div>
                    <span className='text-center'>{quantityDislikes}</span>
                    <p className='text-center pointer link' onClick={() => {
                        setRatingSelected('Dislikes');
                        document.querySelector('nav').classList.remove('sticky-top')
                    }} data-bs-toggle='modal' data-bs-target='#ratingModal'>Dislikes</p>
                </div>

            </div>
            <RatingModal type={ratingSelected} modalLoading={modalLoading} likeData={likeData} dislikeData={dislikeData} />
        </>
    )
}

export default RatingSection;
