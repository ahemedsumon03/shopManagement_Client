import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import CogoToast from "cogo-toast";
import axios from "axios";
import Router from "next/router";

class ListProduct extends Component {

    constructor() {
        super();
        this.state = {
            show:false,
            showEdit:false,
            editId:'',
            deleteId:'',
            picon:'',
            pname:'',
            preamrk:'',
            pcategory:'',
            pPrice:'',
            SaveChange:'Save Changes'
        }
    }

    handleOpen=()=>{
        this.setState({show:true})
    }

    handleClose=()=>{
        this.setState({show:false})
    }

    handleOpenEdit=()=>{
        this.setState({showEdit:true})
    }

    handleCloseEdit=()=>{
        this.setState({showEdit:false})
    }

    deleteIconClick=(id)=>{
        this.setState({deleteId:id})
        this.deleteProductData(id);
    }

    editIconClick=(id)=>{
        this.setState({editId:id})
        this.selectProductData(id);
        this.handleOpenEdit();
    }

    productNameChange=(event)=>{
        let pname = event.target.value;
        this.setState({pname:pname})
    }

    productIconChange=(event)=>{
        let picon = event.target.files[0];
        this.setState({picon:picon})
    }

    productRemarkChange=(event)=>{
        let preamrk = event.target.value;
        this.setState({preamrk:preamrk})
    }

    productCategoryChange=(event)=>{
        let pcategory = event.target.value;
        this.setState({pcategory:pcategory})
    }

    productPriceChange=(event)=>{
        let pPrice = event.target.value;
        this.setState({pPrice:pPrice})
    }

    saveProductData=()=>{
        let pname = this.state.pname;
        let picon = this.state.picon;
        let premark = this.state.preamrk;
        let pcategory = this.state.pcategory;
        let pPrice = this.state.pPrice;

        if(pname.length === 0)
        {
            CogoToast.error('Product Name is Empty',{position:"bottom-center"})
        }
        else if(picon.length ===0)
        {
            CogoToast.error('Product Icon is Empty',{position:"bottom-center"})
        }
        else if(pPrice.length ===0)
        {
            CogoToast.error('Product Price is Empty',{position:"bottom-center"})
        }
        else if(premark.length ===0)
        {
            CogoToast.error('Product Remark is Empty',{position:"bottom-center"})
        }
        else if(pcategory.length ===0)
        {
            CogoToast.error('Product Category is Empty',{position:"bottom-center"})
        }
        else {
            this.setState({SaveChange:'Adding...'})
            let MyFormData = new FormData();
            MyFormData.append('product_name',pname);
            MyFormData.append('image',picon);
            MyFormData.append('product_price',pPrice);
            MyFormData.append('product_category',pcategory);
            MyFormData.append('product_remark',premark);

            axios.post(this.props.url+"/AddProduct",MyFormData).then(response=>{
                if(response.status === 200 && response.data === 1)
                {
                    CogoToast.success('Product is Added',{position:"bottom-center"})
                    this.setState({SaveChange:'Save Changes'})
                    this.handleClose();
                    Router.push('/product');
                }
                else {
                    CogoToast.success('Product not Added',{position:"bottom-center"})
                    this.setState({SaveChange:'Save Changes'})
                    this.handleClose();
                    Router.push('/product');
                }
            }).catch(error=>{
                CogoToast.success('Product not Added',{position:"bottom-center"})
                this.setState({SaveChange:'Save Changes'})
                this.handleClose();
                Router.push('/product');
            });
        }
    }

    selectProductData=(id)=>{
        axios.get(this.props.url+"/SelectProductById/"+id).then(res=>{
            let jsonData = res.data;

            document.getElementById('pname').value = jsonData[0]['product_name'];
            document.getElementById('pp').value = jsonData[0]['product_price'];
            document.getElementById('pr').value = jsonData[0]['product_remark'];

        }).catch();
    }

