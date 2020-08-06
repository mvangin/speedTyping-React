import React from "react"
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
    percentCorrect
  } = GameLogic();

  return (
    <>
      <h1>
        Speed Typing Test
        </h1>



      <div id="contentWrapper">

        <div id="textWrapper">
        <div id="randomText">
            <TypeCorrect randomText={randomText} userText={userText} />
          </div>
          <textarea ref={textArea} disabled={textDisable} value={userText} onChange={handleInput} placeholder="Start typing to begin" />

        </div>

        <div id="wpm">

          <h3 id="wpmText">
            {`Words Per Minute: ${wpm}`}
          </h3>

          <h3>
            {`Accuracy (percent): \n ${percentCorrect}`}
          </h3>

        </div>

      </div>

      <div id="inputWrapper">
        Number of seconds: <input type="number" min="1" disabled={timerInputDisable} value={inputTimer} onChange={handleInputTimer}/>
        <button onClick={handleTimerSubmit} disabled={timerInputDisable} > submit </button>
      </div>

      <h2 id="timer">
        {`Timer: ${timer} seconds`}
      </h2>




      <button id="StartNewGame" disabled={newGameDisable} onClick={StartNewGame}> Start New Game </button>





    </>
  )
}


export default App