import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import ListUser from "../components/listUser";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getStaticProps() {

    const response = await axios.get(process.env.APIBASEURL+'/getUserAll');
    const jsonData = await response.data;

    const baseUrl = process.env.APIBASEURL;

    return {
        props:{
            myData:jsonData,
            url:baseUrl
        }
    }
}


class User extends Component {

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
                <ListUser
                  myData={this.props.myData}
                  url={this.props.url}
                />
            </Fragment>
        );
    }
}

export default User;