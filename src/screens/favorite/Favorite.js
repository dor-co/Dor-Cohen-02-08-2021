import '../../App.css';
import "firebase/firestore";
import { useFirestore } from "reactfire";
import { useState, useEffect } from 'react';

function Favorite() {
  const [firebaseData, setFirebaseData] = useState([]);

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

  console.log(firebaseData)

  return (
    <div>
      <h1>favorite list</h1>
      {firebaseData
        .filter(e => e.isFavorite === true)
        .map(item => {
          return(
            <h3>{item.testField}</h3>
          );
        })}
    </div>
  );
}

export default Favorite;
