import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../constant/API';

class History extends React.Component {
    state = {
        transactionList : [],
        transactionDetails : [],
    }
    
    fetchDataTransactions = () => {
        Axios.get(`${API_URL}/transactions`, {
            params : {
                userId : this.props.userGlobal.id
            }
        })
        .then((result) => {
            console.log(result.data)
            this.setState({transactionList : result.data})
        })
        .catch(() => {
            alert("Terjadi Gangguan Pada Sistem")
        })
    }

    componentDidMount() {
        this.fetchDataTransactions()
    }

    seeDetailsHandler = (transactionDetails) => {
        this.setState({transactionDetails})
    }

    renderTransactionDetails = () => {
        return this.state.transactionDetails.map((val) => {
            return (
                <div className="card-body">
                    <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                        <span className="fw-bold">{val.productName} ({val.productQty})</span>
                        <span>Rp {val.price * val.productQty}</span>
                    </div>
                </div>
            )
        })
    }

    renderTransactions = () => {
        return this.state.transactionList.map((val) => {
            return (
                <tr>
                    <td>{val.transactionDate}</td>
                    <td>{val.transactionItems.length} item(s)</td>
                    <td>Rp {val.totalPrice}</td>
                    <td>
                        <button onClick={() => this.seeDetailsHandler(val.transactionItems)}className="btn btn-info">
                            See Details
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    

    render() {
        return (
            <div className="p-5">
                <h1>History Transactions</h1>
                <div className="row mt-5">
                    <div className="col-8">
                        <table className="table">
                            <thead className="table-ligth">
                                <tr>
                                    <th>Transaction Date</th>
                                    <th>Total Items</th>
                                    <th>Total Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransactions()}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-4">
                        {
                            this.state.transactionDetails.length ?
                            <div className="card">
                                <div className="card-header">
                                    <strong>Transactions Detail</strong>
                                </div>
                                {this.renderTransactionDetails()}
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
        userGlobal : state.user
    }
}

export default connect(mapStateToProps)(History);