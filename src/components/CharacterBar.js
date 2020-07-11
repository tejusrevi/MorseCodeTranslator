import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {map} from './mappingsITU';

var arr;

function CharacterBar(props){
    arr = [];
    var input = props.text;
    
    props.getMorseCode(arr)

    useEffect(()=>{
        document.getElementById('character-box-area').innerHTML = arr.join("")
    })
    function copyCode(){
        document.getElementById('copy-button').innerHTML = "COPIED!";
        setTimeout(()=>{
            document.getElementById('copy-button').innerHTML = "COPY"},3000)
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('character-box-area'));
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    }
    return(
        <div id="character-bar-row">
            <div id="character-box-area">
            </div>
            <button id="copy-button" onClick={copyCode}>COPY</button>
        </div>
    )
}

export {CharacterBar}