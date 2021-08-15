import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../constant/API';
import { getCartData } from '../redux/actions/cart';



class Cart extends React.Component {
    state = {
        isCheckoutMode : false,
        recipientName : "",
        address : "",
        payment : 0
    }

    deleteBtnHandler = (deleteId) => {
        Axios.delete(`${API_URL}/carts/${deleteId}`)
        .then(() => {
            this.props.getCartData(this.props.userGlobal.id)
        })
        .catch(() => {
            alert("Terjadi Kesalahan Pada Sistem")
        })
    }

    checkoutModeToggle = () => {
        this.setState({isCheckoutMode : true})
    }

    cancelCheckoutHandler = () => {
        this.setState({isCheckoutMode : false})
    }

    renderSubtotalPrice = () => {
        let subTotal = 0
        for(let i = 0; i < this.props.cartGlobal.cartList.length;i++){
            subTotal += this.props.cartGlobal.cartList[i].price * this.props.cartGlobal.cartList[i].productQty
        }
        return subTotal
    }

    renderTaxFee = () => {
        return this.renderSubtotalPrice() * 0.05
    }

    renderTotalPrice = () => {
        return this.renderSubtotalPrice() + this.renderTaxFee()
    }

    inputHandler = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({[name]: value})
    }

    payBtnHandler = () => {
        if(this.state.payment < this.renderTotalPrice()){
            alert(`Uang anda kurang : ${this.renderTotalPrice() - this.state.payment}`)
            return;
        }

        if(this.state.payment > this.renderTotalPrice()){
            alert(`Uang kembalian anda : ${this.state.payment - this.renderTotalPrice()}`)
        }else if(this.state.payment === this.renderTotalPrice()){
            alert(`Terima kasih sudah melakukan pembayaran`)
        }

        const d = new Date()
        Axios.post(`${API_URL}/transactions`, {
            userId : this.props.userGlobal.id,
            address : this.state.address,
            recipientName : this.state.recipientName,
            totalPrice : parseInt(this.renderTotalPrice()),
            totalPayment : parseInt(this.state.payment),
            transactionDate : `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`,
            transactionItems : this.props.cartGlobal.cartList
        })
        .then((result) => {
            alert("Berhasil melakukan pembayaran")
            result.data.transactionItems.forEach((val) => {
                this.deleteBtnHandler(val.id)
            })
        })
        .catch(() => {
            alert("terjadi kesalahan pada sistem")
        })
    }

    renderCarts = () => {
        return this.props.cartGlobal.cartList.map((val) => {
           return(
            <tr>
                <td className="align-middle">{val.productName}</td>
                <td className="align-middle">{val.price}</td>
                <td className="align-middle"><img style={{height : "125px"}} src={val.productImage}/></td>
                <td className="align-middle">{val.productQty}</td>
                <td className="align-middle">
                    {val.productQty * val.price}
                </td>
                <td className="align-middle">
                    <button onClick={() => this.deleteBtnHandler(val.id)}className="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
           )
           
        })
    }
    

    render() {
        return (
            <div>
                <div className="p-5 text-center">
                    <h1>Cart</h1>
                    <div className="row">
                        <div className="col-9 text-center">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCarts()}
                                </tbody>
                                <tfoot className="bg-light">
                                    <tr>
                                        <td colSpan="6">
                                            {
                                                this.state.isCheckoutMode ?
                                                <button onClick={this.cancelCheckoutHandler} className="btn btn-danger">
                                                    Cancel
                                                </button>
                                                :
                                                <button onClick = {this.checkoutModeToggle} className="btn btn-success">
                                                    Checkout
                                                </button>
                                                
                                            }
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        {
                            this.state.isCheckoutMode ? 

                        <div className="col-3">
                            <div className="card text-left">
                                <div className="card-header">
                                    <strong>Order Summary</strong>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex my-2 flex-row justify-content-between align-item-center">
                                        <span className="fw-bold">Subtotal Price</span>
                                        <span>Rp {this.renderSubtotalPrice()}</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex my-2 flex-row justify-content-between align-item-center">
                                        <span className="fw-bold">Tax Fee</span>
                                        <span>Rp {this.renderTaxFee()}</span>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex my-2 flex-row justify-content-between align-item-center">
                                        <span className="fw-bold">Total Price</span>
                                        <span>Rp {this.renderTotalPrice()}</span>
                                    </div>
                                </div>
                                <div className="card-body border-top">
                                    <label htmlFor="recipientName">Recipient Name</label>
                                    <input onChange={this.inputHandler} type="text" className="form-control mb-3" name="recipientName"/>
                                    <label htmlFor="address">Address</label>
                                    <input onChange={this.inputHandler} type="text" className="form-control" name="address"/>
                                </div>
                                <div className="card-footer d-flex flex-row justify-content-between align-items-center">
                                    <input onChange={this.inputHandler} type="text" name="payment" className="form-control mx-1" />
                                    <button onClick={this.payBtnHandler} className="btn btn-success mx-1">Pay</button>
                                </div>
                            </div>
                        </div>
                        : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartGlobal : state.cart,
        userGlobal : state.user
    }  
}

const mapDispatchToProps = {
    getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);