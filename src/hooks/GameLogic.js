import { useState, useEffect, useRef } from "react"

function GameLogic() {
    const [userText, setUserText] = useState("")
    const [timer, setTimer] = useState(10)
    const [initialize, setInitialize] = useState(false)
    const [textDisable, setTextDisable] = useState(false)
    const [newGameDisable, setNewGameDisable] = useState(false)
    const [timerInputDisable, setTimerInputDisable] = useState(false)
    const [inputTimer, setInputTimer] = useState(10)
    const textArea = useRef(null)
    const [wpm, setWpm] = useState("")
    const [percentCorrect, setPercentCorrect] = useState("")
    const [endGame, setEndGame] = useState(false)

    let defaultText =
        "Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being in a tree with snow falling all around and no way for him to get down. "

    const [randomText, setRandomText] = useState(defaultText)


    function calculateWpm() {
        let correctNumTally = 0;

        let userTextArray = userText.split("")


        userTextArray.forEach((item, index) => {
            if (index < randomText.length) {
                if (item === randomText[index]) {
                    correctNumTally += 1;
                }
            }
        })

        let wpm = Math.round((userTextArray.length / 5) / ((inputTimer - timer) / 60))
        let accuracy = Math.round((correctNumTally) / userTextArray.length * 100)

        return ({ wpm: wpm, accuracy: accuracy })

    }

    function handleInput(e) {
        if (userText === "" && initialize === false) {
            setInitialize(true);
            setTimerInputDisable(true)
            setInputTimer(timer)
            setWpm("")
        }
        setUserText(e.target.value);
        if ((inputTimer - timer) > 1) {
            let { wpm } = calculateWpm();
            setWpm(wpm)
        }
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

            function setDefaultValues() {
                setTextDisable(true)
                setNewGameDisable(false)
                setEndGame(false)


            }

            let { wpm, accuracy } = calculateWpm();
            setPercentCorrect(accuracy)
            setWpm(wpm)

        }

    }, [endGame])


    function StartNewGame() {
        setInitialize(false)
        setTimerInputDisable(false)
        setTextDisable(false)
        setTimer(inputTimer)
        setUserText("")
        setPercentCorrect("")
        setWpm("")
        textArea.current.focus()
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
        percentCorrect,
        endGame,
    })
}

export default GameLogic