import './styles/App.css';
import { ReactComponent as Logo} from '../src/images/logo.svg';
import { useEffect, useState } from 'react';

import MyChart from './components/MyChart';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [spendingData, setSpendingData] = useState();
  const [labels, setLabels] = useState([])
  const [amountData, setAmountData] = useState([])
  const [max, setMax] = useState(0);

  useEffect(()=> {
    fetch('./data/spending.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}).then(response => {
      return response.json();
  }).then(
      (data) => {
        setIsLoaded(true)
        // let accomodationData = data.map(accomodation => {
        //   return new accomodationFactory(accomodation, "json");
        // });
        setLabels(data.map(mydata => mydata.day))
        setAmountData(data.map(mydata => mydata.amount))
        setSpendingData(data);
      },

      (error) => {
          setIsLoaded(true);
          setError(error);
        }
  )
  },[]);

  // console.log(amountData);
  // setLabels(spendingData.day)

// const [labels, setLabels] = useState([]);
// const [amountData, setAmountData] = useState([]);

// setLabels(spendingData.map(data => data.day));
// useEffect(()=>{
//   setMax(Math.max(amountData));
// }, [amountData])

// console.log(max);

// // const labels = spendingData.map(((data)=>{
// //   return data.day
// // }))
//     console.log(labels);

    // const amountData = spendingData.foreach((data)=>{
    //   return data.amount;
    // });

  return (
    <div className="App">

    <header className='header'>
      <div className='header__main'>
        <h1 className='header__main__title'>My balance</h1>
        <p className='header__main__total'>$921.48</p>
      </div>
    
      <div className='logo-wrapper'>
        <Logo></Logo>
      </div>
    </header>

    <main>
      <section className='spending-section'>
        <header className='spending-section__header' >
          <h2 className='spending-section__header__title'>Spending - Last 7 days</h2>
        </header>

        <div className='spending-section__contents'>
          <MyChart
            labels = {labels}
            amountData = {amountData}
            max = {max}
          />
        </div>

        <div className='separator'></div>

        <footer className='spending-section__footer'>
          <div className='spending-section__footer__total'>
            <h2 className='spending-section__footer__total__title'>Total this month</h2>
            <p className='spending-section__footer__total__result'>$478.33</p>
          </div>
          <div className='spending-section__footer__compare'>
            <p className='spending-section__footer__compare__rate'>+2.4%</p>
            <p className='spending-section__footer__compare__month'>from last month</p>
          </div>
        
        

        </footer>
      </section>
      
    </main>
      
  




  

  
  
  
  <div className="attribution">
    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
    Coded by <a href="#">Your Name Here</a>.
  </div>


    </div>
  );
}

export default App;
