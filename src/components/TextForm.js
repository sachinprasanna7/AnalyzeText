import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Uppercase", "success")
    }

    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lowercase", "success")
    }

    const handleFindReplaceClick = ()=>{
        let find = prompt("Enter the word you want to find")
        let replace = prompt("Enter the word you want to replace with")
        let newText = text.replaceAll(find, replace);
        setText(newText)
        props.showAlert("Words replaced", "success")
    }

    const handleClearClick = ()=>{
        setText("")
        props.showAlert("Text cleared", "success")
    }

    const handleCopy = () => {
        console.log("I am copy");
        var text = document.getElementById("myBox");
        text.select();
        text.setSelectionRange(0, 9999);
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text copied", "success")
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra spaces removed", "success")
    }

    function getWordsCount(text){

        if(text.trim().length === 0){
            return 0;
        }

        let wordCount = text.split(" ").length;
        if(text[text.length - 1] === " "){
            return wordCount-1;
        }

        else {
            return wordCount;
        }
    }

    function getMinutesCount(text){

        let wordCount = getWordsCount(text);

        if(wordCount === 0){
            return 0;
        }

        else {
            return 0.008*wordCount;
        }

    }

    const handleOnChange = (event)=>{
        setText(event.target.value)
    }

    const [text, setText] = useState(''); 

    return (
        <>
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}> 
            <h1>{props.heading}</h1>
            <div className="mb-3"> 
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8"></textarea>
            </div>
            <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
            <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
            <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear text</button>
            <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleFindReplaceClick}>Find and Replace</button>
            <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
            <button disabled = {text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
        </div>

        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{getWordsCount(text)} words and {text.length} characters</p>
            <p>{getMinutesCount(text)} Minutes taken to read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
        </div>
        </>

    )
}