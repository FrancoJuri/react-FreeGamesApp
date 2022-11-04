import React from 'react';

const BackTop = () => {
    return (
        <button onClick={() => {
            window.scrollTo(0, 0);
        }} className='back-top rounded' style={{display: 'none'}}>
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#c4c9ce"><rect fill="none" height="24" width="24"/><path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"/></svg>
        </button>
    )
}

export default BackTop;
