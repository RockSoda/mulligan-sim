import { useState } from "react";

const api = "https://api.scryfall.com/cards/named?exact=";

function App() {
  var [query, setQuery] = useState('');
  const [card, setCard] = useState({});
  const [card1, setCard1] = useState({});
  const [card2, setCard2] = useState({});
  const [card3, setCard3] = useState({});
  const [card4, setCard4] = useState({});
  const [card5, setCard5] = useState({});
  const [card6, setCard6] = useState({});
  var deckcode = '';
  var decklist = [];
  var hand = [];


  const handleFocus = (event) => event.target.select();
  const toDeck = evt => {
    var list = [];
    if(evt.key === "Enter" || evt.type === "click"){
      deckcode = query;
      deckcode = deckcode.split("Sideboard")[0];
      decklist = deckcode.split("(");
      decklist.pop(decklist.length-1);
      for(var i = 0; i < decklist.length; i++){
        decklist[i] = decklist[i].split(" ");
      }
      for(var i = 0; i < decklist.length; i++){
        var tmp = "";
        var num = 0;
        for(var j = decklist[i].length-2; j >= 0 ; j--){
          if(decklist[i][j].length === 1){
            num = decklist[i][j];
            break;
          }else{
            tmp = decklist[i][j] + "%20" + tmp;
          }
        }
        for(var j = 0; j < num; j++){
          list.push(tmp);
        }

      }
      decklist = list;

      for(var i = 0 ; i < 7; i++){
        const index = Math.floor(Math.random() * decklist.length);
        hand.push(decklist[index]);
        decklist.splice(index,1);
      }
      
      for(var i = 0; i < hand.length; i++){
        query = hand[i];
        setTimeout(search(i), 50);
      }

    }
  }

  function search(i){
    fetch(`${api}${query}`)
    .then(res => res.json())
    .then(result => {
      //setQuery('');
      switch(i){
        case 0:
          setCard(result);
          break;
        case 1:
          setCard1(result);
          break;
        case 2:
          setCard2(result);
          break;
        case 3:
          setCard3(result);
          break;
        case 4:
          setCard4(result);
          break;
        case 5:
          setCard5(result);
          break;
        case 6:
          setCard6(result);
          break;
        default:
          break;
      }
      console.log(result);
    });
  }

  /*const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api}${query}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setCard(result);
        console.log(result);
      });
    }
  }*/
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
          {(typeof card.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card.image_uris != "undefined") ? (card.image_uris.border_crop) : (card.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}
          {(typeof card1.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card1.image_uris != "undefined") ? (card1.image_uris.border_crop) : (card1.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}
          {(typeof card2.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card2.image_uris != "undefined") ? (card2.image_uris.border_crop) : (card2.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}
          {(typeof card3.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card3.image_uris != "undefined") ? (card3.image_uris.border_crop) : (card3.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}
          {(typeof card4.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card4.image_uris != "undefined") ? (card4.image_uris.border_crop) : (card4.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}
          {(typeof card5.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card5.image_uris != "undefined") ? (card5.image_uris.border_crop) : (card5.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}
          {(typeof card6.id != "undefined") ? (
            <div className="pic">
              <img src = {(typeof card6.image_uris != "undefined") ? (card6.image_uris.border_crop) : (card6.card_faces[0].image_uris.border_crop)}></img>
            </div>
          ) : ('')}

          <div className="vertical-center">
            <button onClick={toDeck}>Mulligan</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
