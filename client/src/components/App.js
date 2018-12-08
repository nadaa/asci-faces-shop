import React, { Component } from "react";
import Product from "./Product";
import Api from "../services/Api";
import "./app.css";
//import Ads from "./Ads";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      limit: 20,
      numPages: 1,
      loading: false,
      end: false,
      ads: false
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
    window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  dateFormat(d) {
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const currDate = Date.now();
    const productDate = Date.parse(d);
    const diff = currDate - productDate;
    if (diff < weekMs) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      return `${days} days ago`;
    } else {
      return d;
    }
  }

  sortProducts(e) {
    this.setState({ products: [] });
    const field = e.target.id;
    Api()
      .get(`/api/products?_sort=${field}`)
      .then(response => {
        this.setState({
          products: response.data
        });
      });
  }

  fetchProducts() {
    const url = `/api/products?_page=${this.state.numPages}&_limit=${
      this.state.limit
    }`;
    this.setState({ loading: true });
    setTimeout(
      () =>
        Api()
          .get(url)
          .then(response => {
            if (response.data.length === 0) {
              this.setState({
                end: true
              });
            }
            this.setState(
              {
                products: this.state.products.concat(response.data),
                loading: false,
                numPages: this.state.numPages + 1
              },
              () => {
                this.setState({ ads: true });
              }
            );
          }),
      1000
    );
  }

  handleScroll(e) {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.fetchProducts();
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Products Grid</h1>
          <p>
            Here you're sure to find a bargain on some of the finest ascii
            available to purchase. Be sure to peruse our selection of ascii
            faces in an exciting range of sizes and prices.
          </p>
          <p>But first, a word from our sponsors:</p>
          <img
            className="ad"
            src={`http://localhost:3000/ads/?r=${Math.floor(
              Math.random() * 1000
            )}`}
          />
        </header>
        <div className="main-div">
          <div>
            <h1>Soring</h1>
            Id:
            <input
              name="sortProd"
              type="radio"
              id="id"
              onChange={this.sortProducts}
            />
            Price:
            <input
              name="sortProd"
              type="radio"
              id="price"
              onChange={this.sortProducts}
            />
            Size:
            <input
              name="sortProd"
              type="radio"
              id="size"
              onChange={this.sortProducts}
            />
          </div>
          <div>
            <p>{this.state.loading ? "Loading ..." : ""}</p>
          </div>
          <div className="products-div">
            {this.state.products.map((prod, i) => {
              const product =
                (i + 1) % 20 === 0 ? (
                  <React.Fragment>
                    <div className="product-div" key="prod.id">
                      <div className="face-div">{prod.face}</div>
                      <div className="price-div">
                        <b>Price: </b>${prod.price}
                      </div>
                      <div className="size-div">
                        <b>Size: </b>
                        {prod.size}px
                      </div>
                      <div className="date-div">
                        <b>Date: </b>
                        {this.dateFormat(prod.date)}
                      </div>
                    </div>
                    <img
                      className="img-ads"
                      src={`http://localhost:3000/ads/?r=${Math.floor(
                        Math.random() * 1000
                      )}`}
                    />
                  </React.Fragment>
                ) : (
                  <div className="product-div" key="prod.id">
                    <div className="face-div">{prod.face}</div>
                    <div className="price-div">
                      <b>Price: </b>${prod.price}
                    </div>
                    <div className="size-div">
                      <b>Size: </b>
                      {prod.size}px
                    </div>
                    <div className="date-div">
                      <b>Date: </b>
                      {this.dateFormat(prod.date)}
                    </div>
                  </div>
                );
              return product;
              // <Product p={prod} />;
            })}
            <p>{this.state.end ? "End of Products ..." : ""}</p>
          </div>
          <div>Ads</div>
        </div>
      </div>
    );
  }
}
export default App;
