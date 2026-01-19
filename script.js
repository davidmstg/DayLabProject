/* =========================================
 1. DATA & CONFIGURATION
 ========================================= */
const healthLibrary = {
    vitA: { name: "Vitamin A", min: 20, max: 60, unit: "µg/dL", lowInfo: "Can cause night blindness and dry skin.", optimalInfo: "Supports vision and immune health.", highInfo: "Excessive Vitamin A can be toxic." },
    vitB1: { name: "Vitamin B1", min: 70, max: 180, unit: "nmol/L", lowInfo: "Low levels cause fatigue and irritability.", optimalInfo: "Great for nerve function!", highInfo: "High levels are rare/harmless." },
    vitB6: { name: "Vitamin B6", min: 5, max: 50, unit: "µg/L", lowInfo: "May cause skin rashes or confusion.", optimalInfo: "Supports brain health.", highInfo: "Very high doses can cause nerve pain." },
    vitB9: { name: "Folate (B9)", min: 4, max: 20, unit: "ng/mL", lowInfo: "Can cause anemia and weakness.", optimalInfo: "Essential for cell growth.", highInfo: "May mask B12 deficiency." },
    vitB12: { name: "Vitamin B12", min: 200, max: 900, unit: "pg/mL", lowInfo: "Causes fatigue and nerve issues.", optimalInfo: "Nervous system is in top shape!", highInfo: "High B12 is usually from supplements." },
    vitC: { name: "Vitamin C", min: 0.4, max: 2.0, unit: "mg/dL", lowInfo: "Weakens immunity and healing.", optimalInfo: "Strong antioxidant protection!", highInfo: "High doses can cause stomach upset." },
    vitD: { name: "Vitamin D", min: 30, max: 100, unit: "ng/mL", lowInfo: "Weakens bones and immunity.", optimalInfo: "Bone density is well-supported!", highInfo: "Can lead to calcium buildup." },
    vitE: { name: "Vitamin E", min: 5.5, max: 17, unit: "mg/L", lowInfo: "May cause muscle weakness.", optimalInfo: "Protects cells from damage.", highInfo: "Can interfere with blood clotting." },
    vitK: { name: "Vitamin K", min: 0.1, max: 2.2, unit: "nmol/L", lowInfo: "Affects bone density and clotting.", optimalInfo: "Supports healthy blood and bones.", highInfo: "Consult a doctor if taking blood thinners." },
    iron: { name: "Iron (Ferritin)", min: 30, max: 150, unit: "ng/mL", lowInfo: "Causes extreme fatigue.", optimalInfo: "Oxygen transport is efficient!", highInfo: "Can be taxing on the liver." },
    magnesium: { name: "Magnesium", min: 1.7, max: 2.2, unit: "mg/dL", lowInfo: "Causes muscle cramps and anxiety.", optimalInfo: "Muscles and nerves are relaxed.", highInfo: "Can cause low blood pressure." },
    zinc: { name: "Zinc", min: 60, max: 120, unit: "µg/dL", lowInfo: "Slows wound healing and immunity.", optimalInfo: "Immune system is strong!", highInfo: "Can interfere with copper absorption." },
    calcium: { name: "Calcium", min: 8.5, max: 10.2, unit: "mg/dL", lowInfo: "Affects bone and tooth health.", optimalInfo: "Strong bones and heart rhythm.", highInfo: "Risk of kidney stones." },
    potassium: { name: "Potassium", min: 3.5, max: 5.1, unit: "mmol/L", lowInfo: "Can cause heart palpitations.", optimalInfo: "Perfect fluid balance.", highInfo: "Dangerous for heart rhythm." },
    selenium: { name: "Selenium", min: 70, max: 150, unit: "µg/L", lowInfo: "Affects thyroid function.", optimalInfo: "Thyroid and metabolism supported.", highInfo: "Can cause hair/nail loss." },
    copper: { name: "Copper", min: 70, max: 140, unit: "µg/dL", lowInfo: "Can lead to anemia.", optimalInfo: "Supports connective tissue.", highInfo: "Can be toxic to the liver." },
    iodine: { name: "Iodine", min: 100, max: 199, unit: "µg/L", lowInfo: "Causes thyroid issues/goiter.", optimalInfo: "Metabolism is running well.", highInfo: "Can trigger thyroid overactivity." },
    manganese: { name: "Manganese", min: 4, max: 15, unit: "µg/L", lowInfo: "Affects bone formation.", optimalInfo: "Supports metabolism.", highInfo: "Can be neurotoxic at high levels." },
    phosphorus: { name: "Phosphorus", min: 2.5, max: 4.5, unit: "mg/dL", lowInfo: "Causes bone pain and weakness.", optimalInfo: "Energy production is optimal!", highInfo: "Can affect kidney health." },
    sodium: { name: "Sodium", min: 135, max: 145, unit: "mmol/L", lowInfo: "Causes confusion/headaches.", optimalInfo: "Fluid balance is stable.", highInfo: "Can lead to high blood pressure." }
};

