import React, { Component } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button,
    CardHeader,
    Alert,
    Modal, ModalBody, ModalHeader
} from "shards-react";
import { Link } from "react-router-dom";

import PageTitle from "../../../components/common/PageTitle";



export default class RequestStatus extends Component {
    constructor(props) {
        super(props)

        this.styleLink = {
            textDecoration: "none",
            color: "white",
        }

        const getStatusInputRequest = localStorage.getItem("statusInsertRequest")

        this.state = {
            alertStatus: getStatusInputRequest,
            dataRequest: [],
            idRequest: 0,
            openModalDelete: false,
        }

        this.removeDataRequest = this.removeDataRequest.bind(this)
        this.saveIdRequest = this.saveIdRequest.bind(this)
        this.ModalDelete = this.ModalDelete.bind(this)
        this.EditRequest = this.EditRequest.bind(this)
    }

    async componentDidMount() {
        fetch('http://localhost:8080/api/request/')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ dataRequest: data })
                this.saveIdRequest(data);
            });
    }

    ModalDelete(id) {
        this.setState({
            openModalDelete: !this.state.openModalDelete
        });
        console.log("modal Id", id)
        localStorage.setItem("deleteRequest", id)
    }

    saveIdRequest(data) {
        let SortArr = []
        data.map((res) => {
            this.setState({ idRequest: res.id })
            SortArr.push(res.id)
        })

        SortArr.sort((a, b) => {
            return a - b
        });

        let resultIdRequest = 0
        SortArr.map((res) => {
            resultIdRequest = res
        })

        localStorage.setItem("idRequestSave", resultIdRequest + 1)
    }

    removeDataRequest() {
        //sudah bisa ambil data
        const getIdRequest = localStorage.getItem("deleteRequest")
        localStorage.setItem("statusInsertRequest", "trueDeleteRequest")
        fetch(`http://localhost:8080/api/request/${getIdRequest}`, {
            method: 'DELETE'
        }).then(response => {
            return response.json()
        }).then(data =>
            // this is the data we get after putting our data,
            console.log(data)
        );

        window.location.href = "http://localhost:5000/request-status"
    }

    EditRequest(id){
        localStorage.setItem("idEditRequest", id)
        window.location.href = "http://localhost:5000/edit-request"
    }

    render() {
        let alert = false
        let messageAlert = ""
        if (this.state.alertStatus == "trueRequest") {
            alert = true
            messageAlert = "Data Request Berhasil Ditambahkan!"
            localStorage.setItem("statusInsertRequest", "false")
        } else if (this.state.alertStatus == "trueDeleteRequest") {
            alert = true
            messageAlert = "Data Request Berhasil Dihapus!"
            localStorage.setItem("statusInsertRequest", "false")
        } else if(this.state.alertStatus == "trueRequestEdit"){
            alert = true
            messageAlert = "Data Request Berhasil Diubah!"
            localStorage.setItem("statusInsertRequest", "false")
        }
        const { dataRequest, openModalDelete } = this.state
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}

                {alert == true ?
                    (<Alert className="mb-0">
                        <i className="fa fa-info mx-2"></i> {messageAlert}
                    </Alert>) : ""
                }

                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Request Status" subtitle="Detail Request Status" className="text-sm-left" />
                </Row>


                <Row>
                    <Col>
                        <Button size="sm" theme="primary" className="mb-2 mr-1">
                            <Link to={`/insert-request`} style={this.styleLink}>Tambah Request</Link>
                        </Button>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Data Request</h6>
                            </CardHeader>

                            <CardBody className="p-0 pb-3">
                                <table className="table mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col" className="border-0">
                                                No
                                            </th>
                                            <th scope="col" className="border-0">
                                                Id
                                            </th>
                                            <th scope="col" className="border-0">
                                                Nama
                                            </th>
                                            <th scope="col" className="border-0">
                                                Divisi
                                            </th>
                                            <th scope="col" className="border-0">
                                                Total
                                            </th>
                                            <th scope="col" className="border-0">
                                                Tanggal
                                            </th>
                                            <th scope="col" className="border-0">
                                                Status
                                            </th>
                                            <th scope="col" className="border-0">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataRequest.length > 0 && dataRequest.map((res, idx) => {
                                            return (<tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{res.id}</td>
                                                <td>{res.name}</td>
                                                <td>{res.division}</td>
                                                <td>Rp. {res.total}</td>
                                                <td>{res.tanggal}</td>
                                                <td>{res.keterangan}</td>
                                                <td>
                                                    <Button size="sm" theme="warning" className="mb-2 mr-1" onClick={() =>this.EditRequest(res.id)}>
                                                        Edit
                                                    </Button>
                                                    <Button size="sm" theme="danger" className="mb-2 mr-1" onClick={() =>this.ModalDelete(res.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                                <Modal open={openModalDelete} toggle={this.ModalDelete}>
                                    <Col md="12" className="form-group">
                                        <ModalHeader>Hapus Data Request</ModalHeader>
                                        <ModalBody>
                                            Apakah Anda yakin Ingin Menghapus Data Request ? <br /><br />
                                            <center><button type="submit" className="btn btn-primary" onClick={this.ModalDelete}> Batal</button>&nbsp;
                                                <button type="submit" className="btn btn-danger" onClick={this.removeDataRequest}>Hapus</button></center>
                                        </ModalBody>
                                    </Col>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

