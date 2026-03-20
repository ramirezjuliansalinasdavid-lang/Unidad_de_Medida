// ===== DEFINICIÓN DE UNIDADES =====
const units = {
    length: {
        name: 'Longitud',
        icon: '📏',
        base: 'm',
        units: {
            m: { name: 'Metro', factor: 1 },
            km: { name: 'Kilómetro', factor: 1000 },
            cm: { name: 'Centímetro', factor: 0.01 },
            mm: { name: 'Milímetro', factor: 0.001 },
            mi: { name: 'Milla', factor: 1609.344 },
            yd: { name: 'Yarda', factor: 0.9144 },
            ft: { name: 'Pie', factor: 0.3048 },
            in: { name: 'Pulgada', factor: 0.0254 },
            nmi: { name: 'Milla náutica', factor: 1852 },
            ly: { name: 'Año luz', factor: 9460730472580800 }, // 9.46073e15 metros
            au: { name: 'Unidad astronómica', factor: 149597870700 },
            pc: { name: 'Pársec', factor: 3.085677581e16 },
            fm: { name: 'Fermi', factor: 1e-15 },
            angstrom: { name: 'Angstrom', factor: 1e-10 }
        }
    },
    mass: {
        name: 'Masa',
        icon: '⚖️',
        base: 'kg',
        units: {
            kg: { name: 'Kilogramo', factor: 1 },
            g: { name: 'Gramo', factor: 0.001 },
            mg: { name: 'Miligramo', factor: 0.000001 },
            t: { name: 'Tonelada', factor: 1000 },
            lb: { name: 'Libra', factor: 0.453592 },
            oz: { name: 'Onza', factor: 0.0283495 },
            st: { name: 'Stone', factor: 6.35029 },
            slug: { name: 'Slug', factor: 14.5939 },
            solarmass: { name: 'Masa solar', factor: 1.98892e30 },
            earthmass: { name: 'Masa terrestre', factor: 5.9722e24 },
            dalton: { name: 'Dalton', factor: 1.66053906660e-27 }
        }
    },
    temperature: {
        name: 'Temperatura',
        icon: '🌡️',
        base: 'c',
        units: {
            c: { name: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
            f: { name: 'Fahrenheit', toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
            k: { name: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
            r: { name: 'Rankine', toBase: (v) => (v - 491.67) * 5 / 9, fromBase: (v) => (v + 273.15) * 9 / 5 },
            re: { name: 'Réaumur', toBase: (v) => v * 1.25, fromBase: (v) => v * 0.8 }
        }
    },
    time: {
        name: 'Tiempo',
        icon: '⏰',
        base: 's',
        units: {
            s: { name: 'Segundo', factor: 1 },
            ms: { name: 'Milisegundo', factor: 0.001 },
            min: { name: 'Minuto', factor: 60 },
            h: { name: 'Hora', factor: 3600 },
            d: { name: 'Día', factor: 86400 },
            week: { name: 'Semana', factor: 604800 },
            month: { name: 'Mes', factor: 2592000 },
            year: { name: 'Año', factor: 31536000 },
            decade: { name: 'Década', factor: 315360000 },
            century: { name: 'Siglo', factor: 3153600000 },
            millennium: { name: 'Milenio', factor: 31536000000 },
            microsecond: { name: 'Microsegundo', factor: 0.000001 },
            nanosecond: { name: 'Nanosegundo', factor: 1e-9 }
        }
    },
    volume: {
        name: 'Volumen',
        icon: '🧪',
        base: 'l',
        units: {
            l: { name: 'Litro', factor: 1 },
            ml: { name: 'Mililitro', factor: 0.001 },
            m3: { name: 'Metro cúbico', factor: 1000 },
            gal: { name: 'Galón', factor: 3.78541 },
            qt: { name: 'Cuarto', factor: 0.946353 },
            pt: { name: 'Pinta', factor: 0.473176 },
            cup: { name: 'Taza', factor: 0.24 },
            floz: { name: 'Onza líquida', factor: 0.0295735 },
            tbsp: { name: 'Cucharada', factor: 0.0147868 },
            tsp: { name: 'Cucharadita', factor: 0.00492892 },
            km3: { name: 'Kilómetro cúbico', factor: 1e12 },
            acreft: { name: 'Acre-pie', factor: 1233481.84 }
        }
    },
    speed: {
        name: 'Velocidad',
        icon: '🚀',
        base: 'ms',
        units: {
            ms: { name: 'Metro/segundo', factor: 1 },
            kmh: { name: 'Kilómetro/hora', factor: 0.277778 },
            mph: { name: 'Milla/hora', factor: 0.44704 },
            knot: { name: 'Nudo', factor: 0.514444 },
            fps: { name: 'Pie/segundo', factor: 0.3048 },
            c: { name: 'Velocidad de la luz', factor: 299792458 },
            mach: { name: 'Mach (20°C)', factor: 343 },
            sound: { name: 'Velocidad del sonido', factor: 343 }
        }
    },
    area: {
        name: 'Área',
        icon: '📐',
        base: 'm2',
        units: {
            m2: { name: 'Metro cuadrado', factor: 1 },
            km2: { name: 'Kilómetro cuadrado', factor: 1000000 },
            cm2: { name: 'Centímetro cuadrado', factor: 0.0001 },
            ha: { name: 'Hectárea', factor: 10000 },
            acre: { name: 'Acre', factor: 4046.86 },
            ft2: { name: 'Pie cuadrado', factor: 0.092903 },
            mi2: { name: 'Milla cuadrada', factor: 2589988.11 },
            yd2: { name: 'Yarda cuadrada', factor: 0.836127 },
            in2: { name: 'Pulgada cuadrada', factor: 0.00064516 }
        }
    },
    energy: {
        name: 'Energía',
        icon: '⚡',
        base: 'j',
        units: {
            j: { name: 'Joule', factor: 1 },
            kj: { name: 'Kilojoule', factor: 1000 },
            cal: { name: 'Caloría', factor: 4.184 },
            kcal: { name: 'Kilocaloría', factor: 4184 },
            wh: { name: 'Vatio-hora', factor: 3600 },
            kwh: { name: 'Kilovatio-hora', factor: 3600000 },
            ev: { name: 'Electronvoltio', factor: 1.602e-19 },
            mev: { name: 'Mega electronvoltio', factor: 1.602e-13 },
            btu: { name: 'BTU', factor: 1055.06 },
            erg: { name: 'Ergio', factor: 1e-7 },
            foe: { name: 'Foe', factor: 1e44 },
            toe: { name: 'Tonelada equivalente de petróleo', factor: 41840000000 }
        }
    },
    pressure: {
        name: 'Presión',
        icon: '🎯',
        base: 'pa',
        units: {
            pa: { name: 'Pascal', factor: 1 },
            kpa: { name: 'Kilopascal', factor: 1000 },
            bar: { name: 'Bar', factor: 100000 },
            psi: { name: 'PSI', factor: 6894.76 },
            atm: { name: 'Atmósfera', factor: 101325 },
            torr: { name: 'Torr', factor: 133.322 },
            mmhg: { name: 'Milímetro de mercurio', factor: 133.322 },
            inhg: { name: 'Pulgada de mercurio', factor: 3386.39 },
            mbar: { name: 'Milibar', factor: 100 }
        }
    },
    digital: {
        name: 'Almacenamiento digital',
        icon: '💾',
        base: 'b',
        units: {
            b: { name: 'Byte', factor: 1 },
            kb: { name: 'Kilobyte', factor: 1024 },
            mb: { name: 'Megabyte', factor: 1048576 },
            gb: { name: 'Gigabyte', factor: 1073741824 },
            tb: { name: 'Terabyte', factor: 1099511627776 },
            pb: { name: 'Petabyte', factor: 1.1258999068426e15 },
            eb: { name: 'Exabyte', factor: 1.15292150460685e18 },
            zb: { name: 'Zettabyte', factor: 1.18059162071741e21 },
            yb: { name: 'Yottabyte', factor: 1.20892581961463e24 },
            bit: { name: 'Bit', factor: 0.125 }
        }
    },
    force: {
        name: 'Fuerza',
        icon: '💪',
        base: 'n',
        units: {
            n: { name: 'Newton', factor: 1 },
            kn: { name: 'Kilonewton', factor: 1000 },
            dyn: { name: 'Dina', factor: 0.00001 },
            p: { name: 'Pondio', factor: 0.00980665 },
            kp: { name: 'Kilopondio', factor: 9.80665 },
            lbf: { name: 'Libra-fuerza', factor: 4.44822 },
            tonf: { name: 'Tonelada-fuerza', factor: 8896.44 }
        }
    },
    frequency: {
        name: 'Frecuencia',
        icon: '📻',
        base: 'hz',
        units: {
            hz: { name: 'Hertz', factor: 1 },
            khz: { name: 'Kilohertz', factor: 1000 },
            mhz: { name: 'Megahertz', factor: 1000000 },
            ghz: { name: 'Gigahertz', factor: 1000000000 },
            thz: { name: 'Terahertz', factor: 1e12 },
            rpm: { name: 'Revoluciones por minuto', factor: 0.0166667 }
        }
    },
    angle: {
        name: 'Ángulo',
        icon: '📐',
        base: 'deg',
        units: {
            deg: { name: 'Grado', factor: 1 },
            rad: { name: 'Radián', factor: 57.2958 },
            grad: { name: 'Grado centesimal', factor: 0.9 },
            arcmin: { name: 'Minuto de arco', factor: 0.0166667 },
            arcsec: { name: 'Segundo de arco', factor: 0.000277778 },
            turn: { name: 'Vuelta completa', factor: 360 }
        }
    },
    fuel: {
        name: 'Consumo combustible',
        icon: '⛽',
        base: 'lp100km',
        units: {
            lp100km: { name: 'L/100km', factor: 1 },
            mpg: { name: 'Millas por galón', factor: (v) => 235.214 / v, inverse: true },
            kml: { name: 'Km por litro', factor: (v) => 100 / v, inverse: true }
        }
    }
};

// ===== VARIABLES GLOBALES =====
let currentCategory = 'length';
let conversionHistory = [];

// ===== FUNCIONES PRINCIPALES =====

/**
 * Actualiza las unidades según la categoría seleccionada
 */
function updateUnits() {
    const category = document.getElementById('category').value;
    currentCategory = category;
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const unitData = units[category];

    // Actualizar íconos
    document.getElementById('fromUnitIcon').textContent = unitData.icon;
    document.getElementById('toUnitIcon').textContent = unitData.icon;

    // Limpiar y llenar selects
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';

    // Ordenar unidades alfabéticamente
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

    // Establecer valores por defecto
    if (category === 'temperature') {
        fromSelect.value = 'c';
        toSelect.value = 'f';
    } else if (category === 'length') {
        fromSelect.value = 'm';
        toSelect.value = 'ly'; // Por defecto muestra años luz como destino
    } else {
        const keys = Object.keys(unitData.units);
        fromSelect.value = keys[0];
        toSelect.value = keys[1] || keys[0];
    }

    updateAdditionalInfo();
    convert();
}

/**
 * Valida que solo se ingresen números
 */
function validateInput(input) {
    const value = input.value;
    // Permitir números, punto decimal, negativo y notación científica
    if (value === '' || /^-?\d*\.?\d*(?:[eE][-+]?\d+)?$/.test(value)) {
        input.classList.remove('error');
        return true;
    } else {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 300);
        // Eliminar caracteres no válidos
        input.value = value.replace(/[^\d.eE\-+]/g, '');
        return false;
    }
}

/**
 * Realiza la conversión de unidades
 */
function convert() {
    const inputValue = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const outputField = document.getElementById('outputValue');
    const resultDisplay = document.getElementById('resultDisplay');
    const resultUnitDisplay = document.getElementById('resultUnitDisplay');

    let value = parseFloat(inputValue.value);

    // Validar entrada
    if (isNaN(value) || inputValue.value === '') {
        outputField.value = '';
        resultDisplay.textContent = '0';
        return;
    }

    const category = units[currentCategory];
    let result;

    try {
        // Manejar unidades con funciones especiales
        if (category.units[fromUnit].inverse || category.units[toUnit].inverse) {
            // Para unidades inversas como consumo de combustible
            if (category.units[fromUnit].inverse) {
                result = category.units[toUnit].factor(category.units[fromUnit].factor(value));
            } else if (category.units[toUnit].inverse) {
                result = category.units[toUnit].factor(value);
            } else {
                result = value * category.units[fromUnit].factor / category.units[toUnit].factor;
            }
        }
        // Conversión especial para temperatura
        else if (currentCategory === 'temperature') {
            const fromData = category.units[fromUnit];
            const toData = category.units[toUnit];

            // Convertir a Celsius primero
            const celsius = fromData.toBase(value);
            // Convertir de Celsius a destino
            result = toData.fromBase(celsius);
        } else {
            // Conversión estándar para otras unidades
            const fromFactor = category.units[fromUnit].factor;
            const toFactor = category.units[toUnit].factor;

            // Convertir a unidad base y luego a destino
            result = value * fromFactor / toFactor;
        }

        // Guardar en historial
        saveToHistory(value, fromUnit, result, toUnit);

        // Formatear resultado según magnitud
        let formattedResult;
        if (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-12 && result !== 0)) {
            formattedResult = result.toExponential(6);
        } else {
            formattedResult = result.toFixed(6).replace(/\.?0+$/, '');
        }

        outputField.value = formattedResult;
        resultDisplay.textContent = formattedResult;
        resultUnitDisplay.textContent = category.units[toUnit].name;

    } catch (error) {
        console.error('Error en conversión:', error);
        outputField.value = 'Error';
        resultDisplay.textContent = 'Error';
    }
}

/**
 * Guarda la conversión en el historial
 */
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

    // Mantener solo las últimas 10 conversiones
    if (conversionHistory.length > 10) {
        conversionHistory.pop();
    }

    updateHistoryDisplay();
}

