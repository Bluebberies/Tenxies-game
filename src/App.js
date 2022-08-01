import React from 'react'
import './index.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App () {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice () {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice () {

    if (!tenzies) {
      setDice(oldDice =>
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDie()
        })
      )
      setRolls(oldVal => oldVal + 1)
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setRolls(0)
    }
  }

  function holdDice (id) {
    setDice(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  const diceElements = dice.map(die => (
    <Die
      key={nanoid()}
      isHeld={die.isHeld}
      value={die.value}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <div>
      {tenzies?
      <main className='winPage'>
        <Confetti />
        <h1>You Won!!! 🏆</h1>
        <p>Rolls: {rolls}</p>
        <button
            style={{
              backgroundColor: 'yellow',
              color: 'black'
            }}
            onClick={rollDice}>
              New Game
        </button>
      </main> :
        <main>
          <p>Rolls: {rolls}</p>
          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className='container'>{diceElements}</div>
          <button onClick={rollDice}>Roll</button>
        </main>
      }
    </div>
  )
}

export default App
