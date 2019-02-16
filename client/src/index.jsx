import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ImageViewer from "./components/ImageViewer";
import Summary from "./components/Summary";
import styles from "./global.scss";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 6,
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
      .get(`/api/products/${this.state.productId}/`)
      .then(({ data }) => {
        this.setState({ product: data });
        this.setState({ images: data.primary_images });
        this.setState({ mainImage: this.state.images[0] });
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
    } else return <div />;
  }
}

ReactDOM.render(<ProductDetails />, document.getElementById("productDetails"));