/* =========================================
 2. THE CORE ENGINE (Calculations)
 ========================================= */
function getStatus(value, min, max) {
    if (value === "" || value === null) return "missing";
    const num = Number(value);
    if (num < min) return "low";
    if (num > max) return "high";
    return "optimal";
}

/* =========================================
 3. THE ACTION (When button is clicked)
 ========================================= */
function runAnalysis() {
    const resultsToSave = {
        vitA: document.getElementById('vitA-input').value,
        vitB1: document.getElementById('vitB1-input').value,
        vitB6: document.getElementById('vitB6-input').value,
        vitB9: document.getElementById('vitB9-input').value,
        vitB12: document.getElementById('vitB12-input').value,
        vitC: document.getElementById('vitC-input').value,
        vitD: document.getElementById('vitD-input').value,
        vitE: document.getElementById('vitE-input').value,
        vitK: document.getElementById('vitK-input').value,
        iron: document.getElementById('iron-input').value,
        magnesium: document.getElementById('magnesium-input').value,
        zinc: document.getElementById('zinc-input').value,
        calcium: document.getElementById('calcium-input').value,
        potassium: document.getElementById('potassium-input').value,
        selenium: document.getElementById('selenium-input').value,
        copper: document.getElementById('copper-input').value,
        iodine: document.getElementById('iodine-input').value,
        manganese: document.getElementById('manganese-input').value,
        phosphorus: document.getElementById('phosphorus-input').value,
        sodium: document.getElementById('sodium-input').value
    };

    localStorage.setItem('userResults', JSON.stringify(resultsToSave));

    const deficiencies = [];
    for (let key in resultsToSave) {
        if (getStatus(resultsToSave[key], healthLibrary[key].min, healthLibrary[key].max) === "low") {
            deficiencies.push(key);
        }
    }

    localStorage.setItem('userNeeds', JSON.stringify(deficiencies));
    window.location.href = "results.html";
}

/* =========================================
 4. THE VISUALS (Rendering the Dashboard)
 ========================================= */
function renderDashboard() {
    const dashboard = document.getElementById('results-dashboard');
    if (!dashboard) return;

    const savedResults = JSON.parse(localStorage.getItem('userResults')) || {};
    let lowCards = "", highCards = "", optimalCards = "";

    for (let key in healthLibrary) {
        const value = savedResults[key];
        const info = healthLibrary[key];
        if (value === "" || value === undefined || value === null) continue;

        const status = getStatus(value, info.min, info.max);
        
        // UPDATED: Now shows the "Normal Range" clearly
        const cardHTML = `
            <a href="nutrition.html" class="card status-${status}" style="text-decoration: none; display: block; color: inherit; cursor: pointer;">
                <h3>${info.name}</h3>
                
                <div class="score-display">
                    ${value} <small>${info.unit}</small>
                </div>
                
                <p style="font-size: 0.9rem; color: #555; margin-bottom: 5px; background: #f0f0f0; padding: 5px; border-radius: 5px; display:inline-block;">
                    Normal Range: <strong>${info.min} - ${info.max} ${info.unit}</strong>
                </p>

                <p class="status-label">Status: <strong>${status.toUpperCase()}</strong></p>
                <hr>
                <p class="insight-text">${status === 'low' ? info.lowInfo : (status === 'high' ? info.highInfo : info.optimalInfo)}</p>
                <p style="font-size: 0.8rem; margin-top: 10px; color: #666; font-style: italic;">(Click for nutrition info)</p>
            </a>
        `;

        if (status === "low") { lowCards += cardHTML; }
        else if (status === "high") { highCards += cardHTML; }
        else { optimalCards += cardHTML; }
    }
    dashboard.innerHTML = lowCards + highCards + optimalCards;
}

