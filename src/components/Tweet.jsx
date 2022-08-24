import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const Tweet = () => {
    const tweets = useSelector(state=>state.tweets)
    const [commentBox, setCommentBox] = useState(false)
    const comment=(tweet)=> {
        setCommentBox(true)
        console.log(tweet)
    }
  return (
    <div>
        {tweets.map(tweet=>{
            return(
              <div key={tweet.id} className="flex flex-col gap-3 border-t p-5 border-gray-300">
                <div className="flex gap-3">
                    <img className="h-10 w-10 rounded-full object-cover" src={tweet.data.profileImg} alt="Profile" />
                    <div>
                        <div className="flex gap-1 items-center">
                            <p className="mr-1 font-bold">{tweet.data.username}</p>
                            <p className="hidden text-sm lg:inline text-gray-500">@{tweet.data.username.replace(/\$+/g, '').toLocaleLowerCase()}</p>
                        </div>
                        <p className="p-1">{tweet.data.tweet}</p>
                        {tweet.data.image && <img src={tweet.data.image} className='m-5 ml-0 mb-0 max-h-60 rounded-lg object-cover shadow-sm' alt="Tweet"/>}
                    </div>
                </div>
                <div className="relative">
                    <div className="mt-5 flex justify-between px-10">
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                            <ChatAlt2Icon className="tweetBoxIcons" onClick={()=>comment(tweet)}/>
                        </div>
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                            <SwitchHorizontalIcon className="tweetBoxIcons"/>
                        </div>
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                              <HeartIcon className="tweetBoxIcons"/>
                        </div>
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                            <UploadIcon className="tweetBoxIcons"/>
                        </div>
                    </div>
                  </div>
              </div>
            )
          })}
    </div>
  )
}

export default Tweet