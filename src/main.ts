import type { ColorName, BackgroundColorName, ForegroundColorName } from "npm:chalk@5.3.0";
import { backgroundColorNames, foregroundColorNames } from "npm:chalk@5.3.0";
import chalk from "npm:chalk@5.3.0";

type OnoColor = {
    back: BackgroundColorName,
    fore: ForegroundColorName
}

export type Ono = {
    color: ColorName | OnoColor,
    name: string
};

function isOnoColor(value: unknown): value is OnoColor {
    return (
        typeof value === "object" &&
        value !== null &&
        "back" in value && 
        "fore" in value &&
        backgroundColorNames.includes((value as OnoColor).back) &&
        foregroundColorNames.includes((value as OnoColor).fore)
    );
}

export type OnoFunction = (...message: string[]) => void

export function ono(ono: Ono): OnoFunction {
    let colorFunc;
    if (isOnoColor(ono.color)) {
        const color = ono.color;
        colorFunc = (a: string) => chalk[color.back as ColorName](chalk[color.fore as ColorName](a));
    } else {
        colorFunc = (a: string) => chalk[ono.color as ColorName](a);
    }

    return function(...message: string[]) {
        console.log(colorFunc(`[${ono.name}]`), ...message);
    }
}
