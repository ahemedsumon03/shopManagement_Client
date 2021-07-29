import React, {Component,Fragment} from 'react';
import NavbarDesktop from "../components/NavbarDesktop";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import SessionHelper from "../SessionHelper/SessionHelper";
import Router from 'next/router'

export async function getStaticProps() {

    const response = await axios.get(process.env.APIBASEURL+'/getCategory');
    const jsonData = await response.data;

    const response1 = await axios.get(process.env.APIBASEURL+'/TotalProduct');
    const jsonData1 = await response1.data;

    // const response2 = await axios.get(process.env.APIBASEURL+'/TotalTransaction');
    // const jsonData2 = await response2.data;
    //
    // const response3 = await axios.get(process.env.APIBASEURL+'/TotalIncome');
    // const jsonData3 = await response3.data;
    //
    // const response4 = await axios.get(process.env.APIBASEURL+'/IncomeLast7Days');
    // const jsonData4 = await response4.data;
    //
    // const response5 = await axios.get(process.env.APIBASEURL+'/RecentTransaction');
    // const jsonData5 = await response5.data;

    console.log(process.env.APIBASEURL);


    const columns = [
        {
            name: 'Invoice_No',
            selector: 'invoice_no',
            sortable: true,
        },
        {
            name: 'Invoice_Date',
            selector: 'invoice_date',
            sortable: true,
            right: true,
        },
        {
            name: 'Product_Name',
            selector: 'product_name',
            sortable: true,
            right: true,
        },
        {
            name: 'Product_Quantity',
            selector: 'product_quantity',
            sortable: true,
            right: true,
        },
        {
            name: 'Unit_Price',
            selector: 'unit_price',
            sortable: true,
            right: true,
        },
        {
            name: 'Total_Price',
            selector: 'total_price',
            sortable: true,
            right: true,
        },
        {
            name: 'Seller_Name',
            selector: 'seller_name',
            sortable: true,
            right: true,
        }
    ];

    return{
        props:{
            // tableData:jsonData5,
            // chartdata:jsonData4,
            // TotalIncome:jsonData3,
            // TotalTransaction:jsonData2,
            TotalProduct:jsonData1,
            TotalCategory:jsonData,
            columns:columns,
            url:process.env.APIBASEURL
        }
    }

}


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TotalTransaction:[],
            TotalIncome:'',
            chartdata:[],
            tableData:[]
        }
    }


    componentDidMount() {
        let username = SessionHelper.getUserName();

        if(username === null)
        {
            Router.push('/login');
        }

        axios.get(this.props.url+"/TotalTransaction/"+SessionHelper.getUserName()).then(response=>{
            this.setState({TotalTransaction:response.data})
        }).catch();

        axios.get(this.props.url+"/TotalIncome/"+SessionHelper.getUserName()).then(response=>{
            this.setState({TotalIncome:response.data})
        }).catch();

        axios.get(this.props.url+"/IncomeLast7Days/"+SessionHelper.getUserName()).then(response=>{
            this.setState({chartdata:response.data})
        }).catch();

        axios.get(this.props.url+"/RecentTransaction/"+SessionHelper.getUserName()).then(response=>{
            this.setState({tableData:response.data})
        }).catch();
    }

    render() {
        return (
            <Fragment>
                <NavbarDesktop/>
                <Dashboard
                    chartdata={this.state.chartdata}
                    TotalIncome={this.state.TotalIncome}
                    TotalTransaction={this.state.TotalTransaction}
                    TotalProduct={this.props.TotalProduct}
                    TotalCategory={this.props.TotalCategory}
                    columns={this.props.columns}
                    tableData={this.state.tableData}
                />
            </Fragment>
        );
    }
}

export default Index;