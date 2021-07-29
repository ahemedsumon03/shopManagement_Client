import React, {Component,Fragment} from 'react';
import axios from "axios";
import Link from "next/link";

class ListCategoryTransaction extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[]
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/ProductSelectByCategory/"+this.props.category).then(res=>{
            this.setState({ProductData:res.data})
        }).catch();
    }


    render() {

        let ProductData = this.state.ProductData;

        let MyView=ProductData.map((List,i)=>{
            return(
                <div className="col-md-3 p-1 text-center col-lg-3 col-sm-6 col-3">
                    <Link as={'/productdetails/'+List.product_code} href={'/productdetails/[Pcode]'}>
                        <div className='product-card'>
                            <img className="product-img-one"  src={List.product_icon}/>
                            <h1 className="product_details_name">{List.product_name}</h1>
                            <h1 className="product-price">{List.product_price} TK</h1>
                        </div>
                    </Link>
                </div>
            )
        })

        return (
            <Fragment>
                <div className="mt-1 ">
                    <div  className="animated  zoomIn container-fluid">
                        <div className="row">
                            <div className="col-md-12 p-1  col-lg-12 col-sm-12">
                                <div className="container shadow-sm p-3 bg-white">
                                    <div className="row">
                                        <h4 className='ml-auto mr-auto heading-name'>{this.props.category}</h4>
                                    </div>
                                    <hr/>
                                    <div className="row ListTransactionHeight">
                                        {MyView}
                                    </div>
                                </div>
                            </div>


                            {/*<div className="col-md-5 p-1  col-lg-5 col-sm-12">*/}
                            {/*    <div className="shadow-sm p-2 text-center bg-site">*/}
                            {/*        <h6 className="text-white">Cart List</h6>*/}
                            {/*    </div>*/}
                            {/*    <div className="shadow-sm bg-white text-center ListTransactionCartHeight ListTransaction p-3   ">*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*        <div className="container-fluid">*/}
                            {/*            <div className="row">*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <img className="cart-image" src="http://superadmin.laptopcitypro.com/storage/app/public/ZZDZgcIVlxG4V8F2aDduuHsga1p6sJluksbYefHp.png"/>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <p className="product-name">Product Name</p>*/}
                            {/*                    <p className="product-price">Qty: 02 | 200 TK</p>*/}
                            {/*                </div>*/}
                            {/*                <div className="col-4 text-center">*/}
                            {/*                    <div className="input-group">*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-plus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-minus"/></button>*/}
                            {/*                        <button className="circular-btn"><i className="fa fa-trash-alt"/></button>*/}
                            {/*                    </div>*/}

                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <hr className="bg-secondary"/>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="shadow-sm text-center p-2 bg-white">*/}
                            {/*        <h6>Total Due: 200 TK</h6>*/}
                            {/*        <button className="btn btn-site">Confirm Sell</button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListCategoryTransaction;