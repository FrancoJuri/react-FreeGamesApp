import React from 'react';
import Swal from 'sweetalert2';
import { usersRef } from '../firebase/firebase-config';

const ClearFavoritesButton = ({ setContent, setCardsLoading, userDocRef }) => {

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

    const handleRemoveAllFavorites = () => {
        Swal.fire({
            title: `Are you sure to remove all your favorite games?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Remove', 
        }).then( (result) => {
            if(result.isConfirmed){
                setCardsLoading(true);
                usersRef.doc(userDocRef).update({
                    favorites: [],
                }).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `All your favorite games have been removed successfully`,
                    })
                    setContent([]);
                }).catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: `An error has occurred removing all your favorite games`,
                    })
                }).finally(() => {
                    setCardsLoading(false);
                })
            }
        }) 
    }


    return (
        <button className='clear-favorites btn-danger quicksand-font fadeIn' onClick={handleRemoveAllFavorites}>
            Clear All Favorites
        </button>
    )
}

export default ClearFavoritesButton
