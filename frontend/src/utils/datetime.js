export function scheduleGenerator(scheduleTime) {
  const start = new Date(scheduleTime);
  const end = new Date(scheduleTime);

  start.setTime(start.getTime() - 6 * 60 * 60 * 1000); // -2 hour
  end.setTime(end.getTime() - 2 * 60 * 60 * 1000); // +2 hour

  return [start.toISOString(), end.toISOString()];
}

export function formatDate(datetime) {
  const newDate = datetime.replace('T', ' ').replace('Z', '').slice(0, 16);
  return newDate;
}
