import { setCurrentLevel } from "../../../shared/state/api/setCurrentLevel/setCurrentLevel";
import { storageKeys } from "../lib/config";

const getSavedCurrentLevel = (): number => {
    const level = Number(localStorage.getItem(storageKeys.currentLevel) || 0);

    setCurrentLevel(level);

    return level;
};

export { getSavedCurrentLevel };