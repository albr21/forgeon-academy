var APP = (window as any).APP;

function runPythonCode(code: string, onOutput: (text: string) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const Sk = (window as any).Sk;
    if (!Sk) {
      reject(new Error('Skulpt is not loaded. Python sandbox is unavailable.'));
      return;
    }

    Sk.configure({
      output: function(text: string) {
        onOutput(text);
      },
      read: function(x: string) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
          throw "File not found: '" + x + "'";
        }
        return Sk.builtinFiles["files"][x];
      },
      __future__: (Sk as any).python3,
    });

    const myPromise = Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, code, true);
    });

    myPromise.then(
      function() { resolve(); },
      function(err: any) { reject(err); }
    );
  });
}

APP.runPythonCode = runPythonCode;
