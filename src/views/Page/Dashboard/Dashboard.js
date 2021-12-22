import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
} from "shards-react";

import PageTitle from "../../../components/common/PageTitle";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pending: 0,
            done: 0,
            dataGetRequest: []
        }

        this.pending = 0
        this.done = 0
    }

    async componentDidMount() {
        fetch('http://localhost:8080/api/request/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ dataGetRequest: data })
            });
    }

    // componentDidUpdate(prevProps, prevState) {

    //     if (prevProps.dataGetRequest != this.state.dataGetRequest) {
    //         const getDataRequest = this.state.dataGetRequest
    //         let pending = 0
    //         let done = 0
    //         getDataRequest.map(res => {
    //             if (res.keterangan = "Pending") {
    //                 pending += 1
    //             } else if (res.keterangan = "Done") {
    //                 done += 1
    //             }
    //         })

    //         this.setState({pending: pending, done: done})
    //         this.pending = pending
    //         this.done = done
    //         return true
    //     }else{
    //         return false
    //     }
    // }


    render() {
        let pending = 0
        let done = 0
        const {dataGetRequest } = this.state
        if(dataGetRequest.length > 0){
            dataGetRequest.map(res => {
                if (res.keterangan == "Pending") {
                    pending += 1
                } else if (res.keterangan == "Done") {
                    done += 1
                }
            })
        } 
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}

                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Dashboard" subtitle="Home Dashboard" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col md="12">
                        <Row>
                            <Col lg="6" md="6" sm="12" className="mb-4" >
                                <Card small className="card-post h-100">
                                    <CardBody>
                                        <h5 className="card-title">
                                            <a className="text-fiord-blue" href="#">
                                                Request Pending
                                            </a>
                                        </h5>
                                        <center><h1>{pending}</h1></center>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg="6" md="6" sm="12" className="mb-4" >
                                <Card small className="card-post h-100">
                                    <CardBody>
                                        <h5 className="card-title">
                                            <a className="text-fiord-blue" href="#">
                                                Complete
                                            </a>
                                        </h5>
                                        <center><h1>{done}</h1></center>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

