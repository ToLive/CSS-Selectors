import { watchedState } from "../..";

export const setSelectedItem = (num: number): void => {
    watchedState.selectedItem = num;
}

export const NOT_SET_ITEM = -1;