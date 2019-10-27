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
  };

  componentDidMount() {
    const transactions = storage.get('transactions');

    if (transactions) {
      this.setState({ transactions });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions } = this.state;

    if (prevState.transactions !== transactions) {
      storage.save('transactions', transactions);
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

  findBalance = () => {
    return this.findSumByType('deposit') - this.findSumByType('withdraw');
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
    const { transactions } = this.state;
    const balance = this.findBalance();
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
