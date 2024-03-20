import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "~!@#$%^&*()_+{}|:<>?`1[],./";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  let CopyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="background">
        <div className="bg-black w-full mx-auto shadow-md max-w-md align-middle input-field">
          <div className="flex justify-center text-white">
            <h1 className="pt-2">Password Generator</h1>
          </div>
          <div className="input-group justify-center inset-x-0 px-3 py-3">
            <input
              type="email"
              className="input"
              placeholder="Password"
              value={password}
              ref={passwordRef}
              readOnly
            />

            <button className="Btn" type="submit" onClick={CopyToClipboard}>
              <svg viewBox="0 0 512 512" className="svgIcon" height="1em">
                <path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path>
              </svg>
              <p className="text">COPY</p>
              <span className="effect"></span>
            </button>
          </div>
          <div className="flex gap-x-5">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={30}
                className="slider"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />

              <label htmlFor="range">Length:{length}</label>
            </div>
            <div className="flex gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />

              <label>Numbers</label>
            </div>

            <div className="flex gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />

              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
