import { ADD_INIT_DATA } from './types.js';
import axios from 'axios';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=10e825717fc58b46beda9ff9f366870c&';

export const fetchData = () => {
    return (dispatch) => {
        return getData()
            .then(data => {
                dispatch({
                    type: ADD_INIT_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

async function getData(){
    const page1=await axios.get(apiUrl+"page=1");
    return page1.data
}