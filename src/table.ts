import { format, differenceInSeconds } from 'date-fns';
import LogType from './util/log';
import { formatDuration } from './util/formatDuration';
import Log from './log';

export default class Table {
  // private logs: Map<Date, LogType[]>;

  constructor(
    public readonly mountPoint: HTMLTableElement,
    private readonly logModel: Log,
  ) {}

  private createCell(
    data: string | number,
    attr?: { [key: string]: string },
  ): HTMLTableDataCellElement {
    const content = typeof data === 'number' ? data.toString() : data;
    const cell = document.createElement('td');
    cell.innerText = content;

    if (attr) {
      Object.keys(attr).forEach((key) => {
        cell.setAttribute(key, attr[key]);
      });
    }

    return cell;
  }

  private createDateCell(date: number): HTMLTableDataCellElement {
    const formattedDate = format(date, 'dd.MM.yyyy');
    return this.createCell(formattedDate);
  }

  private createTimeCell(date: number): HTMLTableDataCellElement {
    const formattedTime = format(date, 'HH:mm');
    return this.createCell(formattedTime);
  }

  private createDurationCell(
    from: number,
    until?: number,
  ): HTMLTableDataCellElement {
    let diff = from;
    if (until) {
      diff = differenceInSeconds(until, from);
    }
    const formattedDiff = formatDuration(diff);
    return this.createCell(formattedDiff);
  }

  private createHeaderRow(date: Date): HTMLTableRowElement {
    const headerTr = document.createElement('tr');
    headerTr.appendChild(
      this.createCell(format(date, 'EEEE, dd.MM.yyyy'), { colspan: '5' }),
    );
    return headerTr;
  }

  private createFooterRow(sum: number): HTMLTableRowElement {
    const footerTr = document.createElement('tr');
    footerTr.appendChild(this.createCell('sum', { colspan: '4' }));
    footerTr.appendChild(this.createDurationCell(sum));
    return footerTr;
  }

  private buildBlock(
    tbody: HTMLTableSectionElement,
    date: Date,
    data: LogType[],
  ): HTMLTableSectionElement {
    tbody.appendChild(this.createHeaderRow(date));

    let sum = 0;

    data
      .map(
        (log): LogType => {
          sum += differenceInSeconds(log.until, log.from);
          return log;
        },
      )
      .map(
        (log): HTMLTableRowElement => {
          const tr = document.createElement('tr');
          tr.id = log.id.toString();
          tr.appendChild(this.createCell(log.project));
          tr.appendChild(this.createDateCell(log.from));
          tr.appendChild(this.createTimeCell(log.from));
          tr.appendChild(this.createTimeCell(log.until));
          tr.appendChild(this.createDurationCell(log.from, log.until));
          tr.appendChild(this.createDeleteButton(log.id));
          return tr;
        },
      )
      .forEach((tr) => tbody.append(tr));

    tbody.appendChild(this.createFooterRow(sum));

    return tbody;
  }

  private createDeleteButton(id: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.innerText = '🗑';
    return button;
  }

  private buildTable(logs: Map<Date, LogType[]>): HTMLTableSectionElement {
    const tbody = document.createElement('tbody');
    logs.forEach((log, date) => {
      this.buildBlock(tbody, date, log);
    });
    return tbody;
  }

  async init() {
    await this.logModel.getAllLogs();
  }

  async handleDelete(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      const tr = e.target.closest('tr');
      const id = parseInt(tr.id, 10);
      const result = await this.logModel.deleteLog(id);
      if (result) {
        tr.remove();
      }
    }
  }

  render() {
    const tbody = this.buildTable(this.logModel.logMap);
    this.mountPoint.querySelector('tbody')?.remove();
    this.mountPoint.appendChild(tbody);
  }
}
