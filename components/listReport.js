import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";

class ListReport extends Component {

    render() {
        const columns = [
            {
                name:'Invoice_No',
                selector:'invoice_no',
                sortable: true,
            },
            {
                name:'Invoice_Date',
                selector:'invoice_date',
                sortable: true,
                right: true,
            },
            {
                name:'Product_Name',
                selector:'product_name',
                sortable: true,
                right: true,
            },
            {
                name:'Quantity',
                selector:'product_quantity',
                sortable: true,
                right: true,
            },
            {
                name:'TotalPrice',
                selector:'total_price',
                sortable: true,
                right: true,
            },
            {
                name:'SellerName',
                selector:'seller_name',
                sortable: true,
                right: true,
            },
            {
                name:'Invoice',
                cell:row=><button className='btn btn-primary'>Print</button>
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
                                            <Col md={6}>
                                                <div className='input-group'>
                                                    <h4 className='table-title'>Report</h4>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='input-group'>
                                                    <input type='date' className='form-control form-control-sm mx-2'/>
                                                    <input type='date' className='form-control form-control-sm mx-2'/>
                                                    <button className='btn btn-sm btn-danger mx-2'>Report</button>
                                                </div>
                                            </Col>
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
            </Fragment>
        );
    }
}

export default ListReport;