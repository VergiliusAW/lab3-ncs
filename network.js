var network = (module.exports = {});

let W = [];

network.learn = function (baseInput) {
    // const mat = zeroTOminus(baseInput[0]);
    // const transposedMatrix1 = zeroTranspose(mat);
    // W = zeroIJ(MultiplyMatrix(mat, transposedMatrix1));

    const mat = zeroTOminus(baseInput[0]);

    for (let col = 0; col < mat[0].length; col++) {
        const prom = getVector(mat, col);
        const Wp = zeroIJ(multiplyVector(prom, prom));
        W[col] = Wp;
    }

    for (let c = 1; c < baseInput.length; c++) {
        const m = zeroTOminus(baseInput[c]);

        for (let col = 0; col < m[0].length; col++) {
            const prom = getVector(m, col);
            const Wp = zeroIJ(multiplyVector(prom, prom));
            W[col] = SumMatrix(W[col], Wp);
        }
        // const transposedMatrix = zeroTranspose(m);
        // let W1 = zeroIJ(MultiplyMatrix(m, transposedMatrix));
        // W = SumMatrix(W, W1);
    }
};

function getVector(m, col) {
    let prom = [];
    for (let i = 0; i < m.length; i++) {
        prom[i] = m[i][col];
    }
    return prom;
}

network.net = function (Si) {
    const S = zeroTOminus(Si)
    // let res = [];
    // for (let index = 0; index < S.length; index++) {
    //     res[index] = [];
    // }
    // for (let Srows = 0; Srows < S[0].length; Srows++) {
    //     let Si = [];
    //     for (let index = 0; index < S.length; index++) {
    //         Si[index] = S[index][Srows];
    //     }
    //     for (let Scol = 0; Scol < S.length; Scol++) {
    //         res[Scol][Srows] = 0;
    //         for (let Wj = 0; Wj < W[0].length; Wj++) {
    //             res[Scol][Srows] += W[Scol][Wj] * Si[Wj];
    //         }
    //         const p = res[Scol][Srows];
    //         res[Scol][Srows] = p > 0 ? 1 : p < 0 ? 0 : 0;
    //     }
    // }
    // return res;

    // console.log("--------------------------------------------")
    // console.log("--------------------------------------------")
    // console.log("--------------------------------------------")

    // console.log(S)
    // console.log("--------------------------------------------")    
    // console.log("--------------------------------------------")
    // console.log("--------------------------------------------")

    // console.log(W)


    let res = [];
    for (let index = 0; index < S.length; index++) {
        res[index] = [];
    }
    for (let Scol = 0; Scol < S[0].length; Scol++) {
        const col = getVector(S, Scol);
        // res[Scol] = [];
        for (let Wcol = 0; Wcol < W[Scol].length; Wcol++) {
            res[Scol][Wcol] = 0;
            for (let Wrow = 0; Wrow < W[Scol][Wcol].length; Wrow++) {
                res[Scol][Wcol] += W[Scol][Wcol][Wrow] * col[Wrow];
                // console.log(res[Scol][Wcol])
            }
            // console.log(col)
            const p = res[Scol][Wcol];
            res[Scol][Wcol] = p > 0 ? 1 : 0;
            // console.log(res[Scol][Wcol])
        }
        console.log()
    }
    return  zeroTranspose(res);
};

/**
 * 0 => -1
 * @param {*} matrix
 */
function zeroTOminus(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = matrix[i][j] === 0 ? -1 : 1;
        }
    }
    return matrix;
}

/**
 * Транспонирование матрицы
 * @param {*} matrix
 */
const zeroTranspose = (matrix) =>
    matrix[0].map((col, i) => matrix.map((row) => row[i]));

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

/**
 * Сложение матриц
 * @param {*} A
 * @param {*} B
 */
function SumMatrix(A, B) {
    var m = A.length,
        n = A[0].length,
        C = [];
    for (var i = 0; i < m; i++) {
        C[i] = [];
        for (var j = 0; j < n; j++) C[i][j] = A[i][j] + B[i][j];
    }
    return C;
}

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
 * Перемножение векторов
 * @param {*} A
 * @param {*} B
 */
function multiplyVector(a, b) {
    const aL = a.length;
    const bL = b.length;
    let res = [];
    for (let i = 0; i < aL; i++) {
        res[i] = [];
        for (let j = 0; j < bL; j++) {
            res[i][j] = a[i] * b[j];
        }
    }
    return res;
}
