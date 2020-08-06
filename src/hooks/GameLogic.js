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
    const [wpm, setWpm] = useState("")
    const [correctedWpm, setCorrectedWpm] = useState("")
    const [endGame, setEndGame] = useState(false)

    let defaultText = 
    "Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being in a tree with snow falling all around and no way for him to get down. "

    const [randomText, setRandomText] = useState(defaultText)


    function handleInput(e) {
        if (userText === "" && initialize === false) {
            setInitialize(true);
            setTimerInputDisable(true)
            setInputTimer(timer)
            setWpm("")
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
            setDefaultValues();
            calculateWpm();

            function setDefaultValues() {
                setTextDisable(true)
                setNewGameDisable(false)
                setEndGame(false)
            }

            function calculateWpm() {
                let correctNumTally = 0;

                let filteredRandomText = randomText.trim().split(" ").filter(word => word !== "")
                let wordArray = userText.trim().split(" ")

                let filteredWords = wordArray.filter(word => word !== "")

                filteredWords.forEach((item, index) => {
                    if (index < filteredRandomText.length - 1) {
                        if (item === filteredRandomText[index]) {
                            correctNumTally += 1;
                        }
                    }
                })

                setWpm(filteredWords.length / (inputTimer / 60))
                setCorrectedWpm(correctNumTally / (inputTimer / 60))
            }
        }

    }, [endGame])


    function StartNewGame() {
        setInitialize(false)
        setTimerInputDisable(false)
        setTextDisable(false)
        setTimer(inputTimer)
        setUserText("")
    }

    return ({
        handleInput,
        handleTimerSubmit,
        StartNewGame,
        handleInputTimer,
        randomText,
        userText,
        timer,
        initialize,
        textDisable,
        newGameDisable,
        timerInputDisable,
        inputTimer,
        textArea,
        wpm,
        correctedWpm,
        endGame,
    })
}

export default GameLogic