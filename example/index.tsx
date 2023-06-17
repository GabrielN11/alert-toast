import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Alert} from '../src/components/Alert'
import {useAlert} from '../src/hooks/useAlert'

const AlertContainer = (): JSX.Element => {
  const { displayAlert, displayCustomAlert } = useAlert()
  return (
    <>
      <button onClick={() => displayAlert('Showing Toast!', 'success', 3000, 'bottom-right')}>
        Display Alert
      </button>
      <Alert defaultPosition='top-center'
        dangerColor='#ffa726'
        errorColor='#f44336'
        successColor='#66bb6a'
      />
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
