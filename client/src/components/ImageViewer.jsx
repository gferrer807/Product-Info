import React from "react";
import ImageButton from "./ImageButton";
import styles from "./imageviewer.scss";
import ReactImageMagnify from "react-image-magnify";
import url from '../../../urlConfig.js'

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: ""
    };
  }

  componentDidMount() {
    this.setState({ currentImage: this.props.images[0] });
  }

  render() {
    return (
      <div className={styles.imageviewer}>
        <ul className={styles.visualselector}>
          {this.props.images.map((image, index) => {
            return (
              <ImageButton
                handleHover={this.props.swapImage}
                image={image}
                key={index}
              />
            );
          })}
        </ul>
        <div className={styles.mainimagecontainer}>
          {/* <img className={styles.mainimage} src={this.props.mainImage} /> */}

          <div className={styles.mainimagewrapper}>
            <ReactImageMagnify
              className={styles.mainimage}
              {...{
                smallImage: {
                  isFluidWidth: true,
                  src: this.props.mainImage
                },
                largeImage: {
                  src: this.props.mainImage,
                  width: 1200,
                  height: 1800
                },
                enlargedImageContainerDimensions: {
                  width: "100%",
                  height: "100%"
                },
                shouldUsePositiveSpaceLens: true
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageViewer;
