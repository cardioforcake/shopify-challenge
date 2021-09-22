import styles from './PhotoOfTheDay.module.css';
import {useEffect, useState} from 'react';

const monthsNames =[
  '','January','February','March','April','May','June','July',
  'August','September','October','November','December'
]

function changeDate(value, set){
  let newDate = new Date(value)
  let today = new Date()
  if(newDate.getTime()<today.getTime()){
      set(newDate)
  }
}

function toggleLiked(set, l, date){
  window.localStorage.setItem(date, l*-1);
  set(prev=>prev*-1)
}

function scrollLeft(set){
  set(prev=>prev-1)
}

function scrollRight(set){
  set(prev=>prev+1)
}

function PhotoOfTheDay(props){

  const [liked, setLiked] = useState(-1);

  useEffect(()=>{
    if(window.localStorage.getItem(props.photo['date'])==='1'){
      setLiked(1)
    }else{
      setLiked(-1)
    }
  },[props.photo['date']])

  return(
    <div className={styles.photoContainer}>
      <div className={styles.arrowContainer}>
        {props.selectedPhoto >0?
          <div className={styles.arrowLeft} onClick={()=>{scrollLeft(props.setSelectedPhoto)}}></div>:
          <></>
        }
      </div>
      <div className={styles.card}>
        <div className={styles.interactionContainer}>

        </div>
        {props.photo['media_type'] === "video" ?
          <div className={styles.videoContainer}>
            <a href={props.photo['url']} target="_blank" className={styles.video}>YouTube Video</a>
          </div> 
 :
          <img alt="pic of the day" src={props.photo['url']} className={styles.photo}></img>
        }
        <div className={styles.interactionContainer} id={styles.interactions}>
          <div className={styles.photoDesc}>
            <p className={styles.desc} id={styles.title}>{props.photo['title']}</p>
            <p className={styles.desc}>
              {monthsNames[Number(props.photo['date'].substring(5,7))]+' '+Number(props.photo['date'].substring(8))+', '+props.photo['date'].substring(0,4)}
            </p>
          </div>
          {liked === -1 ?
            <img alt="empty heart" src="/heartwhite.png" className={styles.heart} onClick={()=>toggleLiked(setLiked, liked, props.photo['date'])}></img>:
            <img alt="empty heart" src="/heartfilled.png" className={styles.heart} onClick={()=>toggleLiked(setLiked, liked, props.photo['date'])}></img>
          }

          <input type="datetime-local" value="" className={styles.dateInput} onChange={(e)=>{changeDate(e.target.value, props.setSelectedDate)}}></input>
        </div>
      </div>
      <div className={styles.arrowContainer}>
        {props.selectedPhoto < props.photoAryLengthMinusOne ?
          <div className={styles.arrowRight} onClick={()=>{scrollRight(props.setSelectedPhoto)}}></div>:
          <></>
        }
      </div>
    </div>
  )
}

export default PhotoOfTheDay