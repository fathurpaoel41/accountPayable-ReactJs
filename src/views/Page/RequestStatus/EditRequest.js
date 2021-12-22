import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../../components/common/PageTitle";
import { Card, CardBody, Form, FormInput, FormGroup, Modal, ModalBody, ModalHeader, Button } from "shards-react";
import { Redirect } from "react-router-dom"


export default class EditRequest extends Component {
    constructor(props) {
        super(props)

        const date = new Date();
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        console.log(month, day, year)
        const tanggal = day + "-" + month + "-" + year

        const getIdRequestLocal = localStorage.getItem('idRequestSave')
        const idEditRequest = localStorage.getItem('idEditRequest')
        this.state = {
            id: 0,
            nama: "",
            divisi: "",
            total: 0,
            tanggal: tanggal,
            keterangan: "Pending",
            openModalRequestBarang: false,
            dataRequestBarang: [],
            dataBarang: [],
            idEditRequest: idEditRequest,
            //RequesBarang
            idrequest: getIdRequestLocal,
            nama_barang: "",
            harga: 0
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.changeName = this.changeName.bind(this)
        this.changeDisivi = this.changeDisivi.bind(this)
        this.toggleAddRequestBarang = this.toggleAddRequestBarang.bind(this)
        this.onSubmitRequestBarang = this.onSubmitRequestBarang.bind(this)
        this.onChangeNamaBarang = this.onChangeNamaBarang.bind(this)
        this.onChangeHarga = this.onChangeHarga.bind(this)
        this.countTotal = this.countTotal.bind(this)
        this.removeRequestBarang = this.removeRequestBarang.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/requestBarang/search?id_request=${this.state.idEditRequest}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ dataRequestBarang: data })
                this.countTotal(data)
            });
        
        fetch(`http://localhost:8080/api/request/${this.state.idEditRequest}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({ 
                dataBarang: data,
                id : data.id,
                nama : data.name,
                divisi: data.division,
            })
        });
    }

    componenDidUpdate() {
        return true
    }

    countTotal(total) {
        let kalkulasiTotal = null
        if (total.length > 0) {
            total.map(res => {
                kalkulasiTotal = kalkulasiTotal + res.harga
            })
        }
        this.setState({ total: kalkulasiTotal })
    }

    toggleAddRequestBarang() {
        this.setState({
            openModalRequestBarang: !this.state.openModalRequestBarang
        });
    }

    onChangeNamaBarang(e) {
        this.setState({ nama_barang: e.target.value })
    }

    onChangeHarga(e) {
        this.setState({ harga: e.target.value })
    }

    changeName(e) {
        this.setState({ nama: e.target.value })
    }

    changeDisivi(e) {
        this.setState({ divisi: e.target.value })
    }

    removeRequestBarang(id){
        fetch(`http://localhost:8080/api/requestBarang/${id}`, {
            method: 'DELETE'
        }).then(response => {
            return response.json()
        }).then(data =>
            console.log(data)
        );

        window.location.href = "http://localhost:5000/edit-request"
    }

    onSubmit(e) {
        e.preventDefault()
        localStorage.setItem("statusInsertRequest", "trueRequestEdit")
        console.log({ state: this.state })
        let { nama, divisi, total, tanggal, keterangan } = this.state
        let data = {
            name: nama,
            division: divisi,
            total: total,
            tanggal: tanggal,
            keterangan: keterangan
        }

        fetch(`http://localhost:8080/api/request/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))

        window.location.href = "http://localhost:5000/request-status"
    }

    onSubmitRequestBarang(e) {
        e.preventDefault()
        const { idEditRequest, nama_barang, harga } = this.state
        let data = {
            idrequest: idEditRequest,
            nama_barang: nama_barang,
            harga: harga,
        }

        fetch('http://localhost:8080/api/requestBarang/', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err))

        window.location.href = "http://localhost:5000/edit-request"
    }

    render() {
        const { openModalRequestBarang, dataRequestBarang, total, id, nama, divisi } = this.state
        console.log("count total ", this.state.total)
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Edit Request" subtitle="Detail Edit Request" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col md="12">
                        <div className="card">
                            <div className="card-body">
                                <i>Note: Tambahkan Barang Terlebih Dahulu</i>
                                <Row form>
                                    <Col md="6" className="form-group">
                                        <form onSubmit={this.onSubmit}>
                                            <label htmlFor="feEmailAddress">Nama PeRequest</label>
                                            <input type="text" name="nama" value={nama} className="form-control" placeholder="Masukan Nama Perequest" onChange={this.changeName} required />
                                            <label htmlFor="feEmailAddress">Divisi</label>
                                            <input type="text" name="divisi" value={divisi} className="form-control" placeholder="Masukan Nama Divisi" onChange={this.changeDisivi} />
                                            <label htmlFor="feEmailAddress">Total</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">Rp.</span>
                                                <input type="text" name="total" className="form-control" readOnly value={total} aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-primary"> Submit</button>
                                        </form>
                                    </Col>
                                    <Col md="6" className="form-group">
                                        <table className="table mb-0">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th scope="col" className="border-0">
                                                        No
                                                    </th>
                                                    <th scope="col" className="border-0">
                                                        Barang
                                                    </th>
                                                    <th scope="col" className="border-0">
                                                        Harga
                                                    </th>
                                                    <th scope="col" className="border-0">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataRequestBarang.length > 0 && dataRequestBarang.map((res, idx) => {
                                                    return (<tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{res.nama_barang}</td>
                                                        <td>Rp. {res.harga}</td>
                                                        <td>
                                                            <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={() => this.removeRequestBarang(res.id)}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                        <Button onClick={this.toggleAddRequestBarang}>Tambah Barang</Button>
                                        <Modal open={openModalRequestBarang} toggle={this.toggleAddRequestBarang}>
                                            <Col md="12" className="form-group">
                                                <ModalHeader>Tambah Request Barang</ModalHeader>
                                                <ModalBody>
                                                    <form onSubmit={this.onSubmitRequestBarang}>
                                                        <label htmlFor="feEmailAddress">Nama Barang</label>
                                                        <input type="text" name="nama_barang" className="form-control" placeholder="Masukan Nama Perequest" onChange={this.onChangeNamaBarang} required />
                                                        <label htmlFor="feEmailAddress">Harga</label>
                                                        <input type="number" name="harga" className="form-control" placeholder="Masukan Nama Divisi" onChange={this.onChangeHarga} />
                                                        <br />
                                                        <button type="submit" className="btn btn-danger" onClick={this.toggleAddRequestBarang}> Batal</button>&nbsp;
                                                        <button type="submit" className="btn btn-primary">Tambah Barang</button>
                                                    </form>
                                                </ModalBody>
                                            </Col>
                                        </Modal>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        )
    }
}

