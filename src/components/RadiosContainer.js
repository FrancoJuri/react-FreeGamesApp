import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { context } from '../createContext';
import { advancedFilters } from '../assets/svgs';

const RadiosContainer = ({sort, setSort}) => {

    const { stateUi } = useContext(context);
    const { loading } = stateUi;

    useEffect(() => {
        if(sort === 'relevance'){
            localStorage.setItem('allGamesSort', 'relevance');
        } else if(sort === 'release-date'){
            localStorage.setItem('allGamesSort', 'release-date');
        } else if(sort === 'alphabetical'){
            localStorage.setItem('allGamesSort', 'alphabetical');
        }
    }, [sort]);

    return (
        <>

            <h3 className='text-center montserrat-font'>Sort games by release date, alphabetical or relevance</h3>

            <div className='d-flex radios-container justify-content-center align-items-center gap-4 mb-5 mt-4'>

                <div className='d-flex form-check relevance-form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='flexRadioDefault' 
                        id='flexRadioDefault1' 
                        disabled={loading} 
                        onChange={() => {
                            setSort('relevance');
                        }} 
                        checked={(sort === 'relevance') ? true : false}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='flexRadioDefault1'>
                        Relevance
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='flexRadioDefault' 
                        id='flexRadioDefault2' 
                        disabled={loading} 
                        onChange={() => {
                            setSort('release-date');
                        }} 
                        checked={(sort === 'release-date') ? true : false}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='flexRadioDefault2'>
                        Release date
                    </label>

                </div>
                
                <div className='d-flex form-check alphabetical-form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='flexRadioDefault' 
                        id='flexRadioDefault3' 
                        disabled={loading} 
                        onChange={() => {
                            setSort('alphabetical');
                        }}
                        checked={(sort === 'alphabetical') ? true : false}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='flexRadioDefault3'>
                        Alphabetical
                    </label>

                </div>
                
                <Link to='/advancedFilters' className='btn btn-dark py-1 inter-font' style={{transition: 'all 270ms'}}>
                    {advancedFilters} Advanced Filters
                </Link>
                
            </div>
        </>
    )
}

export default RadiosContainer;
