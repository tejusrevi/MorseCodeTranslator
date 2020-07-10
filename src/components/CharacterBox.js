import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {map} from './mappingsITU';

var currentChar;
var audio = document.getElementById("audio");
function CharacterBox(props){
    useEffect(()=>{
        if (props.mapping == undefined) return;
        currentChar = Object.keys(map).find(key => map[key] === props.mapping)
        document.getElementById("character").innerHTML = currentChar;
        for(var i = 0;i < 6;i++){
            if (props.mapping[i] == 0){
                //console.log("zero-play" + currentChar)
                ReactDOM.render(<div id="zero-character"></div>,document.getElementById("character-box-map").childNodes[i])
            }
            else if (props.mapping[i] == 1){
                //console.log("one-play" + currentChar)
                ReactDOM.render(<div id="one-character"></div>,document.getElementById("character-box-map").childNodes[i])
                //props.playFunc() /////////////
            }else {
                ReactDOM.unmountComponentAtNode(document.getElementById("character-box-map").childNodes[i])
            }
        }
    })
    return(
        <div id="character-box">
            <div id="character">
            </div>
            <div id="character-box-map">
                <div className="character-box-symbols" id="character-box-1"></div>
                <div className="character-box-symbols" id="character-box-2"></div>
                <div className="character-box-symbols" id="character-box-3"></div>
                <div className="character-box-symbols" id="character-box-4"></div>
                <div className="character-box-symbols" id="character-box-5"></div>
                <div className="character-box-symbols" id="character-box-6"></div>
            </div>
        </div>
    )
}

export{CharacterBox};