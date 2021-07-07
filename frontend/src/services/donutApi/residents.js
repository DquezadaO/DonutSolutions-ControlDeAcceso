import { scheduleGenerator } from '../../utils/datetime';
import { post, get, remove, put } from '../../utils/requests';
import { getCookieFromBrowser } from '../../utils/session';

export async function newResident(body) {
  try {
    const token = await getCookieFromBrowser('token');
    const { firstName, lastName, email, phone, unitId } = body;
    const role = 'residente';
    const password = '123456';
    const response = await post(
      'backoffice/newUser',
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        id_unit: parseInt(unitId),
        role,
        password,
      },
      token,
    );
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getResidents() {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await get('shared/users', token);
    const data = response.data.data;
    return data.filter((e) => e.role === 'residente');
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getHistory(residentId) {
  try {
    const token = await getCookieFromBrowser('token');
    const url = `resident/${residentId}/visits`;
    const response = await get(url, token);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function addVisit(visit) {
  try {
    const [scheduleStart, scheduleEnd] = scheduleGenerator(visit.arrivalDate);
    const token = await getCookieFromBrowser('token');
    await post(
      'resident/scheduleVisit',
      {
        firstName: visit.firstName,
        lastName: visit.lastName,
        run: visit.run,
        phone: visit.phone,
        licensePlate: visit.licensePlate,
        scheduleStart,
        scheduleEnd,
      },
      token,
    );
    alert('Visita agendada');
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function deleteVisit(visitId) {
  const token = await getCookieFromBrowser('token');
  const response = await remove(`resident/visit/${visitId}`, token);
  const data = response.data.data;
  return data;
}

export async function editVisit(visitId, data) {
  const token = await getCookieFromBrowser('token');
  const response = await put(`resident/scheduleVisit/${visitId}`, data, token);
  const responseData = response.data.data;
  return responseData;
}
