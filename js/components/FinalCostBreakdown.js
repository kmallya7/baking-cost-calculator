export class FinalCostBreakdown {
    constructor(containerElement, totalCostElement) {
        this.container = containerElement;
        this.totalCostElement = totalCostElement;
        this.labourCostInput = document.getElementById('labourCost');
        this.electricityCostInput = document.getElementById('electricityCost');
        this.packagingCostInput = document.getElementById('packagingCost');
        this.maintenanceCostInput = document.getElementById('maintenanceCost');
        this.licensingCostInput = document.getElementById('licensingCost');
        this.profitMultiplierSelect = document.getElementById('profitMultiplier');
        
        // Ensure elements exist
        if (!this.labourCostInput || !this.electricityCostInput || !this.packagingCostInput || !this.maintenanceCostInput || !this.licensingCostInput || !this.profitMultiplierSelect) {
            console.error("One or more input elements not found in the DOM.");
        }
    }

    calculateFinalCost() {
        const totalIngredientCost = parseFloat(document.getElementById('totalCost').textContent);
        const labourCost = parseFloat(this.labourCostInput.value);
        const electricityCost = parseFloat(this.electricityCostInput.value);
        const packagingCost = parseFloat(this.packagingCostInput.value);
        const maintenanceCost = parseFloat(this.maintenanceCostInput.value);
        const licensingCost = parseFloat(this.licensingCostInput.value);
        const profitMultiplier = parseFloat(this.profitMultiplierSelect.value);

        if (isNaN(totalIngredientCost) || isNaN(labourCost) || isNaN(electricityCost) || isNaN(packagingCost) || isNaN(maintenanceCost) || isNaN(licensingCost)) {
            alert("Please enter valid numbers for all costs.");
            return;
        }

        const subTotal = totalIngredientCost + labourCost + electricityCost + packagingCost + maintenanceCost + licensingCost;

        let finalTotalCost;
        if (profitMultiplier === 0.30) {
            finalTotalCost = subTotal * (1 + profitMultiplier);
        } else {
            finalTotalCost = subTotal * profitMultiplier;
        }

        this.totalCostElement.textContent = finalTotalCost.toFixed(2);
    }
}
