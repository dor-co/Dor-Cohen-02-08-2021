import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import * as local from "../../localApi";
import { chooseCity, tempToggle, modeToggle } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../../components/weatherCard/WeatherCard";
import Modal from '../../components/modal/Modal';
import "firebase/firestore";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";
import Select from '../../components/select/Select';
import './Style.css';
import Toggle from 'react-toggle';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

function Weather() {

  const selectCityRed = useSelector((state) => state.selectCityReducer);
  const dispatch = useDispatch();
  const db = useFirestore();

  const modeRef = db.collection("Settings").doc("mode");
  const modeRefData = useFirestoreDocData(modeRef).data;
  const modeStatus = useFirestoreDocData(modeRef).status;

  const tempRef = db.collection("Settings").doc("unit");
  const tempRefData = useFirestoreDocData(tempRef).data;
  const tempStatus = useFirestoreDocData(tempRef).status;

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
  // const [tempToggleChange, setTempToggleChange] = useState(false);
  // const [modeToggleChange, setModeToggleChange] = useState(false);

  useEffect(() => {
    getLocations();
  }, [])

  const getLocations = async () => {
    const response = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=jCLPUDFqHDZV7369qCF3gfHGutmpcVKG`
    );
    setData(response.data);

    // setData(local.LOCAL_API);

    if (selectCityRed.data.length < 1) {
      const res = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=jCLPUDFqHDZV7369qCF3gfHGutmpcVKG&details=true`
      );

      const currentRes = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/215854/?apikey=jCLPUDFqHDZV7369qCF3gfHGutmpcVKG&details=true`
      );

      dispatch(chooseCity("Tel Aviv", "215854", res.data.DailyForecasts, currentRes.data[0].WeatherText));
    }
  }

  const getForecast = async (key) => {
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=jCLPUDFqHDZV7369qCF3gfHGutmpcVKG&details=true`
    );

    const currentRes = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=jCLPUDFqHDZV7369qCF3gfHGutmpcVKG&details=true`
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

  // useEffect(() => {
  //   dispatch(tempToggle(tempToggleChange));
  // }, [tempToggleChange])

  const toggleChange = () => {
    // setTempToggleChange(!tempToggleChange);
    db.collection("Settings").doc("unit").update({
      tempUnit: !tempRefData.tempUnit
    })
  }

  // useEffect(() => {
  //   dispatch(modeToggle(modeToggleChange));
  // }, [modeToggleChange])

  const toggleModeChange = () => {
    // setModeToggleChange(!modeToggleChange);
    db.collection("Settings").doc("mode").update({
      themeMode: !modeRefData.themeMode
    })
  }

  return (
    <div>
      {data.length === 0 || modeStatus === 'loading' || tempStatus === 'loading' ? (
        <>
          <h1 className='loadingStyle'>loading...</h1>
        </>
      ) : (
        <>

          <label className='tempToggleStyle'>
            <div>
              <Toggle
                defaultChecked={tempRefData.tempUnit}
                icons={{
                  checked: <RiIcons.RiCelsiusFill style={{marginTop: -2.5, color: 'rgb(223 223 223)'}} size={15} />,
                  unchecked: <RiIcons.RiFahrenheitFill style={{marginTop: -2.5, color: 'rgb(223 223 223)'}} size={15} />,
                }}
                onChange={toggleChange}
              />
            </div>
          </label>

          <label className='modeToggleStyle'>
            <div>
              <Toggle
                defaultChecked={modeRefData.themeMode}
                icons={{
                  checked: <RiIcons.RiMoonFill style={{marginTop: -2.5, color: 'rgb(223 223 223)'}} size={15} />,
                  unchecked: <RiIcons.RiSunFill style={{marginTop: -2.5, color: 'rgb(223 223 223)'}} size={15} />
                }}
                onChange={toggleModeChange}
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

          <WeatherCard modeSetting={modeRefData.themeMode} tempSetting={tempRefData.tempUnit} />

        </>
      )
      }

    </div>
  );
}

export default Weather;


