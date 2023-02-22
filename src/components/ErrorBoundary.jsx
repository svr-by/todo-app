import { Component } from 'react';
import ErrorImg from 'assets/img/error.png';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen p-4 flex flex-col justify-center items-center gap-4">
          <img className="w-80 object-contain" src={ErrorImg} alt="error image" />
          <h1 className="text-2xl text-center font-bold">Oops! Something went wrong.</h1>
        </div>
      );
    }
    return this.props.children;
  }
}
