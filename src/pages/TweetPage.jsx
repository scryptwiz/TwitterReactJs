import React, { useEffect    } from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'

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
            client_id: "573049742864-i43fg12j4njg9moncpscc6u70upqunnn.apps.googleusercontent.com",
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
        <div className='w-full h-screen bg-black'>
            <div className='mx-auto h-full w-full lg:max-w-5xl border-x border-gray-600'>
                <button onClick={signOut}>signout</button>
            </div>
        </div>
    )
}

export default TweetPage