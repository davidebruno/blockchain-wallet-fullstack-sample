import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Nav, NavItem } from 'react-bootstrap';
import logo from '../assets/logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { walletInfo: {} };
  }

  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }));
  }

  copyAddress = () => {
    const addressText = document.getElementById('address').innerText;
    navigator.clipboard.writeText(addressText).then(() => {
      console.log('Address copied to clipboard:', addressText);
    }).catch(err => {
      console.error('Failed to copy address:', err);
    });
  }


  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div className='App'>
        <img className='logo' src={logo}></img>
        <br />
        <div>
          Blockchain operating sample !
        </div>
        <br />

          <Nav bsStyle="pills">
            <NavItem eventKey={1} href="/blocks">
            Blocks
            </NavItem>
            <NavItem eventKey={2} href="/conduct-transaction">
            Make a Transaction
            </NavItem>
            <NavItem eventKey={3} href="/transaction-pool">
            Transaction Pool
            </NavItem>
          </Nav>
        <br />      
        <div className='InfoDetails'>Wallet Info:</div>

      <table className='WalletInfoDetails'>
        <tr>
          <td className='CellInfo'>Address:</td><td style={{ paddingRight: '5px'}} id='address'> {address}</td>
               <td colSpan={1}></td>
               <td> <Button 
                     bsSize='xsmall'
                     onClick={ () => this.copyAddress()}>copy</Button></td>
        </tr>
        <tr>
          <td className='CellInfo'>Balance:</td><td> {balance}</td><td></td>
        </tr>
      </table>
      </div>
    );
  }
}

export default App;