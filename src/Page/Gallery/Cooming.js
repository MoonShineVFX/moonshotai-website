import React from "react";

function Cooming() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative px-4">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://r2.web.moonshine.tw/msweb/moonshotai/static/134b237/463462832906698889_0.jpg')`,
        }}
      ></div>
      <h1 className="text-5xl md:text-7xl text-white/80 font-bold mb-8 z-10">
        準備中
      </h1>
      <p className="text-white text-xl md:text-2xl">
        7/20 即將見面，敬請期待！
      </p>
    </div>
  );
}

export default Cooming;
