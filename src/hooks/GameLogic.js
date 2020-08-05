import { useState, useEffect, useRef } from "react"

function GameLogic() {
    const [userText, setUserText] = useState("")
    const [timer, setTimer] = useState(10)
    const [initialize, setInitialize] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [newGameDisable, setNewGameDisable] = useState(false)
    const [timerInputDisable, setTimerInputDisable] = useState(false)
    const [inputTimer, setInputTimer] = useState("")
    const textArea = useRef(null)
    const [numWords, setNumWords] = useState("")
    const [endGame, setEndGame] = useState(false)

    function handleInput(e) {
        if (userText === "" && initialize === false) {
            setInitialize(true);
            setTimerInputDisable(true)
            setInputTimer(timer)
        }
        setUserText(e.target.value);        
    }


    function handleTimerSubmit(e) {
        if (inputTimer > 0) {
            setTimer(inputTimer)
            textArea.current.focus()
        } else {
            alert("please enter valid number")
        }
    }

    function handleInputTimer(e) {
        setInputTimer(e.target.value)
    }

    useEffect(() => {
        let timerSet
        if (initialize && timer > 0) {
            timerSet = setTimeout(() => {
                setTimer(prevTime => prevTime - 1)
            }, 1000)
        } else if (timer === 0) {
            setEndGame(true)
        }

        return () => clearTimeout(timerSet)

    }, [initialize, timer])

    useEffect(() => {
        if (endGame) {
            setTextDisable(true)
            setNewGameDisable(false)
            let wordArray = userText.trim().split(" ")
            let filteredWords = wordArray.filter(word => word !== "")
            setNumWords(filteredWords.length)
            setEndGame(false)
        }
    }, [endGame, userText])


    function StartNewGame() {
        setInitialize(false)
        setTimerInputDisable(false)
        setTextDisable(false)
        setTimer(inputTimer)
        setUserText("")
    }

    return({
        handleInput, 
        handleTimerSubmit, 
        StartNewGame,
        handleInputTimer,
        userText, 
        timer, 
        initialize,
        textDisable,
        newGameDisable,
        timerInputDisable,
        inputTimer,
        textArea,
        numWords,
        endGame,
    })
}

export default GameLogic