import React, {useEffect, useState} from 'react';
import {FuseAnimate, FusePageSimple} from '@fuse';
import withReducer from "../../store/withReducer";
import {useDispatch} from "react-redux";
import * as Actions from './store/actions';
import reducer from './store/reducers';
import ProducerRTComponent from "./ProducerRTComponent";
import Fab from "@material-ui/core/Fab";
import {DialogContent, Icon} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import useForm from "../../../@fuse/hooks/useForm";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
    layoutRoot: {}
});

function ProducerRT(props) {

    const dispatch = useDispatch();

    const classes = styles(props);
    //const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getProducerRTs(props.match.params));
        //dispatch(Actions.getUserData());
    }, [dispatch, props.match.params]);

    useEffect(() => {
        dispatch(Actions.getProducerRTs(props.match.params));
    }, [dispatch, props.match.params]);
    const [showAddProducerRT, setShowAddProducerRT] = useState(false);
    const openNewProducerRT = () => {
        setShowAddProducerRT(true);
    }
    const defaultFormState = {
        code : '',
        name: ''
    };
    const {form, handleChange, setForm} = useForm(defaultFormState);
const handleSubmit = ()=> {
dispatch(Actions.addProducerRT(form));
setShowAddProducerRT(false);
}
    return (
        <React.Fragment>
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="p-24"><h4>Mail</h4></div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Producer RT</h4></div>
                }
                content={
                    <React.Fragment>
                        <div className="p-24 flex justify-end">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    aria-label="add"
                                    onClick={ev => openNewProducerRT()}
                                >
                                    <Icon>person_add</Icon>
                                    Add new producer RT
                                </Button>
                            </FuseAnimate>

                        </div>
                        <div className="p-24">
                            <ProducerRTComponent/>
                        </div>
                        <Dialog onClose={() => setShowAddProducerRT(false)}  classes={{
                            paper: "m-24"
                        }}
                                open={showAddProducerRT}>
                            <DialogTitle id="simple-dialog-title">Add producer RT</DialogTitle>
                            <DialogContent>
                                <div className="flex">

                                    <TextField
                                        className="mb-24"
                                        label="Code"
                                        autoFocus
                                        id="code"
                                        name="code"
                                        value={form.code}
                                        onChange={handleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                </div>

                                <div className="flex">
                                    <TextField
                                        className="mb-24"
                                        label="Name"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                            </DialogContent>
                            <DialogActions className="justify-between pl-16">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    type="submit"
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                }
            />

        </React.Fragment>
    )

}

export default withReducer('producerRTs', reducer)(ProducerRT);