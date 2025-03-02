import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';
import { Nav, NavItem } from 'react-bootstrap';


const POLL_INERVAL_MS = 10000;

class TransactionPool extends Component {
  constructor(props) {
    super(props);
    this.state = { transactionPoolMap: {} };
  }

  fetchTransactionPoolMap() {
    fetch(`${document.location.origin}/api/transaction-pool-map`)
      .then(response => response.json())
      .then(json => this.setState({ transactionPoolMap: json }));
  }

  fetchMineTransactions() {
    fetch(`${document.location.origin}/api/mine-transactions`)
      .then(response => {
        if (response.status === 200) {
          alert('success');
          history.push('/blocks');
        } else {
          alert('The mine-transactions block request did not complete.');
        }
      });
  }

  componentDidMount() {
    this.fetchTransactionPoolMap();

    this.fetchPoolMapInterval = setInterval(
      () => this.fetchTransactionPoolMap(),
      POLL_INERVAL_MS
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetchPoolMapInterval);
  }

  render() {
    return (
      <div className='App'>
      <div className='TransactionPool'>
      <Nav bsStyle="pills">
          <NavItem eventKey={1} href="/">
            Home
          </NavItem>
         <NavItem eventKey={2} href="/blocks">
            Blocks
          </NavItem>
          <NavItem eventKey={3} href="/conduct-transaction">
            Make a Transaction
          </NavItem>
        </Nav>
        <h3>Transaction Pool</h3>
        {
          Object.values(this.state.transactionPoolMap).map(transaction => {
            return (
              <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction} />
              </div>
            )
          })
        }
        <hr />
        <Button
          bsStyle="success"
          onClick={this.fetchMineTransactions}
        >
          Mine the Transactions
        </Button>
      </div>
      </div>
    )
  }
}

export default TransactionPool;