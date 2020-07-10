import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {map} from './mappingsITU';

var arr;
function CharacterBar(props){
    arr = [];
    var input = props.text;
    function getMorseCode(){
        input.split("").forEach(e => {
            map[e].forEach(f=>{
                console.log(f)
                if (f === 0){
                    arr.push("•")
                }else if (f ===1){
                    arr.push("-")
                }else if (f === ""){
                    arr.push(" / ")
                }
            })
            arr.push(" ")
            
            console.log(arr)
        });
    }
    getMorseCode()

    useEffect(()=>{
        document.getElementById('character-box-area').innerHTML = arr.join("")
    })
    return(
        <div id="character-box-area">
        </div>
    )
}

export {CharacterBar}