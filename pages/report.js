import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import ListReport from "../components/listReport";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from "next/router";

export async function getStaticProps() {

    // const response = await axios.get(process.env.APIBASEURL+"/ReportList");
    // const jsonData = await response.data;

    // const myData = [
    //     {
    //         id: 1,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     },
    //     {
    //         id: 2,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     },
    //     {
    //         id: 3,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     },
    //     {
    //         id: 4,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     },
    //     {
    //         id: 5,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     },
    //     {
    //         id: 6,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     },
    //     {
    //         id: 7,
    //         invoice_no:'01010',
    //         invoice_date: '12/12/2021',
    //         product_name:'Laptop',
    //         product_category:'HP',
    //         product_code:'HP001',
    //         quantity:"2",
    //         unit_price:"120000",
    //         total_price:"150000",
    //         discount_price:'10',
    //         seller_name:'Mamun Rahman'
    //     }
    // ]

    return{
        props:{
            url:process.env.APIBASEURL
        }
    }
}

class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myData:[]
        }
    }


    componentDidMount() {
        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }

        axios.get(this.props.url+"/ReportList/"+SessionHelper.getUserName()).then(response=>{
            this.setState({myData:response.data})
        }).catch();
    }

    render() {
        return (
            <Fragment>
                <NavbarDesktop/>
                <ListReport
                    myData={this.state.myData}
                />
            </Fragment>
        );
    }
}

export default Report;