import * as Actions from '../actions';
//import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    routeParams       : {},
    contactDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const ProducerRTsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PRODUCERRTS:
        {
            return {
                ...state,
                entities   : action.payload,
                routeParams: action.routeParams
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }

        case Actions.CLOSE_NEW_MAILDTO_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_MAILDTO_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CONTACT_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default ProducerRTsReducer;
