import * as StateApi from "..";
import { watchedState } from "../..";

describe('Test update levels', () => {
    it('Test that levels state updated propertly', () => {
        const levelData = { num: 1, solved: true, isHintUsed: false };
        const levelData2 = { num: 3, solved: false, isHintUsed: false };

        if (watchedState.levelStat) {
            watchedState.levelStat[0] = { num: 1, solved: true, isHintUsed: false };
            watchedState.levelStat[2] = { num: 3, solved: false, isHintUsed: false };

            StateApi.changeLevelStat(levelData);
            StateApi.changeLevelStat(levelData2);
            expect(watchedState.levelStat[0]).toEqual(levelData);
            expect(watchedState.levelStat[2]).toEqual(levelData2);
        }
    });

    it('Test if changeLevelStat is called', () => {
        const levelData = { num: 1, solved: false, isHintUsed: false };

        const mockChangeLevel = jest.spyOn(StateApi, 'changeLevelStat');

        StateApi.changeLevelStat(levelData);

        expect(mockChangeLevel).toHaveBeenCalled();
    });

    it('Test that sending null not break function', () => {
        const levelData = { num: 1, solved: true, isHintUsed: false };
        watchedState.levelStat = null;
        StateApi.changeLevelStat(levelData);

        expect(watchedState.levelStat).toBeNull();
    });
});