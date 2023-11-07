import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";
import "../components/style/Product.scss";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={"/product/" + item._id}>
              <img
                src={"data:image/jpg;base64," + item.image}
                width="300"
                height="300"
                alt=""
              />
              <figcaption className="text-center">
                <span className="title-products">{item.name}</span>
                <br />
                Giá {item.price}$
              </figcaption>
            </Link>
          </figure>
        </div>
      );
    });
    return (
      <div className="text-center">
        <h2 className="text-center">DANH SÁCH SẢN PHẨM</h2>
        {prods}
      </div>
    );
  }
  componentDidMount() {
    // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  componentDidUpdate(prevProps) {
    // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }
  // apis
  apiGetProductsByCatID(cid) {
    axios.get("/api/customer/products/category/" + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByKeyword(keyword) {
    axios.get("/api/customer/products/search/" + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}
export default withRouter(Product);
