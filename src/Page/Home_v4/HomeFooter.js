import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
function HomeFooter() {
  const about = [
    { title: "FAQ", link: "/docs/faq" },
    { title: "Price", link: "/price" },
    { title: "Getting Started", link: "/docs" },
  ];

  const soical = [
    { title: "Instagram", link: "https://www.instagram.com/moonshot_ai/" },
    { title: "Twitter", link: "https://twitter.com/MoonshotAI_/" },
    {
      title: "Facebook",
      link: "https://www.facebook.com/groups/547117463595869/",
    },
    {
      title: "Youtube",
      link: "https://www.youtube.com/channel/UCT0noXFjgZ30lLCwZjJYdgQ",
    },
  ];

  const join = [
    {
      title: "Join line community",
      link: "https://line.me/ti/g2/0nEqJgPJlUZitp5pYpwLeoPKmswnBuzpRGoBnw?utm_source=invitation&utm_medium=link_copy&utm_campaign=default",
    },
  ];

  return (
    <div className="text-white/60 ">
      <div className="flex flex-col text-sm  ">
        <div className=" grid md:grid-cols-4 py-10 space-y-4 md:space-y-0 md:w-11/12 mx-auto">
          <div className="md:flex items-center hidden ">
            <div className="w-1/3 mx-auto">
              <picture>
                <source
                  src="https://r2.web.moonshine.tw/msweb/moonshotai/home_images/logo-2.png?format=webp&width=110"
                  alt="logo"
                  className="max-w-full"
                />
                <img
                  src="https://r2.web.moonshine.tw/msweb/moonshotai/home_images/logo-2.png?width=110"
                  alt="logo"
                  className="max-w-full"
                />
              </picture>
            </div>
          </div>
          <div className="text-base text-center md:text-left">
            <h1 className="text-white font-bold">About</h1>
            <div className="flex flex-col space-y-4 mt-4">
              {about.map((item, index) => {
                return (
                  <a
                    key={"about" + index}
                    href={item.link}
                    className="hover:text-white font-semibold"
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="text-base text-center md:text-left">
            <h1 className="text-white font-bold">Stay tuned!</h1>
            <div className="flex flex-col space-y-4 mt-4">
              {soical.map((item, index) => {
                return (
                  <a
                    key={"soical" + index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-semibold"
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="text-base text-center md:text-left">
            <h1 className="text-white font-bold">Join line community</h1>
            <div className="flex flex-col space-y-4 mt-4">
              {join.map((item, index) => {
                return (
                  <a
                    key={"join" + index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-semibold"
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0  md:space-x-7 justify-center text-sm md:text-xs py-3 md:border-t border-white/30 pb-10  mb:pb-0 ">
          <div className="flex items-center ">
            {" "}
            <div className="hidden md:block">©</div>
            <a href="/" className=" w-20 lg:w-20">
              <img
                src={process.env.PUBLIC_URL + "/images/ver2_images/mslogo.svg"}
                alt="logo"
                className="ml-2 w-full p-0 mt-0 hidden md:block"
              />
              <img
                src="https://r2.web.moonshine.tw/msweb/moonshotai/home_images/logo-2.png"
                alt="logo"
                className="max-w-full block md:hidden"
              />
            </a>
          </div>
          <a href="/docs/terms" className="font-semibold whitespace-nowrap">
            Terms of Use
          </a>
          <a href="/docs/policy" className="font-semibold whitespace-nowrap">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeFooter;
