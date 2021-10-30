import { useState } from "react";
import PromiseTool from "promise-timers";
import "./styles.css";

export default function App() {
  function initCards() {
    let ret = "🍕,🍔,🥙,🍜,🍛,🍙,🍤,🍦".split(",");
    ret = [...ret, ...ret];

    for (let i = 0; i < 1000; i++) {
      let n1 = Math.floor(Math.random() * ret.length);
      let n2 = Math.floor(Math.random() * ret.length);
      let temp = ret[n1];
      ret[n1] = ret[n2];
      ret[n2] = temp;
    }
    return ret;
  }

  let cardStyle = {
    width: 70,
    height: 100,
    margin: 5
  };

  let cardStyleRV = {
    ...cardStyle,
    background: "pink"
  };

  let [cards, setCards] = useState(initCards());
  let [revealed, setRV] = useState(cards.map(() => false));
  let [c1, setC1] = useState(-1);
  let [c2, setC2] = useState(-1);
  let [pts, setPts] = useState(30);

  async function toggleReveal(i) {
    if (c1 === -1) setC1(i);
    else if (c2 === -1) {
      setC2(i);

      await PromiseTool.setTimeout(1000);

      if (cards[c1] === cards[i]) {
        let copy = [...revealed];
        copy[c1] = true;
        copy[i] = true;
        setRV(copy);
      } else {
        setPts(pts - 1);
      }
      setC1(-1);
      setC2(-1);
    }
  }

  return (
    <div className="App">
      <h1>Attempts: {pts}</h1>
      {cards.map((v, i) => (
        <button
          onClick={() => toggleReveal(i)}
          style={revealed[i] ? cardStyleRV : cardStyle}
        >
          {revealed[i] || c1 === i || c2 === i ? v : "-"}
        </button>
      ))}
    </div>
  );
}
