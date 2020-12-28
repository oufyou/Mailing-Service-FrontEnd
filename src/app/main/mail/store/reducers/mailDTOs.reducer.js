import * as Actions from '../actions';
//import _ from '@lodash';

const initialState = {
    entities          : null,
    searchText        : '',
    selectedMailDTOsIds: [],
    routeParams       : {},
    contactDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const mailDTOsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MAILDTOS:
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
        case Actions.TOGGLE_IN_SELECTED_MAILDTOS:
        {

            const mailDTOId = action.mailDTOId;

            let selectedMailDTOsIds = [...state.selectedMailDTOsIds];

            if ( selectedMailDTOsIds.find(id => id === mailDTOId) !== undefined )
            {
                selectedMailDTOsIds = selectedMailDTOsIds.filter(id => id !== mailDTOId);
            }
            else
            {
                selectedMailDTOsIds = [...selectedMailDTOsIds, mailDTOId];
            }

            return {
                ...state,
                selectedMailDTOsIds: selectedMailDTOsIds
            };
        }
        case Actions.SELECT_ALL_MAILDTOS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedMailDTOsIds = arr.map(mailDTO => mailDTO.id);

            return {
                ...state,
                selectedMailDTOsIds: selectedMailDTOsIds
            };
        }
        case Actions.DESELECT_ALL_MAILDTOS:
        {
            return {
                ...state,
                selectedMailDTOsIds: []
            };
        }
        case Actions.OPEN_NEW_MAILDTO_DIALOG:
        {
            return {
                ...state,
                contactDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
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

export default mailDTOsReducer;
