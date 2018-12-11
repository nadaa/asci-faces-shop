import React, { Component } from "react";
import Product from "./Product";
import Api from "../services/Api";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      limit: 20,
      numPages: 1,
      loading: false,
      end: false,
      caching: []
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.sortProducts = this.sortProducts.bind(this);
    this.fillData = this.fillData.bind(this);
  }

  fillData() {
    const url = `/api/products?_page=${this.state.numPages}&_limit=${
      this.state.limit
    }`;
    Api()
      .get(url)
      .then(response => {
        if (response.data.length === 0) {
          this.setState({
            end: true
          });
        }
        this.setState({
          caching: response.data
        });
      });
  }

  componentDidMount() {
    this.fetchProducts();
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });
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
          this.fillData
        );
      });
  }

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.setState(
        {
          products: this.state.products.concat(this.state.caching)
        },
        this.fillData
      );
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Ascii Faces Shop</h1>
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
        <br /> <br />
        <h2 style={{ textAlign: "center" }}>SortBy</h2>
        <div className="main-div">
          <div className="sort-div">
            <div className="sort-head">Id</div>
            <div className="sort-head"> Price</div>
            <div className="sort-head">Size</div>
            <input
              name="sortProd"
              type="radio"
              id="id"
              onChange={this.sortProducts}
            />
            <input
              name="sortProd"
              type="radio"
              id="price"
              onChange={this.sortProducts}
            />

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
                  <React.Fragment key={i}>
                    <Product prod={prod} />
                    <img
                      className="img-ads"
                      src={`http://localhost:3000/ads/?r=${Math.floor(
                        Math.random() * 1000
                      )}`}
                    />
                  </React.Fragment>
                ) : (
                  <Product prod={prod} key={i} />
                );
              return product;
            })}
            <div>{this.state.end ? "~ end of catalogue ~" : ""}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
