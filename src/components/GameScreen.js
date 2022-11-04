import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import ImageModal from './ImageModal';
import Spinner from './ui/Spinner';
import { usersRef, firebase } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import EndButtons from './EndButtons';
import ReviewSection from './ReviewSection';
import GameInformation from './GameInformation';
import AboutGame from './AboutGame';
import GameMinimumRequirements from './GameMinimumRequirements';
import GameScreenshots from './GameScreenshots';
import RatingSection from './RatingSection';
import PlayNowButton from './PlayNowButton';
import AddToFavoritesButton from './AddToFavoritesButton';
import ScreenErrorDiv from './ScreenErrorDiv';

const GameScreen = ({history}) => {

    const {id} = useParams();
    const [read, setRead] = useState(false);
    const [screenLoading, setScreenLoading] = useState(true);
    const [screenError, setScreenError] = useState(false);

    const user = useRef(null);
    const userDocRef = useRef(null);
    const containerRef = useRef();
    const currentUser = firebase.auth().currentUser;
    let content;

    const cors = 'https://cors-anywhere.herokuapp.com/';
    const baseUrl = `https://www.freetogame.com/api/game?id=${id}`;

    const {data, loading, error} = useFetch(`${cors}${baseUrl}`);
    const [quantityLikes, setQuantityLikes] = useState(null);
    const [quantityDislikes, setQuantityDislikes] = useState(null);
    const [added, setAdded] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(true);
    const [favoriteError, setFavoriteError] = useState(false);

    if(!loading && !screenLoading){
        content = data;
    }  

    const tryAgainFn = () => {
        getDbData();
        setScreenLoading(true);
        setScreenError(false);
    }

    const getDbData = useCallback( async () => {
        try {
            user.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            if(user.current.length){
                userDocRef.current = user.current[0].docId;
            }
            if(!user.current.length){
                setScreenError(true);
            }
            setScreenLoading(false);
        } catch (error) {
            setScreenError(true);
            setScreenLoading(false);
        }
    }, [currentUser.uid])

    useEffect(() => {
    
        getDbData();

        return () => {
            user.current = null;
            userDocRef.current = null;
            setQuantityLikes(null);
            setQuantityDislikes(null);
            setScreenError(false);
        }
        
    }, [currentUser.uid, id, getDbData]);

    useEffect(() => {
        if(!containerRef.current){
            return;
        }

        const observer = new IntersectionObserver((entry) => {
            if(entry[0].isIntersecting){
                if(document.querySelector('.play-now') && document.querySelector('.add-favorites')){
                    document.querySelector('.play-now').style.display = 'none';
                    document.querySelector('.add-favorites').style.display = 'none';
                }
            } else{
                if(document.querySelector('.play-now') && document.querySelector('.add-favorites')){
                    document.querySelector('.play-now').style.display = 'flex';
                    document.querySelector('.add-favorites').style.display = 'flex';
                }
            }
        })

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        }
    })
   
    if(error || data?.status === 0 || screenError){
        return (
            <ScreenErrorDiv fn={tryAgainFn} gameScreen={true} />
        )
    }

    if(loading || screenLoading){
        return (
            <Spinner />
        )
    } 

    if(!loading){
        history.listen((location) => {
            if(location.pathname !== `/game/${id}`){
                if(document.querySelector('.modal-backdrop')){
                    document.querySelector('.modal-backdrop').remove();
                    document.querySelector('body').classList.remove('modal-open');
                    document.querySelector('body').style.overflow = 'auto';
                    document.querySelector('body').style.paddingRight = '0px';
                    document.querySelector('nav').classList.add('sticky-top');
                }
            }
        })
    }

    return (
        <>
            <div className='row mt-5 game-screen-container fadeIn'>

                <div className='col-12 d-flex justify-content-center'>
                    <img src={content.thumbnail} alt={content.title} className='img-fluid img-thumbnail' />
                </div>     

                <h1 className='text-center mt-4 montserrat-font'>{content.title}</h1>
                <hr />
            
                <RatingSection 
                    setQuantityLikes={setQuantityLikes} 
                    setQuantityDislikes={setQuantityDislikes} 
                    quantityLikes={quantityLikes} 
                    quantityDislikes={quantityDislikes} 
                    userDocRef={userDocRef.current}
                    id={id}
                    content={content}
                    userInfo={user.current}
                />

                <div className='col-12 mb-5'>

                    <AboutGame content={content} read={read} setRead={setRead} />
                    <GameInformation quantityLikes={quantityLikes} quantityDislikes={quantityDislikes} content={content} />
                    <GameMinimumRequirements content={content} />
                    <GameScreenshots content={content} />
                    <ReviewSection userInfo={user.current} id={id} gameTitle={content.title} userDocRef={userDocRef.current} />
                    
                    <div ref={containerRef}>
                        <EndButtons 
                            added={added} 
                            setAdded={setAdded} 
                            userDocRef={userDocRef.current} 
                            content={content} history={history} 
                            gameUrl={content.game_url} 
                            favoriteLoading={favoriteLoading} 
                            setFavoriteLoading={setFavoriteLoading} 
                            favoriteError={favoriteError}
                            setFavoriteError={setFavoriteError}
                        /> 
                    </div>

                </div>

                <PlayNowButton gameUrl={content.game_url} />
                <AddToFavoritesButton 
                    content={content} 
                    userDocRef={userDocRef.current} 
                    added={added} 
                    setAdded={setAdded} 
                    favoriteLoading={favoriteLoading} 
                    setFavoriteLoading={setFavoriteLoading} 
                    favoriteError={favoriteError}
                    setFavoriteError={setFavoriteError}
                />
            </div>
            
            <ImageModal />
        </>
    )
}

export default GameScreen;
