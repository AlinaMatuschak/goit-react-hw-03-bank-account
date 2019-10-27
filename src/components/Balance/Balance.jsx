import React from 'react';
import T from 'prop-types';
import { balanceTransactions } from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={balanceTransactions}>
    <span role="img" aria-labelledby="arrow1">
      ⬆️{income}$
    </span>
    <span role="img" aria-labelledby="arrow2">
      ⬇️{expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: T.number.isRequired,
  income: T.number.isRequired,
  expenses: T.number.isRequired,
};

export default Balance;
