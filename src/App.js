import { useState } from "react"
import Card from './components/Card'
import uuid from 'react-uuid'

function App() {
  const [query, setQuery] = useState('')
  const [hand, setHand] = useState([])
  const [loading, setLoading] = useState(false)

  const toggleLoading = (isLoading) => setLoading(isLoading)

  const handleFocus = (event) => event.target.select()

  const regExp = (re, deckcode) => {
    let deck = []
    let m
    do {
      m = re.exec(deckcode)
      if (m) {
        for (let i = 0; i < m[1]; ++i) {
          deck.push(m[2])
        }
      }
    } while (m)

    return deck
  }

  function toDeck(evt) {
    if (!evt.key === "Enter" && !evt.type === "click" && !loading) return

    let decklist = []
    let deckcode = ''

    deckcode = query

    deckcode = deckcode.split("Sideboard")[0]

    deckcode = (typeof deckcode.split("Deck")[1] == 'undefined') ? (deckcode.split("Deck")[0]) : (deckcode.split("Deck")[1])

    let re = /([0-9]+)([a-z|\s,'"-]*)\(/gi

    decklist = regExp(re, deckcode)
    if (decklist.length === 0) {
      re = /([0-9]+)([a-z|\s,'"-]*)/gi
      decklist = regExp(re, deckcode)
    }

    toHand(decklist)
  }

  function toHand(decklist) {
    if (decklist.length === 0) return

    let tmpHand = []
    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * decklist.length)
      tmpHand.push(decklist[index])
      decklist.splice(index, 1)
    }
    setHand(tmpHand)
  }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Paste your deck code here..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={toDeck}
            onFocus={handleFocus}
          />
        </div>
        <div className="container">
          {(hand.length === 7) && hand.map(card => (
            <Card key={uuid()} cardCode={card} toggleLoading={toggleLoading} />
          ))}
          <div className="vertical-center">
            <button onClick={toDeck} disabled={loading}>Mulligan</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
