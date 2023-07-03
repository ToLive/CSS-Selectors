export type State = {
    currentLevel: number,
    levelStat: SavedLevel[] | null,
}

export type EventDetail = {
    levelNum: number;
    savedLevel: SavedLevel;
}

export type SavedLevel = {
    num: number;
    solved: boolean;
    isHintUsed: boolean;
};