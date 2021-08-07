import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { chooseCity } from "../../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "../../components/weatherCard/WeatherCard";
import "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";
import Select from '../../components/select/Select';
import './Style.css';
import Toggle from 'react-toggle';
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

  const [data, setData] = useState([]);
  const [selectCity, setSelectCity] = useState('Tel Aviv');
  const [cityCode, setCityCode] = useState('');
  const [forecast, setForecast] = useState([]);
  const [currentFroecast, setCurrentFroecast] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    getLocations();
  }, [])

  const getLocations = async () => {
    const response = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2`
    );
    setData(response.data);

    if (selectCityRed.data.length < 1) {
      const res = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2&details=true`
      );

      const currentRes = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/215854/?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2&details=true`
      );

      dispatch(chooseCity("Tel Aviv", "215854", res.data.DailyForecasts, currentRes.data[0].WeatherText));
    }
  }

  const getForecast = async (key) => {
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2&details=true`
    );

    const currentRes = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${key}/?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2&details=true`
    );

    setForecast(res.data.DailyForecasts);
    setCurrentFroecast(currentRes.data[0].WeatherText)

  }

  useEffect(() => {
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
  }

  const toggleChange = () => {
    db.collection("Settings").doc("unit").update({
      tempUnit: !tempRefData.tempUnit
    })
  }

  const toggleModeChange = () => {
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

          <div className='selectContainer'>
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


