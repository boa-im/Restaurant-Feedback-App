/**
 * File Name: BIglobal.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 *       Boa Im, 2023.03.21: Added codes
 */



function num_changed() {
    showOverall();
}

function numDefault_changed() {
    showDefaultOverall();
}


function show_hide() {
    if($(this).is(":checked")) {
        $("#Rating").toggle();
    } else {
        $("#Rating").toggle();
        $("#numQuality").val(0);
        $("#numService").val(0);
        $("#numValue").val(0);
        $("#txtOverall").val("");
    }
}

function show_hide_default() {
    if($(this).is(":checked")) {
        $("#defaultRating").toggle();
    } else {
        $("#defaultRating").toggle();
        $("#numDefaultValue").val(0);
        $("#numDefaultService").val(0);
        $("#numDefaultQuality").val(0);
        $("#txtDefaultOverall").val("");
    }
}

function btnSaveDefaults_click() {
    localStorage.setItem("DefaultEmail", $("#txtDefault").val());
    alert("Default reviewer email is saved.");
}

function btnSave_click() {
    addFeedback();
}

function btnUpdate_click() {
    validationModifyForm();
}

function btnDelete_click() {
    deleteFeedback();
}

function btnClear_click() {
    clearDatabase();
}

function btnShowAll_click() {
    getReviews();
}

function btnShow_click() {
    showCurrentReview();
}

function pageFeedbacks_show() {
    getReviews();
}

function pageModify_show() {
    showCurrentReview();
}

function pageAddFeedback_show() {
    $("#txtEmail").val(localStorage.getItem('DefaultEmail'));
    updateTypesDropdown();
}

function init() {
    $("#numQuality").on("input", num_changed);
    $("#numService").on("input", num_changed);
    $("#numValue").on("input", num_changed);
    $("#numDefaultQuality").on("input", numDefault_changed);
    $("#numDefaultService").on("input", numDefault_changed);
    $("#numDefaultValue").on("input", numDefault_changed);
    $("#cbRating").on("click", show_hide);
    $("#cbDefaultRating").on("click", show_hide_default);

    $("#btnSave").on("click", btnSave_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnSaveDefaults").on("click", btnSaveDefaults_click);
    $("#btnClear").on("click", btnClear_click);
    $("#btnShowAll").on("click", btnShowAll_click);
    $("#btnShow").on("click", btnShow_click);

    //pageshow events
    $("#BIAddFeedbackPage").on("pageshow", pageAddFeedback_show);
    $("#BIViewFeedbackPage").on("pageshow", pageFeedbacks_show);
    $("#BIModifyFeedbackPage").on("pageshow", pageModify_show);
}

function initDB(){
    try {
        DB.createDatabase();
        if (db) {
            console.log('creating tables...');
            DB.createTables();
        }
        else{
            console.error("Error: Error in creating tables");
        }
    } catch (e) {
        console.error(`Error: (Fatal) error in initDB(). can't proceed`);
    }
}


$(document).ready(function () {
    init();

    $("#Rating").hide();

    initDB();
});