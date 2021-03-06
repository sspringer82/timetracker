import { isSameDay } from 'date-fns';
import LogType from './util/log';
import Dexie from 'dexie';

export default class Log {
  private logs: LogType[];
  public logMap: Map<Date, LogType[]>;
  private db: Dexie;

  constructor() {
    this.db = new Dexie('LogsDatabase');
    this.db.version(1).stores({
      logs: 'id,project',
    });
  }

  async getAllLogs(): Promise<Map<Date, LogType[]>> {
    try {
      const request = await fetch('http://localhost:3030/logs');
      this.logs = await request.json();

      this.db.table('logs').clear();
      this.db.table('logs').bulkAdd(this.logs);
    } catch (e) {
      this.logs = await this.db.table('logs').toArray();
    }

    this.logMap = this.getLogsSortedByDay(this.logs);
    return this.logMap;
  }

  async deleteLog(id: number): Promise<boolean> {
    const request = await fetch(`http://localhost:3030/logs/${id}`, {
      method: 'DELETE',
    });
    return request.status === 200;
  }

  async createLog(log: Omit<LogType, 'id'>): Promise<LogType> {
    const request = await fetch('http://localhost:3030/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    });
    const data = await request.json();
    this.logs.push(data);
    this.logMap = this.getLogsSortedByDay(this.logs);

    return data;
  }

  async updateLog(log: LogType): Promise<LogType> {
    const request = await fetch(`http://localhost:3030/logs/${log.id}`, {
      method: 'PUT',
      body: JSON.stringify(log),
    });
    const data = await request.json();
    return data;
  }

  private getLogsSortedByDay(logs: LogType[]): Map<Date, LogType[]> {
    return logs
      .sort((a, b) => b.from - a.from)
      .reduce((prev: Map<Date, LogType[]>, current: LogType) => {
        let dateKey: Date;
        const currentDate = new Date(current.from);
        prev.forEach((v, mapKey) => {
          if (isSameDay(mapKey, currentDate)) {
            dateKey = mapKey;
          }
        });
        if (!dateKey) {
          prev.set(currentDate, [current]);
        } else {
          prev.set(dateKey, [...prev.get(dateKey), current]);
        }
        return prev;
      }, new Map<Date, LogType[]>());
  }
}
