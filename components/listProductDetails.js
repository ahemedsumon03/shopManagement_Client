import React, {Component,Fragment} from 'react';
import axios from "axios";
import CogoToast from "cogo-toast";
import Router from "next/router";
import SessionHelper from "../SessionHelper/SessionHelper";

class ListProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            quantity:'',
            AddToCart:'Add To Cart',
            productCode:null,
        }
    }

    quantityOnChange=(event)=>{
        let quantity = event.target.value;
        this.setState({quantity:quantity})
    }

    addToCart=()=>{

        let quantity = this.state.quantity;
        let product_code = this.state.productCode;
        let seller_name = SessionHelper.getUserName();

        if(quantity.length === 0)
        {
            CogoToast.error('Quantity is empty',{position:"bottom-center"})
        }else {

            this.setState({AddToCart:'Adding.....'})
            let MyFormData = new FormData();
            MyFormData.append('product_code',product_code);
            MyFormData.append('quantity',quantity);
            MyFormData.append('seller_name',seller_name);

            axios.post('http://127.0.0.1:8000/api/ProductCart',MyFormData).then(res=>{
                if(res.status === 200)
                {
                    CogoToast.success('Data is added',{position:"bottom-center"});
                    this.setState({AddToCart:'Add To Cart'})
                    Router.push('/transaction');
                }else {
                    CogoToast.error('Data is not added',{position:"bottom-center"});
                    this.setState({AddToCart:'Add To Cart'})
                    Router.push('/transaction');
                }
            }).catch(err=>{
                CogoToast.error('Something wrong',{position:"bottom-center"});
                this.setState({AddToCart:'Add To Cart'})
                Router.push('/transaction');
            });
        }
    }

    render() {

        let ProductData = this.props.ProductData

        let productImage = ProductData[0]['product_icon'];
        let productName = ProductData[0]['product_name'];
        let unit_price = ProductData[0]['product_price'];
        let product_code = ProductData[0]['product_code'];
        let product_category = ProductData[0]['product_category'];

        if(this.state.productCode === null)
        {
            this.setState({productCode:product_code})
        }

        return (
            <Fragment>
                <div  className="animated  zoomIn container-fluid">
                   <div className='row d-flex justify-content-center mt-2'>
                       <div className='col-md-10 col-lg-10 col-sm-12'>
                           <div className='card text-center'>
                               <div className='card-body mb-0'>
                                   <img className="detailsImage mb-0"  src={productImage}/>
                                   <h1 className="product_details_name">{productName}</h1>
                                   <h1 className="product-price">{unit_price} TK</h1>
                                   <select onChange={this.quantityOnChange} className="form-control form-select w-25 ml-auto mr-auto mt-2">
                                       <option value=''>Select Quantity</option>
                                       <option value='01'>1</option>
                                       <option value='02'>2</option>
                                       <option value='03'>3</option>
                                       <option value='04'>4</option>
                                       <option value='05'>5</option>
                                   </select>
                                   <button onClick={this.addToCart} className='btn btn-danger btn-sm mt-2'>{this.state.AddToCart}</button>
                               </div>
                           </div>
                       </div>
                   </div>
                </div>

            </Fragment>
        );
    }
}

export default ListProductDetails;