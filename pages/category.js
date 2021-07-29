import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import ListCategory from "../components/listCategory";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getStaticProps() {

    const response = await axios.get(process.env.APIBASEURL+"/SelectCategory");
    const jsonData = await response.data;


    return{
        props:{
            myData:jsonData,
            url:process.env.APIBASEURL
        }
    }
}

class Category extends Component {

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
                <ListCategory
                  myData={this.props.myData}
                  url={this.props.url}
                />
            </Fragment>
        );
    }
}

export default Category;