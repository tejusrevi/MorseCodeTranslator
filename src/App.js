import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import HALO from './libs/vanta.halo'
import {CharacterBox} from './components/CharacterBox'
import './App.css';

var vantaEffect;
var interval;
var time;

window.onload = e =>{
  vantaEffect = HALO({
    el: "#main-container",
    mouseControls: true,
    touchControls: false,
  })
}

var Error = <div id="error-msg"></div>
function App() {
  const [input,setInput] = useState("");
  const [timeUnit,setTimeUnit] = useState(0.5);
  function handleSubmit(e){
    ReactDOM.render(<CharacterBox text={input}/>,document.getElementById("character-container"));
    document.getElementById("character-container").classList.add("rendered")
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
      if (document.getElementById("error-msg") !== null) ReactDOM.unmountComponentAtNode(document.getElementById("error-container"))
      setInput((e.target.value).toUpperCase())
    }
    
  }

  function play(){
    if (interval == null){
      time = 0;
      interval = setInterval(changeAmplitude,100)
    }
  }
  function changeAmplitude(){
    
    console.log(time)
    if (time === 0){
      vantaEffect.setOptions({
        baseColor: 0xeaeaea,
        amplitudeFactor: 5.00,
        size: 2.1,
      })
    }else if(time === timeUnit*10){
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
          <div id="character-container">
      </div>
      
      </div>
      <div id="footer">
        <code><a target="_blank" href="https://github.com/tejusrevi/MorseCodeTranslator">View project on my Github ♥</a></code>
        <code>Background is Modified Version of Halo from <a target="_blank" href="https://github.com/tengbao/vanta">Vanta.js</a></code>
      </div>
    </div>
    
    
  );
}

export default App;
