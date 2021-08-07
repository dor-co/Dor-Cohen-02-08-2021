import '../../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Weather from '../weather/Weather';
import Favorite from '../favorite/Favorite';
import Navbar from '../../components/navbar/Navbar';
import './Style.css';
import { useSelector, useDispatch } from "react-redux";

function Container() {
  const modeRed = useSelector((state) => state.modeToggle);

  console.log(modeRed)

  return (
    <Router>
      <div className={modeRed.boolTemp ? ('ContainerStyleDark') : ('ContainerStyleLight')}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Weather} />
          <Route path='/favorite' component={Favorite} />
        </Switch>
      </div>
    </Router>
  );
}

export default Container;
