import React from 'react';

const GameMinimumRequirements = ({content}) => {
    return (
        <>
            {
                (content.minimum_system_requirements)
                &&
                (typeof content.minimum_system_requirements === 'object')
                &&
                (content.minimum_system_requirements.os !== null && content.minimum_system_requirements.processor !== null && content.minimum_system_requirements.memory !== null && content.minimum_system_requirements.graphics !== null && content.minimum_system_requirements.storage !== null)
                &&
                <>
                    <h2 className='text-center montserrat-font'>Minimum system requirements {(content.platform === 'Windows' && <span className='requirement-specification'>(Windows)</span>)}</h2>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-6 col-12'>
                            <h3 className='requirement-specification'>Os</h3>
                            <span className='inter-font'>{content.minimum_system_requirements.os}</span>
                        </div>
                        <div className='col-sm-6 col-12 mt-4 mt-sm-0'>
                            <h3 className='requirement-specification'>Processor</h3>
                            <span className='inter-font'>{content.minimum_system_requirements.processor}</span>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className='col-sm-6 col-12'>
                            <h3 className='requirement-specification'>Memory</h3>
                            <span className='inter-font'>{content.minimum_system_requirements.memory}</span>
                        </div>
                        <div className='col-sm-6 col-12 mt-4 mt-sm-0'>
                            <h3 className='requirement-specification'>Graphics</h3>
                            <span className='inter-font'>{content.minimum_system_requirements.graphics}</span>
                        </div>
                    </div>

                    <div className='col-12 mt-4'>
                        <h3 className='requirement-specification'>Storage</h3>
                        <span className='inter-font'>{content.minimum_system_requirements.storage}</span>
                    </div>
                </>
            
            }
        </>
    )
}

export default GameMinimumRequirements;