/**
 * Actualiza la visualización del historial
 */
function updateHistoryDisplay() {
    const historyDiv = document.getElementById('conversionHistory');
    if (!historyDiv) return;

    let html = '<h3>📜 Historial de conversiones</h3>';

    conversionHistory.forEach(item => {
        html += `
            <div class="history-item">
                <span class="history-time">${item.timestamp}</span>
                <span class="history-conversion">
                    ${item.value} ${item.fromUnit} → ${item.result.toFixed(4)} ${item.toUnit}
                </span>
                <span class="history-category">${item.category}</span>
            </div>
        `;
    });

    historyDiv.innerHTML = html;
}

/**
 * Intercambia las unidades de origen y destino
 */
function swapUnits() {
    const fromSelect = document.getElementById('fromUnit');
    const toSelect = document.getElementById('toUnit');
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;

    fromSelect.value = toValue;
    toSelect.value = fromValue;

    convert();
}

/**
 * Actualiza la información adicional de unidades
 */
function updateAdditionalInfo() {
    const infoDiv = document.getElementById('additionalInfo');
    const category = units[currentCategory];

    let html = '';
    const unitList = Object.entries(category.units).slice(0, 6); // Mostrar primeras 6 unidades

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

/**
 * Obtiene el equivalente en unidad base
 */
function getBaseEquivalent(unitKey) {
    const category = units[currentCategory];

    if (currentCategory === 'temperature') {
        const unit = category.units[unitKey];
        if (unitKey === 'c') return 'Unidad base';
        if (unitKey === 'f') return '0°F = -17.78°C';
        if (unitKey === 'k') return '0K = -273.15°C';
        return 'Unidad derivada';
    }

    if (category.units[unitKey].inverse) {
        return 'Unidad inversa';
    }

    const unit = category.units[unitKey];
    const baseUnit = category.units[category.base];

    if (unit.factor === 1) return 'Unidad base';

    // Para números muy grandes o pequeños
    if (Math.abs(unit.factor) > 1e6 || Math.abs(unit.factor) < 1e-6) {
        return `${(1 / unit.factor).toExponential(4)} ${baseUnit.name}`;
    }

    const equivalent = (1 / unit.factor).toFixed(4);
    return `${equivalent} ${baseUnit.name}`;
}

/**
 * Activa/desactiva el modo oscuro
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggle = document.getElementById('darkModeToggle');
    toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';

    // Guardar preferencia
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

/**
 * Carga la preferencia de modo oscuro
 */
function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '☀️';
    }
}

