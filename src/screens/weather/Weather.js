import { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import * as local from "../../localApi";

function Weather() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    //const response = await axios.get(
    //`https://dataservice.accuweather.com/locations/v1/topcities/150?apikey=IKkS8MhS5Ov6zJXtKwQIboaBAgsAtMa2`
    //);
    setData(local.LOCAL_API)
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
            <select defaultChecked='asd' className="form-select selectStyle" id="validationTooltip04" required>
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
        </>
      )
      }

    </div>
  );
}

export default Weather;