/* =========================================
 5. NUTRITION FILTERING
 ========================================= */
function renderNutrition() {
    const listContainer = document.getElementById('food-list-display');
    if (!listContainer) return;

    const needs = JSON.parse(localStorage.getItem('userNeeds')) || [];
    const foodMap = {
        vitA: "Carrots & Sweet Potatoes", vitB1: "Sunflower Seeds & Pork", vitB6: "Chickpeas & Tuna",
        vitB9: "Leafy Greens & Folate", vitB12: "Beef & Nutritional Yeast", vitC: "Bell Peppers & Citrus",
        vitD: "Fatty Fish & Egg Yolks", vitE: "Almonds & Spinach", vitK: "Kale & Broccoli",
        iron: "Lentils & Red Meat", magnesium: "Dark Chocolate & Nuts", zinc: "Oysters & Pumpkin Seeds",
        calcium: "Dairy & Chia Seeds", potassium: "Bananas & Avocados", selenium: "Brazil Nuts & Tuna",
        copper: "Mushrooms & Shellfish", iodine: "Seaweed & Cod", manganese: "Hazelnuts & Oats",
        phosphorus: "Chicken & Fish", sodium: "Celery & Olives"
    };

    listContainer.innerHTML = "";
    if (needs.length === 0) {
        listContainer.innerHTML = "<p>Your levels are optimal! Keep eating a variety of whole foods.</p>";
        return;
    }

    needs.forEach(need => {
        const nutrientTitle = healthLibrary[need].name; 
        const foodName = foodMap[need];
        listContainer.innerHTML += `
            <div class="food-row">
                ${foodName} <span class="nutrient-name">${nutrientTitle}</span>
            </div>
        `;
    });
}

/* =========================================
 6. RECIPE FILTERING (WITH DIETARY CHECKBOXES)
 ========================================= */
function renderRecipes() {
    const needs = JSON.parse(localStorage.getItem('userNeeds')) || [];
    const recipeGrid = document.getElementById('recipe-grid');
    
    if (!recipeGrid) return; 

    // 1. Get current checkbox states
    const isVegan = document.getElementById('check-vegan').checked;
    const isLactoseFree = document.getElementById('check-lactose').checked;
    const isGlutenFree = document.getElementById('check-gluten').checked;

    // 2. Hide everything first
    const allCards = recipeGrid.querySelectorAll('.recipe-card');
    allCards.forEach(card => card.style.display = 'none');

    let hasRecipes = false;

    // 3. Loop through deficiencies and show matching cards
    const keys = ["vitA", "vitB1", "vitB6", "vitB9", "vitB12", "vitC", "vitD", "vitE", "vitK", "iron", "magnesium", "zinc", "calcium", "potassium", "selenium", "copper", "iodine", "manganese", "phosphorus", "sodium"];
    
    keys.forEach(key => {
        if (needs.includes(key)) {
            const relatedCards = recipeGrid.querySelectorAll(`[id^="recipe-${key}"]`);
            
            relatedCards.forEach(card => {
                // 4. Apply Dietary Filters
                let matchesDiet = true;

                if (isVegan && !card.classList.contains('vegan')) matchesDiet = false;
                if (isLactoseFree && !card.classList.contains('lactose-free')) matchesDiet = false;
                if (isGlutenFree && !card.classList.contains('gluten-free')) matchesDiet = false;

                if (matchesDiet) {
                    card.style.display = "block";
                    hasRecipes = true;
                }
            });
        }
    });

    const msg = document.getElementById('no-recipes-msg');
    if (msg) {
        if (needs.length === 0) {
            msg.innerText = "All your levels are optimal! No specific corrective recipes are needed.";
            msg.style.display = "block";
        } else if (!hasRecipes) {
            msg.innerText = "No recipes found matching these dietary preferences.";
            msg.style.display = "block";
        } else {
            msg.style.display = "none";
        }
    }
}

/* =========================================
 7. INITIALIZATION
 ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            runAnalysis();
        });
    }

    if (document.getElementById('results-dashboard')) {
        renderDashboard();
    }
    if (document.getElementById('food-list-display')) {
        renderNutrition();
    }
    if (document.getElementById('recipe-grid')) {
        renderRecipes();
    }
});
