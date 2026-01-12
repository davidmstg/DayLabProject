/* =========================================
   1. DATA & CONFIGURATION
   ========================================= */
const healthLibrary = {
    // VITAMINS
    vitA: { name: "Vitamin A", min: 20, max: 60, unit: "µg/dL", lowInfo: "Can cause night blindness and dry skin.", optimalInfo: "Supports vision and immune health.", highInfo: "Excessive Vitamin A can be toxic." },
    vitB1: { name: "Vitamin B1", min: 70, max: 180, unit: "nmol/L", lowInfo: "Low levels cause fatigue and irritability.", optimalInfo: "Great for nerve function!", highInfo: "High levels are rare/harmless." },
    vitB6: { name: "Vitamin B6", min: 5, max: 50, unit: "µg/L", lowInfo: "May cause skin rashes or confusion.", optimalInfo: "Supports brain health.", highInfo: "Very high doses can cause nerve pain." },
    vitB9: { name: "Folate (B9)", min: 4, max: 20, unit: "ng/mL", lowInfo: "Can cause anemia and weakness.", optimalInfo: "Essential for cell growth.", highInfo: "May mask B12 deficiency." },
    vitB12: { name: "Vitamin B12", min: 200, max: 900, unit: "pg/mL", lowInfo: "Causes fatigue and nerve issues.", optimalInfo: "Nervous system is in top shape!", highInfo: "High B12 is usually from supplements." },
    vitC: { name: "Vitamin C", min: 0.4, max: 2.0, unit: "mg/dL", lowInfo: "Weakens immunity and healing.", optimalInfo: "Strong antioxidant protection!", highInfo: "High doses can cause stomach upset." },
    vitD: { name: "Vitamin D", min: 30, max: 100, unit: "ng/mL", lowInfo: "Weakens bones and immunity.", optimalInfo: "Bone density is well-supported!", highInfo: "Can lead to calcium buildup." },
    vitE: { name: "Vitamin E", min: 5.5, max: 17, unit: "mg/L", lowInfo: "May cause muscle weakness.", optimalInfo: "Protects cells from damage.", highInfo: "Can interfere with blood clotting." },
    vitK: { name: "Vitamin K", min: 0.1, max: 2.2, unit: "nmol/L", lowInfo: "Affects bone density and clotting.", optimalInfo: "Supports healthy blood and bones.", highInfo: "Consult a doctor if taking blood thinners." },
    
    // MINERALS
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
function runAnalysis(e) {
    // PREVENT THE FORM FROM RELOADING THE PAGE
    if(e) e.preventDefault(); 

    // 1. Grab all 20 values from the HTML inputs
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

    // 2. Save the raw numbers for the Results Dashboard
    localStorage.setItem('userResults', JSON.stringify(resultsToSave));

    // 3. Check for deficiencies (Low values)
    const deficiencies = [];
    for (let key in resultsToSave) {
        if (resultsToSave[key] !== "") { // Only check if user typed something
            if (getStatus(resultsToSave[key], healthLibrary[key].min, healthLibrary[key].max) === "low") {
                deficiencies.push(key);
            }
        }
    }

    // 4. Save the "Needs" list for the Nutrition/Recipe pages
    localStorage.setItem('userNeeds', JSON.stringify(deficiencies));

    // 5. Move to the results page
    window.location.href = "results.html";
}

/* =========================================
   4. THE VISUALS (Rendering the Dashboard)
   ========================================= */
function renderDashboard() {
    const dashboard = document.getElementById('results-dashboard');
    if (!dashboard) return; // Only run if we are on the results page

    const savedResults = JSON.parse(localStorage.getItem('userResults')) || {};
    let lowCards = "", highCards = "", optimalCards = "";
    let hasData = false;

    for (let key in healthLibrary) {
        const value = savedResults[key];
        const info = healthLibrary[key];
        
        // Skip empty inputs
        if (value === "" || value === undefined || value === null) continue;

        hasData = true;
        const status = getStatus(value, info.min, info.max);
        
        const cardHTML = `
            <div class="card status-${status}">
                <h3>${info.name}</h3>
                <div class="score-display">${value} <small>${info.unit}</small></div>
                <p class="status-label">Status: <strong>${status.toUpperCase()}</strong></p>
                <hr style="opacity:0.3; margin:10px 0;">
                <p class="insight-text">${status === 'low' ? info.lowInfo : (status === 'high' ? info.highInfo : info.optimalInfo)}</p>
            </div>
        `;

        if (status === "low") { lowCards += cardHTML; }
        else if (status === "high") { highCards += cardHTML; }
        else { optimalCards += cardHTML; }
    }

    if (hasData) {
        dashboard.innerHTML = lowCards + highCards + optimalCards;
    }
}

/* =========================================
   5. NUTRITION FILTERING
   ========================================= */
function renderNutrition() {
    // UPDATED ID to match your new HTML
    const listContainer = document.getElementById('nutrition-container');
    if (!listContainer) return;

    const needs = JSON.parse(localStorage.getItem('userNeeds')) || [];
    
    // Simple map of food recommendations
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
        // If they haven't taken the test yet or are perfectly healthy
        listContainer.innerHTML = `
            <div style="width:100%; text-align:center;">
                <p>No deficiencies detected or no data entered yet.</p>
                <a href="bloodtest.html" class="btn-outline">Go to Bloodtest</a>
            </div>`;
        return;
    }

    needs.forEach(need => {
        const nutrientTitle = healthLibrary[need].name; 
        const foodName = foodMap[need];
        
        // Create a nice card for each food recommendation
        listContainer.innerHTML += `
            <div class="card">
                <h3>${nutrientTitle}</h3>
                <p style="color:#666; font-size:0.9rem;">Recommended Foods:</p>
                <div style="font-weight:bold; font-size:1.2rem; color:var(--accent-red); margin-top:5px;">
                    ${foodName}
                </div>
            </div>
        `;
    });
}

