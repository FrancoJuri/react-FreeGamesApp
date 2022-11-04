import React, { useCallback, useEffect, useRef, useState } from 'react';
import { send } from '../assets/svgs';
import { usersRef, firebase } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import useForm from '../hooks/useForm';
import NoReviewData from './NoReviewData';
import ReviewItem from './ReviewItem';
import moment from 'moment';
import Swal from 'sweetalert2';
import TryAgainButton from './TryAgainButton';

const ReviewSection = ({ userInfo, gameTitle, id, userDocRef }) => {

    const defaultMsg = `Write your review for ${gameTitle}!`;
    const errMsg = 'The review must be at least 10 characters long!';

    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placeHolderMsg, setPlaceHolderMsg] = useState(defaultMsg);
    const [error, setError] = useState(false);
    const inputRef = useRef();
    const usersInfo = useRef();

    const [reviewValue, handleInputChange, reset] = useForm({
        review: '',
    })

    let component;
    const {review} = reviewValue;
    const currentUser = firebase.auth().currentUser;

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    })

    const handleReview = (e) => {
        e.preventDefault();

        if(review.trim().length < 10) {
            setPlaceHolderMsg(errMsg);
            reset();
            inputRef.current.select();
            return;
        }

        setPlaceHolderMsg(defaultMsg);
        setLoading(true);
        const reviewId = new Date().getTime();
        const todayDate = moment().format('h:mm:ss a • MMMM Do YYYY');

        try {
            usersRef.doc(userDocRef).update({
                reviews: firebase.firestore.FieldValue.arrayUnion({
                    reviewId: reviewId,
                    id: id,
                    msg: review.trim(),
                    date: todayDate,
                })
            }).then(() => {
                setReviewData(c => [{
                    msg: review.trim(),
                    name: currentUser.displayName,
                    photoURL: userInfo[0].photoURL,
                    uid: currentUser.uid,
                    reviewId: reviewId,
                    date: todayDate,
                }, ...c]);
            }).catch(() => {
                Toast.fire({
                    icon: 'error',
                    title: 'An error has occurred posting your review',
                });
                setError(true);
                setReviewData([]);
            }).finally(() => {
                setLoading(false);
            })
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'An error has occurred posting your review',
            });
            setError(true);
            setLoading(false);
            setReviewData([]);
        }

        reset();

    }  

    const getDbData = useCallback( async () => {
            try {
                usersInfo.current = await usersRef.get().then(returnDocuments);
                await usersInfo.current.forEach(el => {
                    if(el.reviews?.length){
                        const filteredArr = el.reviews.filter(el => el.id === id);
                        filteredArr.forEach(data => {
                            setReviewData(c => [{
                                msg: data.msg,
                                name: el.name,
                                photoURL: el.photoURL,
                                uid: el.uid,
                                reviewId: data.reviewId,
                                date: data.date,
                            }, ...c])
                        })
                    }
                })
                setLoading(false);
            } catch (error) {
                Swal.fire('An error has ocurred loading the reviews, try again later', '', 'error');
                setLoading(false);
                setReviewData([]);
                setError(true);
            }
        }, [id]);
    
    useEffect(() => {

        getDbData();
        
        return () => {
            setReviewData([]);
            setLoading(true);
            setError(false);
        }

    }, [id, getDbData])

    if(loading){
        component = 
        <div className='mt-5' style={{ height: '200px', display: 'grid', placeContent: 'center' }}>
            <div className='spinner-grow text-primary text-center' style={{width: '6.5rem', height: '6.5rem'}} role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
                    
    } else if(!loading && error) {
        component = <TryAgainButton mt='3rem' fn={getDbData} setError={setError} setLoading={setLoading} />
    } else if(!loading && !reviewData.length){
        component = <NoReviewData gameTitle={gameTitle} />
    } else if(!loading && reviewData.length){
        component = 
        <div className='reviews-container d-flex flex-column gap-3 mt-4'>
            {
                reviewData.map((el, index) => (
                    <ReviewItem setLoading={setLoading} setReviewData={setReviewData} reviewData={reviewData} userDocRef={userDocRef} key={index} el={el} />
                ))
            }
        </div>
    }

    return (
        <>
            <h2 className='text-center mt-5 montserrat-font'>User Reviews</h2>
            <hr />
            <form onSubmit={handleReview} className='create-review'>
                <div className='input-group input-group-lg input-group-review'>
                    <textarea autoComplete='off' placeholder={placeHolderMsg} type='text' className='form-control bg-dark text-white' aria-label='Write a review' aria-describedby='inputGroup-sizing-lg' value={review} name='review' onChange={handleInputChange} ref={inputRef} />
                    <button disabled={loading} type='submit' className='input-group-text bg-dark pointer' id='inputGroup-sizing-lg'>
                        {send}
                    </button>
                </div>
            </form>

            {component}

        </>
    )
}

export default ReviewSection;
