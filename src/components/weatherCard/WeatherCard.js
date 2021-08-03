import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import './Style.css';
import Moment from "react-moment";

function WeatherCard() {
    const selectCityRed = useSelector((state) => state.selectCityReducer);

    console.log('selectCityReducer Card', selectCityRed)

    return (
        <div>
            {selectCityRed.forecast !== undefined && selectCityRed.currentForecast !== undefined ? (
                <>
                    <h1>{selectCityRed.data}</h1>
                    <h4>{selectCityRed.currentForecast[0]?.WeatherText}</h4>
                    <div className='cardContainer'>
                        {selectCityRed.forecast.map(e => {
                            return (
                                <div className="card border-dark mb-3 cardStyle">
                                    <h4>
                                        <Moment format='dddd'>{e.Date}</Moment>
                                    </h4>
                                    <h4>Max Temp: {e.Temperature.Maximum.Value}</h4>
                                    <h4>Min Temp: {e.Temperature.Minimum.Value}</h4>

                                    <Button>add to favorite</Button>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                null
            )}

        </div>
    );
}

export default WeatherCard;
