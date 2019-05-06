import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { deleteReceipt } from './graphql/mutations';
import gql from 'graphql-tag';
import { listReceipts } from './graphql/queries';

class DeleteReceipt extends Component {

    handleDelete = (deleteReceipt) => {
        deleteReceipt({
            variables: {
                input: {
                    id: this.props.id
                }
            },

            // Optimistic UI -- we can render this component and once we got a response from the server we replace the optimistic result with actual server result.

            optimisticResponse: () => ({
                deleteReceipt: {
                    // this type must match the return type of the query below (listReceipts)
                    __typename: 'ModelReceiptConnection',
                    id: this.props.id,
                    userId: this.props.userId,
                    userAmount: this.props.userAmount,
                    matchAmount: this.props.matchAmount,
                    nonProfitName: this.props.nonProfitName
                }
            }),
            update: (cache, { data: { deleteReceipt } }) => {
                const query = gql(listReceipts);

                // Read query from cache
                const data = cache.readQuery({ query });

                // Add updated ReceiptsList to the cache copy
                data.listReceipts.items = [
                    ...data.listReceipts.items.filter(item =>
                        item.id !== this.props.id)
                ];

                // Overwrite the cache with the new results
                cache.writeQuery({ query, data });
            }
        })
    }

    render() {
        return (
            <Mutation mutation={gql(deleteReceipt)}>
                {(deleteReceipt, { loading, error }) => {
                    return (
                        <button onClick={
                            () => this.handleDelete(deleteReceipt)}>
                            Delete Receipt
                        </button>
                    )
                }}
            </Mutation>
        )
    }
}

export default DeleteReceipt;