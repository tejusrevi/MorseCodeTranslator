import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import HALO from './libs/vanta.halo'
import {CharacterBox} from './components/CharacterBox'
import {map} from './components/mappingsITU';
import {CharacterBar} from './components/CharacterBar'
import './App.css';

var vantaEffect;
var interval;
var time;
var index;
var duration;

var count = 0;
var symbolCount = 0;
var symbolDuration;
var audio0 = document.getElementById("audio0");
var audio1 = document.getElementById("audio1");

var arr;
window.onload = e =>{
  vantaEffect = HALO({
    el: "#main-container",
    mouseControls: false,
    touchControls: false,
  })


  document.getElementById('text-input').addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit-button").click();
    }
  });
}

var Error = <div id="error-msg"></div>
function App() {
  const [input,setInput] = useState("HI");
  const [timeUnit,setTimeUnit] = useState(0.1);
  const [currentMapping,setCurrentMapping] = useState(map[input[0]]);

  arr =[];
  getMorseCode(arr)

  function handleSubmit(e){
    index = 0;
    count = 0;
    symbolCount = 0;
    nextChar();
    playSound();
  }

  function nextChar(){
    setCurrentMapping(map[input.charAt(index)]);
    duration = 0;
    map[input.charAt(index++)].forEach((e)=>{
      if (e === 1) duration+=3;
      else if(e === 0) duration++;
      else if (e === "" ) duration+=4; //7 minus default pause of 3 units
    })
    console.log(duration)
    if (index == input.length) return;
    setTimeout(nextChar,(duration + map[input.charAt(index)].length+3)*timeUnit*1000)  //needs fix
  }

  function getMorseCode(arr){
    input.split("").forEach(e => {
        map[e].forEach(f=>{
            if (f === 0){
                arr.push("•")
            }else if (f ===1){
                arr.push("-")
            }else if (f === ""){
                arr.push(" / ")
            }
        })
        arr.push(" ")
    });
}

  function playSound(){
    symbolDuration = 0;
    audio0.pause();
    audio1.pause();
    audio0.currentTime = 0;
    audio1.currentTime = 0;
    
    if(arr[symbolCount] === "•"){
      symbolDuration++;
      audio0.play()
      play()
    }else if(arr[symbolCount] === "-"){
      symbolDuration+=3;
      audio1.play()
      
    }else if(arr[symbolCount] === " / "){
      symbolDuration+=6;  //7 minus default pause of 1 unit
    }else if (arr[symbolCount] === " "){
      symbolDuration+=2; //3 minus default pause of 1 unit
    }
    
    if (symbolCount === arr.length ){
      return;
    }
    symbolCount++;
    setTimeout(()=>{playSound()},(symbolDuration + 1)*timeUnit*1000);
  }
  function handleReset(e){
    e.preventDefault();
    if (document.getElementById("error-msg") !== null) ReactDOM.unmountComponentAtNode(document.getElementById("error-container"))
    setInput('');
  }

  function controlledInput(e){
    ReactDOM.unmountComponentAtNode(document.getElementById("error-container"))
    e.preventDefault();
    if((/[^\w|\s|&|'|@|\)|\(|:|,|=|!|.|\-|+|"|?|/]/).test(e.target.value)) {
      ReactDOM.render(Error,document.getElementById("error-container"))
      document.getElementById("error-msg").innerHTML = "Illegal character "+ (e.target.value).charAt((e.target.value).length-1) +" detected and auto omitted"
    }else{
      play()
      setInput((e.target.value.replace('\n','')).toUpperCase())
      setCurrentMapping(map[(e.target.value).toUpperCase().charAt(0)])
    }
    
  }

  function play(){
    if (interval == null){
      time = 0;
      interval = setInterval(changeAmplitude,100)
    }
  }
  function changeAmplitude(){
    
    //console.log(time)
    if (time === 0){
      vantaEffect.setOptions({
        baseColor: 0xeaeaea,
        amplitudeFactor: 5.00,
        size: 2.1,
      })
    }else if(time === 1){
      vantaEffect.setOptions({
        baseColor: 0xf2f2f2,
        amplitudeFactor: 0.5,
        size: 1.75,
      })
      clearInterval(interval)
      interval = null;
    }
    time++;
    
  }


  return (
    <div id="main-container">
      <div id="header">MORSE CODE TRANSLATOR</div>
      <div id="text-container">
      <textarea id="text-input" spellCheck="false" value={input} onChange={controlledInput.bind(this)}/>
      <div id="error-container"></div>
      <div id="character-bar">
        <CharacterBar text={input} getMorseCode={getMorseCode}/>
      </div>
          <div id="button-container">
            <button className="btn" id="submit-button" onClick={handleSubmit.bind(this)}></button>
            <button className="btn" id="reset-button" onClick={handleReset.bind(this)}></button>
          </div>
          
      </div>
      <div id="character-container">
      <CharacterBox timeUnit={timeUnit} mapping={currentMapping} playFunc={play}/>
      </div>
      <div id="footer">
        <code><a target="_blank" href="https://github.com/tejusrevi/MorseCodeTranslator">View project on my Github ♥</a></code>
        <code>Background is Modified Version of Halo from <a target="_blank" href="https://github.com/tengbao/vanta">Vanta.js</a></code>
      </div>
    </div>
    
    
  );
}

export default App;