    UpdateProductData=()=>{

        let updatePname = document.getElementById('pname').value;
        let updatePp = document.getElementById('pp').value;
        let updatePr = document.getElementById('pr').value;
        let updateIcon = document.getElementById('pi').files[0];
        let updateCategory = document.getElementById('pc').value;

        this.setState({SaveChange:'Updating...'})
        let MyFormData = new FormData();
        MyFormData.append('product_name',updatePname);
        MyFormData.append('image',updateIcon);
        MyFormData.append('product_price',updatePp);
        MyFormData.append('product_category',updateCategory)
        MyFormData.append('product_remark',updatePr);

        axios.post(this.props.url+"/UpdateProductWithImage/"+this.state.editId,MyFormData).then(response=>{
            if(response.status === 200)
            {
                CogoToast.success('Data is Updated',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'});
                this.handleCloseEdit();
                Router.push('/product');

            }else {
                CogoToast.success('Data not Updated',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'});
                this.handleCloseEdit();
                Router.push('/product');
            }
        }).catch(error=>{
            CogoToast.success('Data not Updated',{position:"bottom-center"});
            this.setState({SaveChange:'Save Changes'});
            this.handleCloseEdit();
            Router.push('/product');
        });
    }

    deleteProductData=(id)=>{
        this.setState({SaveChange:'Deleting...'})
        axios.post(this.props.url+"/DeleteProduct/"+id).then(response=>{
            if(response.status === 200)
            {
                CogoToast.success('Data is Deleted',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'})
                Router.push('/product');
            }
            else {
                CogoToast.success('Data not Deleted',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'})
                Router.push('/product');
            }
        }).catch(err=>{
            CogoToast.success('Data not Deleted',{position:"bottom-center"});
            this.setState({SaveChange:'Save Changes'})
            Router.push('/product');
        });
    }


    render() {
        const columns = [
            {
                name: 'Product_Icon',
                selector: 'product_icon',
                sortable: true,
                cell:row => <img src={row.product_icon} className='cat-icon'/>
            },
            {
                name: 'Product_Name',
                selector: 'product_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Product_Code',
                selector: 'product_code',
                sortable: true,
                right: true,
            },
            {
                name: 'Product_Price',
                selector: 'product_price',
                sortable: true,
                right: true,
            },
            {
                name:'Product_Remark',
                selector:'product_remark',
                sortable: true,
                right: true,
            },
            {
                name:'Product_Category',
                selector:'product_category',
                sortable: true,
                right: true,
            },
            {
                name:'Delete',
                selector:'id',
                sortable:true,
                right:true,
                cell:row=><button onClick={this.deleteIconClick.bind(this,row.id)} className='btn btn-danger'><i className='fa fa-trash-alt'></i></button>
            },
            {
                name:'Edit',
                selector:'id',
                sortable:true,
                right:true,
                cell:row => <button onClick={this.editIconClick.bind(this,row.id)} className='btn btn-secondary'><i className='fa fa-edit'></i></button>
            }
        ];


        let categoryData = this.props.categoryData;
        let MyView = categoryData.map((List,i)=>{
            return <Fragment>
                      <option value={List.cat_name}>{List.cat_name}</option>
                 </Fragment>
        })

        return (
            <Fragment>
                <Container className='animated zoomIn'>
                    <Row className='mt-2'>
                        <Col lg={12} md={12} sm={12} xl={12}>
                            <Card>
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col><h4 className='table-title'>Product List</h4></Col>
                                            <Col><button onClick={this.handleOpen} className='float-right circular-btn'><i className='fa fa-plus'></i></button></Col>
                                        </Row>
                                    </Container>
                                    <hr className='bg-secondary'/>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col sm={12} md={12} lg={12} xl={12}>
                                                <DataTable
                                                    noHeader={true}
                                                    pagination={true}
                                                    paginationPerPage={5}
                                                    columns={columns}
                                                    data={this.props.myData}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>


                <Modal animation={false} className='animated zoomIn' show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header>
                        <h6>{this.state.editId} Edit Product</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='form-label'>Product Name</label>
                        <input id='pname' className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Product Icon</label>
                        <input id='pi' className='form-control form-control-sm form-control-file' type='file'/>
                        <label className='form-label'>Product Price</label>
                        <input id='pp' className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Product Remark</label>
                        <input id='pr' className='form-control form-control-sm' type='text'/>
                        <label className="form-label">Product Category</label>
                        <select id='pc' className='form-control form-control-sm form-select'>
                            {MyView}
                        </select>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn-sm' variant='secondary' onClick={this.handleCloseEdit}>Close</button>
                        <button onClick={this.UpdateProductData} className='btn btn-sm btn-site'>Save Changes</button>
                    </Modal.Footer>
                </Modal>


                <Modal animation={false} className='animated zoomIn' show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6>Add Product</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='form-label'>Product Name</label>
                        <input onChange={this.productNameChange} className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Product Icon</label>
                        <input onChange={this.productIconChange} className='form-control form-control-sm form-control-file' type='file'/>
                        <label className='form-label'>Product Price</label>
                        <input onChange={this.productPriceChange} className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Product Remark</label>
                        <input onChange={this.productRemarkChange} className='form-control form-control-sm' type='text'/>
                        <label className="form-label">Product Category</label>
                        <select onChange={this.productCategoryChange} className='form-control form-control-sm form-select'>
                            <option value=''>Select Category</option>
                            {MyView}
                        </select>

                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn-sm' variant='secondary' onClick={this.handleClose}>Close</button>
                        <button onClick={this.saveProductData} className='btn btn-sm btn-site'>{this.state.SaveChange}</button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default ListProduct;