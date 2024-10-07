// tests/crosswordSolver.test.js

const { describe, it, expect } = import('vitest');
const {
    isValidPuzzleFormat,
    isValidWordList,
    hasNoDuplicates,
    solveCrossword,
    parsePuzzleString,
    initializeFilledGrid,
    countStartingPositions,
    placeWords,
    canPlaceWord,
    formatFilledGrid
} = import('../src/crosswordSolver');

describe('Crossword Solver Tests', () => {
    
    describe('Validation Functions', () => {
        
        it('should validate correct puzzle format', () => {
            const puzzle = '2001\n0..0\n1000\n0..0';
            expect(isValidPuzzleFormat(puzzle)).toBe(true);
        });

        it('should invalidate incorrect puzzle format', () => {
            const puzzle = '2001\n0..0\n10A0\n0..0'; // Contains 'A'
            expect(isValidPuzzleFormat(puzzle)).toBe(false);
        });

        it('should validate correct word list', () => {
            const words = ['casa', 'alan', 'ciao', 'anta'];
            expect(isValidWordList(words)).toBe(true);
        });

        it('should invalidate word list with duplicates', () => {
            const words = ['casa', 'alan', 'casa', 'anta'];
            expect(isValidWordList(words)).toBe(false);
        });

        it('should invalidate word list with insufficient words', () => {
            const words = ['casa', 'alan'];
            expect(isValidWordList(words)).toBe(false);
        });

        it('should invalidate word list with non-string elements', () => {
            const words = ['casa', 'alan', 123, 'anta'];
            expect(isValidWordList(words)).toBe(false);
        });

    });

    describe('Grid Parsing and Initialization', () => {
        
        it('should parse puzzle string into grid correctly', () => {
            const puzzle = '2001\n0..0\n1000\n0..0';
            const expectedGrid = [
                [2, 0, 0, 1],
                [0, -1, -1, 0],
                [1, 0, 0, 0],
                [0, -1, -1, 0]
            ];
            expect(parsePuzzleString(puzzle)).toEqual(expectedGrid);
        });

        it('should initialize filled grid correctly', () => {
            const grid = [
                [2, 0, 0, 1],
                [0, -1, -1, 0],
                [1, 0, 0, 0],
                [0, -1, -1, 0]
            ];
            const expectedFilledGrid = [
                ['', '', '', ''],
                ['.', '.', '.', '.'],
                ['', '', '', ''],
                ['.', '.', '.', '.']
            ];
            expect(initializeFilledGrid(grid)).toEqual(expectedFilledGrid);
        });

        it('should count starting positions correctly', () => {
            const grid = [
                [2, 0, 0, 1],
                [0, -1, -1, 0],
                [1, 0, 0, 0],
                [0, -1, -1, 0]
            ];
            expect(countStartingPositions(grid)).toBe(4);
        });

    });

    describe('Main Solver Function', () => {
        
        it('should solve the crossword puzzle correctly', () => {
            const puzzle = '2001\n0..0\n1000\n0..0';
            const words = ['casa', 'alan', 'ciao', 'anta'];
            const expectedSolution = 'casa\na.a.\ns.c.\na.a.';
            const result = solveCrossword(puzzle, words);
            expect(result).toBe(expectedSolution);
        });

        it('should return error for invalid puzzle format', () => {
            const puzzle = '2001\n0..0\n10A0\n0..0'; // Contains 'A'
            const words = ['casa', 'alan', 'ciao', 'anta'];
            const result = solveCrossword(puzzle, words);
            expect(result).toBe('Error: Invalid puzzle format');
        });

        it('should return error for invalid word list', () => {
            const puzzle = '2001\n0..0\n1000\n0..0';
            const words = ['casa', 'alan', 'casa', 'anta']; // Duplicate 'casa'
            const result = solveCrossword(puzzle, words);
            expect(result).toBe('Error: Invalid word list');
        });

        it('should return error if starting positions do not match word list length', () => {
            const puzzle = '2001\n0..0\n1000\n0..0';
            const words = ['casa', 'alan', 'ciao']; // Only 3 words, but starting positions are 4
            const result = solveCrossword(puzzle, words);
            expect(result).toBe('Error: The number of starting positions does not match the number of words');
        });

        it('should return error if unable to place all words', () => {
            const puzzle = '2001\n0..0\n1000\n0..0';
            const words = ['casa', 'alan', 'ciao', 'xyz']; // 'xyz' may not fit
            const result = solveCrossword(puzzle, words);
            expect(result).toBe('Error: Unable to place all words');
        });

    });

    // Additional tests can be added here for more granular functions if desired

});
