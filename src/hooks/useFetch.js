import { useContext, useEffect, useRef, useState } from 'react';
import { context } from '../createContext';
import { types } from '../types/types';

const useFetch = (url) => {

    const {dispatchUi} = useContext(context);

    const isMounted = useRef(true);

    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        
        return () => {
           isMounted.current = false; 
        }
    }, [])

    useEffect(() => {

        setState({data: null, error: null, loading: true,});
        dispatchUi({
            type: types.uiStartLoading,
        })

        fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '133cefb64fmshcf8e86b0572c993p1482cdjsn17131c1b4299',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        })
            .then(res => res.json())
            .then(data => {
                if(isMounted.current){
                        setState({
                            loading: false,
                            data,
                            error: null,
                        })
                }
            })
            .catch((err) => setState({
                data: null,
                loading: false,
                error: err,
            })).finally(() => {
                dispatchUi({
                    type: types.uiFinishLoading,
                })
            })

    }, [url, dispatchUi]);

    return state;

}

export default useFetch;