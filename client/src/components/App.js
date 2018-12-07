import React, { Component } from "react";
import Product from "./Product";
import Api from "../services/Api";
import "./app.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      limit: 15,
      numPages: 1,
      loading: false,
      scrolling: false,
      end: false
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  fetchProducts() {
    this.setState({ loading: true });
    setTimeout(
      () =>
        Api()
          .get(
            `/api/products?_page=${this.state.numPages}&_limit=${
              this.state.limit
            }
            }`
          )
          .then(response => {
            if (response.data.length === 0) {
              this.setState({
                end: true
              });
            }
            this.setState({
              products: this.state.products.concat(response.data),
              loading: false,
              numPages: this.state.numPages + 1
            });
          }),
      1000
    );
  }

  componentDidMount() {
    this.fetchProducts();
    window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
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
            Id: <input name="sort" type="radio" />
            Price: <input name="sort" type="radio" />
            Size: <input name="sort" type="radio" />
          </div>
          <div>
            <p>{this.state.loading ? "Loading ..." : ""}</p>
          </div>
          <div className="products-div">
            {this.state.products.map(prod => {
              return (
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
                    {prod.date}
                  </div>
                </div>
              );
              // <Product p={prod} />;
            })}
          </div>
          <div>
            <p>{this.state.end ? "End of Products ..." : ""}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
