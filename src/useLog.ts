import axios from 'axios';
import { useCallback, useContext } from 'react';
import Log from './Log';
import { logContext } from './logContext';

export default function useLog() {
  const [logs, setLogs] = useContext(logContext);

  const loadLogs = useCallback(async function loadLogs(): Promise<Log[]> {
    if (logs.length === 0) {
      const {data} = await axios.get<Log[]>('http://localhost:3001/logs');
      setLogs(data);
      return data;
    }
    return logs;
  }, [logs, setLogs]);

  const getProjects = useCallback(async function getProjects(): Promise<string[]> {
    return Array.from(new Set((await loadLogs()).map(log => log.project)));
  }, [loadLogs]);

  return {loadLogs, getProjects}
}