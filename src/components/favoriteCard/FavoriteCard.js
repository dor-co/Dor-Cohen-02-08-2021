import './Style.css';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useFirestore } from "reactfire";
import { useSelector, useDispatch } from "react-redux";
import { chooseCity } from "../../redux/Actions";
import * as local from "../../localApi";

function FavoriteCard({ item }) {
    const db = useFirestore();
    const dispatch = useDispatch();

    const remove = () => {
        db.collection("Weathers").doc(item.id)
            .delete()
    }

    // const test = () => {
    //     console.log(item)


    //     dispatch(chooseCity(item.city, "215854", local.fiveDays.DailyForecasts, local.current));
    // }

    return (
        <div className='card FavoriteCardContainer'>
            <Link to='/' className='linkStyle'>
                <div className='card-body'>
                    <h3>{item.city}</h3>
                    <h5>Current Forecast: {item.currentWeather}</h5>
                </div>
            </Link>
            <Button className='removeBtn' onClick={remove}>Remove city</Button>
        </div>
    );
}

export default FavoriteCard;
