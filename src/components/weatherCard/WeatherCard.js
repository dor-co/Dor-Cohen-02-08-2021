import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

function WeatherCard() {
    const selectCityRed = useSelector((state) => state.selectCityReducer);

    console.log('selectCityReducer Card', selectCityRed)

    return (
        <>
            {selectCityRed.forecast !== undefined ? (
                <div>
                    <h1>{selectCityRed.data}</h1>

                    {selectCityRed.forecast.map(e => {
                        return (
                            <div className="card border-dark mb-3 cardTextStyle">
                                <h4>Date: {e.Date}</h4>
                                <h4>Maximum Temperature: {e.Temperature.Maximum.Value}</h4>
                                <h4>Minimum Temperature: {e.Temperature.Minimum.Value}</h4>
                            </div>
                        );
                    })}
                </div>
            ) : (
                null
            )}

        </>
    );
}

export default WeatherCard;
