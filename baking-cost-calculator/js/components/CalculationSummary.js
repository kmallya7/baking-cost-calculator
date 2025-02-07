import { Calculation } from '../models/Calculation.js';

export class CalculationSummary {
    constructor(tableBodyElement, totalCostElement) {
        this.tableBody = tableBodyElement;
        this.totalCostElement = totalCostElement;
        this.calculations = [];
        this.render();
    }

    addCalculation(ingredient, usedWeight, weightUnit) {
        const calculation = new Calculation(ingredient, usedWeight, weightUnit);
        this.calculations.push(calculation);
        this.render();
    }

    render() {
        this.tableBody.innerHTML = '';
        let totalCost = 0;
        this.calculations.forEach((calculation, index) => {
            const row = this.tableBody.insertRow();
            row.insertCell().textContent = calculation.ingredient.name;
            row.insertCell().textContent = calculation.getFormattedWeight();
            row.insertCell().textContent = calculation.getFormattedCost();

            // Add Edit and Delete buttons
            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('btn', 'btn-primary', 'btn-sm'); // Add Bootstrap classes
            editButton.addEventListener('click', () => this.editCalculation(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-1'); // Add Bootstrap classes and margin
            deleteButton.addEventListener('click', () => this.deleteCalculation(index));
            actionsCell.appendChild(deleteButton);

            totalCost += calculation.cost;
        });
        this.totalCostElement.textContent = totalCost.toFixed(2);
    }

    editCalculation(index) {
        const calculation = this.calculations[index];
        let newWeight, newUnit;
        
        do {
            newWeight = prompt("Edit Weight Used:", calculation.usedWeight);
            if (newWeight === null) break; // Exit if the user cancels the prompt
        } while (newWeight && isNaN(newWeight));

        if (newWeight === null) return; // Exit if the user cancels the prompt
        
        do {
            newUnit = prompt("Edit Unit:", calculation.weightUnit);
            if (newUnit === null) break; // Exit if the user cancels the prompt
        } while (newUnit === "");

        if (newWeight && newUnit && !isNaN(newWeight)) {
            calculation.updateCalculation(newWeight, newUnit); // Use the update method
            this.render();
        } else {
            alert("Invalid input. Please enter valid values.");
        }
    }

    deleteCalculation(index) {
        this.calculations.splice(index, 1);
        this.render();
    }
}
