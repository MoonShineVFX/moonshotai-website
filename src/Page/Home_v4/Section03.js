import React,{useState,useEffect} from 'react'
import { MdLaunch } from "react-icons/md";

function Section03() {
  const mediumRssFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ai_72180"
  const MAX_ARTICLES = 3;
  const [articles, setArticles] = useState();
    // 讀取 medium 文章
    useEffect(() => {
      const loadArticles = async () => {
        fetch(mediumRssFeed, { headers: { Accept: "application/json" } })
          .then((res) => res.json())
          .then((data) => data.items.filter((item) => item.title.length > 0))
          .then((newArticles) => newArticles.slice(0, MAX_ARTICLES))
          .then((articles) => setArticles(articles))
          .catch((error) => console.log(error));
      };
      loadArticles();
      }, [MAX_ARTICLES]);
  return (
    <div className='text-white py-10' >
      <div className='mx-12 flex flex-col items-center'>
        <div className='text-3xl font-bold text-center relative w-full md:w-1/3'>
            <img src='https://moonshine.b-cdn.net/msweb/moonshotai/home_images/section03_title.png' alt="" className='' />

        </div>


      </div>
      <div className="jsonContent grid grid-cols-1 md:grid-cols-2 md:gap-10  mt-10 mx-5 md:mx-0">
          {
            articles ? 
            articles.map((item,index)=>{
              console.log(item)
              const{guid,thumbnail,title,link,description,pubDate} = item
              return(
                <div className={`w-full md:w-full hover:brightness-110 flex items-center py-3 ${index === 0 ? ' row-span-2 flex-col ' : 'row-span-1 ' }`} key={guid}>
                  <div 
                    className={` aspect-[16/9] bg-black bg-center bg-cover bg-no-repeat cursor-pointer rounded-md ${index === 0 ? 'w-full' : 'w-1/2'}`}
                    style={{backgroundImage:`url(${thumbnail})`}}
                    onClick={()=> window.open(link, "_blank")}
                  >

                  </div>
                  <div className={`blogCard-body    ${index === 0 ? 'w-full mt-2'  : ' px-3 w-6/12' }`}>
                    <div className="text-xs my-1 text-white/50 ">{pubDate.substr(0,10)}</div>

                    <div className="text-base font-bold my-3 w-full text-white/90 flex justify-between items-end ">
                      <a href={link} target="_blank" rel="noreferrer"  className='flex items-center gap-2 hover:text-white/80'> {title}</a>
                      {
                        index === 0 && <a href={link} target="_blank" rel="noreferrer"  className='w-1/3 text-xs text-right hover:text-white/80'>Read more </a>
                      }
                      
                    </div>

                    

                    <div className="text-sm my-1 text-white/50 hidden">{description.replace(/(<([^>]+)>)/ig,"").substr(0,15)}...</div>
                    
                  </div>

                </div>

              )
            }):<div>目前還沒有文章</div>
          }
        </div>
        <a 
          className='h-12 bg-white w-full text-black font-bold flex justify-center items-center '
          href="https://medium.com/@ai_72180"
          target={"_blank"} rel="noreferrer"
        >
          <MdLaunch /> <span className='pl-2'>Explore More AI Pockets ++ </span>  
        </a>

    </div>
  )
}

export default Section03