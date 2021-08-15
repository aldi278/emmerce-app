import React from 'react';
import '../assets/styles/ProductCard.css';
import { Link } from 'react-router-dom';


class ProductCard extends React.Component {
    render(){
        return (
            <div className="card product-card">
                <img src={this.props.productData.productImage}
                alt=""/>
                <div className="mt-2">
                    <Link to={`/product-detail/${this.props.productData.id}`} style={{textDecoration : "none", color:"inherit"}}>
                        <h6>{this.props.productData.productName}</h6>
                    </Link>
                    <span className="text-muted">Rp. {this.props.productData.price}</span>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <Link to={`/product-detail/${this.props.productData.id}`} style={{textDecoration : "none", color:"inherit"}}>
                        <button className="btn btn-primary et-2">Add to Cart</button>
                    </Link>
                    
                </div>
            </div>
        )
    }
}

export default ProductCard;