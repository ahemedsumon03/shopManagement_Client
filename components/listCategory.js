import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import CogoToast from "cogo-toast";
import axios from "axios";
import Router from "next/router";

class ListCategory extends Component {

    constructor() {
        super();
        this.state = {
            show:false,
            showEdit:false,
            editId:'',
            deleteId:'',
            cat_icon:'',
            cat_name:'',
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
        this.deleteCategory(id);
    }

    editIconClick=(id)=>{
        this.setState({editId:id})
        this.SelectCategoryData(id);
        this.handleOpenEdit();
    }

    deleteCategory=(id)=>{
        this.setState({SaveChange:'Deleting...'})
        axios.post(this.props.url+"/DeleteCategory/"+id).then(response=>{
            if(response.status === 200)
            {
                CogoToast.success('Data is Deleted',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'})
                Router.push('/category');
            }
            else {
                CogoToast.success('Data not Deleted',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'})
                Router.push('/category');
            }
        }).catch(err=>{
            CogoToast.success('Data not Deleted',{position:"bottom-center"});
            this.setState({SaveChange:'Save Changes'})
            Router.push('/category');
        });
    }

    catnameChange=(event)=>{
        let cat_name = event.target.value;
        this.setState({cat_name:cat_name})
    }

    caticonChange=(event)=>{
        let cat_icon = event.target.files[0];
        this.setState({cat_icon:cat_icon})
    }

    SelectCategoryData=(id)=>{
        axios.get(this.props.url+"/SelectCategoryById/"+id).then(response=>{
            if(response.status === 200)
            {
                let jsonData = response.data;

                document.getElementById('catname').value = jsonData[0]['cat_name'];
            }
        }).catch();
    }

    saveData=()=>{

        let cat_name = this.state.cat_name;
        let cat_icon = this.state.cat_icon;

        if(cat_name.length === 0)
        {
            CogoToast.error('Cat_name is Empty',{position:"bottom-center"})
        }
        else if(cat_icon.length ===0)
        {
            CogoToast.error('Cat_icon is Empty',{position:"bottom-center"})
        }
        else {
            this.setState({SaveChange:'Adding...'})
            let MyFormData = new FormData();
            MyFormData.append('cat_name',cat_name);
            MyFormData.append('image',cat_icon);

            axios.post(this.props.url+"/AddCategory",MyFormData).then(response=>{
                if(response.status === 200 && response.data === 1)
                {
                    CogoToast.success('Category is Added',{position:"bottom-center"})
                    this.setState({SaveChange:'Save Changes'})
                    this.handleClose();
                    Router.push('/category');
                }
                else {
                    CogoToast.success('Category not Added',{position:"bottom-center"})
                    this.setState({SaveChange:'Save Changes'})
                    this.handleClose();
                    Router.push('/category');
                }
            }).catch(error=>{
                CogoToast.success('Category not Added',{position:"bottom-center"})
                this.setState({SaveChange:'Save Changes'})
                this.handleClose();
                Router.push('/category');
            });
        }
    }

    updateCategory=()=>{
        let updateCatName = document.getElementById('catname').value
        let update_cat_icon = document.getElementById('myFile').files[0];

        this.setState({SaveChange:'Updating...'})
        let MyFormData = new FormData();
        MyFormData.append('cat_name',updateCatName);
        MyFormData.append('image',update_cat_icon);

        axios.post(this.props.url+"/UpdateCategoryWithImage/"+this.state.editId,MyFormData).then(response=>{
            if(response.status === 200)
            {
                CogoToast.success('Data is Updated',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'});
                this.handleCloseEdit();
                Router.push('/category');

            }else {
                CogoToast.success('Data not Updated',{position:"bottom-center"});
                this.setState({SaveChange:'Save Changes'});
                this.handleCloseEdit();
                Router.push('/category');
            }
        }).catch(error=>{
            CogoToast.success('Data not Updated',{position:"bottom-center"});
            this.setState({SaveChange:'Save Changes'});
            this.handleCloseEdit();
            Router.push('/category');
        });
    }


    render() {
        const columns = [
            {
                name: 'Cat_Icon',
                selector: 'cat_icon',
                sortable: true,
                cell:row => <img src={row.cat_icon} className='cat-icon'/>
            },
            {
                name: 'Cat_Name',
                selector: 'cat_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Cat_Code',
                selector: 'cat_code',
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

        return (
            <Fragment>
                <Container className='animated zoomIn'>
                    <Row className='mt-2'>
                        <Col lg={12} md={12} sm={12} xl={12}>
                            <Card>
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col><h4 className='table-title'>Category List</h4></Col>
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
                        <h6>{this.state.editId} Edit Category</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='form-label'>Category Name</label>
                        <input id='catname' className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Category Icon</label>
                        <input id='myFile' className='form-control form-control-sm form-control-file' type='file'/>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn-sm' variant='secondary' onClick={this.handleCloseEdit}>Close</button>
                        <button onClick={this.updateCategory} className='btn btn-sm btn-site'>Save Changes</button>
                    </Modal.Footer>
                </Modal>


                <Modal animation={false} className='animated zoomIn' show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6>Add Category</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='form-label'>Category Name</label>
                        <input onChange={this.catnameChange} className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Category Icon</label>
                        <input onChange={this.caticonChange} className='form-control form-control-sm form-control-file' type='file'/>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn-sm' variant='secondary' onClick={this.handleClose}>Close</button>
                        <button onClick={this.saveData} className='btn btn-sm btn-site'>{this.state.SaveChange}</button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}

export default ListCategory;