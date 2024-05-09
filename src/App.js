import './App.css';
import { Suspense, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Canvas } from '@react-three/fiber';

import Mercury from '../src/assets/textures/8k_mercury.jpg';
import Sun from '../src/assets/textures/8k_sun.jpg';
import Mars from '../src/assets/textures/8k_mars.jpg';
import Jupiter from '../src/assets/textures/8k_jupiter.jpg';
import Uranus from '../src/assets/textures/2k_uranus.jpg';
import Neptune from '../src/assets/textures/2k_neptune.jpg';

import Earth from './components/Earth';
import Saturn from './components/Saturn';
import Planet from './components/Planet';
import getPlanet from './service';
import Venus from './components/Venus';

const planets = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
  'Sun',
];

function App() {
  const [planet, setPlanet] = useState(planets[0]);
  const [planetInfo, setPlanetInfo] = useState({});

  useEffect(() => {
    getPlanet(planet)
      .then((data) => {
        if (data && data.length > 0) {
          setPlanetInfo(data[0]);
        } else {
          setPlanetInfo({});
        }
      })
      .catch((err) => console.log(err));
  }, [planet]);

  const onselectionchange = (e) => {
    setPlanet(e.target.value);
  };

  const renderPlanet = () => {
    switch (planet) {
      case 'Sun':
        return <Planet planetMap={Sun} />;
      case 'Mercury':
        return <Planet planetMap={Mercury} />;
      case 'Venus':
        return <Venus />;
      case 'Earth':
        return <Earth />;
      case 'Mars':
        return <Planet planetMap={Mars} />;
      case 'Jupiter':
        return <Planet planetMap={Jupiter} />;
      case 'Saturn':
        return <Saturn />;
      case 'Uranus':
        return <Planet planetMap={Uranus} />;
      case 'Neptune':
        return <Planet planetMap={Neptune} />;
      default:
        return <Planet planetMap={Sun} />;
    }
  };

  return (
    <>
      <div className="custom-select">
        <label>Select a Planet</label>
        <select onChange={onselectionchange}>
          {planets.map((planet) => {
            return <option>{planet}</option>;
          })}
        </select>
      </div>
      {Object.keys(planetInfo).length > 0 && (
        <div className="planetInfo">
          <h1>Planet Information</h1>
          <dl>
            {Object.entries(planetInfo).map(([key, value]) => {
              return (
                <>
                  <dt>{key}:</dt>
                  <dd>{value}</dd>
                </>
              );
            })}
          </dl>
        </div>
      )}

      <Suspense
        fallback={
          <div className="loading">
            <ReactLoading type="bars" height={'10%'} width={'10%'} />
          </div>
        }
      >
        <Canvas>{renderPlanet()}</Canvas>
      </Suspense>
    </>
  );
}

export default App;
