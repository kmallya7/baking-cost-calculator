import { IngredientTable } from './components/IngredientTable.js';
import { CalculationSummary } from './components/CalculationSummary.js';
import { FinalCostBreakdown } from './components/FinalCostBreakdown.js';
import { ingredients } from './data/ingredients.js';

class App {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initialize();
        });
    }

    initialize() {
        this.ingredientTable = new IngredientTable('ingredientsTableBody');
        this.calculationSummary = new CalculationSummary(document.getElementById('calculationSummaryBody'), document.getElementById('totalCost'));
        this.finalCostBreakdown = new FinalCostBreakdown(document.getElementById('finalCostBreakdown'), document.getElementById('finalTotalCost'));

        this.ingredientSelect = document.getElementById('ingredientSelect');
        this.populateIngredientSelect();

        document.getElementById('calculateForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmit();
        });

        document.getElementById('calculateFinalCost').addEventListener('click', () => {
            this.finalCostBreakdown.calculateFinalCost();
        });

        this.setupCollapsibleTable();
    }

    handleFormSubmit() {
        const selectedIndex = this.ingredientSelect.value;
        const selectedIngredient = ingredients[selectedIndex];
        const usedWeight = parseFloat(document.getElementById('usedWeight').value);
        const weightUnit = document.getElementById('weightUnit').value;

        if (isNaN(usedWeight)) {
            alert("Please enter a valid number for the weight.");
            return;
        }

        this.calculationSummary.addCalculation(selectedIngredient, usedWeight, weightUnit);
    }

    populateIngredientSelect() {
        this.ingredientSelect.innerHTML = '';
        ingredients.forEach((ingredient, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = ingredient.name;
            this.ingredientSelect.appendChild(option);
        });
    }

    setupCollapsibleTable() {
        const collapsibleButton = document.querySelector('.collapsible');
        const contentDiv = document.querySelector('.content');

        collapsibleButton.addEventListener('click', function() {
            this.classList.toggle("active");
            contentDiv.hidden = !contentDiv.hidden;
        });
    }
}

const app = new App();
