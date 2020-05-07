import React, { Component } from "react";
import ErrorComponent from "../components/errorComponent";

const withBoundry = (Wrapped) => {
  return class extends Component {
    state = {
      error: false
    };

    componentDidCatch() {
      this.setState({ error: true });
    }

    render() {
      if (this.state.error) {
        return <ErrorComponent error={"Development error!"} />;
      }
      return <Wrapped {...this.props} />;
    }
  };
};
export default withBoundry;
