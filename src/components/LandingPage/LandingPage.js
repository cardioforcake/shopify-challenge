import styles from './LandingPage.module.css';
import {Link} from 'react-router-dom';

function LandingPage(props){
  return(
    <div className={styles.landingContainer}>
      <p className={styles.greeting}>Let's look at some amazing photos from the NASA archives!</p>
      <Link to="/photos" className={styles.enterBtn}>ENTER</Link>
    </div>
  );
}

export default LandingPage;