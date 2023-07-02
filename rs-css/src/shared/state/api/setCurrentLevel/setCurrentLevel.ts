import { watchedState } from "../..";

export const setCurrentLevel = (num: number): void => {
    watchedState.currentLevel = num;
}