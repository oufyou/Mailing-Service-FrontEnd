import React, {useEffect} from 'react';
import {FusePageSimple} from '@fuse';
import MailComponent from './MailComponent';
import withReducer from "../../store/withReducer";
import {useDispatch} from "react-redux";
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    layoutRoot: {}
});

function MailMS (props) {

    const dispatch = useDispatch();

    const classes = styles(props);
    //const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getMailDTOs(props.match.params));
        //dispatch(Actions.getUserData());
    }, [dispatch, props.match.params]);

    useEffect(() => {
        dispatch(Actions.getMailDTOs(props.match.params));
    }, [dispatch, props.match.params]);
        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>Mail</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <MailComponent/>
                    </div>
                }
            />
        )

}

export default withReducer('mailMS', reducer)(MailMS);