/* =========================================
   6. RECIPE FILTERING (Manual Style)
   ========================================= */
function renderRecipes() {
    const needs = JSON.parse(localStorage.getItem('userNeeds')) || [];
    // Only run if on the recipes page
    if (!document.getElementById('recipe-grid')) return; 

    // Helper to show element by ID
    const show = (id) => {
        const el = document.getElementById(id);
        if(el) el.style.display = "block";
    };

    if (needs.includes("vitA")) show('recipe-vitA');
    if (needs.includes("vitB1")) show('recipe-vitB1');
    if (needs.includes("vitB6")) show('recipe-vitB6');
    if (needs.includes("vitB9")) show('recipe-vitB9');
    if (needs.includes("vitB12")) show('recipe-vitB12');
    if (needs.includes("vitC")) show('recipe-vitC');
    if (needs.includes("vitD")) show('recipe-vitD');
    if (needs.includes("vitE")) show('recipe-vitE');
    if (needs.includes("vitK")) show('recipe-vitK');
    if (needs.includes("iron")) show('recipe-iron');
    if (needs.includes("magnesium")) show('recipe-magnesium');
    if (needs.includes("zinc")) show('recipe-zinc');
    if (needs.includes("calcium")) show('recipe-calcium');
    if (needs.includes("potassium")) show('recipe-potassium');
    if (needs.includes("selenium")) show('recipe-selenium');
    if (needs.includes("copper")) show('recipe-copper');
    if (needs.includes("iodine")) show('recipe-iodine');
    if (needs.includes("manganese")) show('recipe-manganese');
    if (needs.includes("phosphorus")) show('recipe-phosphorus');
    if (needs.includes("sodium")) show('recipe-sodium');

    // Show the "optimal" message if the needs list is empty
    const msg = document.getElementById('no-recipes-msg');
    if (msg && needs.length === 0) msg.style.display = "block";
}

/* =========================================
   7. INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // CONNECT THE FORM SUBMISSION
    const form = document.getElementById('healthForm');
    if (form) {
        form.addEventListener('submit', runAnalysis);
    }

    // Run page specific renderers
    renderDashboard();
    renderNutrition();
    renderRecipes();
});
