import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Remove } from "../store/watchList";
import ApexChart from "../components/ApexChart";

function Details() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [listdata, setListdata] = useState([]);
  const [days, setDays] = useState(1)
  const listideas = useSelector((state) => state.List.ideas);
  const dispatch = useDispatch();
  const params = useParams();
  let id = params.id;

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        setData([data]);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (listideas.length > 0) {
      const fetchData = () => {
        Promise.all(
          listideas.map((id) =>
            fetch(`https://api.coingecko.com/api/v3/coins/${id}`).then((res) =>
              res.json()
            )
          )
        )
          .then(setListdata)
          .catch((error) => console.error("Error:", error));
      };
      fetchData();
    }
  }, [id]);

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem("isMenuOpen", JSON.stringify(newIsOpen));
  };


  function handleDays(e) {
    e.preventDefault()
    setDays(30)
  }
  function handleMonths(e) {
    e.preventDefault()
    setDays(90)
  }
  function handleYear(e) {
    e.preventDefault()
    setDays(360)
  }
  function handleHours(e) {
    e.preventDefault()
    setDays(1)
  }


  function handleDelet(id) {
    dispatch(Remove(id));
    setListdata((prevData) => prevData.filter((item) => item.id !== id));
  }
  return (
    <div>
      <main className="bg-[#16171A] h-full">
        <div className="bg-[#16171A] mb-[25px]">
          <div className="continerr flex justify-between py-3">
            <h1 className="font-[Montserrat] text-[#87CEEB] font-bold text-xl">
              CRYPTOFOLIO
            </h1>
            <div className="flex flex-row gap-4">
              <select
                className="cursor-pointer bg-transparent text-white px-3"
                name=""
                id=""
              
              >
                <option className="bg-[#16171A]" value="USD">
                  USD
                </option>
                <option className="bg-[#16171A]" value="EUR">
                  EUR
                </option>
                <option className="bg-[#16171A]" value="RUB">
                  RUB
                </option>
              </select>
              <button
                onClick={toggleMenu}
                className="bg-[#87CEEB] rounded-sm py-2 px-[18px] text-sm font-medium"
              >
                WATCHLIST
              </button>
            </div>
          </div>
          <div className="h-1 w-full bg-gray-950"></div>
        </div>

        <div className="max-w-[1920px] mx-auto">
          {data.length > 0 &&
            data.map(function (value, index) {
              return (
                <div
                  key={index}
                  className="w-[1920px] h-full flex flex-row justify-between"
                >
                  <div className="w-[547px] flex flex-col px-[25px] gap-5 border-r pr-[25px]">
                    <img
                      className="w-[200px] ml-40 h-[200px] text-center items-center"
                      src={value.image.large}
                      alt=""
                    />
                    <h1 className="text-white text-center  text-5xl font-bold font-[Montserrat]">
                      {value.name}
                    </h1>
                    <p className="text-white w-[530px] font-[Montserrat]">
                      {value.description.en.slice(0, 185)}
                    </p>
                    <span className="text-white  text-2xl font-[Montserrat] font-bold ">
                      Rank: {value.market_cap_rank.toLocaleString('en-US')}
                    </span>
                    <span className="text-white text-2xl font-[Montserrat] font-bold ">
                      Current Price: $ {value.market_data.current_price.usd.toLocaleString('en-US')}
                    </span>
                    <span className="text-white text-2xl font-[Montserrat] font-bold ">
                      Market Cap: {value.market_data.market_cap.usd.toLocaleString('en-US')}
                    </span>
                  </div>

                  <div className=" p-[40px]">
                    <ApexChart id={id} days={days}> </ApexChart>
                    <div className="flex flex-row gap-[38.79px] mt-5 ">
                      <button onClick={handleHours} className="border border-solid border-[#87CEEB] rounded-sm bg-[#16171A] py-[11px] pl-[21px] text-base text-white font-[Montserrat] font-bold pr-[188px] hover:bg-[#87CEEB] hover:text-black">
                        24 Hours
                      </button>
                      <button onClick={handleDays} className="border border-solid border-[#87CEEB] rounded-sm bg-[#16171A] py-[11px] pl-[21px] text-base text-white font-[Montserrat] pr-[199px] font-bold hover:bg-[#87CEEB] hover:text-black ">
                        30 Days
                      </button>
                      <button onClick={handleMonths} className="border border-solid border-[#87CEEB] rounded-sm bg-[#16171A] py-[11px] pl-[21px] text-base text-white font-[Montserrat] font-bold pr-[188px] hover:bg-[#87CEEB] hover:text-black">
                        3 Months
                      </button>
                      <button onClick={handleYear} className="border border-solid border-[#87CEEB] rounded-sm bg-[#16171A] py-[11px] pl-[21px] text-base text-white font-[Montserrat] font-bold pr-[218px] hover:bg-[#87CEEB] hover:text-black">
                        1 Year
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div
          className={`fixed top-0 right-0 w-[511px] h-full bg-[#515151] text-white transform transition-all duration-300 overflow-y-auto ${
            isOpen ? "translate-x-full" : "-translate-x-0"
          } `}
        >
          <div>
            <h1 className="text-white text-[30px] font-[Roboto] font-medium text-center my-8">
              WATCHLIST
            </h1>
            <div className="flex flex-wrap mx-9 gap-10 ">
              {listdata.length > 0 &&
                listdata.map(function (value, index) {
                  return (
                    <div
                      key={index}
                      className="w-[190px] bg-black rounded-3xl  p-4 items-center text-center flex flex-col"
                    >
                      <img
                        className="w-[118px] h-[118px] mt-2 mb-[30px]"
                        src={value.image.large}
                        alt=""
                      />
                      <span className="mb-4 font-[Roboto] font-normal text-xl">
                        ${value.market_data.market_cap.usd}
                      </span>

                      <button
                        onClick={() => handleDelet(value.id)}
                        className="py-1 mb-4 px-4 bg-[#FF0000] text-white font-normal text-xl rounded-sm"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
            </div>
            <button
              className="mt-4 py-2 px-10 bg-slate-500 ml-10 rounded-sm"
              onClick={toggleMenu}
            >
              Close
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;
