import React,{useState,useEffect} from 'react'
import { MdArticle } from "react-icons/md";

function Section03() {
  const mediumRssFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ai_72180"
  const MAX_ARTICLES = 6;
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
        <div className='text-3xl font-bold text-center relative'>
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section03_title.png'} alt="" />
          <div 
            className=' absolute -top-3 -left-5'
            style={{animation: 'float_t01 6s ease-in-out infinite'}}  
          >
            <img src={process.env.PUBLIC_URL+'/images/ver3_images/section01_c01.png'} alt="" />
          </div>
        </div>


      </div>
      <div className="jsonContent flex items-center gap-10 flex-col md:flex-row mt-10 divide-y divide-white/50 border-t border-b border-white/50">
          {
            articles ? 
            articles.map((item,index)=>{
              console.log(item)
              const{guid,thumbnail,title,link,description,pubDate} = item
              return(
                <div className="w-full md:w-1/3 hover:brightness-110 flex items-center " key={guid}>

                  <div className="blogCard-body w-2/3 px-3">
                    <div className="text-md font-bold my-3 text-white/90">
                      <a href={link} target="_blank" rel="noreferrer"  className='flex items-center gap-2 hover:text-white/80'> {title}</a>
                    </div>
                    <div className="text-sm my-1 text-white/50">{description.replace(/(<([^>]+)>)/ig,"").substr(0,15)}...</div>
                    <div className="text-xs my-1 text-white/30">{pubDate.substr(0,10)}</div>
                  </div>
                  <div 
                    className="w-1/3 aspect-[16/11] bg-black bg-center bg-cover bg-no-repeat cursor-pointer"
                    style={{backgroundImage:`url(${thumbnail})`}}
                    onClick={()=> window.open(link, "_blank")}
                  >

                  </div>
                </div>

              )
            }):<div>目前還沒有文章</div>
          }
        </div>
        <div className='h-12 bg-white w-full text-black font-bold flex justify-center items-center '>
          Explore More AI Pockets ++
        </div>

    </div>
  )
}

export default Section03