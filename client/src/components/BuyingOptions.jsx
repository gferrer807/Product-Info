import React from "react";
import axios from "axios";
import Option from "./Option";
import url from '../../../urlConfig.js'

class BuyingOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorOptions: null,
      sizeOptions: null
    };
    this.getColorOptions = this.getColorOptions.bind(this);
    this.getSizeOptions = this.getSizeOptions.bind(this);
  }

  getColorOptions() {
    axios
      .get(
        `http://localhost:3000/api/products/${
          this.props.id
        }/colors`
      )
      .then(({ data }) => {
        console.log(data, ' - color data')
        data.length > 0 ? this.setState({ colorOptions: data }) : "";
      })
      .catch(err => {
        console.log(err);
      });
  }
  getSizeOptions() {
    let id = this.props.id;
    console.log(id);
    axios
      .get(
        `http://localhost:3000/api/products/${
          this.props.id
        }/size`
      )
      .then(({ data }) => {
        console.log(data, ' - size data');
        data.length > 0 ? this.setState({ sizeOptions: data }) : "";
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getColorOptions();
    this.getSizeOptions();
  }

  render() {
    return (
      <div>
        {this.state.colorOptions ? (
          <Option
            type="table"
            optionName="Color"
            options={this.state.colorOptions}
            swapImage={this.props.swapImage}
          />
        ) : (
          ""
        )}
        {this.state.sizeOptions ? (
          <Option
            type="select"
            optionName="Size"
            options={this.state.sizeOptions}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BuyingOptions;
