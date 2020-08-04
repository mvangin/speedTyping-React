import React, { useState, useEffect, useRef } from "react"

function App() {
  const [userText, setUserText] = useState("")
  const [timer, setTimer] = useState(10)
  const [initialize, setInitialize] = useState(false)
  const [textDisable, setTextDisable] = useState(false)
  const [newGameDisable, setNewGameDisable] = useState(false)
  const [timerInputDisable, setTimerInputDisable] = useState(false)
  const [inputTimer, setInputTimer] = useState("")
  const textArea = useRef(null)
  const [numWords, setNumWords] = useState("")


  function handleInput(e) {
    if (userText === "" && initialize === false) {
      setInitialize(true);
      setTimerInputDisable(true)
      setInputTimer(timer)
    }
    setUserText(e.target.value);
  }

  function handleTimerSubmit(e) {
    console.log(inputTimer)
    setTimer(inputTimer)
    textArea.current.focus()
  }

  useEffect(() => {
    let timerSet
    if (initialize && timer > 0) {
        timerSet = setTimeout(() => {
        setTimer(prevTime => prevTime - 1)
      }, 1000)
    } else if (timer === 0) {
      endGame()
    }

    return () => clearTimeout(timerSet)

  }, [initialize, timer])

  function endGame() {
    setTextDisable(true)
    setNewGameDisable(false)
    let wordArray = userText.trim().split(" ")
    let filteredWords = wordArray.filter(word => word !== "")
    setNumWords(filteredWords.length)
  }

  function StartNewGame() {
    setInitialize(false)
    setTimerInputDisable(false)
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
          Number of seconds: <input type="number" min="0" disabled={timerInputDisable} value={inputTimer} onChange={(e) => (setInputTimer(e.target.value))} placeholder="10"/>
          <button onClick={handleTimerSubmit} disabled={timerInputDisable} > submit </button>
      </div>

      <h3>
        {`Timer: ${timer} seconds`}
      </h3>

      <button  id="StartNewGame" disabled={newGameDisable} onClick={StartNewGame}> Start New Game </button>

      <div>
        {`Words typed: ${numWords}`}
      </div>

    </>
  )
}


export default App