import React,{useState,useEffect} from 'react'
import { MdArticle } from "react-icons/md";
function Blog() {
  const mediumRssFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ai_72180"
  const MAX_ARTICLES = 10;
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
    <div className='text-white my-28 w-9/12 mx-auto'>
      <div className='text-4xl text-center font-bold mb-20'>最新消息 <span className='font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500'>News</span></div>
      <div className="jsonContent flex gap-10 flex-col md:flex-row">
        {
          articles ? 
          articles.map((item,index)=>{
            console.log(item)
            const{guid,thumbnail,title,link,description,pubDate} = item
            return(
              <div className="w-full md:w-1/3 hover:brightness-110" key={guid}>
                <div 
                  className="w-full aspect-video bg-black bg-center bg-cover bg-no-repeat cursor-pointer"
                  style={{backgroundImage:`url(${thumbnail})`}}
                  onClick={()=> window.open(link, "_blank")}
                >

                </div>
                <div className="blogCard-body">
                  <div className="text-xl font-bold my-3 text-white/90">
                    <a href={link} target="_blank" rel="noreferrer"  className='flex items-center gap-2 hover:text-white/80'> <MdArticle />{title}</a>
                  </div>
                  <div className="text-sm my-1 text-white/50">{description.replace(/(<([^>]+)>)/ig,"").substr(0,120)}...</div>
                  <div className="text-xs my-1 text-white/30">{pubDate.substr(0,10)}</div>
                </div>
              </div>

            )
          }):<div>目前還沒有文章</div>
        }
      </div>
      
    </div>
  )
}

export default Blog
