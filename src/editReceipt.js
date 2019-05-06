import React, { Component } from 'react';
import { updateReceipt } from './graphql/mutations';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

class EditReceipt extends Component {
    state = {
        show: false,
        ReceiptData: {
            userId: this.props.userId,
            userAmount: this.props.userAmount,
            matchAmount: this.props.matchAmount,
            nonProfitName: this.props.nonProfitName
        }
    };

    handleModal = () => {
        this.setState({ show: !this.state.show });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    handleSubmit = (e, updateReceipt) => {
        e.preventDefault();
        updateReceipt({
            variables: {
                input: {
                    id: this.props.id,
                    userId: this.state.ReceiptData.userId,
                    userAmount: this.state.ReceiptData.userAmount,
                    matchAmount: this.state.ReceiptData.matchAmount,
                    nonProfitName: this.state.ReceiptData.nonProfitName
                }
            }
        }).then(res => this.handleModal());
    };

    handleUserId = e => {
        this.setState({
            ReceiptData: { ...this.state.ReceiptData, userId: e.target.value }
        });
    };

    handleUserAmount = e => {
        this.setState({
            ReceiptData: { ...this.state.ReceiptData, userAmount: e.target.value }
        });
    };

    handleMatchAmount = e => {
        this.setState({
            ReceiptData: { ...this.state.ReceiptData, matchAmount: e.target.value }
        });
    };

    handleNonProfitName = e => {
        this.setState({
            ReceiptData: { ...this.state.ReceiptData, nonProfitName: e.target.value }
        });
    };

    render() {
        return (
            <>
                {this.state.show && (
                    <div className="modal">
                        <button className="close" onClick={this.handleModal}>
                            X
                        </button>
                        <Mutation mutation={gql(updateReceipt)}>
                            {updateReceipt => {
                                return (
                                    <form
                                        className="add-Receipt"
                                        onSubmit={e => this.handleSubmit(e, updateReceipt)}
                                    >
                                        <input
                                            type="number"
                                            required
                                            value={this.state.ReceiptData.userId}
                                            onChange={this.handleUserId}
                                        />
                                        <input
                                            type="number"
                                            required
                                            value={this.state.ReceiptData.userAmount}
                                            onChange={this.handleUserAmount}
                                        />
                                        <input
                                            type="number"
                                            required
                                            value={this.state.ReceiptData.matchAmount}
                                            onChange={this.handleMatchAmount}
                                        />
                                        <input
                                            type="number"
                                            required
                                            value={this.state.ReceiptData.nonProfitName}
                                            onChange={this.handleNonProfitName}
                                        />
                                        <button>Update Receipt</button>
                                    </form>
                                );
                            }}
                        </Mutation>
                    </div>
                )}
                <button onClick={this.handleModal}>Edit</button>
            </>
        );
    }
}

export default EditReceipt;