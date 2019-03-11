import React from "react";
import ImageButton from "./ImageButton.jsx";
import styles from "./option.scss";

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.renderSelect = this.renderSelect.bind(this);
    this.state = { selected: null };
    this.swapImage = this.swapImage.bind(this);
  }

  //swapImage and Change Option
  swapImage(flag, imgurl, value) {
    flag
      ? this.setState({ selected: value })
      : this.setState({ selected: null });

    this.props.swapImage(flag, imgurl, value);
  }

  renderSelect() {
    return (
      <div>
        <div className={styles.summaryitem}>{this.props.optionName}: </div>
        <select className={styles.dropdown}>
          <option value="">Select</option>
          {this.props.options.map(option => {
            let value = option.var_name;
            return <option value={value}>{value}</option>;
          })}
        </select>
      </div>
    );
  }

  renderTable() {
    return (
      <div>
        <div className={styles.summaryitem}>
          {this.props.optionName}:{" "}
          <span className={styles.variationname}>{this.state.selected} </span>
        </div>
        <ul className={styles.visualselector}>
          {this.props.options.map((option, index) => {
            let value = option.var_name;
            return (
              <ImageButton
                handleHover={this.swapImage}
                image={option.imgurl}
                value={value}
                key={index}
              />
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.type === "select" ? this.renderSelect() : ""}
        {this.props.type === "table" ? this.renderTable() : ""}
      </div>
    );
  }
}

export default Option;
