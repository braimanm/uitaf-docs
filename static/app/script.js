document.getElementById('vehicleType').addEventListener('change', function () {
    var vehicleType = this.value;
    var mainGroup = document.getElementsByClassName("group-main")[0];
    var payloadGroup = document.getElementById('payloadGroup');
    var totalWeightGroup = document.getElementById('totalWeightGroup');
    var modelGroup = document.getElementById('modelGroup');
    var cylinderCapacityGroup = document.getElementById('cylinderCapacityGroup');

    if (vehicleType !== '') {
        mainGroup.classList.remove('hidden');
    } else {
        if (!mainGroup.classList.contains('hidden')) {
            mainGroup.classList.add('hidden');
        }
    }

    // Hide all specific fields initially
    payloadGroup.classList.add('hidden');
    totalWeightGroup.classList.add('hidden');
    modelGroup.classList.add('hidden');
    cylinderCapacityGroup.classList.add('hidden');

    // Show relevant fields based on vehicle type
    if (vehicleType === 'truck') {
        payloadGroup.classList.remove('hidden');
        totalWeightGroup.classList.remove('hidden');
    } else if (vehicleType === 'motorcycle') {
        modelGroup.classList.remove('hidden');
        cylinderCapacityGroup.classList.remove('hidden');
    }

    // Clear error messages for hidden fields
    clearErrorMessage('payload');
    clearErrorMessage('totalWeight');
    clearErrorMessage('model');
    clearErrorMessage('cylinderCapacity');
});

function validateForm(formId) {
    var form = document.getElementById(formId);
    var isValid = true;

    // Validate all required fields, including conditionally visible fields
    form.querySelectorAll('input[required], select[required]').forEach(function (field) {
        var errorMessageElement = document.getElementById(field.id + 'Error');
        if (field.value === '' && !field.parentElement.classList.contains('hidden')) {
            isValid = false;
            errorMessageElement.textContent = 'This field is required.';
            field.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            errorMessageElement.textContent = '';
        }
    });

    // Check additional conditionally visible fields
    var vehicleType = document.getElementById('vehicleType').value;
    if (vehicleType === 'truck') {
        var payload = document.getElementById('payload');
        var totalWeight = document.getElementById('totalWeight');
        if (payload.value === '') {
            isValid = false;
            document.getElementById('payloadError').textContent = 'This field is required.';
            payload.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (totalWeight.value === '') {
            isValid = false;
            document.getElementById('totalWeightError').textContent = 'This field is required.';
            totalWeight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    if (vehicleType === 'motorcycle') {
        var model = document.getElementById('model');
        var cylinderCapacity = document.getElementById('cylinderCapacity');
        if (model.value === '') {
            isValid = false;
            document.getElementById('modelError').textContent = 'This field is required.';
            model.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (cylinderCapacity.value === '') {
            isValid = false;
            document.getElementById('cylinderCapacityError').textContent = 'This field is required.';
            cylinderCapacity.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

function clearErrorMessage(fieldId) {
    var errorMessageElement = document.getElementById(fieldId + 'Error');
    if (errorMessageElement) {
        errorMessageElement.textContent = '';
    }
}

document.getElementById('vehicleForm').addEventListener('input', function (event) {
    var fieldId = event.target.id;
    if (event.target.hasAttribute('required')) {
        clearErrorMessage(fieldId);
    }
});

document.getElementById('clientForm').addEventListener('input', function (event) {
    var fieldId = event.target.id;
    if (event.target.hasAttribute('required')) {
        clearErrorMessage(fieldId);
    }
});

document.getElementById('nextButton').addEventListener('click', function () {
    if (validateForm('vehicleForm')) {
        document.getElementById('vehicleForm').classList.add('hidden');
        document.getElementById('clientForm').classList.remove('hidden');
    }
});

document.getElementById('submitButton').addEventListener('click', function () {
    var vehicleFormValid = validateForm('vehicleForm');
    var clientFormValid = validateForm('clientForm');

    if (vehicleFormValid && clientFormValid) {
        var summaryContent = document.getElementById('summaryContent');

        var vehicleData = new FormData(document.getElementById('vehicleForm'));
        var clientData = new FormData(document.getElementById('clientForm'));

        summaryContent.innerHTML = '';

        // Display vehicle data
        summaryContent.innerHTML += '<h3>Vehicle Information</h3>';
        vehicleData.forEach((value, key) => {
            if (value) {
                var label = document.querySelector("label[for='" + key + "']").textContent.replace(' *','');
                summaryContent.innerHTML += `<p><strong>${label}:</strong> <span>${value}</span></p>`;
            }
        });

        // Display client data
        summaryContent.innerHTML += '<h3>Client Information</h3>';
        clientData.forEach((value, key) => {
            if (key === 'picture') {
                // Display file name if file is selected
                var fileName = document.getElementById('picture').files[0]?.name || 'No file selected';
                summaryContent.innerHTML += `<p><strong>Picture:</strong> <span>${fileName}</span></p>`;
            } else if (value) {  
                var label = document.querySelector("label[for='" + key + "']").textContent.replace(' *','');
                summaryContent.innerHTML += `<p><strong>${label}:</strong> <span>${value}</span></p>`;
            }
        });

        document.getElementById('clientForm').classList.add('hidden');
        document.getElementById('summaryPage').classList.remove('hidden');
    }
});
