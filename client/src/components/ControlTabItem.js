import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router";

const ControlTabItem = ({ path, icon, name }) => {
    const history = useHistory();
    const location = useLocation()
    return (
        <ListItem button onClick={() => history.push(path)} style={{
            backgroundColor: location.pathname === path ? "#ae8c63" : "",
            color: location.pathname === path ? "#fff" : "#222",
            borderRadius: "10px",
        }}>
            <ListItemIcon style={{ color: location.pathname === path ? "#fff" : "", }}>
                {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem >
    )
}
export default ControlTabItem