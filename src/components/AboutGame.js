import React from 'react';

const AboutGame = ({content, read, setRead}) => {
    return (
        <>
            <h2 className='mt-3 text-center montserrat-font'>About {content.title}</h2>
            <hr />
            {
                (read)
                ?<>
                <p className='text-justify'> 
                    {content.description}
                    <br />
                </p>
                <small onClick={() => {
                    setRead(false);
                }} className='pointer small-read'> - Read Less</small>
                </>
                :
                <>
                <p className='text-justify'>
                    {content.description.substring(0, 380)}...
                    <br />
                </p>
                <small onClick={() => {
                    setRead(true);
                }} className='pointer small-read'> + Read More</small>
                </>
            }
        </>
    )
}

export default AboutGame
