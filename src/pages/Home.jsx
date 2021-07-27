import React from 'react';
import ProductCard from '../components/ProductCard';
import Axios from 'axios';
import { API_URL } from '../constant/API'
import { result } from 'lodash';

class Home extends React.Component {
    state = {
        productList : [],
        filteredProductList : [],
        page : 1,
        maxPage : 0,
        itemsPerPage : 5,
        searchProductName : "",
        searchCategory : "",
        sortBy : ""
    }

    fetchProduct = () => {
        Axios.get(`${API_URL}/products`)
        .then((result) => {
            this.setState({productList : result.data, maxPage : Math.ceil(result.data.length / this.state.itemsPerPage), filteredProductList : result.data})
        })
        .catch(() => {
            alert("Terjadi gangguan pada server")
        })
    }

    renderProducts = () => {
        const beginningIndex = (this.state.page - 1)*this.state.itemsPerPage
        let rawData = [...this.state.filteredProductList]

        const compareString = (a,b) => {
            if(a.productName < b.productName){
                return -1
            }else if(a.productName > b.productName){
                return 1
            }else{
                return 0
            }
        }

        switch(this.state.sortBy){
            case "lowPrice":
                rawData.sort((a,b) => a.price - b.price)
                break
            case "upPrice":
                rawData.sort((a,b) => b.price - a.price)
                break
            case "az":
                rawData.sort(compareString)
                break
            case "za":
                rawData.sort((a,b) => compareString(b,a))
                break
            default:
                rawData = [...this.state.filteredProductList]
        }

        const currentData = rawData.slice(beginningIndex, beginningIndex + this.state.itemsPerPage)
        return currentData.map((val) => {
            return <ProductCard productData={val}/>
        })
    }

    nextPageHandler = () => {
        if(this.state.page < this.state.maxPage){
            this.setState({page : this.state.page+1 })
        }
        
    }

    prevPageHandler = () => {
        if(this.state.page > 1){
            this.setState({page : this.state.page-1 })
        }
    }

    inputHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({ [name] : value })
    }

    searchBtnHandler = () => {
        const filteredProductList = this.state.productList.filter((val) => {
            return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category.toLowerCase().includes(this.state.searchCategory.toLowerCase())
        })

        this.setState({filteredProductList, maxPage : Math.ceil(filteredProductList.length / this.state.itemsPerPage), page : 1})
    }

    componentDidMount(){
        this.fetchProduct();
    }



    render() {
        return (
            <div className="continer mt-5">
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                <strong>Filter Product</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="searchProductName">Product Name</label>
                                <input 
                                    onChange = {this.inputHandler}
                                    name="searchProductName"
                                    type="text" 
                                    className="form-control mb-3"
                                />
                                <label htmlFor="searchCategody">Product Category</label>
                                <select onChange={this.inputHandler} name="searchCategory" className="form-control">
                                    <option value="">All Items</option>
                                    <option value="kaos">kaos</option>
                                    <option value="celana">celana</option>
                                    <option value="aksesoris">aksesoris</option>
                                </select>
                                <div onClick={this.searchBtnHandler} className="btn btn-primary mt-3">Search</div>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header">
                                <strong>Sort Product</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="sortBy">Sort By</label>
                                <select onChange = {this.inputHandler} name="sortBy" className="form-control">
                                    <option value="">Default</option>
                                    <option value="lowPrice">Lowest Price</option>
                                    <option value="upPrice">Highest Price</option>
                                    <option value="az">A-Z</option>
                                    <option value="za">Z-A</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <button disabled={this.state.page === 1} onClick={this.prevPageHandler} className="btn btn-dark">
                                    {"<"}
                                </button>
                                <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                                <button disabled={this.state.page === this.state.maxPage} onClick={this.nextPageHandler} className="btn btn-dark">
                                    {">"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-warp flex-row">
                        {/* Render Products Here */}
                        {this.renderProducts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;