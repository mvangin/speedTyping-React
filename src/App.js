import React, { useState, useEffect, useRef } from "react"

function App() {
  const [userText, setUserText] = useState("")
  const [timer, setTimer] = useState(10)
  const [initialize, setInitialize] = useState(false)
  const [textDisable, setTextDisable] = useState(false)
  const [resetDisable, setResetDisable] = useState(true)
  const [timerInputDisable, setTimerInputDisable] = useState(false)
  const [inputTimer, setInputTimer] = useState("")
  const textArea = useRef(null)
  const [numWords, setNumWords] = useState("")


  function handleInput(e) {
    if (userText === "" && initialize === false) {
      setInitialize(true);
      setTimerInputDisable(true)
      setResetDisable(true)
    }
    setUserText(e.target.value);
  }

  function handleTimerSubmit(e) {
    console.log(inputTimer)
    setTimer(inputTimer)
  }

  useEffect(() => {
    if (initialize && timer > 0) {
        setTimeout(() => {
        setTimer(prevTime => prevTime - 1)
      }, 1000)
    } else if (timer === 0) {
      endGame()
    }
  }, [initialize, timer])

  function endGame() {
    setTextDisable(true)
    setResetDisable(false)
    let wordArray = userText.trim().split(" ")
    let filteredWords = wordArray.filter(word => word !== "")
    setNumWords(filteredWords.length)
  }

  function resetGame() {
    setInitialize(false)
    setTimer(inputTimer)
    textArea.current.focus()
    setTextDisable(false)
    setUserText("")
  }

  return (
    <>
      <h1>
        Speed Typing Test
        </h1>

      <textarea ref={textArea} disabled={textDisable} value={userText} onChange={handleInput} placeholder="Start typing to begin" />

      <div id="inputWrapper">
          Number of seconds: <input type="number" disabled={timerInputDisable} onChange={(e) => (setInputTimer(e.target.value))} placeholder="10"/>
          <button onClick={handleTimerSubmit} disabled={timerInputDisable} > submit </button>
      </div>

      <h3>
        {`Timer: ${timer} seconds`}
      </h3>

      <button  id="resetGame" disabled={resetDisable} onClick={resetGame}> Start New Game </button>

      <div>
        {`Words typed: ${numWords}`}
      </div>

    </>
  )
}


export default App