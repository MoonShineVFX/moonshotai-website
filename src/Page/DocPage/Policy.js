import React,{ useState,useEffect } from 'react'
import { motion,AnimatePresence } from 'framer-motion';
import { getAnalytics, logEvent } from "firebase/analytics";
function Policy() {
  const analytics = getAnalytics();
  useEffect(()=>{
    logEvent(analytics, 'Doc_隱私權政策頁_進入')
  },[])
  const [language, setLanguage] = useState('zh');
  const privacyPolicyZh = (
    <motion.div 
      key={'1'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className=''>
        
      <div className='my-4'>
        <div className='text-white/90 text-sm space-y-2'>
          <p>非常歡迎您光臨「Moonshot 網站」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>

        </div>
      </div>
      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>一、隱私權保護政策的適用範圍</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。</p>

        </div>
      </div>


      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>二、個人資料的蒐集、處理及利用方式</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>• 當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。</p>
          <p>• 本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。</p>
          <p>• 於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的 IP 位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。</p>
          <p>• 為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。</p>
          <p>• 您可以隨時向我們提出請求，包括查詢或請求閱覽、請求製給複製本、請求補充或更正、請求停止蒐集、處理或利用、請求刪除，以更正或刪除本網站所蒐集您錯誤或不完整的個人資料，但請注意若拒絕提供必要資料，可能導致無法使用全部或部分之服務。</p>

        </div>          
      </div>

      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>三、資料之保護</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>• 本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。</p>
          <p>• 如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。</p>


        </div>          
      </div>

      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>四、網站對外的相關連結</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。</p>


        </div>          
      </div>

      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>五、與第三人共用個人資料之政策</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。</p>
          <p>前項但書之情形包括但不限於：</p>
          <p>• 經由您書面同意。</p>
          <p>• 法律明文規定。</p>
          <p>• 為增進公共利益所必要。</p>
          <p>• 為免除您生命、身體、自由或財產上之危險。</p>
          <p>• 為防止他人權益之重大危害。</p>
          <p>• 與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。</p>
          <p>• 當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</p>
          <p>• 有利於您的權益。</p>
          <p>• 本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。</p>



        </div>          
      </div>

      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>六、Cookie 之使用</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行 。</p>

        </div>          
      </div>

      <div className='my-4'>
        <div className='text-xl font-bold  mb-4'>七、隱私權保護政策之修正</div>
        <div className='text-white/90 text-sm space-y-2'>
          <p>本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。</p>


        </div>          
      </div>
    </motion.div>
  );

  const privacyPolicyEn = (
    <motion.div 
      key={'2'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='text-white/90 text-sm space-y-2'>
        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Who We Are</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>At [moonshot.today], we are committed to maintaining the trust and confidence of all visitors to our web site. In particular, we want you to know that [moonshot.today] is not in the business of selling, renting or trading email lists with other companies and businesses for marketing purposes. </p>
            <p>In this Privacy Policy, we’ve provided detailed information on when and why we collect personal information, how we use it, the limited conditions under which we may disclose it to others, and how we keep it secure. </p>
            <p>We take your privacy seriously and take measures to provide all visitors and users of [moonshot.today] with a safe and secure environment.</p>


          </div>          
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Cookies</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>[moonshot.today] may set and access [moonshot.today] cookies on your computer.  Cookies are used to provide our system with the basic information to provide the services you are requesting.  Cookies can be cleared at any time from your internet browser settings. </p>            

          </div>          
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Google Analytics</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>When someone visits [moonshot.today] we use a third party service, Google Analytics, to collect standard internet log information and details of visitor behaviour patterns. We do this to track things such as the number of visitors to the various parts of the site and interactions with the site. This information is processed in a way which does not identify anyone. We do not make, and do not allow Google to make, any attempt to find out the identities of visitors to our website.</p>
          </div>          
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Website Comments</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>When someone visits [moonshot.today], there may be an ability to submit comments on particular articles or pages.  When comments are submitted, you are entitled to use aliases or information that completely hides your identity. When a comment is submitted, the relevant details (name, email, website) that you provide are stored.  These details are stored so that we can display your comment back to you, and to anyone viewing the comment sections on the site. We do not verify information entered nor do we require verification.</p>
          </div>          
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Third Parties</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>There may be some circumstances where your IP address, geographic location, and other browser related details may be shared with third party companies.  We may share your above mentioned data with following third party companies from time to time.</p>
          </div>          
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Access to Your Personal Information</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>You are entitled to view, amend, or delete the personal information that we hold. Email your request to our data protection officer [YOUR FIRST NAME] at [EMAIL ADDRESS] and we will work with you to remove any of your personal data we may have.</p>
          </div>          
        </div>

        <div className='my-4'>
          <div className='text-xl font-bold  mb-4'>Changes to Our Privacy Policy</div>
          <div className='text-white/90 text-sm space-y-2'>
            <p>We may make changes to our Privacy Policy in the future, however, the most current version of the policy will govern our processing of your personal data and will always be available to you.
            If we make a change to this policy that, in our sole discretion, is material, we will notify you by an update or email, where possible. By continuing to access or use our services, you agree to be bound to the terms of our Privacy Policy.
            </p>
          </div>          
        </div>
    </motion.div>
  );
  return (
    <div className='text-white'>
      <div className='px-8'>
        <div className='text-lime-500 font-bold'>Private Policy </div>
        <div className='text-2xl font-bold  mb-4'>隱私權政策 </div>
      </div>
      <div className='text-white pt-12 px-8'>
        <div className='flex gap-3 text-sm'>
          <div className={'border border-white/50 px-3 py-1 rounded-md cursor-pointer ' + (language === 'zh' ? '  text-white ':'text-white/50' )} onClick={()=>setLanguage('zh')}>中</div> 
          <div className={'border border-white/50 px-3 py-1 rounded-md cursor-pointer ' + (language === 'en' ? '  text-white ':'text-white/50' )} onClick={()=>setLanguage('en')}>ENG</div>
        </div>
        {language === 'zh' ? privacyPolicyZh : privacyPolicyEn}

      

      </div>
    </div>
  )
}

export default Policy