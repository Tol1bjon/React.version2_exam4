import { useSyncExternalStore } from 'react';

const storageKey = 'favoriteCars';
const eventName = 'favoriteCarsChanged';

const readFavorites = () => {
    const storedFavorites = window.localStorage.getItem(storageKey);

    if (!storedFavorites) {
        return [];
    }

    try {
        const favorites = JSON.parse(storedFavorites);
        return Array.isArray(favorites) ? favorites : [];
    } catch (error) {
        console.error('Could not read saved cars from local storage.', error);
        return [];
    }
};

let favoriteSnapshot = typeof window === 'undefined' ? [] : readFavorites();

const notifySubscribers = () => {
    window.dispatchEvent(new Event(eventName));
};

const handleStorageChange = (event) => {
    if (event.key === storageKey) {
        favoriteSnapshot = readFavorites();
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

const getSnapshot = () => favoriteSnapshot;

export const useFavorites = () => useSyncExternalStore(subscribe, getSnapshot, () => []);

export const getFavoriteId = (car, variation = car.variation) => {
    const carId = car.modelId || car.id;
    const variationId = variation?.id || variation?.color;
    const brandName = car.brandName || car.brand || '';

    if (!carId) {
        throw new Error('A saved car must have a model ID.');
    }

    return [brandName, carId, variationId].filter(Boolean).join(':');
};

export const toggleFavorite = (car) => {
    const favoriteId = car.favoriteId || getFavoriteId(car);
    const alreadySaved = favoriteSnapshot.some((favorite) => favorite.favoriteId === favoriteId);
    const nextFavorites = alreadySaved
        ? favoriteSnapshot.filter((favorite) => favorite.favoriteId !== favoriteId)
        : [...favoriteSnapshot, { ...car, favoriteId }];

    window.localStorage.setItem(storageKey, JSON.stringify(nextFavorites));
    favoriteSnapshot = nextFavorites;
    notifySubscribers();
};
