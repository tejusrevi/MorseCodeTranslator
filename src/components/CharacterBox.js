import React, {useState} from 'react';

function CharacterBox(props){
    console.log(props)
    return(
        <div id="character">
            {props.text}
        </div>
    )
}

export{CharacterBox};