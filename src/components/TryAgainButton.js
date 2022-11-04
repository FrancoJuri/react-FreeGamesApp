import React from 'react';

const TryAgainButton = ({mt, fn, setError, setLoading, setModalLoading}) => {
    return (
        <div className='fadeIn' style={{height: '100px', display: 'grid', placeContent: 'center'}}>
            <button className='btn btn-primary px-3 inter-font' style={{fontSize: '20px', marginTop: mt}} onClick={() => {
                fn();
                setError(false);
                setLoading(true);
                if(typeof setModalLoading === 'function'){
                    setModalLoading(true);
                }
            }}>
                Try again
            </button>
        </div>
    )
}

export default TryAgainButton;
