import React, { useEffect, useState } from 'react';
import * as Babel from '@babel/standalone';
import './Preview.css';
import { FaPlay } from "react-icons/fa";
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface PreviewProps {
  code: string;
  styles: string;
}

const Preview = ({ code, styles }: PreviewProps) => {
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [appliedStyles, setAppliedStyles] = useState<string>(styles);

  const handleRun = () => {
    setComponent(null); // Resetea el componente antes de ejecutar
    setError(null);     // Resetea el error
    try {
      if (!code.trim()) {
        throw new Error('No code provided.');
      }

      // Transforma el código utilizando Babel
      const transformedCode = Babel.transform(code, {
        presets: ['react', 'typescript'],
        filename: 'file.tsx',
      }).code;

      if (!transformedCode) {
        throw new Error('Failed to transform the code.');
      }

      // Extraer el nombre del componente exportado por defecto
      const match = transformedCode.match(/export\s+default\s+(\w+)/);
      const componentName = match ? match[1] : null;

      if (!componentName) {
        throw new Error('No default export found in the provided code.');
      }

      // Eliminar la declaración 'export default' del código transformado
      const modifiedCode = transformedCode
        .replace(/export\s+default\s+(\w+);/, '') // Ajuste para manejar export default
        .replace(/import\s+[^;]+;/g, ''); // Eliminación de importaciones

      // Crear un nuevo componente usando el código modificado
      const componentCode = new Function('React', 'useState', 'useEffect', `${modifiedCode}; return ${componentName};`)(React, useState, useEffect);

      setComponent(() => componentCode as React.FC); // Actualiza el estado con el nuevo componente
      setAppliedStyles(styles); // Actualiza los estilos aplicados
      setError(null); // Limpiar errores previos
    } catch (err) {
      console.error('Preview ERROR: ', (err as Error));
      setComponent(null); // Resetea el componente si hay error
      setError(`Error rendering preview: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    handleRun();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'Enter') {
        handleRun();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [code, styles]);

  return (
    <>
      <style>{appliedStyles}</style>
      <div className='Preview' key={Date.now()}>
        <div className='preview-title'>
          <span>Preview</span>
          <button onClick={handleRun}><FaPlay />Run</button>
        </div>
        <div className='preview-render'>
          <ErrorBoundary errorMessage={error} className='preview-error'>
            {error ? (
              <div className='preview-error'>{error}</div>
            ) : Component ? (
              <Component />
            ) : (
              <div className='preview-default-message'>Please write some code and click Run.</div>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Preview;
