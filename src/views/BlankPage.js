import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { Card, CardBody, Form, FormInput } from "shards-react";


export default class BlankPage extends Component {
    componentDidMount() {
        let _data = {
            idrequest: 2,
            division: "asdasd",
            total: 21312321,
            tanggal: "3213213",
            status: "sdfdsfdsf"
        }

          fetch('http://localhost:8080/api/tagihan/', {
            method: "POST",
            body: JSON.stringify(_data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
          .then(response => response.json()) 
          .then(json => console.log(json))
          .catch(err => console.log(err));

        // fetch('http://localhost:8080/api/tagihan/')
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col md="12">
                        <div class="card">
                            <div class="card-body">
                                This is some text within a card block.asdas
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

