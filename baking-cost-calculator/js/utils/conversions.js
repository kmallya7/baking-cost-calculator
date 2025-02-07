// js/utils/conversions.js
export function convertToGrams(weightStr) {
    const weight = parseFloat(weightStr);
    const lowerWeightStr = weightStr.toLowerCase(); // Convert to lowercase for case insensitivity

    if (lowerWeightStr.includes('kg') || lowerWeightStr.includes('kilograms')) {
        return weight * 1000;
    } else if (lowerWeightStr.includes('ml') || lowerWeightStr.includes('milliliters')) {
        return weight; // Assuming 1 ML of water weighs approximately 1 gram. Adjust if needed for other liquids.
    } else if (lowerWeightStr.includes('liters')) {
        return weight * 1000;
    } else if (lowerWeightStr.includes('gm') || lowerWeightStr.includes('grams')) {
        return weight;
    }
    return NaN; // Return NaN for invalid input
}
