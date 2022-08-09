import { RefreshIcon } from "@heroicons/react/outline"

const Feed = () => {
  return (
    <div className="col-span-7 lg:col-span-5 max-h-screen overflow-y-auto border-r border-gray-500">
        <div className="flex justify-between items-center py-3 px-4">
            <p>Home</p>
            <RefreshIcon className="text-twitter w-7 h-7 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 cursor-pointer"/>
        </div>
    </div>
  )
}

export default Feed