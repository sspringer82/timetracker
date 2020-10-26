export function formatDuration(durationInSeconds: number): string {
  const minutes = Math.abs(Math.floor(durationInSeconds / 60) % 60);
  const hours = Math.abs(Math.floor(durationInSeconds / 3600));
  if (isNaN(minutes) || isNaN(hours)) {
    return '00:00';
  }
  return `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
}
