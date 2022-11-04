import React, { useContext } from 'react';
import { context } from '../createContext';

const SettingFilterCard = ({ filters, setFilters }) => {

    const { stateUi } = useContext(context);

    return (
        <div className='card text-white bg-dark mb-3'> 

            <div className='card-header montserrat-font' style={{fontSize: '24px'}}>
                Setting:
            </div>

            <div className='card-body d-flex flex-column gap-3'>

                <div className='form-check'>
                    <input 
                        className='form-check-input' 
                        type='checkbox' 
                        value='' 
                        id='settingCheckbox1' 
                        onChange={() => {
                            if(filters.setting.some(el => el === 'military')){
                                const filteredArr = filters.setting.filter(el => el !== 'military')
                                setFilters({
                                    ...filters,
                                    setting: filteredArr,
                                })
                            } else{
                                setFilters({
                                    ...filters,
                                    setting: [...filters.setting, 'military'],
                                })
                            }
                        }}
                        checked={(filters.setting.some(el => el === 'military')) ? true : false}
                        disabled={stateUi.loading}
                    />
                    <label className='form-check-label' htmlFor='settingCheckbox1'>
                        Military
                    </label>
                </div>

                <div className='form-check'>
                    <input 
                        className='form-check-input' 
                        type='checkbox' 
                        value='' 
                        id='settingCheckbox2'
                        onChange={() => {
                            if(filters.setting.some(el => el === 'horror')){
                                const filteredArr = filters.setting.filter(el => el !== 'horror')
                                setFilters({
                                    ...filters,
                                    setting: filteredArr,
                                })
                            } else{
                                setFilters({
                                    ...filters,
                                    setting: [...filters.setting, 'horror'],
                                })
                            }
                        }}
                        checked={(filters.setting.some(el => el === 'horror')) ? true : false} 
                        disabled={stateUi.loading}
                    />
                    <label className='form-check-label' htmlFor='settingCheckbox2'>
                        Horror
                    </label>
                </div>

                <div className='form-check'>
                    <input 
                        className='form-check-input' 
                        type='checkbox' 
                        value='' 
                        id='settingCheckbox3' 
                        onChange={() => {
                            if(filters.setting.some(el => el === 'fantasy')){
                                const filteredArr = filters.setting.filter(el => el !== 'fantasy')
                                setFilters({
                                    ...filters,
                                    setting: filteredArr,
                                })
                            } else{
                                setFilters({
                                    ...filters,
                                    setting: [...filters.setting, 'fantasy'],
                                })
                            }
                        }}
                        checked={(filters.setting.some(el => el === 'fantasy')) ? true : false}
                        disabled={stateUi.loading}
                    />
                    <label className='form-check-label' htmlFor='settingCheckbox3'>
                        Fantasy
                    </label>
                </div>

                <div className='form-check'>
                    <input 
                        className='form-check-input' 
                        type='checkbox' 
                        value='' 
                        id='settingCheckbox4' 
                        onChange={() => {
                            if(filters.setting.some(el => el === 'anime')){
                                const filteredArr = filters.setting.filter(el => el !== 'anime')
                                setFilters({
                                    ...filters,
                                    setting: filteredArr,
                                })
                            } else{
                                setFilters({
                                    ...filters,
                                    setting: [...filters.setting, 'anime'],
                                })
                            }
                        }}
                        checked={(filters.setting.some(el => el === 'anime')) ? true : false}
                        disabled={stateUi.loading}
                    />
                    <label className='form-check-label' htmlFor='settingCheckbox4'>
                        Anime
                    </label>
                </div>

                <div className='form-check'>
                    <input 
                        className='form-check-input' 
                        type='checkbox' 
                        value='' 
                        id='settingCheckbox5' 
                        onChange={() => {
                            if(filters.setting.some(el => el === 'sci-fi')){
                                const filteredArr = filters.setting.filter(el => el !== 'sci-fi')
                                setFilters({
                                    ...filters,
                                    setting: filteredArr,
                                })
                            } else{
                                setFilters({
                                    ...filters,
                                    setting: [...filters.setting, 'sci-fi'],
                                })
                            }
                        }}
                        checked={(filters.setting.some(el => el === 'sci-fi')) ? true : false}
                        disabled={stateUi.loading}
                    />
                    <label className='form-check-label' htmlFor='settingCheckbox5'>
                        Sci-Fi
                    </label>
                </div>

            </div>

        </div>
    )
}

export default SettingFilterCard;
