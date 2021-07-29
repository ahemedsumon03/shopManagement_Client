import React, {Component} from 'react';
import NavbarDesktop from "../../components/NavbarDesktop";
import ListProductDetails from "../../components/listProductDetails";
import axios from "axios";
import SessionHelper from "../../SessionHelper/SessionHelper";
import Router from "next/router";

class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            mainDiv:'d-none',
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/SelectProductByCode/'+this.props.code).then(res=>{
            this.setState({ProductData:res.data,mainDiv:''})
        }).catch();

        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }
    }


    render() {

        if(this.state.mainDiv === "d-none"){
            return (
                <div>
                    <NavbarDesktop/>
                </div>
            )
        }else {

            let ProductData = this.state.ProductData;

            return (
                <div>
                    <NavbarDesktop/>
                    <ListProductDetails
                        ProductData={ProductData}
                    />
                </div>
            )
        }

    }
}

export default ProductDetails;