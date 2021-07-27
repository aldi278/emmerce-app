import React from 'react';
import '../assets/styles/ProductCard.css'


class ProductCard extends React.Component {
    render(){
        return (
            <div className="card product-card">
                <img src={this.props.productData.productImage}
                alt="baju"/>
                <div className="mt-2">
                    <h6>{this.props.productData.productName}</h6>
                    <span className="text-muted">Rp. {this.props.productData.price}</span>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <button className="btn btn-primary et-2">Add to Cart</button>
                </div>
            </div>
        )
    }
}

export default ProductCard