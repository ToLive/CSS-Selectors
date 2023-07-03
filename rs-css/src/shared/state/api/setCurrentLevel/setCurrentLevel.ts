import { watchedState } from "../..";
import { storageKeys } from "../../lib/config";

export const setCurrentLevel = (num: number): void => {
    watchedState.currentLevel = num;

    localStorage.setItem(storageKeys.currentLevel, JSON.stringify(num));
}