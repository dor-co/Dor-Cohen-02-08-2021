import './Style.css';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useFirestore } from "reactfire";

function FavoriteCard({ item }) {
    const db = useFirestore();

    const remove = () => {
        db.collection("Weathers").doc(item.id)
            .delete()
    }

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
