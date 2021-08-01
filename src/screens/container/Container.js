import '../../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Weather from '../weather/Weather';
import Favorite from '../favorite/Favorite';
import Navbar from '../../components/navbar/Navbar';

function Container() {

  return (
    <Router>
      <div>
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
