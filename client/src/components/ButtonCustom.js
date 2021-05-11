import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "#ae8c63",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: "10px",
    fontWeight: 600,
    // width: "100%"
});

export default function ButtonCustom(props) {
    return <MyButton variant="contained" disabled={props.disabled} type={props.type} onClick={props.click}>{props.children}</MyButton>;
}