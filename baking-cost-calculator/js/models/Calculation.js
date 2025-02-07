import { convertToGrams } from '../utils/conversions.js';

export class Calculation {
    constructor(ingredient, usedWeight, weightUnit) {
        this.ingredient = ingredient;
        this.usedWeight = usedWeight;
        this.weightUnit = weightUnit;
        this.cost = this.calculateCost();
    }

    calculateCost() {
        const totalWeightInGrams = convertToGrams(this.ingredient.totalWeight);
        const usedWeightInGrams = convertToGrams(`${this.usedWeight} ${this.weightUnit}`);

        if (isNaN(totalWeightInGrams) || isNaN(usedWeightInGrams) || isNaN(this.ingredient.totalCost)) {
            return NaN; // Handle invalid input, return NaN
        }

        const costPerGram = this.ingredient.totalCost / totalWeightInGrams;
        return costPerGram * usedWeightInGrams;
    }

    getFormattedCost() {
        if (isNaN(this.cost)) {
            return "Invalid Cost"; // Or handle the error as you prefer
        }
        return `₹${this.cost.toFixed(2)}`;
    }

    getFormattedWeight() {
        return `${this.usedWeight} ${this.weightUnit}`;
    }

    // Method to update the calculation (for editing)
    updateCalculation(newWeight, newUnit) {
        this.usedWeight = newWeight;
        this.weightUnit = newUnit;
        this.cost = this.calculateCost(); // Recalculate cost
    }
}
