import axios from 'axios';
import {BASE_URI} from "../../../../../constants";

export const GET_PRODUCERRTS = '[PRODUCERRTS APP] GET PRODUCERRTS';

export const ADD_PRODUCERRT = '[PRODUCERRTS APP] ADD PRODUCERRT';
export const UPDATE_PRODUCERRT = '[PRODUCERRTS APP] UPDATE PRODUCERRT';
export const REMOVE_PRODUCERRT = '[PRODUCERRTS APP] REMOVE PRODUCERRT';

export function getProducerRTs(routeParams)
{

    const request = axios.get(BASE_URI+'/api/producerrts', {
        params: routeParams
    });
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCERRTS,
                payload: response.data,
                routeParams
            })
        );
}


export function addProducerRT(ProducerRT)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().producerRTs.producerRTs;

        const request = axios.post(BASE_URI + '/api/producerrts/', {
            code : ProducerRT.code,
            name : ProducerRT.name
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_PRODUCERRT
                })
            ]).then(() => dispatch(getProducerRTs(routeParams)))
        );
    };
}

export function updateProducerRT(ProducerRT)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().producerRTs.producerRTs;

        const request = axios.put(BASE_URI + '/api/producerrts/'+ProducerRT.id, {
            ProducerRT
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_PRODUCERRT
                })
            ]).then(() => dispatch(getProducerRTs(routeParams)))
        );
    };
}

export function removeProducerRT(ProducerRTId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().producerRTs.producerRTs;

        const request = axios.delete(BASE_URI + '/api/producerrts/'+ProducerRTId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_PRODUCERRT
                })
            ]).then(() => dispatch(getProducerRTs(routeParams)))
        );
    };
}

