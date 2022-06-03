import styles from './tweet.module.css'
import SpotifyPlayer from 'react-spotify-web-playback';
import Cookies from 'js-cookie';


const Tweets = ({tweets, setTweets}) => {
    const userName = tweets.data[0].name
    const handleName = tweets.data[0].screen_name
    const pfp = tweets.data[0].profile_image_url
    const token = Cookies.get('token')
    const uri = tweets.data[1][0].body.tracks.items[0].uri.replace('spotify:track:','')
    
    return(
        <div>
            {tweets.data[1].map(tweet => 
            

                tweet.body.tracks.items.slice(1,2).map(song => 
                    
                    <div className={styles["tweet"]}>
            <img
                src={pfp}
                className={styles["profile"]}
                alt="profile"
            />
        
          <div className={styles["body"]}>
            <div className={styles["top"]}>
              <span className={styles["user"]}>
                <span className={styles["name"]}>{userName}</span>
                <span className={styles["handle"]}>@{handleName}</span>
              </span>
    
              <span className={styles["timestamp"]}>{song.album.release_date}</span>
            </div>
    
            <p className={styles["message"]}>
                <iframe className={styles["embed"]} src={`https://open.spotify.com/embed/track/${song.uri.replace('spotify:track:','')}?utm_source=generator`} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </p>

            <div className={styles["actions"]}>
             
              <i class="far fa-comment">{Math.round(Math.random()*500)}</i>
              <i class="fas fa-retweet">{Math.round(Math.random()*500)}</i>
              <i class="far fa-heart">{Math.round(Math.random()*500)}</i>
              <i class="fas fa-share">{Math.round(Math.random()*500)}</i>
            </div>
          </div>
    
          <i class="fas fa-ellipsis-h"></i>
        </div>                    
                ))}
            
            <button className={styles["button"]}  onClick={()=>setTweets('')}>
                reset
            </button>
        </div>

    );
     
}

export default Tweets