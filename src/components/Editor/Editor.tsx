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
  window.ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict/');
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

  useEffect(() => {
    const editor = editorRef.current?.editor;
    if (editor) {
      // Habilitar ajuste de línea
      editor.setOption('wrap', true);
      // Configurar el margen de impresión
      editor.renderer.setOption('printMarginColumn', 80);

      // Ajustar el tamaño del editor
      editor.renderer.setOption('printMargin', 80); // Configura el margen de impresión
    }
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
        wrapEnabled={true}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
      />
    </div>
  );
};

export default Editor;