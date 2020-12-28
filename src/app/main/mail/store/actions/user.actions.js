import axios from 'axios';
import {BASE_URI} from "../../../../../constants";

export const GET_USER_DATA = '[CONTACTS APP] GET USER DATA';

export function getUserData()
{
    const request = axios.get(BASE_URI+'/api/contacts-app/user');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USER_DATA,
                payload: response.data
            })
        );
}
