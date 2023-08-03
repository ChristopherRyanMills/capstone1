export const rgbToLab = (paint) => {
    const rgbToXYZ = (color) => {
        // get individual components off of paint object
        let R = (color.r / 255)
        let G = (color.g / 255)
        let B = (color.b / 255)

        // inverse rgb companding
        if (R > 0.04045) {
            R = Math.pow(((R + 0.055) / 1.055), 2.4)
        }
        else {
            R = R / 12.92
        }
        if (G > 0.04045) {
            G = Math.pow(((G + 0.055) / 1.055), 2.4)
        }
        else {
            G = G / 12.92
        }
        if (B > 0.04045) {
            B = Math.pow(((B + 0.055) / 1.055), 2.4)
        }
        else {
            B = B / 12.92
        }

        //multiply by transformation matrix for D65 white
        R *= 100
        G *= 100
        B *= 100

        const X = R * 0.4124 + G * 0.3576 + B * 0.1805
        const Y = R * 0.2126 + G * 0.7152 + B * 0.0722
        const Z = R * 0.0193 + G * 0.1192 + B * 0.9505
        
        return {X, Y ,Z}
    }

    const xyzToLab = (xyzColor) => {
        //divide xyz by reference white and matrix conversion
        const refX = 95.047
        const refY = 100.000
        const refZ = 108.883
        let x = xyzColor.X / refX
        let y = xyzColor.Y / refY
        let z = xyzColor.Z / refZ

        if (x > 0.008856) {x = Math.pow(x, 1/3)}
            else {x = (7.787 * x) + (16 / 116)}
        if (y > 0.008856) {y = Math.pow(y, 1/3)}
            else {y = (7.787 * y) + (16 / 116)}
        if (z > 0.008856) {z = Math.pow(z, 1/3)}
            else {z = (7.787 * z) + (16 / 116)}

        const L = (116 * y) - 16
        const a = 500 * (x-y)
        const b = 200 * (y-z)

        return {L, a, b}
    }

    return xyzToLab(rgbToXYZ(paint))
}