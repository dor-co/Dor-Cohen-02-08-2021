import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import * as local from "../../localApi";
import { chooseCity, tempToggle } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../../components/weatherCard/WeatherCard";
import Modal from '../../components/modal/Modal';
import "firebase/firestore";
import { useFirestore } from "reactfire";
import Select from '../../components/select/Select';
import './Style.css';
import Toggle from 'react-toggle';

function Weather() {

  const selectCityRed = useSelector((state) => state.selectCityReducer);
  const dispatch = useDispatch();

  // console.log('selectCityReducer', selectCityRed)

  const [data, setData] = useState([]);
  const [selectCity, setSelectCity] = useState('Tel Aviv');
  const [cityCode, setCityCode] = useState('');
  const [forecast, setForecast] = useState([]);
  const [currentFroecast, setCurrentFroecast] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [testArray, setTestArray] = useState([
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 },
    { Maximum: 30, Minimum: 20 }
  ]);
  const [tempToggleChange, setTempToggleChange] = useState(false);

  useEffect(() => {
    getLocations();
  }, [])

  const getLocations = async () => {
    // const response = await axios.get(
    // `https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2`
    // );
    // setData(response.data);

    setData(local.LOCAL_API);

    if (selectCityRed.data.length < 1) {
      const res = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=682500PcukwQUtq1UDd6XimUfAmBA5HL&details=true`
      );

      const currentRes = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/215854/?apikey=682500PcukwQUtq1UDd6XimUfAmBA5HL&details=true`
      );

      dispatch(chooseCity("Tel Aviv", "215854", res.data.DailyForecasts, currentRes.data[0].WeatherText));
    }
  }

  const getForecast = async (key) => {
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=682500PcukwQUtq1UDd6XimUfAmBA5HL&details=true`
    );

    const currentRes = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=682500PcukwQUtq1UDd6XimUfAmBA5HL&details=true`
    );

    // setForecast(res.data.DailyForecasts);
    setForecast(res.data.DailyForecasts);
    setCurrentFroecast(currentRes.data[0].WeatherText)

    // setCurrentFroecast(local.current);
    // setForecast(local.fiveDays)

  }

  // console.log(forecast.data.DailyForecasts);

  useEffect(() => {
    // console.log('fromEffect', selectCity, cityCode, forecast, currentFroecast.data[0].WeatherText);
    //console.log('***********',forecast)
    if (isSelected) {
      dispatch(chooseCity(selectCity, cityCode, forecast, currentFroecast));
    }
  }, [selectCity, cityCode, forecast, currentFroecast])

  const selectChange = (opt) => {
    setIsSelected(true)
    setSelectCity(opt.label);
    setCityCode(opt.value);
    setForecast(opt.forecastSelect);
    setCurrentFroecast(opt.currentForecastSelect);

    getForecast(opt.value);

    //dispatch(chooseCity(opt.label, opt.value, forecast.DailyForecasts, currentFroecast));
  }

  useEffect(() => {
    dispatch(tempToggle(tempToggleChange));
  }, [tempToggleChange])

  const toggleChange = () => {
    setTempToggleChange(!tempToggleChange)
  }

  return (
    <div>
      {data.length === 0 ? (
        <>
          <h1>loading...</h1>
        </>
      ) : (
        <>

          <label className='tempToggleStyle'>
            °F - °C
            <div>
              <Toggle
                icons={false}
                onChange={toggleChange}
              />
            </div>
          </label>

          {/* <h1 className='weatherTitle'>Weather Forecast</h1> */}
          <div className='selectContainer'>
            {console.log(forecast)}
            <Select
              options={data.map((item) => {
                return {
                  value: item.Key,
                  label: item.EnglishName,
                  forecastSelect: forecast,
                  currentForecastSelect: currentFroecast
                };
              })}
              onChange={selectChange}
            // defaultValue={{ label: 'Tel Aviv', value: '215854' }}
            />
          </div>

          <WeatherCard />

        </>
      )
      }

    </div>
  );
}

export default Weather;


