import axios from 'axios';
import {getUserData} from './user.actions';
import {BASE_URI} from "../../../../../constants";

export const GET_MAILDTOS = '[MAILDTOS APP] GET MAILDTOS';
export const SET_SEARCH_TEXT = '[MAILDTOS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_MAILDTOS = '[MAILDTOS APP] TOGGLE IN SELECTED MAILDTOS';
export const SELECT_ALL_MAILDTOS = '[MAILDTOS APP] SELECT ALL MAILDTOS';
export const DESELECT_ALL_MAILDTOS = '[MAILDTOS APP] DESELECT ALL MAILDTOS';
export const OPEN_NEW_MAILDTO_DIALOG = '[MAILDTOS APP] OPEN NEW MAILDTO DIALOG';
export const CLOSE_NEW_MAILDTO_DIALOG = '[MAILDTOS APP] CLOSE NEW MAILDTO DIALOG';
export const OPEN_EDIT_MAILDTO_DIALOG = '[MAILDTOS APP] OPEN EDIT MAILDTO DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[MAILDTOS APP] CLOSE EDIT MAILDTO DIALOG';
export const ADD_MAILDTO = '[MAILDTOS APP] ADD MAILDTO';
export const UPDATE_MAILDTO = '[MAILDTOS APP] UPDATE MAILDTO';
export const REMOVE_MAILDTO = '[MAILDTOS APP] REMOVE MAILDTO';
export const REMOVE_MAILDTOS = '[MAILDTOS APP] REMOVE MAILDTOS';
export const TOGGLE_STARRED_MAILDTO = '[MAILDTOS APP] TOGGLE STARRED MAILDTO';
export const TOGGLE_STARRED_MAILDTOS = '[MAILDTOS APP] TOGGLE STARRED MAILDTOS';
export const SET_MAILDTOS_STARRED = '[MAILDTOS APP] SET MAILDTOS STARRED ';

export function getMailDTOs(routeParams)
{

    /*const data = [{
        id: 1,
        source: 'Ayaan@gmail.com',
        destination: 'oumaima.zayate@gmail.com',
        subject:'mail test',
        content:'hello this is a test',
        producerRT:'RH',
        status:'success'
    },{
        id: 2,
        source: 'Ayaan@gmail.com',
        destination: 'oumaima.zayate@gmail.com',
        subject:'mail test',
        content:'hello this is a test',
        producerRT:'RH',
        status:'success'
    },{
        id: 3,
        source: 'Ayaan@gmail.com',
        destination: 'oumaima.zayate@gmail.com',
        subject:'mail test',
        content:'hello this is a test',
        producerRT:'RH',
        status:'success'
    },{
        id: 4,
        source: 'Ayaan@gmail.com',
        destination: 'oumaima.zayate@gmail.com',
        subject:'mail test',
        content:'hello this is a test',
        producerRT:'RH',
        status:'success'
    },{
        id: 5,
        source: 'oumaima.zayate@gmail.com',
        destination: 'bzayate@gmail.com',
        subject:'mail test',
        content:'hello this is a test',
        producerRT:'RH',
        status:'success'
    }];*/
    const request = axios.get(BASE_URI+'/api/maildtos', {
        params: routeParams
    });
    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_MAILDTOS,
                payload: response.data,
                routeParams
            })
        );/*
    return (dispatch) => dispatch({
        type   : GET_MAILDTOS,
        payload: data,
        routeParams
    })*/
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedMailDSTOs(mailDTOId)
{
    return {
        type: TOGGLE_IN_SELECTED_MAILDTOS,
        mailDTOId
    }
}

export function selectAllMailDTOs()
{
    return {
        type: SELECT_ALL_MAILDTOS
    }
}

export function deSelectAllMailDTOs()
{
    return {
        type: DESELECT_ALL_MAILDTOS
    }
}

export function openNewMailDTODialog()
{
    return {
        type: OPEN_NEW_MAILDTO_DIALOG
    }
}

export function closeNewMailDTODialog()
{
    return {
        type: CLOSE_NEW_MAILDTO_DIALOG
    }
}

export function openEditMailDTODialog(data)
{
    return {
        type: OPEN_EDIT_MAILDTO_DIALOG,
        data
    }
}

export function closeEditMailDTODialog()
{
    return {
        type: CLOSE_EDIT_CONTACT_DIALOG
    }
}

export function addMailDTO(newContact)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/add-contact', {
            newContact
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_MAILDTO
                })
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}

export function updateMailDTO(mailDTO)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/update-mailDTO', {
            mailDTO
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_MAILDTO
                })
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}

export function removeMailDTO(contactId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/remove-contact', {
            contactId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_MAILDTO
                })
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}


export function removeMailDTOs(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/remove-contacts', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_MAILDTOS
                }),
                dispatch({
                    type: DESELECT_ALL_MAILDTOS
                })
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}

export function toggleStarredMailDTO(mailDTOId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/toggle-starred-contact', {
            mailDTOId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_MAILDTO
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}

export function toggleStarredMailDTOs(mailDTOIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
            mailDTOIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_MAILDTOS
                }),
                dispatch({
                    type: DESELECT_ALL_MAILDTOS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}

export function setMailDTOsStarred(mailDTOIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/set-contacts-starred', {
            mailDTOIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_MAILDTOS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_MAILDTOS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}

export function setMailDTOsUnstarred(contactIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().mailDTOs.mailDTOs;

        const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
            contactIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_MAILDTOS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_MAILDTOS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getMailDTOs(routeParams)))
        );
    };
}
