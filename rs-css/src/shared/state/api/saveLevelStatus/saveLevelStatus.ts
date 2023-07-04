import { watchedState } from "@shared/state";
// import { getSavedLevels } from "..";
import { storageKeys } from "../../lib/config";

export const saveLevelStatus = (): void => {
    localStorage.setItem(storageKeys.savedLevels, JSON.stringify(watchedState.levelStat));
    // watchedState.levelStat = getSavedLevels();
}