import React from 'react';

const GameScreenshots = ({content}) => {
    return (
        <>
            {
                (content.screenshots.length >= 1)
                &&
                <>
                    <h2 className='mt-5 text-center montserrat-font'>{content.title} Screenshots</h2>
                    <hr />
                    <div className='screenshots-container d-flex'>
                        {
                            content.screenshots.map((screenshot, index) => (
                                <div className='pointer' key={index} data-bs-toggle='modal' data-bs-target='#imagemodal' onClick={(e) => {
                                    document.querySelector('#modal-image').src = e.target.src;
                                }} >
                                    <img src={screenshot.image} alt='screenshot game' />
                                </div>
                            ))
                        }
                        
                    </div>
                </>
            }
        </>
    )
}

export default GameScreenshots;
