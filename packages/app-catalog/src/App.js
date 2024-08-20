import React, { useState, lazy, Suspense } from 'react';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import { microFrontends } from '../../config.json';

const ContainerLazy = lazy(() => import('./components/ContainerApp'));

const installedApps = JSON.parse(localStorage.getItem('mfes')) || [];

const generateClassName = createGenerateClassName({
  productionPrefix: 'cat',
});

export default function App() {
  const [selectedApps, setSelectedApps] = useState(installedApps);
  const [showContainer, setShowContainer] = useState(false);

  function handleCheckboxChange(mf) {
    const updatedSelection = selectedApps.includes(mf)
      ? selectedApps.filter(app => app !== mf)
      : [...selectedApps, mf];
    setSelectedApps(updatedSelection);
  }

  function handleShow() {
    localStorage.setItem('mfes', JSON.stringify(selectedApps));
    setShowContainer(true);
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Suspense fallback={<h1>Loading...</h1>}>
        {(showContainer || installedApps.length > 0) ? (
          <ContainerLazy />
        ) : (
          <div>
              <h1>Below are the available modules you can include in your application!!</h1>
            <ul>
                {microFrontends.map(mf => (
                  <li key={mf.description}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedApps.includes(mf)}
                        onChange={() => handleCheckboxChange(mf)}
                      />
                      {mf.description}
                    </label>
                  </li>
                ))}
            </ul>
              <button onClick={handleShow}>Install Selected Apps</button>
          </div>
        )}
      </Suspense>
    </StylesProvider>
  );
}
