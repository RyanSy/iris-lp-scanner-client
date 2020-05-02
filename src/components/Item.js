// src/components/Search.js

import React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: this.props.barcode,
      title: this.props.title,
      image_url: this.props.image_url,
      quantity: this.props.quantity,
      price: this.props.price,
      saved: false
    };
    this.handleTitleValue = this.handleTitleValue.bind(this);
    this.handlePriceValue = this.handlePriceValue.bind(this);
    this.handleQuantityValue = this.handleQuantityValue.bind(this);
    this.saveToSquare = this.saveToSquare.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleTitleValue(e) {
    this.setState({ title: e.target.value });
  }

  handleQuantityValue(e) {
    this.setState({ quantity: e.target.value })
  }

  handlePriceValue(e) {
    this.setState({ price: e.target.value });
  }

  saveToSquare(e) {
    e.preventDefault();
    const data = this.state;
    // change url below to heroku server
    fetch('http://localhost:8080/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.text();
      })
      .then((response) =>  {
        return response ? JSON.parse(response) : {};
      })
      .catch(error => {
        console.error('Error saving to square:\n', error)
      });
    this.setState({
      saved: true
    });
  }

  cancel(e) {
    e.preventDefault();
    this.setState({
      title: '',
      barcode: '',
      saved: false
    });
  }

  render() {
    console.log('Item.js rendered - this.state.title:\n', this.state.title);
    if (this.props.title === 'Item not found') {
      return (
        <div className="text-center mt-5">
          <h3>{this.props.barcode} not found</h3>
        </div>
      )
    }

    if (this.state.saved) {
      return (
        <div className="text-center mt-5">
          <h3>{this.state.title} saved to Square.</h3>
        </div>
      )
    }

    if (this.props.title) {
      return (
        <div className="mt-3 ml-3">
          <form className="ml-3 mt-3">
            <div className="form-group row">
              <img src={this.state.image_url} alt={this.state.title} height="300" width="300"></img>
            </div>
            <div className="form-group row">
              <label className="col-form-label">
                Title:
              </label>
              <input className="ml-2 form-control col-6" type="text" name="title" value={this.state.title} onChange={this.handleTitleValue} />
            </div>
            <div className="form-group row">
              <label className="col-form-label">
                Barcode:
              </label>
              <input className="ml-2 form-control col-2" type="text" name="barcode" value={this.state.barcode} disabled />
            </div>
            <div className="form-group row">
              <div className="input-group">
                <label className="col-form-label">
                  Quantity:
                </label>
                <input className="form-control col-2 ml-2" type="number" name="quantity" min="0" value={this.state.quantity} onChange={this.handleQuantityValue} autoFocus />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-group">
                <label className="col-form-label">
                  Price:
                </label>
                <div className="ml-2 input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input className="form-control col-2" type="number" name="price" min="0" value={this.state.price} onChange={this.handlePriceValue} />
              </div>
            </div>
            <input type="hidden" name="image_url" value={this.state.image_url} />
            <div className="form-group row">
              <button className="btn btn-primary mr-2" onClick={this.saveToSquare}>Save </button> <button className="btn btn-secondary" onClick={this.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      );
    }

    // new method needed to update item

    if (this.state.title === '') {
      return (
        <div></div>
      )
    }
  } // end render()
} // end class

export default Item;
