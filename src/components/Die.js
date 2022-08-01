import React from 'react';
import '../index.css';
import { nanoid } from 'nanoid'

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const cls = props.value % 2 === 0 ? 'even-' : 'odd-';
    const newArr = []

    for(let i=1 ; i<=props.value; i++){
        newArr.push(`dot ${cls}${i}`)
    }
    
    const dots = newArr.map(item => <p key={nanoid()} className={item}></p>)

    return(
        <div className='dice' style={styles}  onClick={props.holdDice}>
            {dots}
        </div>
    )
}