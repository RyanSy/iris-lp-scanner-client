import React from 'react';
import './App.css';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return(
        <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
          <h4 className="navbar-brand mt-2">IRIS LP Scanner</h4>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-right" id="navbarCollapse">
            <ul className="navbar-nav nav-items ml-auto mr-3">
              <li className="nav-item">
                <a className="nav-link" href="https://google.com">Login</a>
              </li>
            </ul>
          </div>
          </nav>
        </div>
      )
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      title: '',
      image_url: ''
    };
    this.searchInput = React.createRef();

    this.handleBarcodeValue = this.handleBarcodeValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleValue = this.handleTitleValue.bind(this);
  }

  componentDidMount(){
    this.searchInput.current.focus();
  }

  handleBarcodeValue(e) {
    this.setState({barcode: e.target.value});
  }

  handleTitleValue(e) {
    this.setState({title: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    fetch(`http://192.168.1.158:8080/search/${this.state.barcode}`)
      .then(response => response.json())
      .then(json => this.setState({
        title: json.title,
        barcode: this.state.barcode,
        image_url: json.cover_image
      }));
  }

  render() {
    if (!this.state.title) {
      return (
          <div>
            <Nav/>
            <form>
              <div className="ml-3 form-group row">
                <input className="form-control col-3" type="text" value={this.state.barcode} onChange={this.handleBarcodeValue} ref={this.searchInput} placeholder="Scan or enter barcode"/>
                <button className="btn btn-primary" onClick={this.handleClick}>
                  <svg className="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </form>
          </div>
      );
    } else {
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
              <input className="ml-2 form-control col-lg-3" type="text" name="title" value={this.state.title} onChange={this.handleTitleValue} />
            </div>
            <div className="form-group row">
              <label className="col-form-label">
                Barcode:
              </label>
              <input className="ml-2 form-control col-lg-3" type="text" name="barcode" value={this.state.barcode} disabled />
            </div>
            <div className="form-group row">
              <div className="input-group">
                <label className="col-form-label">
                  Price:
                </label>
                <div className="ml-2 input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input className="form-control col-lg-1" type="number" name="price" placeholder="Enter Price" autoFocus />
              </div>
            </div>
            <div className="form-group row">
              <button className="btn btn-primary mr-2">Save </button> <button className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default App;
