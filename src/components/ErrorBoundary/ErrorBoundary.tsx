import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  errorMessage?: string | null; // Permitir `null` como valor posible
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Actualiza el estado para mostrar el fallback UI en caso de error
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Puedes usar este método para registrar errores en un servicio de reporte
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { children, errorMessage } = this.props;

    if (hasError) {
      // Muestra el mensaje de error proporcionado o un mensaje predeterminado
      return (
        <div className='preview-error'>
          {errorMessage || `Something went wrong: ${error?.message}`}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
