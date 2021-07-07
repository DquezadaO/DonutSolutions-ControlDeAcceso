import { post, get, remove, put } from '../../utils/requests';
import { getCookieFromBrowser } from '../../utils/session';

export async function getCars() {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await get('backoffice/getCars', token);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function newCar(body) {
  try {
    const token = await getCookieFromBrowser('token');
    const { licensePlate, carBrand, carModel, carColor, unitId } = body;
    const response = await post(
      'backoffice/registerCar',
      {
        id_unit: parseInt(unitId),
        license_plate: licensePlate,
        car_brand: carBrand,
        car_model: carModel,
        car_color: carColor,
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

export async function getUnits() {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await get('shared/units', token);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getProviders() {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await get('backoffice/getProviders', token);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function newProvider(body) {
  try {
    const token = await getCookieFromBrowser('token');
    const { firstName, lastName, run, phone, licensePlate } = body;
    const response = await post(
      'backoffice/addProvider',
      {
        first_name: firstName,
        last_name: lastName,
        run,
        license_plate: licensePlate,
        phone,
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

export async function deleteResident(residentId) {
  try {
    const token = await getCookieFromBrowser('token');
    const response = await remove(`backoffice/user/${residentId}`, token);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function editResident(residentId, data) {
  const token = await getCookieFromBrowser('token');
  const response = await put(`backoffice/user/${residentId}`, data, token);
  const responseData = response.data.data;
  return responseData;
}

export async function deleteCar(data) {
  const token = await getCookieFromBrowser('token');
  const response = await post(`backoffice/deleteCar`, data, token);
  const responseData = response.data.data;
  return responseData;
}

export async function editCar(data) {
  const token = await getCookieFromBrowser('token');
  const response = await put(`backoffice/editCar`, data, token);
  const responseData = response.data.data;
  return responseData;

}
