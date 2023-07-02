import { watchedState } from "@shared/state";
import { storageKeys } from "../lib/config";

export const saveCurrentLevel = (): void => {
    localStorage.setItem(storageKeys.currentLevel, JSON.stringify(watchedState.currentLevel));
}