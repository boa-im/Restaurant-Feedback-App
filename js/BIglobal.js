/**
 * File Name: BIglobal.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 */



function num_changed() {
    showOverall();
}

function numDefault_changed() {
    showDefaultOverall();
}

function show_hide() {
    if($(this).is(":checked")) {
        $(".ratings").show();
    } else {
        $(".ratings").hide();
    }
}

function btnSaveDefaults_click() {
    localStorage.setItem("DefaultEmail", $("#txtDefault").val());
    alert("Default reviewer email is saved.");
}

function btnSave_click() {
    validationAddForm();
}

function btnUpdate_click() {
    validationModifyForm();
}

function init() {
    $("#btnSave").on("click", btnSave_click);
    // $("#btnCancel").on("click", btnCancel_click);
    // $("#btnDelete").on("click", btnDelete_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnSaveDefaults").on("click", btnSaveDefaults_click);
    // $("#btnClear").on("click", btnClear_click);
    $("#numQuality").on("input", num_changed);
    $("#numService").on("input", num_changed);
    $("#numValue").on("input", num_changed);
    $("#numDefaultQuality").on("input", numDefault_changed);
    $("#numDefaultService").on("input", numDefault_changed);
    $("#numDefaultValue").on("input", numDefault_changed);
    $("#cbRating").on("click", show_hide);
    $("#cbDefaultRating").on("click", show_hide);
}

$(document).ready(function () {
    init();
    $(".ratings").hide();
    $("#defaultRating").show();
});