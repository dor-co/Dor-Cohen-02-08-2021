import '../../App.css';
import "firebase/firestore";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useState, useEffect } from 'react';
import FavoriteCard from '../../components/favoriteCard/FavoriteCard';
import './Style.css';
import { useSelector } from "react-redux";
import Modal from "../../components/modal/Modal";

function Favorite() {
  const [firebaseData, setFirebaseData] = useState([]);

  const db = useFirestore();

  const modeRef = db.collection("Settings").doc("mode");
  const modeRefData = useFirestoreDocData(modeRef).data;
  const modeStatus = useFirestoreDocData(modeRef).status;

  const modalRed = useSelector((state) => state.modalReducer);

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

  return (
    <>
      {modeStatus !== 'loading' &&
        <div>
          <h1 className={modeRefData.themeMode ? ('favoriteTitleStyleDark') : ('favoriteTitleStyleLight')}>Favorite List</h1>
          {firebaseData
            .map(item => {
              return (
                <FavoriteCard item={item} />
              );
            })}

            <Modal text={'delete'} cityId={modalRed.id} />

        </div>
      }
    </>
  );
}

export default Favorite;
