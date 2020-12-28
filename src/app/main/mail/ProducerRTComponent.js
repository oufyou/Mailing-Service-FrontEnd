import React, {useEffect, useState} from 'react';
import { Icon, IconButton} from '@material-ui/core';
import { FuseAnimate} from '@fuse';
import ReactTable from "react-table";
import FuseUtils from "../../../@fuse/FuseUtils";
import {useDispatch, useSelector} from 'react-redux';
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import {BASE_URI} from "../../../constants";
import * as Actions from './store/actions';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";



function ProducerRTComponent (props) {



    const dispatch = useDispatch();
    const producerRTs = useSelector(({producerRTs}) => producerRTs.producerRTs.entities);
    console.log(producerRTs)
    const searchText = useSelector(({producerRTs}) => producerRTs.producerRTs.searchText);

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

        if ( producerRTs )
        {
            setFilteredData(getFilteredArray(producerRTs, searchText));
        }
    }, [producerRTs, searchText]);


    if ( !filteredData )
    {
        return null;
    }

    if ( filteredData.length === 0 )
    {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no producerRTs!
                </Typography>
            </div>
        );
    }
        return (
            <React.Fragment>

            <FuseAnimate animation="transition.slideUpIn" delay={300}>

                <ReactTable
                    className="-striped -highlight h-full sm:rounded-16 overflow-hidden"
                    data={producerRTs}
                    columns={[
                        {
                            Header: "#",
                            accessor: "id",
                            filterable: true,
                            className: "font-bold",
                            width: 200,

                        },
                        {
                            Header: "Code",
                            accessor: "code",
                            filterable: true,
                            className: "font-bold",

                        },
                        {
                            Header: "Name",
                            accessor: "name",
                            filterable: true,
                            className: "font-bold",

                        },

                        {
                            Header: "",
                            width: 100,
                            Cell: row => (
                                <div className="flex items-center">

                                    <IconButton
                                        onClick={(ev) => {
                                            dispatch(Actions.removeProducerRT(row.original.id));
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No contacts found"
                />
            </FuseAnimate>
            </React.Fragment>

        );

    }

export default ProducerRTComponent;