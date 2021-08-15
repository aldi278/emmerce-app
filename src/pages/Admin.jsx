import React from 'react';
import Axios from 'axios';
import {API_URL} from '../constant/API'
import "../assets/styles/admin.css";
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class Admin extends React.Component {
    state = {
        productList : [],
        addProductName : "",
        addProductPrice : 0,
        addProductImage : "",
        addDescription : "",
        addCategory : "",

        editId : 0,

        editProductName : "",
        editProductPrice : 0,
        editProductImage : "",
        editDescription : "",
        editCategory : ""
    }

    inputHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({[name] : value})
    }

    fetchProducts = () => {
        Axios.get(`${API_URL}/products`)
        .then((result)=>{
            this.setState({productList : result.data})
        })
        .catch(()=>{
            alert("Terjadi gangguan pada server")
        })
    }

    editToggle = (editData) => {
        this.setState({
            editId : editData.id, 
            editProductName : editData.productName,
            editProductPrice : editData.price,
            editProductImage : editData.productImage,
            editDescription : editData.description,
            editCategory : editData.category
        })
    }

    cancelEdit = () => {
        this.setState({editId : 0})
    }

    renderProducts = () => {
        return this.state.productList.map(val => {
            if(val.id === this.state.editId){
                return (
                    <tr>
                        <td>{val.id}</td>
                        <td><input value={this.state.editProductName} name="editProductName" onChange={this.inputHandler} type="text" className="form-control"/></td>
                        <td><input value={this.state.editProductPrice} name="editProductPrice" onChange={this.inputHandler} type="text" className="form-control"/></td>
                        <td><input value={this.state.editProductImage} name="editProductImage" onChange={this.inputHandler} type="text" className="form-control"/></td>
                        <td><input value={this.state.editDescription} name="editDescription" onChange={this.inputHandler} type="text" className="form-control"/></td>
                        <td>
                            <select value={this.state.editCategory} name="editCategory" onChange={this.inputHandler} className="form-control">
                                <option value="">All Items</option>
                                <option value="ka os">Kaos</option>
                                <option value="celana">Celana</option>
                                <option value="aksesoris">Aksesoris</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={this.saveBtnHandler} className="btn btn-success">Save</button>
                        </td>
                        <td>
                            <button onClick = {this.cancelEdit} className="btn btn-danger">Cancel</button>
                        </td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.productName}</td>
                    <td>{val.price}</td>
                    <td><img className="admin-product-image" src={val.productImage} alt="" /></td>
                    <td>{val.description}</td>
                    <td>{val.category}</td>
                    <td>
                        <button onClick={() => this.editToggle(val)} className="btn btn-secondary">Edit</button>
                    </td>
                    <td>
                        <button onClick={() => this.deleteBtnHandler(val.id)}className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    addNewProduct = () => {
        Axios.post(`${API_URL}/products`, {
            productName : this.state.addProductName,
            price : parseInt(this.state.addProductPrice),
            productImage : this.state.addProductImage,
            description : this.state.addDescription,
            category : this.state.addCategory
        })
        .then(() => {
            this.fetchProducts()
            this.setState({
                addProductName : "",
                addProductPrice : 0,
                addProductImage : "",
                addDescription : "",
                addCategory : ""
            })
        })
        .catch(() => {
            alert("Terjadi Kesalahan pada sistem")
        })
    }

    saveBtnHandler = () => {
        Axios.patch(`${API_URL}/products/${this.state.editId}` ,{
            productName : this.state.editProductName,
            price : parseInt(this.state.editProductPrice),
            productImage : this.state.editProductImage,
            description : this.state.editDescription,
            category : this.state.editCategory
        })
        .then(() => {
            this.fetchProducts()
            this.cancelEdit()
        })
        .catch(() => {
            alert("Terjadi Kesalahan Pada Sistem")
        })
    }
    
    deleteBtnHandler = (deleteId) => {
        const confirmDelete = window.confirm("Yakin delete data? ")
        if(confirmDelete){
            Axios.delete(`${API_URL}/products/${deleteId}`)
            .then(() => {
                this.fetchProducts()
            })
            .catch(() => {
                alert("Terjadi Kesalahan pada sistem")
            })
        }else{
            alert("gagal delete data")
        }
        
    }

    componentDidMount() {
        this.fetchProducts()
    }

    render() {
        if(this.props.userGlobal.role !== "admin"){
            return <Redirect to="/" />
        }
        return (
            <div className="p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Manage Products</h1>
                        <table className="table mt-4">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderProducts()}
                            </tbody>
                            <tfoot className="bg-light">
                                <tr>
                                    <td></td>
                                    <td>
                                        <input value={this.state.addProductName} name="addProductName" onChange={this.inputHandler} type="text" className="form-control"/>
                                    </td>
                                    <td>
                                        <input value={this.state.addProductPrice}  name="addProductPrice" onChange={this.inputHandler} type="number" className="form-control"/>
                                    </td>
                                    <td>
                                        <input value={this.state.addProductImage} name="addProductImage" onChange={this.inputHandler} type="text" className="form-control"/>
                                    </td>
                                    <td>
                                        <input value={this.state.addDescription} name="addDescription" onChange={this.inputHandler} type="text" className="form-control"/>
                                    </td>
                                    <td>
                                        <select name="addCategory" onChange={this.inputHandler} className="form-control">
                                            <option value="">All Items</option>
                                            <option value="kaos">Kaos</option>
                                            <option value="celana">Celana</option>
                                            <option value="aksesoris">Aksesoris</option>
                                        </select>
                                    </td>
                                    <td colSpan="2">
                                        <button onClick={this.addNewProduct} className="btn btn-info">Add Product</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal : state.user
    } 
}

export default connect(mapStateToProps)(Admin);