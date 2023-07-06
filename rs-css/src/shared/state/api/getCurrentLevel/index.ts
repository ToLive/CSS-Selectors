import { watchedState } from "../..";
import { storageKeys } from "../../lib/config";

export const getCurrentLevel = (): number => {
    const DEFAULT_LEVEL = 0;

    const level = watchedState.currentLevel || Number(localStorage.getItem(storageKeys.currentLevel) || DEFAULT_LEVEL);

    return level;
}