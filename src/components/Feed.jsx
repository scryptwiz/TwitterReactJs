import { ChatAlt2Icon, HeartIcon, RefreshIcon, SwitchHorizontalIcon, UploadIcon } from "@heroicons/react/outline"
import { collection, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { db } from "../lib/firebase"
import TweetBox from "./TweetBox"

const Feed = () => {
  const dispatch = useDispatch()
  const tweets = useSelector(state=>state.tweets)
  useEffect(() => {
    const tweetRef = collection(db, 'tweets')
    getDocs(tweetRef).then(response=>{
      const tweet = response.docs.map(doc=>({
        data: doc.data(),
        id: doc.id,
      }))
      dispatch({type:"SET_TWEETS", payload:tweet})
    }).catch(error=>console.log(error.message))
  }, [dispatch])
  return (
    <div className="col-span-7 lg:col-span-5 max-h-screen overflow-y-auto border-r border-gray-200">
        <div className="flex justify-between items-center py-3 px-4 sticky top-0 bg-white">
            <p className="font-medium text-xl">Home</p>
            <RefreshIcon className="text-twitter w-7 h-7 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 cursor-pointer"/>
        </div>
        <div className="pb-5 mt-5">
          <TweetBox/>
        </div>
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
                            <ChatAlt2Icon className="h-5 w-5"/>
                        </div>
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                            <SwitchHorizontalIcon className="h-5 w-5"/>
                        </div>
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                              <HeartIcon className="h-5 w-5"/>
                        </div>
                        <div className='flex cursor-pointer items-center text-gray-400 space-x-3'>
                            <UploadIcon className="h-5 w-5"/>
                        </div>
                    </div>
                  </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Feed