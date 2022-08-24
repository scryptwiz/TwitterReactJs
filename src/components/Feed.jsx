import {RefreshIcon} from "@heroicons/react/outline"
import Tweet from "./Tweet"
import TweetBox from "./TweetBox"

const Feed = () => {
  return (
    <div className="col-span-7 lg:col-span-5 max-h-screen overflow-y-auto border-r border-gray-200">
        <div className="flex justify-between items-center py-3 px-4 sticky top-0 bg-white">
            <p className="font-medium text-xl">Home</p>
            <RefreshIcon className="text-twitter w-7 h-7 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 cursor-pointer"/>
        </div>
        <div className="pb-5 mt-5">
          <TweetBox/>
        </div>
        <Tweet/>
    </div>
  )
}

export default Feed