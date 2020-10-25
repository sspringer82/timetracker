import Form from './form';
import Log from './log';
import Table from './table';

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
}

document.addEventListener('DOMContentLoaded', main);
