export const roundUpToTwoDecimals = (number: number, decimals = 2): string => {
    return number.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};
