import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import CogoToast from 'cogo-toast'
import axios from "axios";
import Router from 'next/router'

class ListUser extends Component {

    constructor() {
        super();
        this.state = {
            show:false,
            showEdit:false,
            editId:'',
            deleteId:'',
            name:'',
            username:'',
            password:'',
            roll:'',
            SaveChange:'Save Changes',
            write:'Save Changes'
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
        this.deleteData(id);
    }

    editIconClick=(id)=>{
        this.setState({editId:id})
        this.SelectData(id);
        this.handleOpenEdit();
    }

    SelectData=(id)=>{
        axios.get(this.props.url+"/SelectUserById/"+id).then(response=>{
            if(response.status === 200)
            {
                let jsonData = response.data;

                document.getElementById('fname').value = jsonData[0]['fullname'];
                document.getElementById('uname').value = jsonData[0]['username'];
                document.getElementById('pa').value = jsonData[0]['password'];
            }
        }).catch();

    }

    nameHandler=(event)=>{
        let name = event.target.value;
        this.setState({name:name})
    }

    userHandler=(event)=>{
        let username = event.target.value;
        this.setState({username:username})
    }

    passHandler=(event)=>{
        let password = event.target.value;
        this.setState({password:password})
    }

    rollHandler=(event)=>{
        let roll = event.target.value;
        this.setState({roll:roll})
    }

    saveData=()=>{

        let name = this.state.name;
        let username = this.state.username;
        let password = this.state.password;
        let roll = this.state.roll;

        if(name.length === 0)
        {
            CogoToast.error('Name is Empty',{position:"bottom-center"})
        }
        else if(username.length ===0)
        {
            CogoToast.error('Username is Empty',{position:"bottom-center"})
        }
        else if(password.length ===0)
        {
            CogoToast.error('Password is Empty',{position:"bottom-center"})
        }
        else if(roll.length ===0)
        {
            CogoToast.error('Roll is Empty',{position:"bottom-center"})
        }else {
            this.setState({SaveChange:'Adding...'})
            let MyFormData = new FormData();
            MyFormData.append('fullname',name);
            MyFormData.append('username',username);
            MyFormData.append('roll',roll);
            MyFormData.append('lastactivity','No Activity');
            MyFormData.append('password',password);

            axios.post(this.props.url+"/addUser",MyFormData).then(response=>{
                if(response.status === 200 && response.data === 1)
                {
                    CogoToast.success('User is Added',{position:"bottom-center"})
                    this.setState({SaveChange:'Save Changes'})
                    this.handleClose();
                    Router.push('/user');
                }
                else {
                    CogoToast.success('User not Added',{position:"bottom-center"})
                    this.setState({SaveChange:'Save Changes'})
                    this.handleClose();
                    Router.push('/user');
                }
            }).catch(error=>{
                CogoToast.success('User not Added',{position:"bottom-center"})
                this.setState({SaveChange:'Save Changes'})
                this.handleClose();
                Router.push('/user');
            });
        }
    }

    updateValue=()=>{

        let updatename = document.getElementById('fname').value;
        let updateusername= document.getElementById('uname').value;
        let updatepass = document.getElementById('pa').value;
        let updateroll = document.getElementById('ro').value;

        this.setState({write:'Updating...'})
        let MyFormData = new FormData();
        MyFormData.append('fullname',updatename);
        MyFormData.append('username',updateusername);
        MyFormData.append('roll',updateroll);
        MyFormData.append('password',updatepass);

        axios.post(this.props.url+"/updateUser/"+this.state.editId,MyFormData).then(response=>{
            if(response.status === 200)
            {
                CogoToast.success('Data is Updated',{position:"bottom-center"});
                this.setState({write:'Save Changes'});
                this.handleCloseEdit();
                Router.push('/user');

            }else {
                CogoToast.success('Data not Updated',{position:"bottom-center"});
                this.setState({write:'Save Changes'});
                this.handleCloseEdit();
                Router.push('/user');
            }
        }).catch(error=>{
            CogoToast.success('Data not Updated',{position:"bottom-center"});
            this.setState({write:'Save Changes'});
            this.handleCloseEdit();
            Router.push('/user');
        });
    }

    deleteData=(id)=>{
        axios.post(this.props.url+"/deleteUser/"+id).then(response=>{
            if(response.status === 200)
            {
                CogoToast.success('Data is Deleted',{position:"bottom-center"});
                Router.push('/user');

            }else {
                CogoToast.error('Data is not Deleted',{position:"bottom-center"});
                Router.push('/user');
            }
        }).catch(error=>{
            CogoToast.error('Data is not Deleted',{position:"bottom-center"});
            Router.push('/user');
        });
    }



    render() {

        const columns = [
            {
                name: 'FullName',
                selector: 'fullname',
                sortable: true,
            },
            {
                name: 'UserName',
                selector: 'username',
                sortable: true,
                right: true,
            },
            {
                name: 'Roll',
                selector: 'roll',
                sortable: true,
                right: true,
            },
            {
                name: 'LastActivity',
                selector: 'lastactivity',
                sortable: true,
                right: true,
            },
            {
                name: 'Password',
                selector: 'password',
                sortable: true,
                right: true,
            },
            {
                name:'Delete',
                selector:'id',
                sortable:true,
                right:true,
                cell:(row)=><button onClick={()=>this.deleteIconClick(row.id)} className='btn btn-danger'><i className='fa fa-trash-alt'></i></button>
            },
            {
                name:'Edit',
                selector:'id',
                sortable:true,
                right:true,
                cell:(row) => <button onClick={()=>this.editIconClick(row.id)} className='btn btn-secondary'><i className='fa fa-edit'></i></button>
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
                                            <Col><h4 className='table-title'>User List</h4></Col>
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
                        <p id='showid'></p>
                        <h6>{this.state.editId} Edit User</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='form-label'>Full Name</label>
                        <input id='fname' className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>User Name</label>
                        <input id='uname' className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Password</label>
                        <input  id='pa' className='form-control form-control-sm' type='password'/>
                        <label className="form-label">Roll</label>
                        <select id='ro' className='form-control form-control-sm form-select'>
                            <option>Select Roll</option>
                            <option value='admin'>Admin</option>
                            <option value='worker'>Worker</option>
                        </select>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className='btn-sm' variant='secondary' onClick={this.handleCloseEdit}>Close</button>
                        <button onClick={this.updateValue} className='btn btn-sm btn-site'>{this.state.write}</button>
                    </Modal.Footer>
                </Modal>


                <Modal animation={false} className='animated zoomIn' show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6>Add User</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className='form-label'>Full Name</label>
                        <input onChange={this.nameHandler} className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>User Name</label>
                        <input onChange={this.userHandler} className='form-control form-control-sm' type='text'/>
                        <label className='form-label'>Password</label>
                        <input onChange={this.passHandler} className='form-control form-control-sm' type='password'/>
                        <label className="form-label">Roll</label>
                        <select onChange={this.rollHandler} className='form-control form-control-sm form-select'>
                            <option>Select Roll</option>
                            <option value='admin'>Admin</option>
                            <option value='worker'>Worker</option>
                        </select>
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

export default ListUser;