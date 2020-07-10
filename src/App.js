import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import HALO from './libs/vanta.halo'
import {CharacterBox} from './components/CharacterBox'
import {map} from './components/mappingsITU';
import './App.css';

var vantaEffect;
var interval;
var time;
var index;

var count = 0;
var characterTimeout;
window.onload = e =>{
  vantaEffect = HALO({
    el: "#main-container",
    mouseControls: false,
    touchControls: false,
  })
}

var Error = <div id="error-msg"></div>
function App() {
  const [input,setInput] = useState("T1T1T1T1T1T1");
  const [timeUnit,setTimeUnit] = useState(1);
  const [currentMapping,setCurrentMapping] = useState(map[input[0]]);

  function handleSubmit(e){
    index = 0;
    count = 0;
    nextChar();
  }
  function nextChar(){
    console.log("index  :"+index)
    setCurrentMapping(map[input.charAt(index)]);
    if (index == input.length) return;
    setTimeout(nextChar,map[input.charAt(index++)].length*timeUnit*1000)  //needs fix
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
