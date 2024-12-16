import React, { useState, useEffect } from "react";

const Carousel = (props) => {
  const data = props.data;
  console.log(data);

  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    },6000); 

   
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="w-[1230px]  mx-auto py-[26.87px] px-[100px]    overflow-hidden relative">
      <div
        className="flex transition-transform duration-1000 ease-in-out   flex-row gap-[180px] ml-10"
        style={{ transform: `translateX(-${activeIndex * 30}%)` }}
      >
        {
          data.length > 0 && data.map(function (value, index) {
            return (
              <div key={index} className="w-[115px] px-3 flex items-center flex-col">
                <img className="w-20 h-20" src={value.image} alt="" />
                <div className="flex flex-row gap-[13px]">
                  <span className="text-base font-normal font-[Roboto] text-white">{value.symbol}</span>
                  <span
                          className={`font-normal text-sm font-[Roboto] ${
                            value.price_change_percentage_24h > 0
                              ? "text-[#0ECB81]"
                              : "text-[#FF0000]"
                          }`}
                        >
                          {value.price_change_24h.toPrecision(3)}%
                        </span>
                </div>
                <h1 className="text-white w-[155px] font-[Roboto] font-medium">$ {value.current_price.toLocaleString('en-US')}</h1>
              </div>
            )
          })
        }
      </div>
     
    </div>
  );
};

export default Carousel;
