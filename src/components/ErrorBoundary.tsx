import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Observation content crashed", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="screen homeScreen">
          <section className="homeCard">
            <p className="eyebrow">오류가 발생했습니다</p>
            <h1>다시 열어 주세요</h1>
            <p className="description">일시적인 문제가 발생했습니다. 화면을 새로고침하면 다시 관찰할 수 있습니다.</p>
            <button type="button" className="primaryButton" onClick={() => window.location.reload()} aria-label="화면 새로고침">
              새로고침
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
