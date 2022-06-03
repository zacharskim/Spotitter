import {useEffect, useState} from 'react';
import { ReactComponent as YourSvg } from './components/spottwit.svg';
import { Triangle } from  'react-loader-spinner'
import tweetService from './services/twitter'
import spotService from './services/spotifydata'
import LoginButton from './components/LoginButton.js'
import Tweets from './components/Tweets'
import './App.css'
import UserHandle from './components/UserHandle'


const App = () => {

  const [tweets, setTweets] = useState([])
  const [tracks, setTracks] = useState('')
  const [handle, setHandle] = useState('')
  const [loading, setLoading] = useState(false)
  const [authStatus, setAuthStatus] = useState(false)

  useEffect(() => {
      if(window.location.hash === '#success'){
          setAuthStatus(true)
          console.log('ran')
      }
  },[])

  console.log('tweets are', tweets)

  const handleHandle = (event) => {
    setHandle(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const handle = event.target[0].value
    //can't mutate state directly i guess??
    const loadingBool = true
    setLoading(loadingBool)
    loadTweets()
  }

  const loadTweets = async () => {
    await tweetService.
    sendHandle(handle)
    .then(t =>{
      setTweets(t)
      setLoading(false)
    })
    
  }

  const handleSpotApi = () =>{
   spotService
    .getUserData()
    .then(data =>{
      console.log(data)
    setTracks(data)
    })

    spotService
    .getTracks('gym')
    .then(data => { 
      console.log(data)
    })

  }
  console.log(loading, 'loading state...', authStatus, 'auth status...')
  if(!authStatus){
  return(
    <div className="flex flex-row ">
      <div className="basis-1/2">
      <YourSvg height="100% "
        width="100%"/>
      </div>
      
      <div > 
        <LoginButton handle={handle}
                   handleHandle={handleHandle}
                   tweetService={tweetService}
                   handleFormSubmit={handleFormSubmit}
                   /> 
      </div>
    </div>
  );
//if logged in and no tweets, did not hit search yet...
} else if(authStatus && loading){
  return(
    <div className="flex flex-row ">
    <div className="basis-1/2">
    <YourSvg height="100% "
      width="100%"/>
    </div>
    <Triangle
      height="100%"
      width="100%"
      color='green'
      ariaLabel='loading'
      />
    
  </div>
    
  );

}else if(authStatus && !tweets.data){
  return(
    <div className="flex flex-row ">
      <div className="basis-1/2">
      <YourSvg height="100% "
        width="100%"/>
      </div>
      <UserHandle handle={handle} handleHandle={handleHandle} tweetService={tweetService} handleFormSubmit={handleFormSubmit}/>  
    </div>
  );
//if logged in and no tweets, and hit search,
//loader
} else if(authStatus && tweets.data && !loading){
  return(
    <div className="flex flex-row ">
      <div>
      <YourSvg height="325px "
        width="325px"/>
      </div>
      <div>
      <Tweets tweets={tweets} setTweets={setTweets}/>
      </div>
      
    </div>
  );
}
}

export default App;
