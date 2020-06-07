// src/components/Search.js

import React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      quantity: this.props.quantity,
      price: this.props.price,
      quantity_received: 0,
      total_quantity: this.props.quantity,
    };
  }

  render() {
    console.log('Item component rendered\n this.state:\n', this.state, '\nthis.props:\n', this.props);

    if (this.props.saved === false) {
      return (
        <div className="ml-3 mt-3">
          <form className="ml-3 mt-3">
            <div className="form-group row">
              <img src={this.props.image_url} alt={this.props.title} height="300" width="300"></img>
            </div>
            <div className="form-group row">
              <label className="col-form-label">
                Title:
              </label>
              <input className="ml-2 form-control col-6" type="text" name="title" value={this.props.title} onChange={this.props.handleTitleValue} />
            </div>
            <div className="form-group row">
              <label className="col-form-label">
                Barcode:
              </label>
              <input className="ml-2 form-control col-2" type="text" name="barcode" value={this.props.barcode} disabled />
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
                <input className="form-control col-2 ml-2" type="number" name="quantity_received" min="0" value={this.props.quantity_received} onChange={this.props.handleTotalQuantityValue} autoFocus />
              </div>
            </div>
            <div className="form-group row">
              <div className="input-group">
                <label className="col-form-label">
                  New Quantity:
                </label>
                <input className="form-control col-2 ml-2" type="number" name="total_quantity" min="0" value={this.props.total_quantity} disabled />
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
                <input className="form-control col-2" type="number" name="price" min="0" value={this.props.price} onChange={this.props.handlePriceValue} />
              </div>
            </div>
            <div className="form-group row">
                {this.props.title ?
                <button className="btn btn-primary mr-2" onClick={this.props.update}>Update </button> :
                <button className="btn btn-primary mr-2" onClick={this.props.create}>Create </button>
                }
                <button className="btn btn-secondary" onClick={this.props.cancel}>Cancel</button>
            </div>
          </form>
        </div>
      );
    }

    if (this.props.saved === true) {
      return (
        <div className="text-center mt-5">
          <h3>{this.state.title} Item saved to Square.</h3>
        </div>
      )
    }

    if (this.props.title === 'Item not found') {
      return (
        <div className="text-center mt-5">
          <h3>{this.props.barcode} not found</h3>
        </div>
      )
    }

  } // end render()
} // end class

export default Item;
