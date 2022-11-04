import React, { useContext } from 'react';
import { context } from '../createContext';

const PlatformFilterCard = ({ filters, setFilters }) => {

    const { stateUi } = useContext(context);

    return (
        <div className='card text-white bg-dark mb-3'>

            <div className='card-header montserrat-font' style={{fontSize: '24px'}}>
                Platform:
            </div>

            <div className='card-body d-flex flex-column gap-4'>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='platformRadio' 
                        id='platformRadio1' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                platform: 'pc',
                            })
                        }}
                        checked={(filters.platform === 'pc' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='platformRadio1'>
                        PC
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='platformRadio' 
                        id='platformRadio2'
                        onChange={() => {
                            setFilters({
                                ...filters,
                                platform: 'browser',
                            })
                        }}
                        checked={(filters.platform === 'browser' ? true : false)} 
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='platformRadio2'>
                        Browser
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='platformRadio' 
                        id='platformRadio3' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                platform: 'all',
                            })
                        }}
                        checked={(filters.platform === 'all' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='platformRadio3'>
                        All
                    </label>

                </div>

            </div>

        </div>
    )
}

export default PlatformFilterCard;
