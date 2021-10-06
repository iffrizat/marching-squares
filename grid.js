class Grid {
    // Describes which sides to connect for each point configuration
    /*

    3--0--2
    |     |
    3     1
    |     |
    0--2--1

    */


    static CONF_TABLE = [
        [],               // 0 conf
        [[3, 2]],         // 1 conf
        [[2, 1]],         // 2 conf
        [[3, 1]],         // 3 conf
        [[0, 1]],         // 4 conf
        [[3, 0], [2, 1]], // 5 conf
        [[0, 2]],         // 6 conf
        [[3, 0]],         // 7 conf
        [[3, 0]],         // 8 conf
        [[0, 2]],         // 9 conf
        [[3, 2], [0, 1]], // 10 conf
        [[0, 1]],         // 11 conf
        [[3, 1]],         // 12 conf
        [[2, 1]],         // 13 conf
        [[3, 2]],         // 14 conf
        [],               // 15 conf
    ];

    // Describes points which are connected by a given side
    static CONNECTIONS = [
        [3, 2],
        [2, 1],
        [1, 0],
        [0, 3]
    ];

    constructor(width, height, cellSize, threshold) {
        this.cols = width  / cellSize + 1;
        this.rows = height / cellSize + 1;
        this.cellSize = cellSize;
        this.threshold = threshold;

        this.getIndex = (col, row) => row*this.rows + col;

        this.values = [];

        // Describes the saddle points needed 
        // to represent each side using top-left point as origin
        this.SADDLE_POINTS = [
            {xoff: this.cellSize/2, yoff: 0},                               // 0th side 
            {xoff: this.cellSize, yoff: this.cellSize/2},                   // 1st side
            {xoff: this.cellSize/2, yoff: this.cellSize},                   // 2nd side
            {xoff: 0, yoff: this.cellSize/2},                               // 3rd side
        ]

        for (let i = 0; i < this.cols*this.rows; i++) this.values.push(0);
    }

    applyInfluence(col, row, infl) {
        this.values[this.getIndex(col, row)] += infl;
    }

    solve(points) {
        let config = 0;
        const answers = [];
        if (points[0] >= this.threshold) config |= 1;
        if (points[1] >= this.threshold) config |= 2;
        if (points[2] >= this.threshold) config |= 4;
        if (points[3] >= this.threshold) config |= 8;

        if (config == 15 || config == 0) return answers;

        for (const sides of Grid.CONF_TABLE[config]) {
            const [side1, side2] = sides;
            const [saddle1, saddle2] = [this.SADDLE_POINTS[side1], this.SADDLE_POINTS[side2]];

            const answer1 = {xoff: saddle1.xoff, yoff: saddle1.yoff};
            const answer2 = {xoff: saddle2.xoff, yoff: saddle2.yoff};

            answers.push([answer1, answer2]);
        }

        return answers;
    }
}