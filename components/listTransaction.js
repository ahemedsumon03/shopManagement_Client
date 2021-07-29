import React, {Component,Fragment} from 'react';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import CogoToast from "cogo-toast";
import SessionHelper from "../SessionHelper/SessionHelper";

class ListTransaction extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            oneDiv:'d-none',
            twoDiv:'',
            ConfirmSell:'Confirm Sell'
        }
    }

    previousMove=()=>{
        this.slider.slickPrev();
    }

    nextMove=()=>{
        this.slider.slickNext();
    }

    IncreaseProduct=(code,quantity,price)=>{
        axios.post(this.props.url+"/CartItemPlus/"+code+"/"+quantity+"/"+price).then(response=>{
            if(response.data===1)
            {
                CogoToast.success('Increase Product',{position:'bottom-center'});
                Router.push('/transaction').then(r => {
                    Router.reload();
                });
            }else {
                CogoToast.error('Not Increase Product',{position:'bottom-center'});
                Router.push('/transaction').then(r => {
                    Router.reload();
                });
            }
        }).catch(error=>{
            CogoToast.error('Not Increase Product',{position:'bottom-center'});
            Router.push('/transaction').then(r=>{
                Router.reload();
            });
        });
    }

    ProductDecrease=(code,quantity,price)=>{
        axios.post(this.props.url+"/CartItemMinus/"+code+"/"+quantity+"/"+price).then(response=>{
            if(response.data===1)
            {
                CogoToast.success('Decrease Product',{position:'bottom-center'});
                Router.push('/transaction').then(r => {
                    Router.reload();
                });
            }else {
                CogoToast.error('Not Decrease Product',{position:'bottom-center'});
                Router.push('/transaction').then(r => {
                    Router.reload();
                });
            }
        }).catch(error=>{
            CogoToast.error('Not Decrease Product',{position:'bottom-center'});
            Router.push('/transaction').then(r => {
                Router.reload();
            });
        });
    }

    deleteProduct=(code)=>{
        axios.post(this.props.url+"/CartItemDelete/"+code).then(response=>{
            if(response.data===1 && response.status === 200)
            {
                CogoToast.success('Cart Product delete',{position:'bottom-center'});
                Router.push('/transaction').then(r => {
                    Router.reload();
                });
            }else {
                CogoToast.error('Cart Product not delete',{position:'bottom-center'});
                Router.push('/transaction').then(r => {
                    Router.reload();
                });
            }
        }).catch(error=>{
            CogoToast.error('Cart Product not delete',{position:'bottom-center'});
            Router.push('/transaction').then(r => {
                Router.reload();
            });
        });
    }

    ConfirmSell=()=>{
        this.setState({ConfirmSell:'Confirming...'})
        let invoice_no = Math.floor(100000 + Math.random() * 900000);
        let MyFormData = new FormData();
        MyFormData.append('invoice_no',invoice_no);
        axios.post(this.props.url+"/CartSell/"+SessionHelper.getUserName(),MyFormData).then(response=>{
            if(response.data === 1)
            {
                CogoToast.success('Item is Received',{position:'bottom-center'});
                this.setState({ConfirmSell:'Confirm Sell'})
                Router.push('/report');
            }
            else {
                CogoToast.success('Item not Received',{position:'bottom-center'});
                this.setState({ConfirmSell:'Confirm Sell'})
                Router.push('/report');
            }
        }).catch(error=>{
            CogoToast.success('Item not Received',{position:'bottom-center'});
            this.setState({ConfirmSell:'Confirm Sell'})
            Router.push('/report');
        });

    }


    render() {

        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            arrows:false,
            autoplay:false,
            autoplaySpeed:3000,
            slidesToShow: 6,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        let Data = this.props.myData;
        let NewData = this.props.newData;
        let cartData = this.props.cartData;

        let CategoryView = Data.map((list,i)=>{
            return (
                <Fragment>
                    <Link as={"/categorytransaction/"+list.cat_name} href={"/categorytransaction/[category]"}><h1 className='category-name'>{list.cat_name}</h1></Link>
                </Fragment>
            )
        })

        let ProductView = NewData.map((product,i)=>{
            return(
                <div className={this.state.twoDiv}>
                    <Link as={'/productdetails/'+product.product_code} href={'/productdetails/[Pcode]'}>
                        <div className='product-card mb-0'>
                            <img src={product.product_icon} className='product-img'/>
                            <h1 className='product-name text-center'>{product.product_name}</h1>
                            <h1 className='product-price text-center'>{product.product_price}</h1>
                        </div>
                    </Link>
                </div>
            )
        })

        let CartDataView = cartData.map((List,i)=>{
            return(
                <Fragment>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-4 text-center'>
                                <img className='cart-image' src={List.product_icon}/>
                            </div>
                            <div className='col-4 text-center'>
                                <p className='product-name'>{List.product_name}</p>
                                <p className='product-price'>Qty: {List.quantity} | {List.product_total_price} TK</p>
                            </div>
                            <div className='col-4 text-center'>
                                <div className='input-group'>
                                    <button onClick={()=>this.IncreaseProduct(List.product_code,List.quantity,List.product_unit_price)} className='circular-btn'><i className='fa fa-plus'></i></button>
                                    <button onClick={()=>this.ProductDecrease(List.product_code,List.quantity,List.product_unit_price)} className='circular-btn'><i className='fa fa-minus'></i></button>
                                    <button onClick={()=>this.deleteProduct(List.product_code)} className='circular-btn'><i className='fa fa-trash-alt'></i></button>
                                </div>
                            </div>
                        </div>
                        <hr className='bg-secondary'/>
                    </div>
                </Fragment>
            )
        })

        return (
            <Fragment>
                <div>
                    <div className='animated zoomIn container-fluid'>
                        <div className='row'>
                            <div className='col-md-7 p-1 col-lg-7 p-1 col-sm-12 p-1'>
                                <div className='container-fluid shadow-sm p-3 bg-white'>
                                    <div className='row'>
                                        <div className='col-md-1 p-1'>
                                            <button className='btn' onClick={this.previousMove}><i className='fa fa-angle-left'></i></button>
                                        </div>
                                        <div className='col-md-10 p-1'>
                                            <Slider ref={c=>(this.slider=c)} {...settings}>
                                                {CategoryView}
                                            </Slider>
                                        </div>
                                        <div className='col-md-1 p-1'>
                                            <button className='btn' onClick={this.nextMove}><i className='fa fa-angle-right'></i></button>
                                        </div>
                                        <div className='container ml-4'>
                                            <div className='row ListTransactionHeight ListTransaction'>
                                                {ProductView}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-12 p-1 col-lg-5 col-md-5'>
                                <div className='shadow-sm text-center bg-site p-2'>
                                    <h6 className='text-white'>Cart List</h6>
                                </div>

                                <div className='ListTransactionCartHeight ListTransaction bg-white text-center p-3'>
                                    {CartDataView}
                                </div>

                                <div className='shadow-sm bg-white text-center p-3'>
                                    <h6>Total Due: {this.props.totalPrice} Taka</h6>
                                    <button onClick={this.ConfirmSell} className='btn btn-site'>{this.state.ConfirmSell}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListTransaction;