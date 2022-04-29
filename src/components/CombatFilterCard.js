import React, { useContext } from 'react';
import { context } from '../createContext';

const CombatFilterCard = ({ filters, setFilters }) => {

    const { stateUi } = useContext(context);

    return (
        <div className='card text-white bg-dark mb-3'>

            <div className='card-header montserrat-font' style={{fontSize: '24px'}}>
                Combat:
            </div>

            <div className='card-body d-flex flex-column gap-4'>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='combatRadio' 
                        id='combatRadio1' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                combat: 'pve',
                            })
                        }}
                        checked={(filters.combat === 'pve' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='combatRadio1'>
                        PVE
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='combatRadio' 
                        id='combatRadio2'
                        onChange={() => {
                            setFilters({
                                ...filters,
                                combat: 'pvp',
                            })
                        }}
                        checked={(filters.combat === 'pvp' ? true : false)} 
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='combatRadio2'>
                        PVP
                    </label>

                </div>

                <div className='d-flex form-check'>

                    <input 
                        className='form-check-input me-2' 
                        type='radio' 
                        name='combatRadio' 
                        id='combatRadio3' 
                        onChange={() => {
                            setFilters({
                                ...filters,
                                combat: '',
                            })
                        }}
                        checked={(filters.combat === '' ? true : false)}
                        disabled={stateUi.loading}
                    />

                    <label className='form-check-label quicksand-font' htmlFor='combatRadio3'>
                        All
                    </label>

                </div>

            </div>

        </div>
    )
}

export default CombatFilterCard
