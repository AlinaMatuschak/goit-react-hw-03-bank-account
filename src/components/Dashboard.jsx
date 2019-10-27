import React, { Component } from 'react';
import shortid from 'shortid';
import './Dashboard.module.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import storage from './helpers/localStorege';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const transactions = storage.get('transactions');
    const balance = storage.get('balance');

    if (transactions && balance) {
      this.setState({ transactions, balance });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;

    if (prevState.transactions !== transactions) {
      storage.save('transactions', transactions);
    }

    if (prevState.balance !== balance) {
      storage.save('balance', balance);
    }
  }

  createTransaction = (type, amount) => ({
    id: shortid.generate(),
    type,
    amount,
    date: new Date().toLocaleString(),
  });

  findSumByType = type => {
    return this.state.transactions
      .filter(el => el.type === type)
      .reduce((count, el) => (count += el.amount), 0);
  };

  handleTransfer = (amount, type) => {
    this.setState(prevState => ({
      transactions: [
        ...prevState.transactions,
        this.createTransaction(type, amount),
      ],
      balance:
        type === 'deposit'
          ? prevState.balance + amount
          : prevState.balance - amount,
    }));
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div className="dashboard">
        <Controls onTransfer={this.handleTransfer} balance={balance} />

        <Balance
          balance={balance}
          income={this.findSumByType('deposit')}
          expenses={this.findSumByType('withdraw')}
        />

        {transactions.length > 0 && <TransactionHistory items={transactions} />}
      </div>
    );
  }
}
