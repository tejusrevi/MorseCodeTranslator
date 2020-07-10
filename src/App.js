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

var count = 0;
var symbolCount = 0;
var audio = document.getElementById("audio");
window.onload = e =>{
  vantaEffect = HALO({
    el: "#main-container",
    mouseControls: false,
    touchControls: false,
  })
}

var Error = <div id="error-msg"></div>
function App() {
  const [input,setInput] = useState("HI");
  const [timeUnit,setTimeUnit] = useState(0.5);
  const [currentMapping,setCurrentMapping] = useState(map[input[0]]);

  function handleSubmit(e){
    index = 0;
    count = 0;
    nextChar();
  }

  function nextChar(){
    if (index == input.length) return;

    console.log("index  :"+index)
    setCurrentMapping(map[input.charAt(index)]);
    console.log(map[input.charAt(index)])
    processChar(map[input.charAt(index)])
    var duration = 0;
    map[input.charAt(index++)].forEach((e)=>{
      if (e === 1) duration+=3;
      else if(e === 0) duration++;
    })
    console.log(duration)
    if (index == input.length) return;
    setTimeout(nextChar,(duration+map[input.charAt(index)].length)*timeUnit*1000)  //needs fix
  }

  function processChar(arr){
    if (arr.length == symbolCount) return;
    setTimeout(()=>{
      console.log("char process")
      symbolCount++;
      processChar(arr)
    },500)
  }

  function handleReset(e){
    e.preventDefault();
    if (document.getElementById("error-msg") !== null) ReactDOM.unmountComponentAtNode(document.getElementById("error-container"))
    setInput('');
  }

  function controlledInput(e){
    e.preventDefault();
    if((/[^\w|\s|&|'|@|\)|\(|:|,|=|!|.|\-|+|"|?|/]/).test(e.target.value)) {
      ReactDOM.render(Error,document.getElementById("error-container"))
      document.getElementById("error-msg").innerHTML = "Illegal character "+ (e.target.value).charAt((e.target.value).length-1) +" detected and auto omitted"
    }else{
      play()
      setInput((e.target.value).toUpperCase())
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
      <div id="text-container">
      <textarea id="text-input" spellCheck="false" value={input} onChange={controlledInput.bind(this)}/>
      <div id="error-container"></div>
      <div id="character-bar">
        <CharacterBar text={input}/>
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
