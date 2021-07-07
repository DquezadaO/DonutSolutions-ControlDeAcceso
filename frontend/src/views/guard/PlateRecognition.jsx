/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';

import ImageUploader from 'react-images-upload';

import AccessButton from '../../components/AccessButton';
import { plateRecognition, uploadImage, registerEntry } from '../../services/donutApi/guards';
import { openGate } from '../../utils/rasberry';

const initialState = {
  detected: false,
  plate: '',
  entryType: '',
  unitId: '',
  visitId: '',
};

export default function PlateRecognition() {
  const [pictureName, setPictureName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [car, setCar] = useState(initialState);
  const [gateStatus, setGateStatus] = useState('Portón cerrado');
  const [flag, setFlag] = useState(false);

  async function onDrop(pic) {
    setPictureName(pic[pic.length - 1].name);
    await uploadImage(pic[pic.length - 1]);
  }

  async function detectPlate() {
    setFlag(true);
    if (!pictureName) {
      alert('Debes subir una imagen');
      return;
    }
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setCar(initialState);
      const { isRegisteredCar, licensePlate, type, unitId, visitId } = await plateRecognition(
        pictureName,
      );
      setSuccess(isRegisteredCar);
      setCar({
        detected: true,
        plate: licensePlate,
        entryType: type,
        unitId,
        visitId,
      });
      setPictureName('');
      setLoading(false);
    }
  }

  const allowEntry = useCallback(async () => {
    if (!loading) {
      setLoading(true);
      const data = {
        unitId: car.unitId,
        type: car.entryType,
      };
      if (data.type === 'visit') {
        data.visitId = car.visitId;
      } else if (data.type === 'resident') {
        data.licensePlate = car.plate;
      }

      await registerEntry(data);
      handleGate();

      setLoading(false);
      setCar(initialState);
    }
  }, [car.entryType, car.plate, car.unitId, car.visitId, loading]);

  async function handleGate() {
    const data = await openGate();

    if (data === 'Opening barrier') {
      setGateStatus('El portón se está abriendo...');
      setTimeout(() => {
        setGateStatus('El portón está abierto');
        setTimeout(() => {
          setGateStatus('El portón se está cerrando...');
          setTimeout(() => {
            setGateStatus('Portón cerrado');
          }, 3000);
        }, 4000);
      }, 3000);
    }
  }

  useEffect(() => {
    if (success && car.entryType === 'resident' && flag && !loading) {
      allowEntry();
      setFlag(false);
    }
  }, [success, car.entryType, allowEntry, flag, loading]);

  return (
    <div className="flex-col items-center">
      <h1 className="text-2xl">{gateStatus}</h1>
      <ImageUploader
        withIcon={true}
        buttonText="Subir Imagen"
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.jpeg']}
        maxFileSize={5242880}
      />
      <div className="flex flex-col items-center justify-center">
        <hr className="w-full" />
        {pictureName && <h2>Revisando Imagen: {pictureName}</h2>}
        <hr className="w-full" />
        <AccessButton
          image={pictureName}
          success={success}
          loading={loading}
          detectPlate={detectPlate}
          allowEntry={allowEntry}
        />
        {car.detected &&
          (success ? (
            <>
              <h2>
                Vehículo {car.plate} de {car.entryType === 'resident' ? 'residente' : 'visita'} está
                autorizado para entrar
              </h2>
            </>
          ) : (
            <h2>Vehículo {car.plate} no autorizado para entrar</h2>
          ))}
      </div>
    </div>
  );
}
