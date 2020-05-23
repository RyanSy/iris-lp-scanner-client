// src/components/Search.js

import React from "react";
import { trackPromise } from 'react-promise-tracker';
import Item from './Item';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcodeInput: '',
      barcode: '',
      title: '',
      image_url: '',
      quantity: 0,
      price: '',
      saved: false,
      item_id: '',
      item_variation_id: '',
      item_variation_version: '',
      item_state: ''
    };
    this.searchInput = React.createRef();
    this.handleBarcodeInput = this.handleBarcodeInput.bind(this);
    this.searchForItem = this.searchForItem.bind(this);
  }

  componentDidMount() {
    this.searchInput.current.focus();
  }

  handleBarcodeInput(e) {
    this.setState({ barcodeInput: e.target.value });
  }

  searchForItem(e) {
    e.preventDefault();
    this.searchInput.current.blur();

    // is this necessary?
    this.setState({
      barcode: this.state.barcodeInput,
      saved: false
     });

    trackPromise(
      // change url below to heroku server
      fetch(`http://localhost:8080/search/${this.state.barcodeInput}`)
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log('Search.js - searchForItem()\n', json);
        this.setState({
          title: json.title,
      	  image_url: json.cover_image,
          quantity: json.quantity,
          price: json.price,
          barcodeInput: '',
          item_id: json.item_id,
          item_variation_id: json.item_variation_id,
          item_variation_version: json.item_variation_version,
          item_state: json.item_state
        })
      });
  }

  render() {
      console.log('Search.js - this.state:\n', this.state);
      return (
        <div>
          <form>
            <div className="ml-3 form-group row">
              <input className="form-control col-3" type="text" name="barcode" value={this.state.barcodeInput} onChange={this.handleBarcodeInput} ref={this.searchInput} placeholder="Scan or enter barcode" />
              <button className="btn btn-primary ml-1" onClick={this.searchForItem}>
                <svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </form>
          {this.state.title
          ? <Item title={this.state.title} image_url={this.state.image_url} barcode={this.state.barcode} quantity={this.state.quantity} price={this.state.price} saved={this.state.saved} item_id={this.state.item_id} item_variation_id={this.state.item_variation_id} item_variation_version={this.state.item_variation_version} item_state={this.state.item_state}/>
          : null
          }
        </div>
      );
  } // end render()
} // end class

export default Search;
