import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ openDialog, isVerify }) {
    const [open, setOpen] = useState(true)
    const history = useHistory()
    console.log("xxx open", open, "openDialog", openDialog)
    const handleClose = () => {
        setOpen(false);
        history.push(isVerify ? "/account/favorites" : "/account/verify-account")
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{isVerify ? "Yêu cầu trở thành người cho thuê" : "Xác nhận tài khoản"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {isVerify ? "Yêu cầu của bạn đã được gửi đi vui lòng đợi chấp thuận" : "Bạn cần phải điền đầy đủ thông tin và đến công ty để xác nhận thông tin để sử dụng chức năng này!"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isVerify ? null : <Button onClick={handleClose} color="primary">
                        Huỷ bỏ
                    </Button>}
                    <Button onClick={handleClose} color="primary">
                        Oke
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}