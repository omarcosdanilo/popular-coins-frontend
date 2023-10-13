import { FormEvent, useEffect, useState } from "react";
import Requester from "../common/utils/Requester";
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
    <section className="
    grid col-auto row-auto justify-center px-2 h-[auto] bg-[#141416] pt-3 max-w-[1536px] mx-auto
    "
    >

      <button
        className="bg-indigo-800 py-2 px-4 rounded-md max-w-[150px] justify-self-center text-[#efeff0]" 
        onClick={orderByScore}>
        Order By Score
      </button>

        <ul
          className="
          w-full	
          grid grid-cols-4 py-3 mt-2 text-[#efeff0]
          "
        >
          <li className=""
          >
            Token
          </li>
          <li
            className="
            sm:justify-self-center
          "
          >
            Price
          </li>
          <li 
            className="
            sm:justify-self-center
            "
          >
              Score
          </li>
          <li 
            className="
            sm:justify-self-center
          "
          >
            Vote
          </li>
        </ul>

        <ul>
          {coins.map((coin, index) => (
            <li
              className={`
              w-full
              grid grid-cols-4 items-stretch h-32
              ${index % 2 === 0 ? "bg-[#1a1b1d]" : "bg-[#141416]" }
              max-[1000px]: grid-rows-2
              `
            }
              key={coin.id}
            >
              <div
                className="
                grid grid-cols-3 grid-rows-3
                items-center
                row-span-2
                text-sm
                max-w-fit	
                "
              >
                <img 
                  className="
                  row-start-1 row-end-2 col-start-1 col-end-4
                  justify-self-start
                  "
                  src={coin.icon} width={37}/>
                <span 
                  className="
                  text-[#efeff0]
                  max-[780px]:text-sm	
                  row-start-3 row-end-4 col-start-1 col-end-4
                  justify-self-start
                  "
                >{coin.name}</span>
                <span 
                  className="
                  text-[#707277]
                  max-[780px]:text-sm
                  justify-self-start
                  row-start-2 row-end-3 col-start-1 col-end-4
                  " 
                > {coin.symbol}</span>
              </div>

              <p
                className="
                text-[#efeff0] 
                sm:justify-self-center
                max-[1000px]: row-span-2
                self-center
                "
              >
                  ${Number(coin.price).toFixed(2)}
              </p>

              <p 
                className="
                text-[#efeff0] 
                sm:justify-self-center
                max-[1000px]: row-span-2
                self-center
                "
                >
                {
                  coin.number_of_reviews === 0
                  ? 0 
                  : (coin.total_score / coin.number_of_reviews).toFixed(1)
                }
              </p>

                <form
                  className="
                  row-span-2
                  max-[1000px]:grid grid-rows-2
                  self-center
                  " 
                  method="POST" 
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <select
                    className="
                    form-select rounded-md
                    max-[1000px]: w-full mx-0
                    "
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

                  <button
                    className="
                    bg-indigo-800 py-2 px-4 rounded-md text-[#efeff0]
                    max-[1000px]: w-full row-start--2 row-end--1

                    " 
                    type="submit"
                  >
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
