import React, { ErrorInfo } from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import Alert from '../alert';

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ReactGA.exception({
      ...error,
      ...errorInfo,
      fatal: true
    });
  }

  render() {
    const { error } = this.state;
    if (error !== null) {
      return (
        <Alert
          visible
          title={error.name}
          message={error.message}
          btnLabel="Confirm"
          onCancel={() => {
            this.props.history.push('/swap');
          }}
        />
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
