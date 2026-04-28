// ===== DEFINICIÓN DE UNIDADES ESENCIALES =====
const units = {
    length: {
        name: 'Longitud',
        icon: '📏',
        base: 'm',
        units: {
            m: { name: 'Metro', factor: 1 },
            cm: { name: 'Centímetro', factor: 0.01 },
            mm: { name: 'Milímetro', factor: 0.001 },
            km: { name: 'Kilómetro', factor: 1000 },
            in: { name: 'Pulgada', factor: 0.0254 },
            ft: { name: 'Pie', factor: 0.3048 },
            yd: { name: 'Yarda', factor: 0.9144 },
            mi: { name: 'Milla', factor: 1609.344 }
        }
    },
    area: {
        name: 'Área',
        icon: '📐',
        base: 'm2',
        units: {
            m2: { name: 'Metro cuadrado', factor: 1 },
            cm2: { name: 'Centímetro cuadrado', factor: 0.0001 },
            mm2: { name: 'Milímetro cuadrado', factor: 0.000001 },
            km2: { name: 'Kilómetro cuadrado', factor: 1000000 },
            ha: { name: 'Hectárea', factor: 10000 },
            // Unidad personalizada: "Cuadra" (asumiendo una cuadra = 10000 m², similar a una hectárea)
            cuadra: { name: 'Cuadra', factor: 10000 }
        }
    },
    volume: {
        name: 'Volumen',
        icon: '🧪',
        base: 'm3',
        units: {
            m3: { name: 'Metro cúbico', factor: 1 },
            cm3: { name: 'Centímetro cúbico', factor: 0.000001 },
            mm3: { name: 'Milímetro cúbico', factor: 1e-9 },
            l: { name: 'Litro', factor: 0.001 }
        }
    },
    mass: {
        name: 'Masa',
        icon: '⚖️',
        base: 'kg',
        units: {
            kg: { name: 'Kilogramo', factor: 1 },
            g: { name: 'Gramo', factor: 0.001 },
            lb: { name: 'Libra', factor: 0.453592 }
        }
    },
    speed: {
        name: 'Velocidad',
        icon: '🚀',
        base: 'ms',
        units: {
            kmh: { name: 'Kilómetro por hora (km/h)', factor: 0.277778 },
            kms: { name: 'Kilómetro por segundo (km/s)', factor: 1000 },
            mh: { name: 'Metro por hora (m/h)', factor: 0.000277778 },
            ms: { name: 'Metro por segundo (m/s)', factor: 1 }
        }
    }
};

// ===== VARIABLES GLOBALES =====
let currentCategory = 'length';
let conversionHistory = [];

// ===== FUNCIONES PRINCIPALES =====

function updateUnits() {
    const category = document.getElementById('category').value;
    currentCategory = category;
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const unitData = units[category];

    document.getElementById('fromUnitIcon').textContent = unitData.icon;
    document.getElementById('toUnitIcon').textContent = unitData.icon;

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    // Ordenar unidades alfabéticamente por nombre para mejor UX
    const sortedUnits = Object.entries(unitData.units).sort((a, b) =>
        a[1].name.localeCompare(b[1].name)
    );

    for (const [key, value] of sortedUnits) {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = value.name;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = value.name;
        toSelect.appendChild(option2);
    }

    // Seleccionar primera y segunda unidad por defecto si existen, si no, la misma.
    const unitKeys = Object.keys(unitData.units);
    fromSelect.value = unitKeys[0];
    toSelect.value = unitKeys[1] || unitKeys[0];

    updateAdditionalInfo();
    updateUnitBadges();
    convert();
}

function validateInput(input) {
    const value = input.value;
    if (value === '' || /^-?\d*\.?\d*(?:[eE][-+]?\d+)?$/.test(value)) {
        input.classList.remove('error');
        return true;
    } else {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 300);
        input.value = value.replace(/[^\d.eE\-+]/g, '');
        return false;
    }
}

function convert() {
    const inputValue = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const outputField = document.getElementById('outputValue');
    const resultDisplay = document.getElementById('resultDisplay');
    const resultUnitDisplay = document.getElementById('resultUnitDisplay');

    let value = parseFloat(inputValue.value);

    if (isNaN(value) || inputValue.value === '') {
        outputField.value = '';
        resultDisplay.textContent = '0';
        return;
    }

    const category = units[currentCategory];
    let result;

    try {
        // Conversión genérica por factor para todas las categorías (ninguna necesita fórmula especial como temperatura)
        const fromFactor = category.units[fromUnit].factor;
        const toFactor = category.units[toUnit].factor;
        result = value * fromFactor / toFactor;

        saveToHistory(value, fromUnit, result, toUnit);

        let formattedResult;
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-12 && result !== 0)) {
            formattedResult = result.toExponential(6);
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }

        outputField.value = formattedResult;
        resultDisplay.textContent = formattedResult;
        resultUnitDisplay.textContent = category.units[toUnit].name;
        updateUnitBadges();

    } catch (error) {
        console.error('Error en conversión:', error);
        outputField.value = 'Error';
        resultDisplay.textContent = 'Error';
        showNotification('Error en la conversión', 'error');
    }
}

