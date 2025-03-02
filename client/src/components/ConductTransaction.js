import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import history from '../history';
import { Nav, NavItem } from 'react-bootstrap';

class ConductTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = { recipient: '', amount: 0, knownAddresses: [] };

    this.updateRecipient = this.updateRecipient.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.conductTransaction = this.conductTransaction.bind(this);
  }

  componentDidMount() {
    fetch(`${document.location.origin}/api/known-addresses`)
      .then(response => response.json())
      .then(json => this.setState({ knownAddresses: json }));
  }

  copyAddress = (key) => {
    console.log("valore key: " + key + " - value " + key.value);
    navigator.clipboard.writeText(key).then(() => {
      console.log('Address copied to clipboard:', key);
    }).catch(err => {
      console.error('Failed to copy address:', err);
    });
  }

  updateRecipient (event) {
    this.setState({ recipient: event.target.value });
  }

  updateAmount(event) {
    this.setState({ amount: Number(event.target.value) });
  }

  conductTransaction() {
    const { recipient, amount } = this.state;
    let msg = '';

    fetch(`${document.location.origin}/api/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, amount })
    }).then(response => response.json())
      .then(json => {
        console.log('conductTransaction json', json);
        msg = (json.type === 'success') ? 'Transaction successfully executed!\n Sent: '+ amount + ' to the address: ' + recipient : json.type;
        alert(msg);
        history.push('/transaction-pool');
      });
  }

  render() {
    return (
      <div className='App'>
        <Nav bsStyle="pills">
            <NavItem eventKey={1} href="/">
              Home
            </NavItem>
            <NavItem eventKey={2} href="/blocks">
              Blocks
            </NavItem>
            <NavItem eventKey={3} href="/transaction-pool">
            Transaction Pool
            </NavItem>
        </Nav>
        <br />  
        <h3>Make a Transaction</h3>
        <br />
        <h4 className='InfoDetails'>Known Addresses</h4>
        <table>
        { 
          this.state.knownAddresses.map(knownAddress => {
            return (
              <tr>
              <td style={{textAlign: 'left', fontSize: '1rem', color: 'lightcoral', paddingRight: '5px'}} key={knownAddress}>
                  {knownAddress}
              </td>
              <td>
                   <Button 
                    bsSize='xsmall'
                   onClick={ () => this.copyAddress(knownAddress)}>copy</Button>
              </td>
              </tr>
            );
          })
        }
        </table>
        <br />
        <FormGroup>
          <FormControl
            input='text'
            placeholder='recipient'
            value={this.state.recipient}
            onChange={this.updateRecipient}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            input='number'
            placeholder='amount'
            value={this.state.amount}
            onChange={this.updateAmount}
          />
        </FormGroup>
        <div>
          <Button
            bsStyle="success"
            onClick={this.conductTransaction}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }
};

export default ConductTransaction;