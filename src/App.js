import React, { useState, useEffect, useRef } from "react"
import GameLogic from "./hooks/GameLogic"
import TypeCorrect from "./TypeCorrect"


function App() {
  const {
    handleInput,
    handleTimerSubmit,
    StartNewGame,
    handleInputTimer,
    userText,
    timer,
    textDisable,
    newGameDisable,
    timerInputDisable,
    inputTimer,
    textArea,
    numWords,
  } = GameLogic();

  const [currentWord, setCurrentWord] = useState("")
  const [index, setIndex] = useState(0)

  let randomText = "hi dude how are you"





  function handleKeyDown(e) {
    console.log(String.fromCharCode(e.keyCode))

    if (String.fromCharCode(e.keyCode) === " ") {
      setCurrentWord(randomText[index + 1])
      setIndex(prevIndex => prevIndex + 1)
      console.log(currentWord)
    }
  }



  return (
    <>
      <h1>
        Speed Typing Test
        </h1>

      <div id="randomText">
        <TypeCorrect randomText={randomText} userText={userText} />
      </div>

      <textarea ref={textArea} disabled={textDisable} value={userText} onChange={handleInput} onKeyDown={handleKeyDown} placeholder="Start typing to begin" />
      <div id="inputWrapper">
        Number of seconds: <input type="number" min="1" disabled={timerInputDisable} value={inputTimer} onChange={handleInputTimer} placeholder="10" />
        <button onClick={handleTimerSubmit} disabled={timerInputDisable} > submit </button>
      </div>

      <h3>
        {`Timer: ${timer} seconds`}
      </h3>

      <button id="StartNewGame" disabled={newGameDisable} onClick={StartNewGame}> Start New Game </button>

      <div>
        {`Words typed: ${numWords}`}
      </div>

    </>
  )
}


export default App