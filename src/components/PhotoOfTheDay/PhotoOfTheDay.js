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

function PhotoOfTheDay(props){
  return(
    <div className={styles.photoContainer}>
      <div className={styles.arrowContainer}>

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
          <input type="date" value="" className={styles.dateInput} onChange={(e)=>{changeDate(e.target.value, props.setSelectedDate)}}></input>
        </div>
      </div>
      <div className={styles.arrowContainer}>

      </div>
    </div>
  )
}

export default PhotoOfTheDay