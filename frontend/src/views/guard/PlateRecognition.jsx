import React, { useState } from 'react';

import ImageUploader from 'react-images-upload';

import AccessButton from '../../components/AccessButton';
import { plateRecognition, uploadImage } from '../../services/donutApi/guards';

export default function PlateRecognition() {
  const [pictureName, setPictureName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [car, setCar] = useState({
    detected: false,
    plate: '',
  });

  async function onDrop(pic) {
    setPictureName(pic[pic.length - 1].name);
    await uploadImage(pic[pic.length - 1]);
  }

  async function detectPlate() {
    if (!pictureName) {
      alert('Debes subir una imagen');
      return;
    }
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setCar({});
      const { isRegisteredCar, licensePlate } = await plateRecognition(pictureName);
      setSuccess(isRegisteredCar);
      setCar({
        detected: true,
        plate: licensePlate,
      });
      setPictureName('');
      setLoading(false);
    }
  }

  return (
    <div className="flex-col items-center">
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
        />
        {car.detected &&
          (success ? (
            <h2>Vehículo {car.plate} está autorizado para entrar</h2>
          ) : (
            <h2>Vehículo no autorizado para entrar</h2>
          ))}
      </div>
    </div>
  );
}
