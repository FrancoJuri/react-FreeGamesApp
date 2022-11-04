import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import defaultuserimg from '../assets/defaultuserimg.png';
import { firebase, usersRef } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';

const ReviewItem = ({el, setReviewData, reviewData, userDocRef, setLoading}) => {

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

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure to delete this review?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete', 
        }).then( (result) => {
            if(result.isConfirmed){
                setLoading(true);
                usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments).then( async data => {

                    try {
                        const filteredArr = await data[0].reviews.filter(review => review.reviewId !== el.reviewId);
                        await usersRef.doc(userDocRef).update({
                            reviews: filteredArr,
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Your review has been deleted successfully!',
                        })
                        const filteredData = reviewData.filter(review => review.reviewId !== el.reviewId);
                        setReviewData([...filteredData]);
                    } catch (error) {
                        Toast.fire({
                            icon: 'error', 
                            title: 'An error has occurred deleting your review',
                        })
                    }

                }).catch( () => {
                    Toast.fire({
                        icon: 'error',
                        title: 'An error has occurred deleting your review',
                    })
                }).finally(() => {
                    setLoading(false);
                })
            }
        })
    }

    return (
        <div className='mt-3 d-flex flex-column w-100 p-4 review-item rounded fadeIn'>

            <div className='review-user-info gap-2 d-flex justify-content-between flex-wrap'>
                
                <div className='d-flex gap-3'>

                    <Link to={`/user/${el.uid}`}> 
                        {
                            (el.photoURL)
                            ?
                            <img className='pointer user-info-div-img' src={el.photoURL} alt='profile' />
                            :
                            <img src={defaultuserimg} className='pointer user-info-div-img' alt='profile' />
                        }
                    </Link>

                    <h4 className='inter-font mt-2'>
                        <Link className='link' to={`/user/${el.uid}`}>
                            {el.name}
                        </Link>
                    </h4>

                </div>

                {
                    (currentUser.uid === el.uid)
                    &&
                    <span onClick={handleDelete} className='pointer delete-svg' style={{marginTop: '7px'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#6c757d"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                    </span>
                }
                
            </div>

            <hr className='mt-3' />

            <div className='mt-2'>
                <p className='review-msg text-justify'>{el.msg}</p>
            </div>

            <div className='w-100 d-flex justify-content-start'>
                <small className='text-muted' style={{
                    marginTop: '6px',
                }}>{el.date}</small>
            </div>

        </div>
    )
}

export default ReviewItem;
