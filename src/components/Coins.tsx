import { FormEvent, useEffect, useState } from "react";
import Requester from "../common/utils/Requester";
import style from "./Coins.module.scss";
import { ICoin } from "../interfaces/ICoin";
import axios from "axios";

function Coins() {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [coinRate, setCoinRate] = useState({ id: "", rate: 0 });
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    async function getData() {
      const response = await Requester.getCoins();

      if (response !== undefined) {
        setCoins(response);
      }
    }
    getData();
  }, [coinRate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.put(`http://127.0.0.1:5000/coins/${coinRate.id}/${coinRate.rate}/update`)
    setSelected(true)
    setCoinRate({id: "", rate:0})
  }

  async function orderByScore() {
    const response = await Requester.getCoinsOrderedByScore();

    if (response !== undefined) {
      setCoins(response);
    }
  }

  return (
    <section>
      <button onClick={orderByScore}>Order By Score</button>
        <ul className={style.coinListContainer}>
          {coins.map((coin) => (
            <li key={coin.id} className={style.coinLi}>
              <div>
                <img src={coin.icon} width={40} />
                <span>{coin.name}</span>
                <span> {coin.symbol}</span>
              </div>

              <p>{Number(coin.price).toFixed(2)} USD</p>

              <p>
                {
                  coin.number_of_reviews === 0
                  ? 0 
                  : (coin.total_score / coin.number_of_reviews).toFixed(1)
                }
              </p>

                <form className={style.formContainer} method="POST" onSubmit={(e) => handleSubmit(e)}>
                  <label htmlFor="rate">Choose a rate:</label>
                  <select
                    className="form-select form-select-sm"
                    id="rate"
                    onChange={(e) => {
                      setCoinRate({ id: coin.id, rate: Number(e.target.value) })
                      setSelected(false)
                    }
                    }
                  >
                    <option value="" selected={selected}>Select a rate</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <button className="btn btn-primary" type="submit">
                    Vote
                  </button>
                </form>
            </li>

          ))}
        </ul>
    </section>
  );
}

export default Coins;
