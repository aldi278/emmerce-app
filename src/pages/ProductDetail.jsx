import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import {API_URL} from '../constant/API';
import {getCartData} from '../redux/actions/cart'

class ProductDetail extends React.Component {
    state = {
        productData : {},
        productNotFound : false,
        quantity : 0
    }
    
    fetchProductData = () => {
        Axios.get(`${API_URL}/products`,{
            params : {
                id : this.props.match.params.productId
            }
        })
        .then((result) => {
            if(result.data.length){
                this.setState({productData : result.data[0]})
            }else{
                this.setState({productNotFound : true})
            }
            
        })
        .catch(() => {
            alert("Terjadi Kesalahan Pada Sistem")
        })
    }

    qtyHandler = (action) => {
        if(action === "increment"){
            this.setState({quantity : this.state.quantity + 1})
        }else if(action === "decrement" && this.state.quantity > 1){
            this.setState({quantity : this.state.quantity - 1})
        }
    }

    addToCartHandler = () => {
        if(this.state.quantity === 0) {
            alert("Anda belum menambahkan quantity")
            return;
        }
        Axios.get(`${API_URL}/carts`, {
            params :{
                userId : this.props.userGlobal.id,
                productId : this.state.productData.id
            }
        })
        .then((result) => {
            if(result.data.length){
                Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
                    productQty : result.data[0].productQty + this.state.quantity
                })
                .then(() => {
                    alert("berhasil menambahkan barang")
                    this.props.getCartData(this.props.userGlobal.id)
                })
                .catch(() => {
                    alert('Terjadi Kesalahan Pada Sistem')
                })
            }else{
                Axios.post(`${API_URL}/carts`, {
                    userId : this.props.userGlobal.id,
                    productId : this.state.productData.id,
                    productName : this.state.productData.productName,
                    price : this.state.productData.price,
                    productImage : this.state.productData.productImage,
                    productQty : this.state.quantity,
                })
                .then(() => {
                    alert("berhasil menambahkan barang")
                    this.props.getCartData(this.props.userGlobal.id)
                })
                .catch(() => {
                    alert("Terjadi Kesalahan Pada Sistem")
                })
            }
        })




    }

    componentDidMount() {
        this.fetchProductData()
    }

    render() {
        return (
            <div className="continer">
                {
                    this.state.productNotFound ? 
                    <div className="alert alert-warning mt-3">Produk dengan id {this.props.match.params.productId} tidak ditemukan</div>
                    :
                    <div className="row mt-3">
                        <div className="col-6">
                            <img 
                            style={{width:"100%"}}
                            src={this.state.productData.productImage}
                            alt="" 
                            />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center">
                            <h4>{this.state.productData.productName}</h4>
                            <h5>Rp {this.state.productData.price}</h5>
                            <p>
                                {this.state.productData.description}
                            </p>
                            <div className="d-flex flex-row align-items-center">
                                <button onClick={() => this.qtyHandler("decrement")} className="btn btn-primary me-4">
                                    -
                                </button>
                                {this.state.quantity}
                                <button onClick={() => this.qtyHandler("increment")} className="btn btn-primary mx-4">
                                    +
                                </button>
                            </div>
                            <button onClick={this.addToCartHandler} className="btn btn-success mt-3 col-4">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal : state.user
    }
}

const mapDispatchToProps = {
    getCartData
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);