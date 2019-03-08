import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import ImageViewer from "./components/ImageViewer";
import Summary from "./components/Summary";
import styles from "./global.scss";
import url from '../../urlConfig.js';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.match.params.id || 5,
      product: null,
      colorOptions: null,
      sizeOptions: null,
      images: null,
      mainImage: null,
      subImage: null
    };
    this.getProductInformation = this.getProductInformation.bind(this);
    this.swapSubImage = this.swapSubImage.bind(this);
    this.swapMainImage = this.swapMainImage.bind(this);
  }

  getProductInformation() {
    axios
      .get(
        `${url.url}${this
          .state.productId || 6}/`
        // `api/products/${this.state.productId}/`
      )
      .then(({ data }) => {
        console.log('Made data request');
        console.log(data, ' - data')
        this.setState({
          product: data,
          images: data.primary_images,
          mainImage: data.primary_images[0],
          ratings: { total: 1000, 5: 555, 4: 270, 3: 54, 2: 100, 1: 21 }
        });
      })
      .catch();
  }

  componentDidMount() {
    this.getProductInformation();
  }

  swapSubImage(flag, imgUrl) {
    if (flag) {
      this.setState({ subImage: imgUrl });
    } else {
      this.setState({ subImage: null });
    }
  }

  swapMainImage(flag, imgUrl) {
    if (flag) {
      this.setState({ mainImage: imgUrl });
    }
  }

  render() {
    if (this.state.images) {
      return (
        <div className={styles.container}>
          {this.state.subImage ? (
            <ImageViewer
              mainImage={this.state.subImage}
              images={this.state.images}
              swapImage={this.swapMainImage}
            />
          ) : (
            <ImageViewer
              mainImage={this.state.mainImage}
              images={this.state.images}
              swapImage={this.swapMainImage}
            />
          )}

          <Summary product={this.state.product} swapImage={this.swapSubImage} />
        </div>
      );
    } else return (<div className="no-content">No content to show right now! </div>);
  }
}

ReactDOM.render(
  <Router>
    <Route exact path="/:id" component={ProductDetails} />
  </Router>,
  document.getElementById("productDetails")
);
