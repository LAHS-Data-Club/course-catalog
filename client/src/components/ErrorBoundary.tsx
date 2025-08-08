import React, { ReactNode, ErrorInfo} from "react";
import ErrorPage from "./pages/ErrorPage";

// TODO:
export default class ErrorBoundary extends React.Component {  
  state: { hasError: boolean };

  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}