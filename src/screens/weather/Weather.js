import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import * as local from "../../localApi";
import { chooseCity } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../../components/weatherCard/WeatherCard";

function Weather() {

  const selectCityRed = useSelector((state) => state.selectCityReducer);
  const dispatch = useDispatch();

  console.log('selectCityReducer', selectCityRed)

  const [data, setData] = useState([]);
  const [selectCity, setSelectCity] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [forecast, setForecast] = useState([]);
  const [testArray, setTestArray] = useState([
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 }
  ]);

  useEffect(() => {
    getLocations();
  }, [])

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
    //   `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=Pcam0PjGtEMwkxAAI0LL8lIjSlpwkHFS&details=true`
    // );    

    //setForecast(res);
    setForecast(local.fiveDays)
  }

  // console.log(forecast.data.DailyForecasts);

  console.log(forecast.DailyForecasts)

  const selectChange = (opt) => {
    setSelectCity(opt.target.value);
    const index = data.findIndex(x => x.LocalizedName === opt.target.value);
    const key = data[index].Key;
    getForecast(key);
    console.log(key, opt.target.value, forecast.DailyForecasts);

    dispatch(chooseCity(opt.target.value, key, forecast.DailyForecasts));

  }

  return (
    <div>
      {data.length === 0 ? (
        <>
          <h1>loading...</h1>
        </>
      ) : (
        <>
          <h1>weather</h1>

          <div className="col-md-3 position-relative selectContainer">
            <select data-live-search="true" data-live-search-style="startsWith" onChange={selectChange} className="form-select selectStyle" id="validationTooltip04" required>
              {/* {data.data.map((item) => { */}
              {data.map((item) => {
                return (
                  <>
                    <option>{item.EnglishName}</option>
                  </>
                );
              })}
            </select>


          </div>

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
