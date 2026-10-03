import { useSyncExternalStore } from 'react';

const storageKey = 'comparedCars';
const eventName = 'comparedCarsChanged';

const readComparedCars = () => {
    const storedCars = window.localStorage.getItem(storageKey);

    if (!storedCars) {
        return [];
    }

    try {
        const cars = JSON.parse(storedCars);
        return Array.isArray(cars) ? cars : [];
    } catch (error) {
        console.error('Could not read compared cars from local storage.', error);
        return [];
    }
};

let comparedCarsSnapshot = typeof window === 'undefined' ? [] : readComparedCars();

const notifySubscribers = () => {
    window.dispatchEvent(new Event(eventName));
};

const handleStorageChange = (event) => {
    if (event.key === storageKey) {
        comparedCarsSnapshot = readComparedCars();
        notifySubscribers();
    }
};

if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageChange);
}

const subscribe = (callback) => {
    window.addEventListener(eventName, callback);

    return () => {
        window.removeEventListener(eventName, callback);
    };
};

const getSnapshot = () => comparedCarsSnapshot;

export const useComparedCars = () => useSyncExternalStore(subscribe, getSnapshot, () => []);

export const getCompareId = (car, variation = car.variation) => {
    const carId = car.modelId || car.id;
    const variationId = variation?.id || variation?.color;
    const brandName = car.brandName || car.brand || '';

    if (!carId) {
        throw new Error('A compared car must have a model ID.');
    }

    return [brandName, carId, variationId].filter(Boolean).join(':');
};

export const toggleCompare = (car) => {
    const compareId = car.compareId || getCompareId(car);
    const alreadyCompared = comparedCarsSnapshot.some((item) => item.compareId === compareId);
    const nextCars = alreadyCompared
        ? comparedCarsSnapshot.filter((item) => item.compareId !== compareId)
        : [...comparedCarsSnapshot, { ...car, compareId }];

    window.localStorage.setItem(storageKey, JSON.stringify(nextCars));
    comparedCarsSnapshot = nextCars;
    notifySubscribers();
};

export const removeComparedCar = (compareId) => {
    const nextCars = comparedCarsSnapshot.filter((car) => car.compareId !== compareId);

    window.localStorage.setItem(storageKey, JSON.stringify(nextCars));
    comparedCarsSnapshot = nextCars;
    notifySubscribers();
};
