const tags =[
  {title:"風景",en_title:"andscape",image_url:"https://images.moonshot.today/static/134b231/462536476056617428_0.jpg"},
  {title:"角色",en_title:"character",image_url:"https://images.moonshot.today/static/134b239/463744999524663365_0.jpg"},
  {title:"動漫",en_title:"cartoon",image_url:"https://image.moonshot.today/cca2ab29-c35a-4a72-b8b0-b0f74ce56711.webp"},
  {title:"科幻",en_title:"science fiction",image_url:"https://images.moonshot.today/static/134b2ad/470540856936890581_0.jpg"},
  {title:"機械",en_title:"mechanical",image_url:"https://images.moonshot.today/static/134b2f8/471424725554299044_1.jpg"},
  {title:"建築",en_title:"architecture",image_url:"https://images.moonshot.today/static/134b2ad/470553291907662227_0.jpg"},
  {title:"寫實",en_title:"realism",image_url:"https://images.moonshot.today/static/134b2a1/468790111279513761_2.jpg"},
  {title:"幻想",en_title:"fantasy",image_url:"https://images.moonshot.today/static/134b230/462432019314901171_0.jpg"},
  {title:"藝術",en_title:"art",image_url:"https://images.moonshot.today/static/134b2f8/471405380216291587_0.jpg"},
  {title:"動物",en_title:"animal",image_url:"https://images.moonshot.today/static/134b2f5/470885289254977653_2.jpg"},
  {title:"運輸",en_title:"transportation",image_url:"https://images.moonshot.today/static/134b248/465946319010922547_0.jpg"},
  {title:"靜物",en_title:"still life",image_url:"https://images.moonshot.today/static/134b2aa/470069905736860161_0.jpg"},
  {title:"像素",en_title:"pixel",image_url:"https://images.moonshot.today/static/134b2f8/471425822985552054_0.jpg"},
  {title:"渲染",en_title:"rendering",image_url:"https://images.moonshot.today/static/134b243/465142171813806113_0.jpg"},
  {title:"怪物",en_title:"monster",image_url:"https://image.moonshot.today/3f897187-3333-4a42-bd4b-cde22405453d.webp"},
  {title:"神話",en_title:"myth",image_url:"https://images.moonshot.today/static/134b295/467022694790201634_0.jpg"},
  {title:"油畫",en_title:"painting",image_url:"https://images.moonshot.today/static/134b2f8/471318220700123154_0.jpg"},
  {title:"水彩",en_title:"watercolor",image_url:"https://images.moonshot.today/static/134b2f8/471405380216291587_0.jpg"},
  {title:"古老",en_title:"ancient",image_url:"https://images.moonshot.today/static/134b17f/456886663055671431_1.jpg"},
  {title:"設計",en_title:"design",image_url:"https://images.moonshot.today/static/134b2ac/470321658248036402_2.jpg"},
  {title:"桌布",en_title:"tablecloth",image_url:"https://images.moonshot.today/static/134b2f6/471088997926961254_0.jpg"},
  {title:"廣告",en_title:"advertise",image_url:"https://image.moonshot.today/d55dea6c-f720-4dae-9212-ef474069688a.webp"},
  {title:"拼貼",en_title:"collage",image_url:"https://image.moonshot.today/89a82473-608e-41d1-8b92-e86078ff536c.webp"},
  {title:"城市",en_title:"city",image_url:"https://images.moonshot.today/static/134b2f5/470938177617002789_0.jpg"},
  {title:"時尚",en_title:"fashion",image_url:"https://images.moonshot.today/static/134b2ae/470667006485201153_0.jpg"},
  {title:"植物",en_title:"plant",image_url:"https://image.moonshot.today/0bfb1a54-f354-47fc-8a9a-c15c8c4492d0.webp"},
  {title:"文化",en_title:"culture",image_url:"https://images.moonshot.today/static/134b24b/466327227680948522_0.jpg"},
  {title:"抽象",en_title:"abstract",image_url:"https://images.moonshot.today/static/134b2f5/470954905340477556_0.jpg"},
]





//'16:9','3:2' ,'4:3' ,'5:4' ,'1:1' ,'4:5' ,'3:4' ,'2:3' ,'9:16'
const RATIOS = [
  { name: '16:9', value:'16/9',   percent:"56.25" },
  { name: '3:2',  value: '3/2',   percent:"66.67"  },
  { name: '4:3',  value: '4/3',   percent:"75"  },
  { name: '5:4',  value: '5/4',   percent:"80"  },
  { name: '1:1',  value: '1/1',   percent:"100"  },
  { name: '4:5',  value: '4/5',   percent:"125"  },
  { name: '3:4',  value: '3/4',   percent:"133.33"  },
  { name: '2:3',  value: '2/3',   percent:"150"  },
  { name: '9:16', value: '9/16',  percent:"177.78" },