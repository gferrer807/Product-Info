import React from "react";
import styles from "./imagebutton.scss";
import url from '../../../urlConfig.js'

class ImageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };

    this.hoverOn = this.hoverOn.bind(this);
    this.hoverOff = this.hoverOff.bind(this);
  }

  hoverOn(e) {
    this.setState({ hover: true });
    this.props.handleHover(true, this.props.image, this.props.value);
  }

  hoverOff() {
    this.setState({ hover: false });
    this.props.handleHover(false, this.props.image);
  }

  render() {
    return (
      <li>
        {" "}
        <img
          className={
            this.state.hover ? styles.imagebuttonhover : styles.imagebutton
          }
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
          src={this.props.image}
        />
      </li>
    );
  }
}

export default ImageButton;
