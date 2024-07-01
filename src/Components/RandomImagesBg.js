import React, { useState } from "react";
function RandomImagesBg({ data }) {
  const [randomData, setRandomData] = useState([]);
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  // 在組件加載時呼叫shuffle函式
  React.useEffect(() => {
    setRandomData(shuffle(data));
  }, [data]);
  if (!data) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex gap-4">
      {data.map((item, index) => {
        return (
          <div key={"r_img" + index} className=" aspect-square  ">
            <source
              src={
                "https://r2.web.moonshine.tw/msweb/moonshotai/square_images/" +
                item.image +
                "?format=webp&width=256"
              }
              type="image/webp"
              alt="imgs"
              className=" aspect-square overflow-hidden object-cover min-w-[220px]"
            />
            <img
              src={
                "https://r2.web.moonshine.tw/msweb/moonshotai/square_images/" +
                item.image +
                "?width=256"
              }
              alt="imgs"
              className=" aspect-square overflow-hidden object-cover min-w-[220px]"
            />
          </div>
        );
      })}
    </div>
  );
}

export default RandomImagesBg;
