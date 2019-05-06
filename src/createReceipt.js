import React from 'react';
import { Mutation } from 'react-apollo';
import { createReceipt } from './graphql/mutations';
import gql from 'graphql-tag';

class CreateReceipt extends React.Component {
    handleSubmit = (e, createReceipt) => {
        e.preventDefault();
        createReceipt({
            variables: {
                input: {
                    userId: this.userId.value,
                    userAmount: this.userAmount.value,
                    matchAmount: this.matchAmount.value,
                    nonProfitName: this.nonProfitName.value,
                }
            }
        }).then(res => {
            this.userId.value = "";
            this.userAmount.value = "";
        });
    };

    render() {
        return (
            <div>
                <h1>Create Receipt</h1>

                <Mutation mutation={gql(createReceipt)}>
                    {(createReceipt, { data, loading, error }) => {
                        return (
                            <div>
                                <form
                                    className="add-Receipt"
                                    onSubmit={e => this.handleSubmit(e, createReceipt)}
                                >
                                    <input
                                        type="number" placeholder="Your User Id"
                                        ref={node => (this.userId = node)}
                                        required
                                    />
                                    <input
                                        type="number" placeholder="Your Donation Amount"
                                        ref={node => (this.userAmount = node)}
                                        required
                                    />
                                    <input
                                        type="number" placeholder="Matching Amount"
                                        ref={node => (this.matchAmount = node)}
                                        required
                                    />

                                    <input
                                        type="text" placeholder="Non Profit Name"
                                        ref={node => (this.nonProfitName = node)}
                                        required
                                    />
                                    <button>{loading ? "Yes boss" : "Create Receipt"}
                                    </button>
                                </form>
                                {error && <p>{error.message}</p>}
                            </div>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default CreateReceipt;