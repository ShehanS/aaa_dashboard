import {FC} from "react";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {useAppDataContext} from "../../context/AppDataContext";
import {RootState} from "../../redux/store";
import {connect, ConnectedProps} from "react-redux";

type OwnProps = {
    id: string
    onDelete: (id: string) => void;
}
type ReduxProps = ConnectedProps<typeof connector>;
type Props = OwnProps & ReduxProps;
const DeleteDialog: FC<Props> = (props) => {
    const {appDataContext, setAppDataContext} = useAppDataContext();
    return (<>
        <DialogTitle>
            <WarningRoundedIcon/>
            Confirmation
        </DialogTitle>
        <Divider/>
        <DialogContent>
            Are you sure you want to delete?
        </DialogContent>
        <DialogActions>
            <Button variant="solid" color="danger" onClick={() => props.onDelete(props.id)}>
                YES
            </Button>
            <Button variant="plain" color="neutral"
                    onClick={() => setAppDataContext({...appDataContext, isOpenDialog: false})}>
                NO
            </Button>
        </DialogActions>
    </>)
}

const mapStateToProps = (state: RootState) => {
    return {
        deleteAvpRecordSuccess: state.avp.deleteAvpRecordSuccess
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(DeleteDialog);
