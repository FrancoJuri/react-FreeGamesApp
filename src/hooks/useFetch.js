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

        fetch(url)
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