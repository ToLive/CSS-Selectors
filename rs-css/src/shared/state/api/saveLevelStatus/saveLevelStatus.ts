import { watchedState } from "@shared/state";
// import { getSavedLevels } from "..";
import { storageKeys } from "../../lib/config";

export const saveLevelStatus = (): void => {
    console.log('save to local storage');

    localStorage.setItem(storageKeys.savedLevels, JSON.stringify(watchedState.levelStat));
    // watchedState.levelStat = getSavedLevels();
}