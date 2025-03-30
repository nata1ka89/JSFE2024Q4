import { createCar, getCars } from '../api/api-garage';

const carFirstPath = [
  'Mazda',
  'Ford',
  'BMW',
  'Audi',
  'Mercedes',
  'Toyota',
  'Honda',
  'Chevrolet',
  'Nissan',
  'Volkswagen',
];

const carSecondPath = [
  '6',
  'Mustang',
  'Civic',
  'Corolla',
  'Camry',
  'Accord',
  'X-Trail',
  'X5',
  'A4',
  'Golf',
];

const getRandomName = (): string => {
  const brand = carFirstPath[Math.floor(Math.random() * carFirstPath.length)];
  const model = carSecondPath[Math.floor(Math.random() * carSecondPath.length)];
  return `${brand} ${model}`;
};

const getRandomColor = (): string => {
  return `#${Math.floor(Math.random() * 16_777_215).toString(16)}`;
};

export const generateRandomCars = async (count: number = 100): Promise<void> => {
  for (let index = 0; index < count; index++) {
    await createCar({
      name: getRandomName(),
      color: getRandomColor(),
    });
  }
  await getCars();
};
