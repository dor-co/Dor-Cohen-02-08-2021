import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import './Style.css';
import Moment from "react-moment";
import Modal from "../../components/modal/Modal";
import { open } from "../../redux/Actions";
import "firebase/firestore";
import { useFirestore } from "reactfire";

function WeatherCard() {
    const [firebaseData, setFirebaseData] = useState([]);

    const selectCityRed = useSelector((state) => state.selectCityReducer);
    const dispatch = useDispatch();

    console.log('selectCityReducer Card', selectCityRed)

    const db = useFirestore();

    const useItems = (itemType, callback, items) => {
        useEffect(() => {
            const fetchData = async () => {
                await db
                    .collection(itemType)
                    .onSnapshot((snapshot) => {
                        let listItems = [];

                        listItems = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        callback(listItems);
                    });
            };
            fetchData();
        }, []);
        return items;
    };

    useItems("Weathers", setFirebaseData, firebaseData);

    const openModal = (add) => {
        dispatch(open(add));
    }

    const addToFavorite = () => {
        // if the city in the list - remove
        // else add to the list
        if (firebaseData.findIndex(x => x.city === selectCityRed.data) === -1) {
            db.collection("Weathers")
                .add({
                    city: selectCityRed.data
                });
            openModal('Added To Favorite!')
        } else {
            let index = firebaseData.findIndex(x => x.city === selectCityRed.data);
            db.collection("Weathers").doc(firebaseData[index].id)
                .delete()
            openModal('Removed From Favorite!')
        }
    }

    return (
        <div>
            {selectCityRed.forecast !== undefined && selectCityRed.currentForecast !== undefined ? (
                <>
                    <h1>{selectCityRed.data}</h1>
                    <h4>{selectCityRed.currentForecast[0]?.WeatherText}</h4>
                    <Button onClick={addToFavorite}>
                        {firebaseData.findIndex(x => x.city === selectCityRed.data) === -1 
                        ? ('add to favorite') 
                        : ('remove from favorive')}
                    </Button>

                    <div className='cardContainer'>
                        {selectCityRed.forecast.map(e => {
                            return (
                                <div className="card border-dark mb-3 cardStyle">
                                    <h4 className='card-header'>
                                        <Moment format='dddd'>{e.Date}</Moment>
                                    </h4>
                                    <h4>Max Temp: {e.Temperature.Maximum.Value}</h4>
                                    <h4>Min Temp: {e.Temperature.Minimum.Value}</h4>
                                </div>
                            );
                        })}
                    </div>
                    <Modal />
                </>
            ) : (
                null
            )}

        </div>
    );
}

export default WeatherCard;
