import {Store} from 'react-notifications-component';

const alertQueue = {};
const DELAY = 3000;

export const alert = ({type, title = ' ', message = ' '}) => {
  if (alertQueue[title] === type) {
    return;
  }

  alertQueue[title] = type;

  setTimeout(() => delete alertQueue[title], DELAY);

  const opt = {
    container: 'top-right',
    dismiss: {
      duration: DELAY,
      onScreen: true
    },
    showIcon: true
  };

  switch (type) {
    case 'info':
      Store.addNotification({title, message, type, ...opt});
      break;
    case 'success':
      Store.addNotification({title, message, type, ...opt});
      break;
    case 'warning':
      Store.addNotification({title, message, type, ...opt});
      break;
    case 'error':
      Store.addNotification({title, message, type: 'danger', ...opt});
  }
};
