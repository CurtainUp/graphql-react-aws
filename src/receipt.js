import React, { Component } from 'react';
import EditReceipt from './editReceipt';
import DeleteReceipt from './deleteReceipt';

class Receipt extends Component {

    componentDidMount() {
        this.props.subscribeToMore();
    }

    render() {
        const items = this.props.data.listReceipts.items;

        return items.map((receipt) => {
            return (
                <div>
                    <h1>Donation: {receipt.id}</h1>
                    <p>To: {receipt.nonProfitName}</p>
                    <p>Your Donation: ${receipt.userAmount}</p>
                    <p>Matching Donation: ${receipt.matchAmount}</p>
                    <br />
                    <EditReceipt {...receipt} />
                    <DeleteReceipt {...receipt} />
                </div>
            )
        })
    }
}

export default Receipt;