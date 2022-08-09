import { createStore } from 'redux'
import {Provider} from "react-redux";
import userReducer from './Store/userStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TweetPage from './pages/TweetPage';
const userStore = createStore(userReducer)

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Provider store={userStore}><TweetPage/></Provider>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App