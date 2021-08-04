import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import * as local from "../../localApi";
import { chooseCity } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../../components/weatherCard/WeatherCard";
import Modal from '../../components/modal/Modal';
import "firebase/firestore";
import { useFirestore } from "reactfire";
import Select from '../../components/select/Select';
import './Style.css';

function Weather() {

  const selectCityRed = useSelector((state) => state.selectCityReducer);
  const dispatch = useDispatch();

  console.log('selectCityReducer', selectCityRed)

  const [data, setData] = useState([]);
  const [selectCity, setSelectCity] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [forecast, setForecast] = useState([]);
  const [currentFroecast, setCurrentFroecast] = useState([]);
  const [testArray, setTestArray] = useState([
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 }
  ]);
//   const [firebaseData, setFirebaseData] = useState([]);

  useEffect(() => {
    getLocations();
  }, [])

//   const db = useFirestore();

//   const useItems = (itemType, callback, items) => {
//     useEffect(() => {
//         const fetchData = async () => {
//             await db
//                 .collection(itemType)
//                 .onSnapshot((snapshot) => {
//                     let listItems = [];

//                     listItems = snapshot.docs.map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }));
//                     callback(listItems);
//                 });
//         };
//         fetchData();
//     }, []);
//     return items;
// };

// useItems("Weathers", setFirebaseData, firebaseData);

// console.log(firebaseData[0]?.testField)

  const getLocations = async () => {
    // const response = await axios.get(
    // `https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2`
    // );
    setData(local.LOCAL_API);
  }

  const getForecast = async (key) => {
    //// get the selected city key. search in data array the key of the city name (value)
    //// const index = data.findIndex(x => x.Key === key);
    //// const keyy = data[index]?.Key;


    // const res = await axios.get(
    //   `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2&details=true`
    // );   
    
    // const currentRes = await axios.get(
    //  `http://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2`
    // );

    // setForecast(res);
    // setCurrentFroecast(currentRes)
    setCurrentFroecast(local.current);
    setForecast(local.fiveDays)

  }

  // console.log(forecast.data.DailyForecasts);

  console.log(forecast)
  console.log('@@@@@', currentFroecast);

  // const selectChange = (opt) => {
  //   setSelectCity(opt.target.value);
  //   const index = data.findIndex(x => x.LocalizedName === opt.target.value);
  //   const key = data[index].Key;
  //   getForecast(key);
  //   console.log(key, opt.target.value, forecast.DailyForecasts);

  //   // dispatch(chooseCity(opt.target.value, key, forecast.data?.DailyForecasts));
  //   dispatch(chooseCity(opt.target.value, key, forecast.DailyForecasts, currentFroecast));

  // }

  const selectChange = (opt) => {
    setSelectCity(opt.label);
    // const index = data.findIndex(x => x.LocalizedName === opt.target.value);
    // const key = opt.value;
    getForecast(opt.value);
    console.log(opt.value, opt.label, forecast.DailyForecasts);

    // dispatch(chooseCity(opt.target.value, key, forecast.data?.DailyForecasts));
    dispatch(chooseCity(opt.label, opt.value, forecast.DailyForecasts, currentFroecast));

  }

  return (
    <div>
      {data.length === 0 ? (
        <>
          <h1>loading...</h1>
        </>
      ) : (
        <>
          <h1 className='weatherTitle'>weather</h1>
          <div className='selectContainer'>
            <Select
              options={data.map((item) => {
                return {
                    value: item.Key,
                    label: item.EnglishName
                };
              })}
              onChange={selectChange}
              defaultValue={{ label: 'Tel Aviv', value: '215854' }}
            />
          </div>
          {/* <Modal show={true} text={'from weather'}/> */}
          {/* <div className="col-md-3 position-relative selectContainer">
            <select data-live-search="true" data-live-search-style="startsWith" onChange={selectChange} className="form-select selectStyle" id="validationTooltip04" required> */}
              {/* {data.data.map((item) => { */}
              {/* {data.map((item) => {
                return (
                  <>
                    <option>{item.EnglishName}</option>
                  </>
                );
              })}
            </select>


          </div> */}

          {/* <div>
            {testArray.map((e) => {
              return (
                <>
                  <h3>max temperature: {e.Maximum}</h3>
                  <h3>min temperature: {e.Minimum}</h3>
                  <h3>-------------------------</h3>
                </>
              );
            })
            }
          </div> */}

          <WeatherCard />


          {/* <div>
              {forecast?.data?.DailyForecasts.length > 1 ? (
                forecast.data.DailyForecasts.map((e) => {
                  return (
                    <>
                      <h1>{e.Date}</h1>
                      <h3>max temperature: {e.Temperature.Maximun}</h3>
                      <h3>min temperature: {e.Temperature.Minimum}</h3>
                    </>
                  );
                })
              ) : (
                null
              )}
          </div> */}
        </>
      )
      }

    </div>
  );
}

export default Weather;