/**
 * Formatea números grandes para mostrar
 */
function formatLargeNumber(num) {
    if (Math.abs(num) > 1e12) {
        return num.toExponential(6);
    }
    if (Math.abs(num) > 1e6) {
        return num.toLocaleString('es-ES', { maximumFractionDigits: 2 });
    }
    return num.toFixed(4);
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
    // Cargar preferencia de modo oscuro
    loadDarkModePreference();

    // Inicializar la página
    updateUnits();
    convert();

    // Agregar event listeners adicionales
    document.getElementById('inputValue').addEventListener('keyup', convert);
    document.getElementById('inputValue').addEventListener('change', convert);

    // Agregar selector de categorías adicionales
    const categorySelect = document.getElementById('category');
    // Agregar nuevas categorías al select si no existen
    const newCategories = ['digital', 'force', 'frequency', 'angle', 'fuel'];
    newCategories.forEach(cat => {
        if (!Array.from(categorySelect.options).some(opt => opt.value === cat)) {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = `${units[cat].icon} ${units[cat].name}`;
            categorySelect.appendChild(option);
        }
    });
});

// Exponer funciones globalmente
window.updateUnits = updateUnits;
window.validateInput = validateInput;
window.convert = convert;
window.swapUnits = swapUnits;
window.toggleDarkMode = toggleDarkMode;