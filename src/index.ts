import Form from './form';
import Log from './log';
import Table from './table';

import './style.scss';

async function main(): Promise<void> {
  const tableElement = document.querySelector('table');
  const formElement = document.querySelector('form');
  const log = new Log();
  const table = new Table(tableElement, log);
  await table.init();
  table.render();
  const form = new Form(formElement, log, table);
  await form.init();

  tableElement.addEventListener('click', table.handleDelete.bind(table));
  askForNPerm();
}

document.addEventListener('DOMContentLoaded', main);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

function askForNPerm() {
  Notification.requestPermission(function (result) {
    console.log(result);
  });
}
