import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widget from '../components/Widget';
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../lib/firebase"

const TweetPage = () => {
    const dispatch = useDispatch();
    const userCredentials = useSelector(state=>state.user);
    const [loader, setLoader] = useState(false)

    const handleCallbackResponse = (response) =>{
        dispatch({type:'SET_USER', payload:jwt_decode(response.credential)})
        sessionStorage.setItem("Cerdentials", JSON.stringify(response.credential));
    }
    
    useEffect(() => {
        // localStorage.setItem('theme', "dark")
        document.documentElement.classList.add('dark')
        // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        //   } else {
        //     document.documentElement.classList.remove('dark')
        // }
        setLoader(true)
        const user = sessionStorage.getItem("Cerdentials")
        if (user) {
            dispatch({type:'SET_USER', payload:jwt_decode(user)})
        }
        /* global google*/
        google.accounts.id.initialize({
            client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: "outline", size: "large" }
        )
        // eslint-disable-next-line
        const tweetRef = query(collection(db, 'tweets'),orderBy('timestamp','desc'))
        getDocs(tweetRef).then(response=>{
        const tweet = response.docs.map(doc=>({
            data: doc.data(),
            id: doc.id,
        }))
        dispatch({type:"SET_TWEETS", payload:tweet})
        setLoader(false)
        }).catch(error=>console.log(error.message))
    }, [dispatch])

    const signOut = () => {
        sessionStorage.removeItem('Cerdentials');
        dispatch({type:'SET_USER', payload:false})
        window.location.reload()
    }

    if (!userCredentials) {
        return(
          <div id="signInCont" className='w-full h-screen bg-black flex flex-col justify-center items-center gap-2'>
            <img src="/roundedIcon.png" alt="Twitter Logo" className='w-16 h-16' />
            <h2 className='text-gray-300 font-semibold text-xl mb-3'>Sign In To Twitter</h2>
            <div id="signInDiv"></div>
          </div>
        )
      }
    return (
        <div className='w-full flex bg-white dark:bg-black'>
            {loader&&(<div className='w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-white z-40 dark:bg-black'>
                <img src="/logo.png" alt="Logo" className='w-32 animate-pulse'/>
            </div>)}
            <div className='grid grid-cols-9  w-full max-w-6xl mx-auto h-screen overflow-hidden'>
                <div className='col-span-2 overflow-y-auto flex flex-col items-center border-r border-gray-200 h-screen justify-between'>
                    <Sidebar/>
                    <div className='w-full flex-col items-center lg:items-start flex mb-5'>
                        <div className="flex w-fit mx-auto">
                            <span className='px-5 flex gap-2 items-center capitalize text-gray-400'>

                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 cursor-pointer rounded-full hover:bg-gray-700  dark:hover:bg-gray-200 dark:hover:bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 py-2 group max-w-fit mx-auto" onClick={signOut}>
                            <img src={userCredentials.picture} referrerPolicy="no-referrer" className='w-7 h-7 rounded-full object-cover' alt="ProfileImage"/>
                            <div className='flex flex-col w-fit'>
                                <p className="group-hover:text-twitter dark:group-hover:text-white lg:inline-flex hidden font-medium">{userCredentials.name}</p>
                                <p className="group-hover:text-twitter dark:group-hover:text-white lg:inline-flex hidden font-light text-xs">@{userCredentials.name.replace(/\$+/g, '').toLocaleLowerCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Feed/>
                <Widget/>
            </div>
        </div>
    )
}

export default TweetPage