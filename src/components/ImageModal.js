import React from 'react';

const ImageModal = () => {
    return (
        <div className='modal fade' id='imagemodal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-fullscreen'>
                <div className='modal-content bg-dark'>
                    <button type='button' className='btn-close btn-close-white modalImage-close-button' data-bs-dismiss='modal' aria-label='Close'></button>
                    <div className='modal-body d-flex justify-content-center align-items-center'>
                        <img id='modal-image' src='' alt='modal' style={{
                            maxWidth: '100%',
                            maxHeight: '569px'
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageModal;
