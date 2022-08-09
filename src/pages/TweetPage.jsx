import { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widget from '../components/Widget';

const TweetPage = () => {
    const dispatch = useDispatch();
    const userCredentials = useSelector(state=>state.user);

    const handleCallbackResponse = (response) =>{
        dispatch({type:'SET_USER', payload:jwt_decode(response.credential)})
        sessionStorage.setItem("Cerdentials", JSON.stringify(response.credential));
    }
    
    useEffect(() => {
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
    }, [])

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
        <div className='w-full flex bg-gray-200 dark:bg-black'>
            <div className='grid grid-cols-9  w-full max-w-5xl mx-auto h-screen overflow-hidden'>
                <div className='col-span-2 overflow-y-auto flex flex-col items-center border-r border-gray-500 h-screen justify-between'>
                    <Sidebar/>
                    <div className="flex items-center gap-2 px-3 cursor-pointer rounded-full hover:bg-gray-700  dark:hover:bg-gray-200 dark:hover:bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 py-2 group max-w-fit mb-5" onClick={signOut}>
                        <img src={userCredentials.picture} referrerPolicy="no-referrer" className='w-7 h-7 rounded-full object-cover' alt="ProfileImage"/>
                        <div className='flex flex-col'>
                            <p className="group-hover:text-twitter dark:group-hover:text-white lg:inline-flex hidden font-medium">{userCredentials.name}</p>
                            <p className="group-hover:text-twitter dark:group-hover:text-white lg:inline-flex hidden font-light text-xs">@{userCredentials.name.replace(/\$+/g, '').toLocaleLowerCase()}</p>
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