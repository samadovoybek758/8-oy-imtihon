import React, { useEffect, useRef, useState } from "react";
import white_eyes from "../assets/Eye.svg";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Corusel";
import { Add, Remove } from "../store/watchList";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import right from "../assets/right.svg";
import left from "../assets/left.svg";

function Home() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [listdata, setListdata] = useState([]);
  const listideas = useSelector((state) => state.List.ideas);
  const dispatch = useDispatch();
  const selectRef = useRef();
  const inputRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    Pagin(currentPage + 1);

    const storedIsOpen = localStorage.getItem("isMenuOpen");
    if (storedIsOpen !== null) {
      setIsOpen(JSON.parse(storedIsOpen));
    }

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
          .catch((error) => {
            console.error(error);
          });
      };
      fetchData();
    }
  }, [listideas, currentPage]);

  function Pagin(page) {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=${itemsPerPage}&page=${page}&sparkline=false&price_change_percentage=24h`
    )
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
        setTotalPages(Math.ceil(100 / itemsPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handlePageClick(event) {
    setCurrentPage(event.selected);
  }

  const navigate = useNavigate();
  function handleClick(id) {
    // console.log(id);
    navigate(`/details/${id}`);
    dispatch(Add(id));
  }

  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem("isMenuOpen", JSON.stringify(newIsOpen));
  };

  function handleDelet(id) {
    dispatch(Remove(id));
    setListdata((prevData) => prevData.filter((item) => item.id !== id));
  }

  function Selected() {
    setData([]);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectRef.current.value}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInput(e) {
    e.preventDefault();

    if (inputRef.current.value) {
      fetch(`https://api.coingecko.com/api/v3/coins/${inputRef.current.value}`)
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((data) => {
          // setData([data]);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    inputRef.current.value = "";

  }

  function isWatch(listideas) {
    return data.forEach(function (value) {
      return listideas.includes(value.id);
    });
  }

  return (
    <div>
      <header>
        <div className="bg-[#16171A]">
          <div className="continerr flex justify-between py-3">
            <h1 className="font-[Montserrat] text-[#87CEEB] font-bold text-xl">
              CRYPTOFOLIO
            </h1>
            <div className="flex flex-row gap-4">
              <select
                className="cursor-pointer bg-transparent text-white px-3"
                name=""
                id=""
                onChange={Selected}
                ref={selectRef}
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
        </div>
        <div className="header">
          <div className="continerr text-center pb-[9px]">
            <h1 className="font-[Montserrat] text-[#87CEEB] mb-3 font-bold text-[60px]">
              CRYPTOFOLIO WATCH LIST
            </h1>
            <p className="text-[#A9A9A9] font-[Montserrat] text-sm">
              Get all the Info regarding your favorite Crypto Currency
            </p>
            <div className="mt-10">
              <Carousel data={data}></Carousel>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-[#16171A]">
        <div className="continerr text-center pt-[18px]">
          <h1 className="text-[34px] text-white font-normal font-[Montserrat]">
            Cryptocurrency Prices by Market Cap
          </h1>
          <form onSubmit={handleInput}>
            <input
              className="w-full text-gray-500 mt-3 pt-[25px] pb-5 pl-[14px] bg-transparent border border-solid border-gray-500 rounded-sm"
              type="text"
              placeholder="Search For a Crypto Currency.."
              ref={inputRef}
            />
          </form>
          <div className="w-full bg-[#87CEEB] py-[19px] rounded-t-[4px] flex justify-between px-4 mt-5">
            <span className="font-bold text-sm text-black font-[Montserrat]">
              Coin
            </span>
            <div className="flex flex-row justify-between w-[760px]">
              <span className="font-bold text-sm text-black font-[Montserrat]">
                Price
              </span>
              <span className="font-bold text-sm text-black font-[Montserrat]">
                24h Change
              </span>
              <span className="font-bold text-sm text-black font-[Montserrat]">
                Market Cap
              </span>
            </div>
          </div>

          <div className="pb-5">
            {data.length > 0 &&
              data.map(function (value, index) {
                return (
                  <div
                    key={index}
                    className="pt-4 pb-[27px] px-4 border-b cursor-pointer flex justify-between items-center"
                    onClick={() => handleClick(value.id)}
                  >
                    <div className="flex gap-[15px] ">
                      <img
                        className="w-[50px] h-[50px]"
                        src={value.image}
                        alt=""
                      />
                      <div className="flex flex-col ">
                        <span className="text-[22px] font-[Roboto] font-normal text-white uppercase">
                          {value.symbol}
                        </span>
                        <span className="text-sm font-[Roboto] font-normal text-[#A9A9A9] ">
                          {value.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between w-[760px]">
                      <span className="font-[Roboto] text-white text-sm">
                        {selectRef.current.value === "EUR"
                          ? "€ "
                          : selectRef.current.value === "RUB"
                          ? "₽ "
                          : "$ "}
                        {value.current_price.toLocaleString("en-US")}
                      </span>
                      <div className="flex items-center gap-[18.86px]">
                        {isWatch ? (
                          <img src={white_eyes} alt="White Iye" />
                        ) : (
                          <img src={right} alt="" />
                        )}
                        
                        <span
                          className={`font-normal text-sm font-[Roboto] ${
                            value.price_change_percentage_24h > 0
                              ? "text-[#0ECB81]"
                              : "text-[#FF0000]"
                          }`}
                        >
                          {value.price_change_percentage_24h.toPrecision(3)}%
                        </span>
                      </div>
                      <span className="font-[Roboto] text-white text-sm">
                        {selectRef.current.value === "EUR"
                          ? "€ "
                          : selectRef.current.value === "RUB"
                          ? "₽ "
                          : "$ "}
                        {value.market_cap.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
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
                        $
                        {value.market_data.market_cap.usd.toLocaleString(
                          "en-US"
                        )}
                      </span>

                      <button
                        onClick={() => handleDelet(value.id)}
                        className="py-1 mb-2 px-4 bg-[#FF0000] text-white font-normal text-xl rounded-sm"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            className="mt-4 py-2 px-10 bg-slate-500 ml-10 rounded-sm"
            onClick={toggleMenu}
          >
            Close
          </button>
        </div>

        <div className="max-w-[600px] mx-auto pb-5 items-center">
          <ReactPaginate
            previousLabel={<img src={left} />}
            nextLabel={<img src={right} />}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={"flex justify-center space-x-2 items-center "}
            pageClassName={
              "px-4 py-2 text-[#87CEEB] rounded-full cursor-pointer"
            }
            previousClassName={"px-4 py-2  rounded-md cursor-pointer"}
            nextClassName={"px-4 py-2  rounded-md cursor-pointer"}
            activeClassName={"bg-gray-700"}
            onPageChange={handlePageClick}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
