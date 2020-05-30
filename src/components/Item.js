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
      item_id: this.props.item_id,
      item_variation_id: this.props.item_variation_id,
      item_variation_version: this.props.item_variation_version,
      item_state: this.props.item_state,
      total_quantity: 0
    };
    this.handleTitleValue = this.handleTitleValue.bind(this);
    this.handlePriceValue = this.handlePriceValue.bind(this);
    this.handleQuantityValue = this.handleQuantityValue.bind(this);
    this.handleTotalQuantityValue = this.handleTotalQuantityValue.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleTitleValue(e) {
    this.setState({ title: e.target.value });
  }

  handleQuantityValue(e) {
    this.setState({ quantity: e.target.value });
  }

  handleTotalQuantityValue(e) {
    var total_quantity = parseInt(e.target.value) + parseInt(this.state.quantity);
    this.setState({
      quantity: e.target.value,
      total_quantity: total_quantity });
  }

  handlePriceValue(e) {
    this.setState({ price: e.target.value });
  }

  create(e) {
    e.preventDefault();
    const data = this.state;
    // change url below to heroku server
    fetch('http://localhost:8080/create', {
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
        console.error('Error creating item:\n', error)
      });
    this.setState({
      saved: true
    });
  }

  update(e) {
    e.preventDefault();
    const data = this.state;
    // change url below to heroku server
    fetch('http://localhost:8080/update', {
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
        console.error('Error updating item:\n', error)
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
    console.log('Item.js rendered - this.state:\n', this.state);
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

    if (this.state.title) {
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
                  Current Quantity:
                </label>
                <input className="form-control col-2 ml-2" type="number" value={this.props.quantity} disabled />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-group">
                <label className="col-form-label">
                  Quantity Received:
                </label>
                <input className="form-control col-2 ml-2" type="number" name="quantity" min="0" value={this.state.quantity} onChange={this.handleTotalQuantityValue} autoFocus />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-group">
                <label className="col-form-label">
                  New Quantity:
                </label>
                <input className="form-control col-2 ml-2" type="number" name="total_quantity" min="0" value={this.state.total_quantity} disabled />
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
            <input type="hidden" name="item_id" value={this.state.item_id} />
            <input type="hidden" name="item_variation_id" value={this.state.item_variation_id} />
            <input type="hidden" name="item_variation_version" value={this.state.item_variation_version} />
            <input type="hidden" name="item_state" value={this.state.item_state} />
            <div className="form-group row">
              {this.state.item_variation_version ?
              <button className="btn btn-primary mr-2" onClick={this.update}>Update </button> :
              <button className="btn btn-primary mr-2" onClick={this.create}>Create </button>
              }
               <button className="btn btn-secondary" onClick={this.cancel}>Cancel</button>
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
