import * as StateApi from "..";

it('Test that reset progress clear LocalStorage data', () => {
    StateApi.changeLevelStat({ num: 0, solved: true, isHintUsed: true });
    StateApi.changeLevelStat({ num: 1, solved: false, isHintUsed: true });
    StateApi.resetProgress();

    const levels = StateApi.getSavedLevels();
    expect(levels).toBeNull;
});