import Editor from '../Editor/Editor';
import './CodeEditor.css';

interface CodeEditorProps {
  code: string;
  styles: string;
  onCodeChange: (code: string) => void;
  onStyleChange: (code: string) => void;
}

const CodeEditor = ({ code, styles, onCodeChange, onStyleChange }: CodeEditorProps) => {
  return (
    <div className='CodeEditor'>
      <Editor className='component-editor'
        mode='typescript'
        title='Code Editor'
        focus={true}
        defaultValue={code}
        handleChanges={onCodeChange}
        fontSize={16}
      />
      <Editor className='styles-editor'
        mode='css'
        title='Styles Editor'
        defaultValue={styles}
        handleChanges={onStyleChange}
        fontSize={16}
      />
    </div>
  )
};

export default CodeEditor;