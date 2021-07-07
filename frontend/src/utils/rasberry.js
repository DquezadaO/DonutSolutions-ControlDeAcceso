export async function openGate() {
  const body = JSON.stringify({
    command: 'open-gate',
  });

  const url = process.env.REACT_APP_RASBERRY_URL || '127.0.0.1:8000';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.json();

  return data.msg;
}
