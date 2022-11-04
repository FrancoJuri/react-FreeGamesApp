import React, { useContext } from 'react';
import { context } from '../createContext';

const SortFilterCard = ({ filters, setFilters }) => {

    const { stateUi } = useContext(context);

    return (
        <div className='card text-white bg-dark mb-3'>

            <div className='card-header montserrat-font' style={{fontSize: '24px'}}>
                Sort By:
            </div>

            <div className='card-body d-flex flex-column gap-4'>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='sortRadio' 
                        id='sortRadio1' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                sort: 'relevance',
                            })
                        }}
                        checked={(filters.sort === 'relevance' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='sortRadio1'>
                        Relevance
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='sortRadio' 
                        id='sortRadio2' 
                        onChange={() => {
                            setFilters({
                                ...filters, 
                                sort: 'release-date',
                            })
                        }}
                        checked={(filters.sort === 'release-date' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='sortRadio2'>
                        Release date
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='sortRadio' 
                        id='sortRadio3' 
                        onChange={() => {
                            setFilters({
                                ...filters, 
                                sort: 'alphabetical',
                            })
                        }}
                        checked={(filters.sort === 'alphabetical' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='sortRadio3'>
                        Alphabetical
                    </label>

                </div>

            </div>

        </div>
    )
}

export default SortFilterCard;
