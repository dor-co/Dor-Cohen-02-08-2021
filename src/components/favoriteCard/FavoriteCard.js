import './Style.css';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { chooseCity, open } from "../../redux/Actions";
import * as local from "../../localApi";
import Modal from "../modal/Modal";

function FavoriteCard({ item }) {
    const dispatch = useDispatch();

    const openModal = (removeCity) => {
        dispatch(open(removeCity));
    }

    const remove = () => {
        openModal('Are you sure you want to delete ' + item.city + ' from the favorite list?');
    }

    const backToWeathers = () => {
        dispatch(chooseCity(item.city, item.key, item.forecast, item.currentWeather));
    }

    return (
        <div className='card FavoriteCardContainer'>
            <Link to='/' className='linkStyle' onClick={backToWeathers}>
                <div className='card-body'>
                    <h3>{item.city}</h3>
                    <h5 className='currentForecastStyle'>Current Forecast: {item.currentWeather}</h5>
                </div>
            </Link>
            <Button className='removeBtn' onClick={remove}>Remove city</Button>

            <Modal text={'delete'} cityId={item.id} />
        </div>
    );
}

export default FavoriteCard;
