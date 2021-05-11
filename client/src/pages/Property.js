import { Button, Checkbox, Container, FormControlLabel, Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import Header from "../components/Header";
import Search from "../components/Search";
import { addFavorites, getProperty } from "../redux/actions/action";
import { convertNumber } from "../utils";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchColumn from "../components/SearchColum";
import Config from "../Config";
import { Bathroom, SizeBig } from "../components/Icons";
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import { TabPanel } from "../components/TabPanel";
import ConfigInput from "../ConfigInput";
import Modal from "../components/Modal"
import Footer from "../components/Footer";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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
    tab: {
        fontSize: "16px",
        textTransform: "none",
        padding: "20px",
        fontWeight: 600,
        cursor: "pointer",
        color: "#fff"
    },
    select: {
        minWidth: "200px"
    },
    sectionContainer: {
        backgroundColor: "#fff",
        boxShadow: " 0 10px 31px 0 rgba(7,152,255,0.09)",
        padding: "30px",
        marginTop: "40px"
    },
    icon: {
        border: "1px solid #eef3f6",
        marginRight: "8px",
        padding: "4px",
        padding: "8px",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    },
    propertyInfor: {

    }
})
const Property = ({ realEstateReducer, getProperty = () => { }, auth, addFavorites, image, typeAccount }) => {
    let params = useParams()
    let offset = params.id.lastIndexOf("-")
    let id = params.id.substring(offset + 1, params.id.length)
    let property = realEstateReducer.property
    console.log("xxxxx property.fullname", property.fullname)
    const classes = useStyles();
    useEffect(() => {
        getProperty(id)
    }, [getProperty])
    const [valueIndex, setValueIndex] = useState(0);
    const [indexImage, setIndexImage] = useState(0);
    const [open, setOpen] = useState(false);
    console.log("xxx value index", auth)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780))
    // console.log("price", convertNumber(property.price.toString()))
    return (
        <>
            <Header image={image} auth={auth} typeAccount={typeAccount}></Header>
            {isMobile ? <SearchColumn></SearchColumn> : <Search></Search>}
            <Modal show={open}
                image={property.imagePath ? property.imagePath[indexImage] : ""}
                click={() => setOpen(false)}
                nextImage={() => {
                    if (indexImage === (property.imagePath.length - 1)) {
                        setIndexImage(0)
                    } else {
                        setIndexImage(indexImage + 1)
                    }
                }}
                prevImage={() => {
                    if (indexImage === 0) {
                        setIndexImage(property.imagePath.length - 1)
                    } else {
                        setIndexImage(indexImage - 1)
                    }
                }}
            ></Modal>
            <Container style={{ marginTop: "100px", marginBottom: "60px" }}>
                {isMobile ?
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", marginBottom: "8px" }}>
                            <div className={classes.icon}>
                                <ShareIcon style={{ fontWeight: 550, color: "#000", fontSize: "16px", marginRight: "8px" }}></ShareIcon>
                                <span style={{ fontWeight: 550, fontSize: "14px" }}>Share</span>
                            </div>
                            <div className={classes.icon} onClick={() => addFavorites(id)} >
                                <FavoriteBorderIcon style={{ fontWeight: 550, color: "#000", fontSize: "16px", marginRight: "8px" }}></FavoriteBorderIcon>
                                <span style={{ fontWeight: 550, fontSize: "14px" }}>Yêu thích</span>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ background: "#f1bf7fd9", color: "#fff", marginRight: "8px", padding: "4px 8px" }}>{property.typeRealEstate}</div>
                            <div style={{ background: "#f1bf7fd9", color: "#fff", padding: "4px 8px" }}>{property.status}</div>
                        </div>
                    </div>
                    :
                    <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h1>{property.title}</h1>
                            <div style={{ marginLeft: "auto", }}>
                                <div style={{ fontSize: "30px", color: "#ae8c63" }}>{property.price ? convertNumber(property.price.toString()) : ""} VND/ {property.pricePer}</div>

                                <div style={{ display: "flex", marginTop: "16px" }}>
                                    <div className={classes.icon}>
                                        <ShareIcon style={{ fontWeight: 550, color: "#000", fontSize: "16px", marginRight: "8px" }}></ShareIcon>
                                        <span style={{ fontWeight: 550, fontSize: "14px" }}>Share</span>
                                    </div>
                                    <div className={classes.icon} onClick={() => addFavorites(id)}>
                                        <FavoriteBorderIcon style={{ fontWeight: 550, color: "#000", fontSize: "16px", marginRight: "8px" }}></FavoriteBorderIcon>
                                        <span style={{ fontWeight: 550, fontSize: "14px" }}>Yêu thích</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                <div style={{ display: "flex", fontSize: "14px", color: "#5c727d", marginTop: "16px" }}>
                    <LocationOnIcon style={{ fontSize: "14px", color: "#5c727d", marginRight: "4px" }}></LocationOnIcon>
                    <span>{property.state}, {property.district}</span>
                </div>
                <Grid container style={{ marginTop: isMobile ? "16px" : "40px", display: "flex", alignItems: "flex-start" }} spacing={6} >
                    <Grid item xs={isMobile ? 12 : 8} style={{}}>
                        <Grid container style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "12px" }}>
                            <Grid item xs={8} style={{ height: isMobile ? "300px" : "500px" }}>
                                <img src={Config.BASE_URL + (property.imagePath ? property.imagePath[0] : "")}
                                    style={{ height: "100%", width: "100%", cursor: "pointer" }}
                                    onClick={() => {
                                        setOpen(true);
                                        setIndexImage(0);
                                    }}></img>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container>
                                    <Grid item xs={12} style={{ height: isMobile ? "150px" : "250px" }}>
                                        <img src={Config.BASE_URL + (property.imagePath ? property.imagePath[1] : "")}
                                            style={{ height: "100%", width: "100%", cursor: "pointer" }}
                                            onClick={() => {
                                                setOpen(true);
                                                setIndexImage(1);
                                            }}></img>
                                    </Grid>
                                    <Grid item xs={12} style={{ height: isMobile ? "150px" : "250px" }}>
                                        <img src={Config.BASE_URL + (property.imagePath ? property.imagePath[2] : "")}
                                            style={{ height: "100%", width: "100%", cursor: "pointer" }}
                                            onClick={() => {
                                                setOpen(true);
                                                setIndexImage(2);
                                            }}></img>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className={classes.sectionContainer}>
                            <h4 style={{ margin: "0px 0px 16px" }}>Overview</h4>
                            <Grid container style={{ display: "flex", alignItems: "center" }}>
                                <Grid item xs={isMobile ? 12 : 3} style={{ display: "flex", flexDirection: isMobile ? "row" : "column" }}>
                                    <span style={{ fontWeight: 550, fontSize: "16px " }}>Updated On:</span>
                                    <span style={isMobile ? { marginLeft: "20px", fontSize: "16px" } : {}}>{new Date(property.createTime).toDateString()}</span>
                                </Grid>
                                <Grid item xs={isMobile ? 6 : 3} style={{ marginTop: isMobile ? "16px" : "", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                    <HotelOutlinedIcon></HotelOutlinedIcon>
                                    <div style={{ marginTop: "4px" }}>{property.bedroom} Phòng ngủ</div>
                                </Grid>
                                <Grid item xs={isMobile ? 6 : 3} style={{ marginTop: isMobile ? "16px" : "", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                    <Bathroom></Bathroom>
                                    <div style={{ marginTop: "4px" }}>{property.size} Phòng tắm</div>
                                </Grid>

                                <Grid item xs={isMobile ? 6 : 3} style={{ marginTop: isMobile ? "16px" : "", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                    <SizeBig></SizeBig>
                                    <div style={{ marginTop: "4px" }}>{property.size} m2</div>
                                </Grid>
                            </Grid>
                            <div style={{ fontWeight: 550, fontSize: "16px", marginTop: "16px" }}>Thông tin liên lạc :</div>
                            <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                                <div style={{ fontWeight: 550, fontSize: "16px", marginRight: "40px" }}>Anh/Chị: {property.fullname}</div>
                                <div style={{ fontWeight: 550, fontSize: "16px" }}>Số điện thoại: {property.phone}</div>

                            </div>
                        </div>
                        <div className={classes.sectionContainer} style={{ padding: "0px" }}>
                            <div style={{ background: "#ae8c63", textAlign: isMobile ? "center" : "", boxShadow: "none", display: "flex", flexDirection: isMobile ? "column" : "row" }}>
                                {ConfigInput.listTab.map((el, index) => {
                                    return (
                                        <div key={el} onClick={() => setValueIndex(index)} className={classes.tab} style={valueIndex === index ? { backgroundColor: "#fff", color: '#000' } : {}} >{el}</div>
                                    )
                                })}
                            </div>
                            <TabPanel value={valueIndex} index={0}>{property.description}</TabPanel>
                            <TabPanel value={valueIndex} index={1}>
                                <Grid container>
                                    <Grid item xs={isMobile ? 12 : 6} style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ fontWeight: 600, color: "#222" }}>Địa chỉ:</div>
                                            <div style={{ color: "#333", marginLeft: "4px" }}>{property.addressDetail}</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6} style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ fontWeight: 600, color: "#222" }}>Tỉnh:</div>
                                            <div style={{ color: "#333", marginLeft: "4px" }}>{property.state}</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={isMobile ? 12 : 6} style={{ display: 'flex', justifyContent: "space-between", marginTop: "10px" }}>
                                        <div style={{ display: "flex" }}>
                                            <div style={{ fontWeight: 600, color: "#222" }}>Huyện:</div>
                                            <div style={{ color: "#333", marginLeft: "4px" }}>{property.district}</div>
                                        </div>
                                    </Grid>
                                </Grid>
                                {/* <Button style={{ backgroundColor: "#ae8c63", color: "#fff", padding: "4px 8px", marginTop: "16px", textTransform: "none" }} variant="outlined" >Open in Google Maps</Button> */}
                            </TabPanel>
                            <TabPanel value={valueIndex} index={2}>
                                <Grid container>
                                    {ConfigInput.propertyInformationDetail.map(el => {
                                        return (
                                            <Grid key={el.value} item xs={isMobile ? 12 : 4} style={{ marginTop: isMobile ? "16px" : "", display: 'flex', justifyContent: "space-between" }}>
                                                <div style={{ display: "flex" }}>
                                                    <div style={{ fontWeight: 550, color: "#222" }}>{el.label}</div>
                                                    <div style={{ color: "#5c727d", marginLeft: "4px" }}>{property[el.value]}</div>
                                                </div>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </TabPanel>
                            <TabPanel value={valueIndex} index={3}>
                                {property.note && property.note.length > 0 ? property.note : <div>Không có chú thích nào</div>}
                            </TabPanel>
                        </div>
                    </Grid>
                    {!isMobile ? <Grid item xs={4} style={{ marginLeft: "auto" }}>
                        <SearchColumn></SearchColumn>
                    </Grid> : null}
                </Grid>

            </Container >
            <Footer></Footer>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        realEstateReducer: state.realEstateReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProperty: (id) => dispatch(getProperty(id)),
        addFavorites: (id) => dispatch(addFavorites(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Property)