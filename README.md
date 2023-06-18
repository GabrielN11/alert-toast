# Alert Toast

Alert Toast is a simple toast library for React. I created this library for one of my projects a while ago, and since then, I have been reusing it in other projects. To make my life easier, and hopefully yours as well, I decided to create an NPM package for it.

![firefox_rQOsYvPO4Q](https://github.com/GabrielN11/alert-toast/assets/42102027/80fc4fa9-0ff4-4206-9714-a87b98318035)

## Installation

To install Alert Toast, run the following command:

```
npm i alert-toast
```

https://www.npmjs.com/package/alert-toast

## Usage

To use Alert Toast, import the **Alert** component and place it preferably in the main component of your application.

```jsx
import { Alert } from 'alert-toast';

<Alert/>
```

You can pass props to the **Alert** component to override default configurations. These props include colors, font color, and position of the toast. Please note that you can choose the position of the toast when invoking it. The provided position is the default position when no position is specified.

```jsx
import Alert from 'alert-toast';

<Alert
  successColor='#388e3c'
  dangerColor='#f57c00'
  errorColor='#d32f2f'
  defaultPosition='bottom-center'
  fontColor='#ddd'
/>
```

To display a toast, import the **useAlert** hook in the component where you want to call it. Then, simply call the **displayAlert** function that comes with the hook.

```jsx
import { useAlert } from 'alert-toast';

const MyComponent = () => {
  const { displayAlert } = useAlert();

  useEffect(() => {
    displayAlert('Toast message :)', 'success');
  }, []);

  // ...
};
```

### displayAlert()

The **displayAlert()** function takes two required arguments: the message and the type. There are also optional arguments available. Here's the order of the arguments:

- text: string (The actual message to be displayed)
- type: "success" | "error" | "danger" (This affects the color of the toast. There are default colors, but you can override them as mentioned above)
- duration: number (The duration the toast will be shown, default is 2000 milliseconds)
- position: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center" (The position you want the toast to appear on your page. This will override the default position)

Example usage:

```jsx
displayAlert('Toast message', 'success', 5000, 'bottom-left');
```

### displayCustomAlert()

The **displayCustomAlert()** function is also imported with the **useAlert** hook. It works exactly like **displayAlert()**, but the key difference is that you can directly pass a hexadecimal or RGB code instead of the type to create a toast with any color you want.

```jsx
import { useAlert } from 'alert-toast';

const MyComponent = () => {
  const { displayCustomAlert } = useAlert();

  useEffect(() => {
    displayCustomAlert('Custom toast color', '#0288d1', '5000', 'top-center');
  }, []);

  // ...
};
```

## How It Works

You may have noticed that there is no provider for this library. That's because I chose to use [CustomEvents](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) to manipulate the alert state inside the **<Alert/>** component. Therefore, you should avoid using more than one Alert component simultaneously.

## NOTES AND ISSUES

Please note the following considerations and limitations:

- If you call multiple toasts with different positions simultaneously, the position of the last toast called will override the positions of the others.
- The library does not support passing JSX elements as messages; only strings are accepted.
- Currently, there is no built-in "close" button for the toasts.
- The library does not provide an option for the toast to persist indefinitely or until the user manually closes it.

I plan to improve this library whenaver i have time and energy to do it, but you can improve it and create pull requests if you want.
