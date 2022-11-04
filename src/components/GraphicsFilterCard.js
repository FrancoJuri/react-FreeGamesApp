import React, { useContext } from 'react';
import { context } from '../createContext';

const GraphicsFilterCard = ({ filters, setFilters }) => {

    const { stateUi } = useContext(context);

    return (
        <div className='card text-white bg-dark mb-3'>

            <div className='card-header montserrat-font' style={{fontSize: '24px'}}>
                Graphics:
            </div>

            <div className='card-body d-flex flex-column gap-4'>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='graphicsRadio' 
                        id='graphicsRadio1' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                graphics: '3d',
                            })
                        }}
                        checked={(filters.graphics === '3d' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='graphicsRadio1'>
                        3D
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='graphicsRadio' 
                        id='graphicsRadio2' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                graphics: '2d',
                            })
                        }}
                        checked={(filters.graphics === '2d' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='graphicsRadio2'>
                        2D
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='graphicsRadio' 
                        id='graphicsRadio3' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                graphics: '',
                            })
                        }}
                        checked={(filters.graphics === '' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='graphicsRadio3'>
                        All
                    </label>

                </div>

            </div>

        </div>
    )
}

export default GraphicsFilterCard;
