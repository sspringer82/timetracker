import { differenceInSeconds } from 'date-fns';
import Log from './log';
import Table from './table';
import { formatDuration } from './util/formatDuration';

export default class Form {
  constructor(
    private readonly form: HTMLFormElement,
    private readonly logModel: Log,
    private readonly table: Table,
  ) {}

  init() {
    this.form.addEventListener('submit', this.handleSave.bind(this));
    document
      .querySelector('#from')
      .addEventListener('change', this.handleChange.bind(this));
    document
      .querySelector('#until')
      .addEventListener('change', this.handleChange.bind(this));
  }

  handleChange() {
    const from = (document.querySelector('#from') as HTMLFormElement).value;
    const until = (document.querySelector('#until') as HTMLFormElement).value;
    const duration = differenceInSeconds(
      new Date(`1970-01-01T${until}:00`),
      new Date(`1970-01-01T${from}:00`),
    );
    document.querySelector('output').innerText = formatDuration(duration);
  }

  clearForm() {
    (document.querySelector('#project') as HTMLFormElement).value = '';
    (document.querySelector('#date') as HTMLFormElement).value = '';
    (document.querySelector('#from') as HTMLFormElement).value = '';
    (document.querySelector('#until') as HTMLFormElement).value = '';
  }

  async handleSave(e: Event) {
    e.preventDefault();
    const project = (document.querySelector('#project') as HTMLFormElement)
      .value;
    const date = (document.querySelector('#date') as HTMLFormElement).value;
    const from = (document.querySelector('#from') as HTMLFormElement).value;
    const until = (document.querySelector('#until') as HTMLFormElement).value;

    const data = {
      project,
      from: new Date(`${date}T${from}`).getTime(),
      until: new Date(`${date}T${until}`).getTime(),
    };
    await this.logModel.createLog(data);
    this.table.render();
    this.clearForm();
  }
}
