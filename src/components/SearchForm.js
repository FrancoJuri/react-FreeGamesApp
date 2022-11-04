import React, { useEffect, useState } from 'react';

const SearchForm = ({history, users}) => {

    const urlParams = new URLSearchParams(history.location.search);
    const q = urlParams.get('q') || '';

    const [values, setValues] = useState({
        name: q,
    });

    const name = values.name

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [target.name]: target.value,  
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        history.push(`?q=${name}`);
    }

    useEffect(() => {

        setValues({
            name: q,
        });
        
    }, [q])

    return (
        <form className='search-form d-flex flex-wrap w-100' onSubmit={handleSubmit}>
            <input 
                type='text' 
                className='p-3 bg-dark'
                placeholder={(users) ? 'Search for users... e.g. Franco Juri' : 'Search for games... e.g. World of Tanks'}
                autoComplete='off'
                onChange={handleInputChange}
                value={name}
                name='name'
            />

            <button type='submit' className='p-3 ms-3'>
                Search
            </button>
        </form>
    )
}

export default SearchForm;
