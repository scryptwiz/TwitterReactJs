import { CalendarIcon, EmojiHappyIcon, LinkIcon, LocationMarkerIcon, PhotographIcon, XCircleIcon } from "@heroicons/react/outline"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from "../lib/firebase";

const TweetBox = () => {
    const dispatch = useDispatch()
    const [tweet, setTweet] = useState('')
    const userCredentials = useSelector(state=>state.user);
    const [imageUrlBox, setImageUrlBox] = useState(false)
    const [image, setImage] = useState('')
    const imageInputRef = useRef(null)
    const filePickerRef = useRef(null);

    const addImageToTweet = (e) => {
        e.preventDefault();
        if (!imageInputRef.current?.value) return;
        setImage(imageInputRef.current.value)
        imageInputRef.current.value = '';
        setImageUrlBox(false)
    }
    const addImgToTweet = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
          setImage(readerEvent.target.result);
        };
    }
    const postTweet = async () => {
        const tweets = collection(db, 'tweets');
        addDoc(tweets, {tweet, image, profileImg:userCredentials.picture, username:userCredentials.name, comments:[], timestamp: serverTimestamp()}).then(response=>{
            const tweetRef = query(collection(db, 'tweets'),orderBy('timestamp','desc'))
            getDocs(tweetRef).then(response=>{
              const tweet = response.docs.map(doc=>({
                data: doc.data(),
                id: doc.id,
              }))
              dispatch({type:"SET_TWEETS", payload:tweet})
            }).catch(error=>console.log(error.message))
        }).catch(error=>{
            console.log(error)
        })
    }
    const submitTweet=(e) =>{
        e.preventDefault()
        postTweet()
    
        setTweet('');
        setImage('')
        setImageUrlBox(false)
      }
  return (
    <div className='flex gap-2 px-5'>
        <img src={userCredentials.picture} referrerPolicy="no-referrer" className="mt-4 h-14 w-14 rounded-full object-cover" alt="profile logo"/>
        <div className='flex flex-1 items-center pl-2'>
          <form className='flex flex-col flex-1'>
            <textarea type="text" value={tweet} onChange={(e)=>setTweet(e.target.value)} placeholder="What's Happening" className='w-full resize-none text-lg outline-none bg-transparent font-light'/>
            {imageUrlBox && (
              <form  className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                <input ref={imageInputRef}  type="text" placeholder='Enter Imgae url...' className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'  />
                <button className='font-bold text-white' onClick={addImageToTweet}>Add Image</button>
              </form>
            )}
            {image && (
                <div className="relative">
                    <img className='mt-3 h-fit w-full object-fill rounded' src={image} alt="" />
                    <XCircleIcon className="absolute top-2 left-0 w-7 h-7 text-gray-600 cursor-pointer" onClick={()=>setImage('')}/>
                </div>
            )}
            <div className='flex justify-between items-center mt-3'>
              {/* icons */}
              <div className='flex gap-2 text-twitter'>
                <PhotographIcon className='tweetBoxIcons' onClick={() => filePickerRef?.current?.click()}/>
                <input type="file" hidden ref={filePickerRef} onChange={addImgToTweet}/>
                <LinkIcon className='tweetBoxIcons' onClick={()=> setImageUrlBox(!imageUrlBox)}/>
                <EmojiHappyIcon className='tweetBoxIcons'/>
                <CalendarIcon className='tweetBoxIcons'/>
                <LocationMarkerIcon className='tweetBoxIcons'/>
              </div>
              {/* tweet button */}
              <button disabled={!tweet.trim()} className='disabled:opacity-40 bg-twitter py-2 px-5 font-bold text-white rounded-full' onClick={submitTweet}>Tweet</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default TweetBox