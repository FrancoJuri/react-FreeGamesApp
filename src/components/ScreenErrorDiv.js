import React from 'react';
import { Link } from 'react-router-dom';

const ScreenErrorDiv = ({fn, gameScreen, userScreen}) => {

    let errorText;

    if(gameScreen){
        errorText = "An error has occurred or the game doesn't exist";
    } else if(userScreen){
        errorText = "An error has occurred or the user doesn't exist";
    } else{
        errorText = "An error has ocurred";
    }

    return (
        <div className='d-flex align-items-center flex-column justify-content-center fadeIn' style={{
            height: 'calc(100vh - 62px)'
        }}>
            <div className='w-100 alert alert-danger text-center inter-font' style={{fontSize: '1.80rem'}}>
                {errorText}
            </div>
            {
                (gameScreen || userScreen)
                ?
                <div className='d-flex justify-content-center gap-3 flex-wrap'>
                    <button className='btn btn-primary quicksand-font p-2' style={{width: '160px', fontSize: '20px'}} onClick={() => {
                        fn();
                    }}>Try Again</button>
                    <Link to='/home' className='btn btn-outline-info quicksand-font p-2' style={{width: '160px', fontSize: '20px'}}>
                        Return Home
                    </Link>
                </div>
                :
                <button className='btn btn-primary quicksand-font p-2' style={{width: '160px', fontSize: '25px'}} onClick={() => {
                    fn();
                }}>Try Again</button>
            }

        </div>
    )
}

export default ScreenErrorDiv;
