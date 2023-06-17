import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Alert from '../src/components/Alert'
import useAlert from '../src/hooks/useAlert'
import { EnumAlertType } from '../src/model/enum/enum-alert-type';

const AlertContainer = (): JSX.Element => {
  const { alerts, dispatchAlert } = useAlert()
  return (
    <>
      <button onClick={() => dispatchAlert('Showing Toast!', EnumAlertType.SUCCESS, 1500)}>
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
