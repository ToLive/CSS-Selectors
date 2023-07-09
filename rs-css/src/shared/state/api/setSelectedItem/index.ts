import { watchedState } from "../..";

export const setSelectedItem = (num: number): void => {
    watchedState.selectedItem = num;
}