function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function color(r, g, b) {
    return `rgb(${r},${g},${b})`
}

function map(inputStart, inputEnd, outputStart, outputEnd, x) {
    return(x - inputStart) / (inputEnd - inputStart) * (outputEnd - outputStart) + outputStart
}