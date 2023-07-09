export type State = {
    currentLevel: number,
    selectedItem: number,
    levelStat: SavedLevel[] | null,
}

export type EventDetail = {
    levelNum: number;
    savedLevel: SavedLevel;
    itemNum: number;
}

export type SavedLevel = {
    num: number;
    solved: boolean;
    isHintUsed: boolean;
};