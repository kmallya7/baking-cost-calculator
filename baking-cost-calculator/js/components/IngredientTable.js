import { ingredients } from '../data/ingredients.js';

export class IngredientTable {
    constructor(tableBodyElementId) {
        this.tableBodyElementId = tableBodyElementId;
        this.tableBody = null;

        const initialize = () => {
            this.tableBody = document.getElementById(this.tableBodyElementId);
            if (this.tableBody) {
                console.log(`Table body element with ID '${this.tableBodyElementId}' found in the DOM.`);
                this.render();
            } else {
                console.error(`Table body element with ID '${this.tableBodyElementId}' not found in the DOM.`);
            }
        };

        document.addEventListener('DOMContentLoaded', initialize);
    }

    render() {
        if (!this.tableBody) {
            console.error("Table body is still null. Cannot render.");
            return;
        }

        this.tableBody.innerHTML = '';
        console.log("Ingredients data:", ingredients);

        if (ingredients.length === 0) {
            console.error("Ingredients array is empty.");
        } else {
            ingredients.forEach(ingredient => {
                console.log("Rendering ingredient:", ingredient);
                const row = this.tableBody.insertRow();
                row.insertCell().textContent = ingredient.name;
                row.insertCell().textContent = ingredient.totalWeight;
                row.insertCell().textContent = `₹${ingredient.totalCost}`;
            });
        }
    }
}

// Manually create an instance and call render (for testing purpose)
const testTable = new IngredientTable('ingredientsTableBody');
testTable.render();
