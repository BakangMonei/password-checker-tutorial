import { useState, useRef, useCallback } from "react";
import styles from "./App.module.css";
import { Waiting, Typing, Done, Sneaky, OhNo } from "./constants";

function App() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(Waiting);
  const [spanText, setSpanText] = useState("");
  const checkBoxRef = useRef(null);
  const passwordRef = useRef(null);

  const checkPassword = (value) => {
    if (value === "") {
      setStatus(Waiting);
      setSpanText("Where is your password???");
    } else if (value.length < 16) {
      setSpanText("Password length must be at least 16 characters");
      setStatus(OhNo);
    } else {
      setStatus(Done);
      setSpanText("");
    }
  };

  const handleKeyUp = useCallback((e) => {
    const { value } = e.target;
    // Clear any existing timeout
    clearTimeout(handleKeyUp.timeoutId);
    // Set a new timeout
    handleKeyUp.timeoutId = setTimeout(() => {
      checkPassword(value);
    }, 500);
  }, []);

  const handleCheckBoxClick = useCallback(() => {
    const { checked } = checkBoxRef.current;
    passwordRef.current.type = checked ? "text" : "password";
    setStatus(checked ? Sneaky : Typing);
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.GifArea}>
        <img alt="gif" src={status} className={styles.Gif} />
      </div>
      <div className={styles.LabelArea}>
        <p>Password</p>
        <div>
          <input
            type="checkbox"
            ref={checkBoxRef}
            onClick={handleCheckBoxClick}
          />
          <p className={styles.Small}>Show Password</p>
        </div>
      </div>
      <div className={styles.PasswordArea}>
        <input
          type="password"
          className={styles.PasswordInput}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setStatus(Typing);
          }}
          onKeyUp={handleKeyUp}
          ref={passwordRef}
        />
        <span className={styles.Small}>{spanText}</span>
      </div>
    </div>
  );
}

export default App;
