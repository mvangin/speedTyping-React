
import React, { useState } from "react"

function TypeCorrect(props) {

    const text = props.randomText.split("")
    const mappedText = text.map((item, index) => {
        return (
            <span key={new Date() * Math.random()} id={handleID(item, index)}>
                {item}
            </span >

        )
    })

    function handleID(item, index) {
        if (index <= props.userText.length) {
            if (index === (props.userText.length)) {
                return "highlightCurrent"
            } else if (item === props.userText[index]) {
                return "highlight"
            } else {
                return "nohighlight"
            }
        }
    }

    return (
        <div>
            {mappedText}
        </div>)
}

export default TypeCorrect