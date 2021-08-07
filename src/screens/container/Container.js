import '../../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Weather from '../weather/Weather';
import Favorite from '../favorite/Favorite';
import Navbar from '../../components/navbar/Navbar';
import './Style.css';
import { useFirestore, useFirestoreDocData } from "reactfire";

function Container() {
  const db = useFirestore();

  const modeRef = db.collection("Settings").doc("mode");
  const modeRefData = useFirestoreDocData(modeRef).data;
  const modeStatus = useFirestoreDocData(modeRef).status;

  return (
    <>
      {modeStatus !== 'loading' &&
        <Router>
          <div className={modeRefData.themeMode ? ('ContainerStyleDark') : ('ContainerStyleLight')}>
            <Navbar modeSetting={modeRefData.themeMode} />
            <Switch>
              <Route path='/' exact component={Weather} />
              <Route path='/favorite' component={Favorite} />
            </Switch>
          </div>
        </Router>
      }
    </>
  );
}

export default Container;
