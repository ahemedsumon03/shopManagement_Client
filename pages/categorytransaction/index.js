import React, {Component} from 'react';
import NavbarDesktop from "../../components/NavbarDesktop";
import ListCategoryTransaction from "../../components/ListCategoryTransaction";
import SessionHelper from "../../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getStaticProps()
{
    return{
        props:{
            url:process.env.APIBASEURL
        }
    }
}

class Index extends Component {

    componentDidMount() {
        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }
    }

    render() {
        return (
            <div>
                <NavbarDesktop/>
                <ListCategoryTransaction
                    url={this.props.url}
                />
            </div>
        );
    }
}

export default Index;