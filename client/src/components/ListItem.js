import { Container, Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
import test1 from "../resources/images/test1.jpg";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import { connect } from "react-redux"
import { addFavorites, getListLandingPage, searchProperty } from "../redux/actions/action";
import { Size } from "../components/Icons"
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useHistory, useLocation } from "react-router";
const useStyles = makeStyles({
    container: {
        marginTop: "20px",
        marginBottom: "60px"
    },
    imageContainer: {
        overflow: "hidden",
        position: "relative",
    },
    img: {
        transition: "all 1s ease",
        filter: "brightness(80%)",
        zIndex: 5
    },
    itemContainer: {
        transition: "all 1s",
        marginTop: "20px",
        cursor: "pointer",
        "&:hover": {
            borderRadius: "2px",
            boxShadow: "0 10px 31px 0 rgba(7,152,255,0.09)",
            marginTop: "8px",
            "& > div > img": {
                transform: "scale(1.1)",
                filter: "brightness(65%)",
            },
            "& > div > div": {
                transition: "color 0.3s ease-out",
                color: "#ae8c63",
            }
        },
    },
    itemName: {
        fontSize: "20px",
        fontWeight: 600
    },
    price: {
        color: "#ae8c63",
    },
    description: {
        fontSize: "13px",
        marginTop: "4px"
    },
    backgroundImage: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "auto",
        opacity: "0.6"
    }
});
const ListItems = ({ getListLandingPage = () => { }, realEstateReducer, addFavorites, search, searchProperty = () => { } }) => {
    const classes = useStyles();
    const history = useHistory()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    const query = new URLSearchParams(useLocation().search);
    let queryUrl = {
        state: query.get("state"),
        district: query.get("district"),
        bathroom: query.get("bathroom"),
        price: query.get("price"),
        typeRealEstate: query.get("typeRealEstate"),
        size: query.get("size"),
    }
    useEffect(() => {
        if (!search) {
            getListLandingPage();
        } else {
            searchProperty(queryUrl)
        }
    }, [getListLandingPage, searchProperty])
    return (
        <Container className={classes.container} >
            <h1 style={{ textAlign: "center", color: "#222222" }}>Một số phòng trọ</h1>
            <Grid container spacing={6}>
                {realEstateReducer.listRealEstate && realEstateReducer.listRealEstate.length > 0 ? realEstateReducer.listRealEstate.map(el => {
                    return (
                        <Grid item xs={isMobile ? 12 : 4} key={el.id} onClick={() => history.push("/property/property-id-" + el.id)}>
                            <div className={classes.itemContainer}>
                                <div style={{ width: "100%" }} className={classes.imageContainer}>
                                    <img src={test1} style={{ width: "100%", height: "auto" }} className={classes.img} alt="temp"></img>
                                    <div style={{ backgroundColor: "#ae8c63d9", color: "#fff", position: "absolute", top: "16px", right: "16px", padding: "4px 15px" }}>
                                        <div style={{ fontSize: "12px", textAlign: "center" }}>Chung cư</div>
                                    </div>
                                    {el.features && el.features.length > 0 ? (
                                        <div style={{ backgroundColor: "#f1bf7fd9", color: "#fff", position: "absolute", top: "16px", left: "16px", padding: "4px 15px" }}>
                                            <div style={{ fontSize: "12px", textAlign: "center" }}>Nội thất</div>
                                        </div>
                                    ) : null}
                                    <div style={{ position: "absolute", bottom: "16px", left: "16px", color: "#fff", width: "100%", display: "flex", alignItems: "center" }}>
                                        <div style={{ display: "flex", alignItems: "center", }}>
                                            <LocationOnIcon style={{ fontSize: "18px", color: "#fff", }}></LocationOnIcon>
                                            <span style={{ marginLeft: "4px", fontSize: "13px", fontWeight: 600 }}>{el.district}, {el.state}</span>
                                        </div>
                                        <div style={{ marginLeft: "auto", marginRight: "40px", display: "flex", alignItems: "center" }}>
                                            <PhotoCameraIcon style={{ color: "#fff", fontSize: "18px" }}></PhotoCameraIcon>
                                            <span style={{ marginLeft: "4px", fontSize: "14px", fontWeight: 600 }}>{el.imagePath.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", padding: "16px 24px", backgroundColor: "#fff" }}>
                                    <div className={classes.itemName}>{el.title}</div>
                                    <span className={classes.price}>{el.price} VND</span>
                                    <span className={classes.description}>{el.description.length > 60 ? el.description.substring(0, 60) + "..." : el.description.substring(0, 60)}</span>
                                    <div style={{ display: "flex", marginTop: "8px" }}>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: "16px" }}>
                                            <HotelIcon style={{ color: "#5c727d", fontSize: "20px", color: "#5c727d" }}></HotelIcon>
                                            <span style={{ marginLeft: "8px", fontSize: "14px" }}>{el.bedroom}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: "16px", color: "#5c727d" }}>
                                            <BathtubIcon style={{ fontSize: "20px" }}></BathtubIcon>
                                            <span style={{ marginLeft: "8px", fontSize: "14px", color: "#5c727d" }}>{el.bathroom}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", marginRight: "16px", color: "#5c727d" }}>
                                            <Size style={{ fontSize: "20px" }}></Size>
                                            <span style={{ marginLeft: "8px", fontSize: "14px" }}>{el.size} m2</span>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                                        <img src="https://demo5.wpresidence.net/wp-content/uploads/2014/05/person3-120x120.jpg" style={{ width: "30px", height: "30px", borderRadius: "50%" }} alt="avatar" ></img>
                                        <span style={{ marginLeft: "8px" }}>Maria Barlow</span>
                                        <div style={{ position: "relative", marginLeft: "auto", display: "flex" }}>
                                            <div style={{ border: "1px solid #eef3f6", marginRight: "8px", padding: "4px", height: "30px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <ShareIcon style={{ color: "#c2cbd9", fontSize: "14px" }}></ShareIcon>
                                            </div>
                                            <div style={{ border: "1px solid #eef3f6", padding: "4px", height: "30px", width: "30px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => addFavorites(el.id)}>
                                                <FavoriteBorderIcon style={{ color: "#c2cbd9", fontSize: "14px" }}></FavoriteBorderIcon>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </Grid>
                    )
                }) : null}
            </Grid>

        </Container >
    )
}
const mapStateToProps = (state) => {
    return {
        realEstateReducer: state.realEstateReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListLandingPage: () => dispatch(getListLandingPage()),
        addFavorites: (id) => dispatch(addFavorites(id)),
        searchProperty: (query) => dispatch(searchProperty(query))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListItems)