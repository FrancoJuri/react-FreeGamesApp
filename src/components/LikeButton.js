import React from 'react';

const LikeButton = ({active, disabled}) => {
    return (
        <>
        {
            (active)
            ?
                <button className={`${(disabled) && 'disabled-button'}`} style={{backgroundColor: 'transparent', border: 'none'}} disabled={disabled}>
                        <svg className='svgLike-button' viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{
                        pointerEvents: 'none',
                        display: 'block',
                        width: '60px',
                        height: '60px',
                    }}><g><path d="M3,11h3v10H3V11z M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11v10h10.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z"></path></g></svg>
                </button>
            :
            <button className={`${(disabled) && 'disabled-button'}`} style={{backgroundColor: 'transparent', border: 'none'}} disabled={disabled}>
                    <svg className='svgLike-button' viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style={{
                    pointerEvents: 'none',
                    display: 'block',
                    width: '60px',
                    height: '60px',
                }}><g><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path></g></svg>
            </button>
        }
        </>
    )
}

export default LikeButton;