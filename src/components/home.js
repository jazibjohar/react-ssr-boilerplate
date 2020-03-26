import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";

import h from "./home.css";

class Home extends React.Component {
  clickMe() {
    console.log("Click me");
  }
  render() {
    return (
      <div className="home">
        Hello From Home <button onClick={this.clickMe}>Click me</button>
      </div>
    );
  }
}

export default withStyles(h)(Home);
