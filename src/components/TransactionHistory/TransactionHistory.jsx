import React from 'react';
import T from 'prop-types';
import { history } from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <table className={history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(({ id, type, amount, date }) => (
        <tr key={id}>
          <td>{type}</td>
          <td>{amount}$</td>
          <td>{date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  items: T.array.isRequired,
};

export default TransactionHistory;
