
import React from "react"

function TypeCorrect(props) {

    const text= props.randomText.split("")
    const mappedText = text.map((item,index) => {
        console.log(item)
        return (
            <span key={index*Math.random()} id={index < props.userText.length ? item === props.userText[index] ? 
             "highlight" : "nohighlight" : "nohighlight" }>
                {item}
            </span >
            
        )
    })
    console.log(mappedText)
    return(<div> {mappedText} </div>)
}

export default TypeCorrect