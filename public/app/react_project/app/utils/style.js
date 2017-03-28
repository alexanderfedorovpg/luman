export const rem = num => {
    let stripUnit = num / (num * 0 + 1);
    return `${stripUnit / 16}rem`;
}
