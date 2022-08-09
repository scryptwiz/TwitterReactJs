import { SearchIcon } from '@heroicons/react/outline';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Widget = () => {
  return (
    <div className="col-span-2 hidden lg:inline mt-3 px-2">
        {/* Search */}
        <div className="flex items-center bg-gray-300 dark:bg-gray-200 dark:bg-opacity-10 rounded-full px-3 py-1.5 my-2">
            <SearchIcon className="w-4 h-4 text-gray-400"/>
            <input type="text" placeholder="Search Twitter" className="w-full ml-2 outline-none bg-transparent"/>
        </div>
        {/* timeline */}
        <TwitterTimelineEmbed sourceType="profile" screenName="twitter" options={{height: 600}} />
    </div>
  )
}

export default Widget