import { rgbToLab } from "./conversions"

export const CIE2000 = (paint1, paint2) => {
    let c1 = rgbToLab(paint1)
    let c2 = rgbToLab(paint2)

    //arctan, degree and radian conversion functions for h1p & h2p
    const toDegrees = (n) => {
        return n * (180 / Math.PI)
    }

    const toRadians = (n) => {
        return n * (Math.PI / 180)
    }

    //direction can be given in negative degrees/radians so make sure it is positive to avoid imaginary numbers
    const hpF = (x, y) => {
        if (x === 0 && y === 0) {return 0}
        else {
            const tmphp = toDegrees(Math.atan2(x, y))
            if (tmphp >= 0) {return tmphp}
            else {return tmphp + 360}
        }
    }

    // also need a delta h prime check to ensure positive degrees between 0<x<360
    const dhpF = (C1, C2, h1p, h2p) => {
        if (C1 * C2 === 0) {return 0}
        else if (Math.abs(h2p - h1p) <= 180) {return h2p - h1p}
        else if ((h2p - h1p) > 180) {return (h2p - h1p) - 360}
        else if ((h2p - h1p) < -180) {return (h2p - h1p) + 360}
    }

    //one more check for a H prime
    const aHpF = (C1, C2, h1p, h2p) => {
        if (C1 * C2 === 0) {return h1p + h2p}
        else if (Math.abs(h1p - h2p) <= 180) {return (h1p + h2p) / 2.0}
        else if ((Math.abs(h1p - h2p) > 180) && ((h1p + h2p) < 360)) {return (h1p + h2p + 360) / 2.0}
        else if ((Math.abs(h1p - h2p) > 180) && ((h1p + h2p) >= 360)) {return (h1p + h2p - 360) / 2.0}
    }

    //separate values
    const L1 = c1.L
    const a1 = c1.a
    const b1 = c1.b
    const L2 = c2.L
    const a2 = c2.a
    const b2 = c2.b

    //weight factors (I think they are supposed to be 1?)
    const kL = 1
    const kC = 1
    const kH = 1

    //calculate C1p, C2p, h1p, h2p
    const C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2))
    const C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2))

    const aC1C2 = (C1 + C2) / 2.0

    const G = 0.5 * (1 - Math.sqrt(Math.pow(aC1C2, 7.0) / (Math.pow(aC1C2, 7.0) + Math.pow(25.0, 7.0))))

    const a1p = (1.0 + G) * a1
    const a2p = (1.0 + G) * a2

    const C1p = Math.sqrt(Math.pow(a1p, 2) + Math.pow(b1, 2))
    const C2p = Math.sqrt(Math.pow(a2p, 2) + Math.pow(b2, 2))

    const h1p = hpF(b1, a1p)
    const h2p = hpF(b2, a2p)

    //calculate delta Lp, Cp and Hp

    const dLp = L2 - L1
    const dCp = C2p - C1p

    const dhp = dhpF(C1, C2, h1p, h2p)
    const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin(toRadians(dhp) / 2.0)

    //actually calculate the delta E and return it (you're almost there)
    const aL = (L1 + L2) / 2.0
    const aCp = (C1p + C2p) / 2.0

    const aHp = aHpF(C1, C2, h1p, h2p)
    const T = 1 - 0.17 * Math.cos(toRadians(aHp - 30)) + 0.24 * Math.cos(toRadians(2 * aHp)) +
    0.32 * Math.cos(toRadians(3 * aHp + 6)) - 0.20 * Math.cos(toRadians(4 * aHp - 63))
    const dRo = 30 * Math.exp(-(Math.pow((aHp - 275) / 25, 2)))
    const RC = Math.sqrt((Math.pow(aCp, 7.0)) / (Math.pow(aCp, 7.0) + Math.pow(25.0, 7.0)))
    const SL = 1 + ((0.015 * Math.pow(aL - 50, 2)) /
                Math.sqrt(20 + Math.pow(aL - 50, 2.0)))
    const SC = 1 + 0.045 * aCp
    const SH = 1 + 0.015 * aCp
    const RT = -2 * RC * Math.sin(toRadians(2 * dRo))
    const dE = Math.sqrt(Math.pow(dLp / (SL * kL), 2) + Math.pow(dCp / (SC * kC), 2) +
                Math.pow(dHp / (SH * kH), 2) + RT * (dCp / (SC * kC)) *
                (dHp / (SH * kH)))
    //! FINALLY 
    return dE
}