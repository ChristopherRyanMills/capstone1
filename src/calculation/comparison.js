import { CIE2000 } from "./difference"

export const findMatch = (paint1, paintArray) => {
    let bestColor
    let bestColorDiff

    for (let i = 0; i < paintArray.length; i ++) {
        const paint2 = paintArray[i]
        const currentColorDiff = CIE2000(paint1, paint2)

        if (!bestColor) {
            bestColor = paint2
            bestColorDiff = currentColorDiff
            continue;
        }

        if (bestColorDiff !== undefined && (currentColorDiff < bestColorDiff)) {
            bestColor = paint2
            bestColorDiff = currentColorDiff
            continue;
        }
    }
    if (bestColor) {
        return bestColor
    }
}