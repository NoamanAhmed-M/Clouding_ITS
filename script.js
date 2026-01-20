// Function to register a new machine with temperature
function registerMachine(machineName, temperature) {
    // Validate input
    if (!machineName || machineName.trim() === '') {
        alert('Please enter a valid machine name');
        return false;
    }

    if (isNaN(temperature) || temperature === '') {
        alert('Please enter a valid temperature');
        return false;
    }

    // Get the container
    const container = document.querySelector('.container');

    // Create new register div
    const newRegister = document.createElement('div');
    newRegister.classList.add('register');

    // Create macchina div
    const macchinaDiv = document.createElement('div');
    macchinaDiv.classList.add('macchina');
    macchinaDiv.textContent = machineName;

    // Create temperature div
    const temperatureDiv = document.createElement('div');
    temperatureDiv.classList.add('Tempratura');
    temperatureDiv.textContent = temperature + '°C';

    // Append elements
    newRegister.appendChild(macchinaDiv);
    newRegister.appendChild(temperatureDiv);
    container.appendChild(newRegister);

    console.log(`Machine "${machineName}" with temperature ${temperature}°C registered successfully`);
    return true;
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const addMachineBtn = document.getElementById('addMachineBtn');
    const machineNameInput = document.getElementById('machineNameInput');
    const temperatureInput = document.getElementById('temperatureInput');

    // Add machine on button click
    if (addMachineBtn) {
        addMachineBtn.addEventListener('click', function() {
            const machineName = machineNameInput.value.trim();
            const temperature = temperatureInput.value;

            if (registerMachine(machineName, temperature)) {
                // Clear inputs after successful registration
                machineNameInput.value = '';
                temperatureInput.value = '';
                machineNameInput.focus();
            }
        });

        // Add machine on Enter key press
        temperatureInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addMachineBtn.click();
            }
        });

        machineNameInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addMachineBtn.click();
            }
        });
    }
});

// Function to register multiple machines
function registerMultipleMachines(machinesData) {
    if (!Array.isArray(machinesData)) {
        alert('Please provide an array of machine objects');
        return false;
    }

    machinesData.forEach(machine => {
        registerMachine(machine.name, machine.temperature);
    });

    return true;
}

// Function to clear all registers
function clearAllRegisters() {
    const container = document.querySelector('.container');
    const registers = container.querySelectorAll('.register');
    
    if (registers.length === 0) {
        alert('No registers to clear');
        return false;
    }

    registers.forEach(register => register.remove());
    console.log('All registers cleared');
    return true;
}

// Function to update temperature of a specific machine
function updateTemperature(machineIndex, newTemperature) {
    const registers = document.querySelectorAll('.register');

    if (machineIndex < 0 || machineIndex >= registers.length) {
        alert('Invalid machine index');
        return false;
    }

    if (isNaN(newTemperature)) {
        alert('Please enter a valid temperature');
        return false;
    }

    const temperatureDiv = registers[machineIndex].querySelector('.Tempratura');
    temperatureDiv.textContent = newTemperature + '°C';

    console.log(`Temperature updated for machine at index ${machineIndex}`);
    return true;
}

// Function to get all current machines data
function getAllMachines() {
    const registers = document.querySelectorAll('.register');
    const machinesData = [];

    registers.forEach((register, index) => {
        const machineName = register.querySelector('.macchina').textContent;
        const temperature = register.querySelector('.Tempratura').textContent;

        machinesData.push({
            index: index,
            name: machineName,
            temperature: temperature
        });
    });

    return machinesData;
}

// Example usage:
// registerMachine('Machine 1', 45);
// registerMachine('Machine 2', 52);
// registerMultipleMachines([
//     { name: 'Machine 3', temperature: 38 },
//     { name: 'Machine 4', temperature: 62 }
// ]);
