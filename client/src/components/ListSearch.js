import { Button, Container, makeStyles, Slider, TextField, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Header from "./Header";
import ListItems from "./ListItem";
import Search from "./Search";
import SearchColumn from "./SearchColum";
const useStyles = makeStyles({
    accountIcon: {
        color: "white",
        fontSize: "30px",
        cursor: "pointer",
        "&:hover": {
            opacity: "0.6"
        }
    },
    containerNavigation: {
        display: "flex",
        position: "relative",
        padding: "20px",
        alignItems: "center",
        justifyContent: "space-between"
    },
    logo: {
        cursor: "pointer"
    },
    gridContainer: {
        marginTop: "auto",
        marginBottom: "100px",
        backgroundColor: "transparent"
    },
    select: {
        minWidth: "200px"
    }
})
const ListSearch = ({ image, typeAccount }) => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    useEffect(() => {

    })

    return (
        <div style={{ backgroundColor: "#f7f7f7" }}>
            <Header image={image} typeAccount={typeAccount}></Header>
            {isMobile ? <SearchColumn></SearchColumn> : <Search></Search>}
            <ListItems search={true}></ListItems>
        </div>

    )
}
export default ListSearch