function saveToHistory(value, fromUnit, result, toUnit) {
    const category = units[currentCategory];
    const fromUnitName = category.units[fromUnit].name;
    const toUnitName = category.units[toUnit].name;

    conversionHistory.unshift({
        value: value,
        fromUnit: fromUnitName,
        result: result,
        toUnit: toUnitName,
        category: category.name,
        timestamp: new Date().toLocaleTimeString()
    });

    if (conversionHistory.length > 10) {
        conversionHistory.pop();
    }

    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyDiv = document.getElementById('conversionHistory');
    if (!historyDiv) return;

    if (conversionHistory.length === 0) {
        historyDiv.innerHTML = '<div class="history-empty">No hay conversiones recientes</div>';
        return;
    }

    let html = '';
    conversionHistory.forEach(item => {
        // Mostrar resultado con hasta 4 decimales en el historial para mejor legibilidad
        let resultDisplay = typeof item.result === 'number' ? parseFloat(item.result.toFixed(6)) : item.result;
        html += `
            <div class="history-item">
                <span class="history-time">${item.timestamp}</span>
                <span class="history-conversion">
                    ${item.value} ${item.fromUnit} → ${resultDisplay} ${item.toUnit}
                </span>
                <span class="history-category">${item.category}</span>
            </div>
        `;
    });

    historyDiv.innerHTML = html;
}

function swapUnits() {
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;

    fromSelect.value = toValue;
    toSelect.value = fromValue;

    convert();
}

function updateAdditionalInfo() {
    const infoDiv = document.getElementById('additionalInfo');
    const category = units[currentCategory];

    let html = '';
    const unitList = Object.entries(category.units).slice(0, 6); // Mostrar hasta 6 referencias

    for (const [key, value] of unitList) {
        html += `
            <div class="info-item">
                <div class="info-label">1 ${value.name}</div>
                <div class="info-value">${getBaseEquivalent(key)}</div>
            </div>
        `;
    }

    infoDiv.innerHTML = html;
}

function getBaseEquivalent(unitKey) {
    const category = units[currentCategory];
    const unit = category.units[unitKey];
    const baseUnit = category.units[category.base];

    if (unit.factor === 1) return 'Unidad base';

    // Manejar casos donde la equivalencia es muy grande o pequeña
    if (Math.abs(unit.factor) > 1e6 || Math.abs(unit.factor) < 1e-6) {
        return `${(1 / unit.factor).toExponential(4)} ${baseUnit.name}`;
    }

    const equivalent = (1 / unit.factor).toFixed(4);
    return `${equivalent} ${baseUnit.name}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggle = document.getElementById('darkModeToggle');
    toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '☀️';
    }
}

function shareConversion() {
    const value = document.getElementById('inputValue').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const result = document.getElementById('outputValue').value;

    // Validar que haya un resultado válido para compartir
    if (!result || result === '' || result === 'Error') {
        showNotification('No hay una conversión válida para compartir', 'error');
        return;
    }

    const fromUnitName = units[currentCategory].units[fromUnit.value].name;
    const toUnitName = units[currentCategory].units[toUnit.value].name;

    const shareText = `${value} ${fromUnitName} = ${result} ${toUnitName} (Convertidor Esencial)`;

    if (navigator.share) {
        navigator.share({
            title: 'Conversión de unidades',
            text: shareText,
            url: window.location.href
        }).catch(() => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('¡Copiado al portapapeles!', 'success');
    }).catch(() => {
        showNotification('No se pudo copiar', 'error');
    });
}

function showNotification(message, type = 'info') {
    // Eliminar notificación existente para evitar acumulación
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function clearHistory() {
    conversionHistory = [];
    updateHistoryDisplay();
    showNotification('Historial limpiado', 'success');
}

function updateUnitBadges() {
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const fromBadge = document.getElementById('fromUnitBadge');
    const toBadge = document.getElementById('toUnitBadge');

    if (fromBadge && fromSelect.value && units[currentCategory]) {
        fromBadge.textContent = units[currentCategory].units[fromSelect.value].name;
    }
    if (toBadge && toSelect.value && units[currentCategory]) {
        toBadge.textContent = units[currentCategory].units[toSelect.value].name;
    }
}

function updateStats() {
    const categoryCount = Object.keys(units).length;
    let unitCount = 0;
    for (const cat in units) {
        unitCount += Object.keys(units[cat].units).length;
    }

    const categoryCountSpan = document.getElementById('categoryCount');
    const unitCountSpan = document.getElementById('unitCount');
    if (categoryCountSpan) categoryCountSpan.textContent = categoryCount;
    if (unitCountSpan) unitCountSpan.textContent = unitCount;
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    loadDarkModePreference();
    updateUnits();
    convert();
    updateStats();

    const inputElement = document.getElementById('inputValue');
    if (inputElement) {
        inputElement.addEventListener('keyup', convert);
        inputElement.addEventListener('change', convert);
    }
});

// Exponer funciones globalmente para que puedan ser llamadas desde HTML (onclick, onchange)
window.updateUnits = updateUnits;
window.validateInput = validateInput;
window.convert = convert;
window.swapUnits = swapUnits;
window.toggleDarkMode = toggleDarkMode;
window.shareConversion = shareConversion;
window.clearHistory = clearHistory;