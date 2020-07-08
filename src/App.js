import React from 'react';
import HALO from './libs/vanta.halo'
import './App.css';

window.onload = e =>{
  var vantaEffect = HALO({
    el: "#main-container"
  })
}
function App() {
  return (
    <div id="main-container">
      <div id="text-container">
        <textarea id="text-input" spellCheck="false"/>
          <div id="button-container">
            <button className="btn" id="submit-button"></button>
            <button className="btn" id="reset-button"></button>
          </div>
      </div>
      <div id="footer">
        Background is Halo from <a href="https://www.vantajs.com/?effect=halo">Vanta.js</a>
      </div>
    </div>
    
    
  );
}

export default App;
