var APP = (window as any).APP;

function CodeSandbox({ code, onCodeRun }: { code: any; onCodeRun: () => void }) {
  const [sourceCode, setSourceCode] = useState(code?.starterCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setHasError(false);
    let outputBuffer = '';

    try {
      await APP.runPythonCode(sourceCode, (text: string) => {
        outputBuffer += text;
        setOutput(outputBuffer);
      });
      onCodeRun();
    } catch (err: any) {
      setHasError(true);
      const errMsg = err.toString ? err.toString() : String(err);
      setOutput(outputBuffer + '\n❌ Error: ' + errMsg);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setSourceCode(code?.starterCode || '');
    setOutput('');
    setHasError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = sourceCode.substring(0, start) + '    ' + sourceCode.substring(end);
      setSourceCode(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="sandbox-container">
      <div className="sandbox-header">
        <div className="sandbox-title">
          <span>🐍</span> Code Sandbox
        </div>
        <span className="sandbox-lang">Python</span>
      </div>
      <div className="sandbox-editor">
        <textarea
          ref={textareaRef}
          value={sourceCode}
          onChange={e => setSourceCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder="Write your Python code here..."
        />
      </div>
      <div className="sandbox-toolbar">
        <button className="btn btn-run" onClick={handleRun} disabled={isRunning}>
          {isRunning ? <><span className="spinner" /> Running...</> : '▶ Run'}
        </button>
        <button className="btn btn-reset" onClick={handleReset} disabled={isRunning}>
          ↺ Reset
        </button>
      </div>
      <div className={`sandbox-output ${hasError ? 'error' : ''}`}>
        {output || <span className="output-placeholder">Output will appear here after running the code...</span>}
      </div>
    </div>
  );
}

APP.CodeSandbox = CodeSandbox;
