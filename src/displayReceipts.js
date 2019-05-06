import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { listReceipts } from './graphql/queries';
import { onCreateReceipt } from './graphql/subscriptions';
import gql from 'graphql-tag';
import Receipt from './Receipt';

class DisplayReceipts extends Component {

    subscribeNewReceipts = (subscribeToMore) => {
        return subscribeToMore({
            document: gql(onCreateReceipt),
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newReceiptData = subscriptionData.data.onCreateReceipt;
                return Object.assign({}, prev, {
                    listReceipts: {
                        ...prev.listReceipts,
                        items: [...prev.listReceipts.items, newReceiptData]
                    }
                })
            }
        })
    }

    render() {
        return (
            <div className="Receipts">
                <Query query={gql(listReceipts)} >
                    {({ loading, data, error, subscribeToMore }) => {

                        if (loading) return <p>loading...</p>
                        if (error) return <p>{error.message}</p>

                        return <Receipt data={data} subscribeToMore={() =>
                            this.subscribeNewReceipts(subscribeToMore)} />
                    }}
                </Query>
            </div>
        )
    }
}

export default DisplayReceipts;