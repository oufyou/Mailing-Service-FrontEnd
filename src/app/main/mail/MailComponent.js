import React, {useEffect, useState} from 'react';
import {Avatar, Checkbox, Icon, IconButton} from '@material-ui/core';
import { FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import FuseUtils from "../../../@fuse/FuseUtils";
import {useDispatch, useSelector} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import * as Actions from './store/actions';
import axios from 'axios';
import {BASE_URI} from "../../../constants";

const resendEmail = (id) =>{
    axios
        .get(BASE_URI+"/api/send-one-mail/" + id,)
        .then(r  =>
    console.log("email sent")
    )
}
const resendEmails = (ids) =>{
    axios
        .get(BASE_URI+"/api/send-many-mail/" + ids,)
        .then(r  =>
            console.log("emails sent")
        )
}
function MailComponent (props) {



    const dispatch = useDispatch();
    const mailDTOs = useSelector(({mailMS}) => mailMS.mailDTOs.entities);
    const selectedMailDTOsIds = useSelector(({mailMS}) => mailMS.mailDTOs.selectedMailDTOsIds);
    const searchText = useSelector(({mailMS}) => mailMS.mailDTOs.searchText);

    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        function getFilteredArray(entities, searchText)
        {
            const arr = Object.keys(entities).map((id) => entities[id]);
            if ( searchText.length === 0 )
            {
                return arr;
            }
            return FuseUtils.filterArrayByString(arr, searchText);
        }

        if ( mailDTOs )
        {
            setFilteredData(getFilteredArray(mailDTOs, searchText));
        }
    }, [mailDTOs, searchText]);


    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no mailDTOs!
                </Typography>
            </div>
        );
    }
        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                    data={mailDTOs}
                    columns={[
                        {
                            Header: () => (
                                <Checkbox
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onChange={(event) => {
                                        event.target.checked ? dispatch(Actions.selectAllMailDTOs()) : dispatch(Actions.deSelectAllMailDTOs());
                                    }}
                                    checked={selectedMailDTOsIds.length === Object.keys(mailDTOs).length && selectedMailDTOsIds.length > 0}
                                    indeterminate={selectedMailDTOsIds.length !== Object.keys(mailDTOs).length && selectedMailDTOsIds.length > 0}
                                  />
                            ),
                            accessor: "",
                            Cell     : row => {
                                return (<Checkbox
                                        onClick={(event) => {
                                            event.stopPropagation();
                                        }}
                                        checked={selectedMailDTOsIds.includes(row.value.id)}
                                        onChange={() => dispatch(Actions.toggleInSelectedMailDSTOs(row.value.id))}
                                    />
                                )
                            },
                            className: "justify-center",
                            sortable: false,
                            width: 64
                        },
                        {
                            Header   : (row) => (
                                selectedMailDTOsIds.length > 0 && (
                                    <IconButton
                                        onClick={(ev) => {
                                            resendEmails(selectedMailDTOsIds);
                                        }}
                                    >

                                        <Icon>sync</Icon>
                                    </IconButton>
                                )
                            ),
                            accessor: "avatar",
                            Cell: row => (
                                <Avatar className="mr-8" alt={row.original.name} src={row.value}/>
                            ),
                            className: "justify-center",
                            width: 64,
                            sortable: false
                        },
                        {
                            Header: "From:",
                            accessor: "mailSender.email",
                            filterable: true,
                            className: "font-bold",
                            width: 200,

                        },
                        {
                            Header: "To:",
                            accessor: "mailreceivers[0].email",
                            filterable: true,
                            className: "font-bold",
                            width: 200,

                        },
                        {
                            Header: "Subject",
                            accessor: "mailSubject",
                            className: "justify-center",
                            width: 300,
                            filterable: true
                        },
                        {
                            Header: "Content",
                            accessor: "mailContent",
                            className: "justify-center",
                            width: 400,
                            filterable: true
                        },
                        {
                            Header: "ProducerRT",
                            accessor: "mailSender.producerrt.code",
                            className: "justify-center",
                            width: 100,
                            filterable: true
                        },
                        {
                            Header: "Description",
                            accessor: "description",
                            className: "justify-center",
                            width: 130,
                            filterable: true
                        },
                        {
                            Header: "",
                            width: 100,
                            Cell: row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            resendEmail(row.original.id);
                                            console.log(row)
                                        }}
                                    >

                                            <Icon>sync</Icon>
                                    </IconButton>
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No mailDTO found"
                />
            </FuseAnimate>

        );

    }

export default MailComponent;