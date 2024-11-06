import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Details from './Details/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;