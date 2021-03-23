import { useState, useEffect } from "react"

const api = "https://api.scryfall.com/cards/named?exact="

function App() {
  const [query, setQuery] = useState('')
  const [card, setCard] = useState([])
  const [hand, setHand] = useState([])

  const handleFocus = (event) => event.target.select()

  useEffect(() => {
    toSearch(hand)
  }, [hand])

  function toDeck(evt) {
    if (!evt.key === "Enter" && !evt.type === "click") return

    let decklist = []
    let deckcode = ''

    deckcode = query

    deckcode = deckcode.split("Sideboard")[0]

    deckcode = deckcode.split("Deck")[1]

    let re = /([0-9]+)([a-z|\s,'"-]*)\(/gi
    let m
    let i
    do {
      m = re.exec(deckcode)
      if (m) {
        for (i = 0; i < m[1]; ++i) {
          decklist.push(m[2])
        }
      }
    } while (m)
    if (decklist.length === 0) {
      re = /([0-9]+)([a-z|\s,'"-]*)/gi
      do {
        m = re.exec(deckcode)
        if (m) {
          for (i = 0; i < m[1]; ++i) {
            decklist.push(m[2])
          }
        }
      } while (m)
    }

    toHand(decklist)
  }

  function toHand(decklist) {
    let tmpHand = []
    for (let i = 0; i < 7; i++) {
      const index = Math.floor(Math.random() * decklist.length)
      tmpHand.push(decklist[index])
      decklist.splice(index, 1)
    }
    setHand(tmpHand)
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function toSearch(hand) {
    for (let i = 0; i < hand.length; i++) {
      search(i, hand[i])
      await sleep(50 * (i + 1))
    }
  }

  async function search(i, q) {

    await fetch(`${api}${q}`)
      .then(res => res.json())
      .then(result => {
        if (i === 0) {
          setCard([result])
        } else {
          setCard(prevCards => {
            return [...prevCards, result]
          })
        }
      })
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
          {(card.length === 7) && (card.map((c) => (
            <div className="pic">
              <img src={(typeof c.image_uris != "undefined") ? (c.image_uris.border_crop) : (c.card_faces[0].image_uris.border_crop)}></img>
            </div>
          )))}
          <div className="vertical-center">
            <button onClick={toDeck}>Mulligan</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
