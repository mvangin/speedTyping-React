import React, { useState, useEffect, useRef } from "react"
import GameLogic from "./hooks/GameLogic"
import TypeCorrect from "./TypeCorrect"


function App() {
  const {
      handleInput,
      handleTimerSubmit,
      StartNewGame,
      handleInputTimer,
      randomText,
      userText,
      timer,
      textDisable,
      newGameDisable,
      timerInputDisable,
      inputTimer,
      textArea,
      wpm,
      correctedWpm,
  } = GameLogic();

  return (
    <>
      <h1>
        Speed Typing Test
        </h1>

      <div id="randomText">
        <TypeCorrect randomText={randomText} userText={userText}  />
      </div>


      <textarea ref={textArea} disabled={textDisable} value={userText} onChange={handleInput} placeholder="Start typing to begin" />
      <div id="inputWrapper">
        Number of seconds: <input type="number" min="1" disabled={timerInputDisable} value={inputTimer} onChange={handleInputTimer} placeholder="10" />
        <button onClick={handleTimerSubmit} disabled={timerInputDisable} > submit </button>
      </div>

      <h2>
        {`Timer: ${timer} seconds`}
      </h2>

      <button id="StartNewGame" disabled={newGameDisable} onClick={StartNewGame}> Start New Game </button>

      <h3>
        {`Words Per Minute: ${wpm}`}
      </h3>

      <h3>
        {`Corrected Words Per Minute: ${correctedWpm}`}
      </h3>

    </>
  )
}


export default App