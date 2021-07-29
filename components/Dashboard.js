import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip} from "recharts";
import DataTable from "react-data-table-component";

class Dashboard extends Component {
    render() {
        return (
            <Fragment>
               <Container>
                   <Row className='mt-2'>
                       <Col md={6} lg={6} sm={12}>
                           <Row>
                               <Col className='text-center animated zoomIn p-1' sm={6} lg={6} md={6} xs={6}>
                                   <Card>
                                       <Card.Body>
                                           <h1 className='count-number'>{this.props.TotalTransaction}</h1>
                                           <h6 className='count-title'>Total Transaction</h6>
                                       </Card.Body>
                                   </Card>
                               </Col>
                               <Col className='text-center animated zoomIn p-1' sm={6} lg={6} md={6} xs={6} xl={6}>
                                   <Card>
                                       <Card.Body>
                                           <h1 className='count-number'>{this.props.TotalIncome}</h1>
                                           <h6 className='count-title'>Total Income</h6>
                                       </Card.Body>
                                   </Card>
                               </Col>
                               <Col className='text-center animated zoomIn p-1' sm={6} lg={6} md={6} xs={6} xl={6}>
                                   <Card>
                                       <Card.Body>
                                           <h1 className='count-number'>{this.props.TotalCategory}</h1>
                                           <h6 className='count-title'>Total Category</h6>
                                       </Card.Body>
                                   </Card>
                               </Col>
                               <Col className='text-center animated zoomIn p-1' sm={6} lg={6} md={6} xs={6} xl={6}>
                                   <Card>
                                       <Card.Body>
                                           <h1 className='count-number'>{this.props.TotalProduct}</h1>
                                           <h6 className='count-title'>Total Product</h6>
                                       </Card.Body>
                                   </Card>
                               </Col>

                               <Col sm={12} xs={12} md={12} lg={12}>
                                  <Card>
                                      <Card.Body>
                                          <h1 className='count-title'>Last 7 Days</h1>
                                          <ResponsiveContainer width="100%" height={200}>
                                              <AreaChart data={this.props.chartdata}>
                                                  <CartesianGrid strokeDasharray="3 3" />
                                                  <Tooltip/>
                                                  <Area type="monotone" dataKey="income" stroke="#CB4D85" fill="#CB4D85" />
                                              </AreaChart>
                                          </ResponsiveContainer>
                                      </Card.Body>
                                  </Card>
                               </Col>
                           </Row>
                       </Col>

                       <Col className='p-1 animated zoomIn' sm={12} xs={12} lg={6} md={6}>
                          <Card>
                              <Card.Body>
                                  <DataTable
                                      pagination={5}
                                      pagination={true}
                                      title="Last 7 Days Transaction"
                                      columns={this.props.columns}
                                      data={this.props.tableData}
                                  />
                              </Card.Body>
                          </Card>
                       </Col>
                   </Row>
               </Container>
            </Fragment>
        );
    }
}

export default Dashboard;