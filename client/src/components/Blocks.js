import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Block from './Block';
import { Nav, NavItem } from 'react-bootstrap';

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = { blocks: [], paginatedId: 1, blocksLength: 0 };

    this.fetchPaginatedBlocks = this.fetchPaginatedBlocks.bind(this);
  }

  componentDidMount() {
    fetch(`${document.location.origin}/api/blocks/length`)
      .then(response => response.json())
      .then(json => this.setState({ blocksLength: json }));

    this.fetchPaginatedBlocks(this.state.paginatedId)();
  }

  fetchPaginatedBlocks(paginatedId) {
    return () => {
      fetch(`${document.location.origin}/api/blocks/${paginatedId}`)
        .then(response => response.json())
        .then(json => this.setState({ blocks: json }));
    };
  }

  render() {
    console.log('this.state', this.state);
      
    return (
      <div className='App'>
           <Nav bsStyle="pills">
            <NavItem eventKey={1} href="/">
              Home
            </NavItem>
            <NavItem eventKey={2} href="/conduct-transaction">
              Make a Transaction
            </NavItem>
            <NavItem eventKey={3} href="/transaction-pool">
              Transaction Pool
            </NavItem>
          </Nav>
        <br />
        <h3>Blocks</h3>
        <div>
          {
            [...Array(Math.ceil(this.state.blocksLength/5)).keys()].map(key => {
              const paginatedId = key+1;

              return (
                <span key={key} onClick={this.fetchPaginatedBlocks(paginatedId)}>
                  <Button bsSize="large" bsStyle="link">
                    {paginatedId}
                  </Button>{' '}
                </span>
              )
            })
          }
        </div>
        {
          this.state.blocks.map(block => {
            return (
              <Block key={block.hash} block={block} />
            );
          })
        }
      </div>
    );
  }
}

export default Blocks;