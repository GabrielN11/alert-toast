import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Alert} from '../src/components/Alert'
import {useAlert} from '../src/hooks/useAlert'

const AlertContainer = (): JSX.Element => {
  const { alerts, displayAlert, displayCustomAlert } = useAlert()
  return (
    <>
      <button onClick={() => displayCustomAlert('Showing Toast!', '#3240a8', 3000)}>
        Display Alert
      </button>
      <Alert alerts={alerts} />
    </>
  )
}

const App = () => {
  return (
    <div>
      <AlertContainer/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
