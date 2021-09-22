import './App.css';
import PhotoOfTheDay from './components/PhotoOfTheDay/PhotoOfTheDay';
import {useEffect, useState} from 'react';

const API = 'https://api.nasa.gov/planetary/apod?';
const apiKey = 'api_key=YG0GDyH2Tbr0tHbPVrvNyLV8ADHoOsK1qMh1RleG';
const start = 'start_date=';
const end = 'end_date=';

const dates=[
  '00','01','02','03','04','05','06','07','08','09','10',
  '11','12','13','14','15','16','17','18','19','20',
  '21','22','23','24','25','26','27','28','29','30','31'
];

const months =[
  '01','02','03','04','05','06','07','08','09','10','11','12'
];

function fetchPhotos(url){
  return fetch(url).then(res => res.json());
}

async function getPhotos(url, setAry){
  const fetchedPhotos = await fetchPhotos(url);
  setAry(fetchedPhotos);
}

function App() {

  const [photoAry, setPhotoAry] = useState([{
    title: '',
    date: '',
    url: '',
    media_type:''
  }]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  // set initial startDate & endDate to the correct initial dates so that the first API call 
  // on load does not cause a different image to get rendered
  const [startDate, setStartDate]= useState(()=>{
    let today = new Date();
    today.setDate(today.getDate()-9);
    return `${today.getFullYear()}-${months[today.getMonth()]}-${dates[today.getDate()]}`;
  });
  const [endDate, setEndDate] = useState(()=>{
    let today = new Date();
    today.setDate(today.getDate()-8);
    return `${today.getFullYear()}-${months[today.getMonth()]}-${dates[today.getDate()]}`;
  });

  const [selectedDate, setSelectedDate] = useState(()=>{
    let today = new Date();
    today.setDate(today.getDate()-9);
    return today;
  });

  useEffect(()=>{
    let initialDate = new Date();
    initialDate.setDate(initialDate.getDate()-9);
    setSelectedDate(initialDate);
  },[]);

  useEffect(()=>{
    setStartDate(`${selectedDate.getFullYear()}-${months[selectedDate.getMonth()]}-${dates[selectedDate.getDate()]}`);
    let finalDate = new Date(selectedDate);
    finalDate.setDate(finalDate.getDate()+9);
    let today = new Date();
    if(finalDate.getTime()> today.getTime()){
      setEndDate(`${today.getFullYear()}-${months[today.getMonth()]}-${dates[today.getDate()]}`);
    }else{
      setEndDate(`${finalDate.getFullYear()}-${months[finalDate.getMonth()]}-${dates[finalDate.getDate()]}`);
    };
  },[selectedDate]);

  useEffect(()=>{
    getPhotos(`${API}${start}${startDate}&${end}${endDate}&${apiKey}`,setPhotoAry);
  },[startDate])


  return (
    <div className="App">
      <PhotoOfTheDay photo={photoAry[selectedPhoto]} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
    </div>
  );
}

export default App;
