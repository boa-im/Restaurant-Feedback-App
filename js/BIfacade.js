/**
 * File Name: BIfacade.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 */

const showOverall = () => {
    let quality = $("#numQuality").val();
    let service = $("#numService").val();
    let value = $("#numValue").val();

    let overall = Math.round((Number(quality) + Number(service) + Number(value)) * 100 / 15);

    $("#txtOverall").val(overall + "%");
}

const showDefaultOverall = () => {
    let quality = $("#numDefaultQuality").val();
    let service = $("#numDefaultService").val();
    let value = $("#numDefaultValue").val();

    let overall = Math.round((Number(quality) + Number(service) + Number(value)) * 100 / 15);

    $("#txtDefaultOverall").val(overall + "%");
}

function validationAddForm() {
    if (validation_Add()) {
        console.log("Add Form is valid");
    }
    else{
        console.error("Add Form is invalid");
    }
}

function validationModifyForm() {
    if (validation_Modify()) {
        console.log("Modify Form is valid");
    }
    else{
        console.error("Modify Form is invalid");
    }
}