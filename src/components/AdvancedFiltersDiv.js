import React from 'react';
import CombatFilterCard from './CombatFilterCard';
import CategoryFilterCard from './CategoryFilterCard';
import GraphicsFilterCard from './GraphicsFilterCard';
import PlatformFilterCard from './PlatformFilterCard';
import SettingFilterCard from './SettingFilterCard';
import SortFilterCard from './SortFilterCard';

const AdvancedFiltersDiv = ({ filters, setFilters }) => {
    return (
        <div className='col'>
            <div className='row' style={{placeContent: 'center'}}>
                <div className='col-md-5 col-12'>
                    <SortFilterCard filters={filters} setFilters={setFilters} />
                </div>

                <div className='col-md-5 col-12'>
                    <PlatformFilterCard filters={filters} setFilters={setFilters} />
                </div>
            </div>

            <div className='row' style={{placeContent: 'center'}}>
                <div className='col-md-5 col-12'>
                    <GraphicsFilterCard filters={filters} setFilters={setFilters} />
                </div>

                <div className='col-md-5 col-12'>
                    <CombatFilterCard filters={filters} setFilters={setFilters} />
                </div>
            </div>

            <div className='row' style={{placeContent: 'center'}}>
                <div className='col-md-5 col-12'>
                    <SettingFilterCard filters={filters} setFilters={setFilters} />
                </div>

                <div className='col-md-5 col-12'>
                    <CategoryFilterCard filters={filters} setFilters={setFilters} />
                </div>
            </div>

            <div className='column mt-4' style={{placeContent: 'center'}}>
                <h2 className='montserrat-font text-center'>Results</h2>
                <hr className='col-md-10 col-12 mx-auto' />
            </div>
        </div>
    )
}

export default AdvancedFiltersDiv;
