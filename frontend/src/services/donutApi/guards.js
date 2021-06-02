import axios from 'axios';

import { scheduleGenerator } from '../../utils/datetime';
import { post, get } from '../../utils/requests';
import { getCookieFromBrowser } from '../../utils/session';

export async function newGuard(body) {
  try {
    const token = await getCookieFromBrowser('token');
    const { firstName, lastName, email, phone } = body;
    const unitId = 1; // se asigna a la unidad por defecto
    const role = 'guardia';
    const password = '123456';
    const response = await post(
      'backoffice/newUser',
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        id_unit: unitId,
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

export async function getGuards() {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await get('shared/users', token);
    const data = response.data.data;
    return data.filter((e) => e.role === 'guardia');
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getVisits() {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await get('guard/getCondominiumVisits', token);
    const data = response.data.data;
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
      'guard/scheduleVisit',
      {
        firstName: visit.firstName,
        lastName: visit.lastName,
        run: visit.run,
        phone: visit.phone,
        licensePlate: visit.licensePlate,
        residentId: parseInt(visit.residentId),
        scheduleStart,
        scheduleEnd,
      },
      token,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function uploadImage(img) {
  try {
    const token = await getCookieFromBrowser('token');
    const form = new FormData();
    form.append('file', img);
    await axios.post('guard/uploadImage', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function plateRecognition(licensePlate) {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await post(
      'guard/detectLicensePlate',
      {
        licensePlateFilename: licensePlate,
        condominiumId: 1,
      },
      token,
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}
