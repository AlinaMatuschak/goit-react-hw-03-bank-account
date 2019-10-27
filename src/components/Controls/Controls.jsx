import React, { Component } from 'react';
import T from 'prop-types';
import { controls } from './Controls.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Controls extends Component {
  static propTypes = {
    balance: T.number.isRequired,
    onTransfer: T.func.isRequired,
  };

  state = {
    amount: '',
  };

  handeleChange = e => {
    this.setState({
      amount: e.currentTarget.value,
    });
  };

  reset = () => this.setState({ amount: '' });

  handleTransfer = ({ target }) => {
    const amount = Number(this.state.amount);
    const { balance, onTransfer } = this.props;

    if (!amount) {
      toast('Введите сумму для проведения операции!');
      return;
    }

    if (amount < 0) {
      toast('Введите положительное число!');
      return;
    }

    if (target.name === 'withdraw' && amount > balance) {
      toast('На счету недостаточно средств для проведения операции!');
      return;
    }

    onTransfer(amount, target.name);
    this.reset();
  };

  render() {
    return (
      <section className={controls}>
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handeleChange}
        />
        <button type="button" name="deposit" onClick={this.handleTransfer}>
          Deposit
        </button>
        <ToastContainer />
        <button type="button" name="withdraw" onClick={this.handleTransfer}>
          Withdraw
        </button>
        <ToastContainer />
      </section>
    );
  }
}
