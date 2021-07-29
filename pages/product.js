import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import ListProduct from "../components/listProduct";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getStaticProps() {

    const response = await axios.get(process.env.APIBASEURL+"/SelectProduct");
    const jsonData = await response.data;

    const response1 = await axios.get(process.env.APIBASEURL+"/SelectCategory");
    const jsonData1 = await response1.data;

    let url = process.env.APIBASEURL;

    return{
        props:{
            myData:jsonData,
            url:url,
            categoryData:jsonData1
        }
    }
}

class Product extends Component {

    componentDidMount() {
        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }
    }

    render() {
        return (
            <Fragment>
                <NavbarDesktop/>
                <ListProduct
                  myData={this.props.myData}
                  url={this.props.url}
                  categoryData={this.props.categoryData}
                />
            </Fragment>
        );
    }
}

export default Product;