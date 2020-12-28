// const mathjs = require("mathjs")

let baseInput1 = [
    [1, 1, 1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [1, 1, 1, 1],
    [1, -1, -1, -1],
    [1, -1, -1, -1],
    [1, 1, 1, 1],
];

let baseInput2 = [
    [-1, 1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, -1, 1],
    [-1, 1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, -1, 1],
    [-1, 1, 1, -1],
];

let baseInput3 = [
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
];

const baseInput = [
    baseInput1,
    baseInput2,
    baseInput3
]

let input1 = [
    [1, 1, 1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [1, 1, 1, 1],
    [1, -1, -1, -1],
    [1, -1, -1, -1],
    [1, 1, 1, 1],
];
let input2 = [
    [-1, 1, 1, -1],
    [1, -1, -1, 1],
    [1, -1, -1, 1],
    [-1, 1, 1, -1],
    [1, -1, 1, 1],
    [1, -1, 1, 1],
    [-1, 1, 1, -1],
];
let input3 = [
    [-1, -1, -1, 1],
    [-1, -1, -1, -1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, 1],
    [-1, -1, -1, -1],
    [-1, -1, -1, 1],
]


function learn(baseInput) {

}

/**
 * Транспонирование матрицы
 * @param {*} matrix
 */
const zeroTranspose = (matrix) =>
    matrix[0].map((col, i) => matrix.map((row) => row[i]));
const transposedMatrix1 = zeroTranspose(baseInput1);
const transposedMatrix2 = zeroTranspose(baseInput2);
const transposedMatrix3 = zeroTranspose(baseInput3);
// console.log(transposedMatrix);

/**
 * Умножение матриц
 * @param {*} A
 * @param {*} B
 */
function MultiplyMatrix(A, B) {
    var rowsA = A.length,
        colsA = A[0].length,
        rowsB = B.length,
        colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++) {
        for (var i = 0; i < rowsA; i++) {
            var t = 0;
            for (var j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
            C[i][k] = t;
        }
    }
    return C;
}

/**
 * Сложение матриц
 * @param {*} A 
 * @param {*} B 
 */
function SumMatrix(A,B) 
{   
    var m = A.length, n = A[0].length, C = [];
    for (var i = 0; i < m; i++)
     { C[ i ] = [];
       for (var j = 0; j < n; j++) C[ i ][j] = A[ i ][j]+B[ i ][j];
     }
    return C;
}

/**
 * Обнуление по диагонали
 * @param {*} W
 */
function zeroIJ(W) {
    for (let index = 0; index < W.length; index++) {
        W[index][index] = 0;
    }
    return W;
}

let W1 = zeroIJ(MultiplyMatrix(baseInput1, transposedMatrix1));
let W2 = zeroIJ(MultiplyMatrix(baseInput2, transposedMatrix2));
let W3 = zeroIJ(MultiplyMatrix(baseInput3, transposedMatrix3));
// 

let W = SumMatrix(W1,W2)
W = SumMatrix(W,W3)
// console.log(W);

function net(W, S) {
    let res = [];
    for (let index = 0; index < S.length; index++) {
        res[index] = []
    }
    for (let Srows = 0; Srows < S[0].length; Srows++) {
        let Si = [];
        for (let index = 0; index < S.length; index++) {
            Si[index] = S[index][Srows];
        }
        for (let Scol = 0; Scol < S.length; Scol++) {
            res[Scol][Srows] = 0;
            for (let Wj = 0; Wj < W[0].length; Wj++) {
                res[Scol][Srows] += W[Scol][Wj] * Si[Wj];
            }
            const p = res[Scol][Srows];
            // res[Scol][Srows] = p > 0 ? 1 : p < 0 ? -1 : 0
        }
    }
    console.log(res);
    // let res = [[]]
    // for (let col = 0; col<W.length;col++) {
        
    // }
    // return res;
}
console.log("out");
net(W, input1);
// console.log(input.length);
