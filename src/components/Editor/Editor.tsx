import AceEditor from 'react-ace';
import './Editor.css';
// Importa los temas desde ace-builds
import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-clouds_midnight';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-monokai';

import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useEffect, useRef } from 'react';

// Definir un tipo para ace
interface AceConfig {
  config: {
    set: (key: string, value: string) => void;
  };
}

declare global {
  interface Window {
    ace?: AceConfig;
  }
}

// Configurar el basePath
if (typeof window !== 'undefined' && window.ace) {
  window.ace.config.set('basePath', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/');
}


interface EditorProps {
  className?: string;
  title: string;
  mode?: string | object | undefined;
  defaultValue?: string | undefined;
  theme?: string | undefined;
  focus?: boolean | undefined;
  handleChanges: (code: string) => void;
  fontSize?: string | number | undefined;
}

const Editor = ({ className, title, mode, defaultValue, theme = 'dracula', focus, handleChanges, fontSize }: EditorProps) => {

  const editorRef = useRef<AceEditor>(null);

  // Función para ajustar el wrap dinámicamente según el tamaño de la ventana
  const handleResize = () => {
    const editor = editorRef.current?.editor;
    if (editor) {
      const isMobile = window.innerWidth <= 768;
      editor.setOption('wrap', !isMobile);  // Ajusta el wrap basado en si es móvil o no
    }
  };

  useEffect(() => {
    // Ejecutar handleResize al montar el componente
    handleResize();

    // Añadir listener para detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={className ? `Editor ${className}` : 'Editor'}>
      <span className='editor-title'>{title}</span>
      <AceEditor
        ref={editorRef}
        className='ace-editor'
        mode={mode}
        theme={theme}
        defaultValue={defaultValue}
        onChange={handleChanges}
        focus={focus}
        fontSize={fontSize}
        showPrintMargin={true}
        showGutter={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 4,
          useWorker: false,
        }}
      />
    </div>
  );
};

export default Editor;