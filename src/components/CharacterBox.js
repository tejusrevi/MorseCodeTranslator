import React from 'react';
import ReactDOM from 'react-dom'
import {map} from './mappingsITU';
var interval;
var readyInterval;

var audio = document.getElementById("audio");

function CharacterBox(props){
    var  index = 0;
    var trueonce = true;
    var count;
    console.log("index"+index)
    const text = props.text;
    const timeUnit = props.timeUnit;

    audio.addEventListener("timeupdate", function() {
        console.log(audio.currentTime)
        if (audio.currentTime > (props.timeUnit)/50) {
            audio.pause();
            audio.currentTime = 0;
        }
        })

    function processChars(){
        count++;
        console.log(count)
        document.getElementById("character").innerHTML = text.charAt(index);
        var charMap = map[text.charAt(index)];
        if(Object.keys(map).includes(text.charAt(index))) {
            setTimeout( ()=>{
                for(var i = 0;i < charMap.length;i++){
                    if (charMap[i] == 0){
                        console.log("zero-play")
                        ReactDOM.render(<div id="zero-character"></div>,document.getElementById("character-box-map").childNodes[i])
                        audio.play()
                        
                    }
                    else {
                        ReactDOM.render(<div id="one-character"></div>,document.getElementById("character-box-map").childNodes[i])
                        props.playFunc()
                    }
                }
            },300)
        }else{
            document.getElementById("character-box-map").childNodes.forEach(e=>{
                ReactDOM.unmountComponentAtNode(e)
            })
            
        }
        
        index++;
        if (index == text.length) {
            clearInterval(interval);
            interval = null;
        }
    }


    function ready(){
        if(document.getElementById("character") != null && interval == null){
            count = 0;
            interval = setInterval(processChars,props.timeUnit*1000);
            clearInterval(readyInterval)
        }
    }
    if(trueonce){
        readyInterval = setInterval(ready,100);
        trueonce = false;
    }
    
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