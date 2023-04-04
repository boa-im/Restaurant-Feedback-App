/**
 * File Name: BIfacade.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 *       Boa Im, 2023-03-21: Added codes
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

function addFeedback() {
    if (validation_Add()) {
        console.log("Add Form is valid");

        let businessName = $("#txtName").val();
        let typeId = $("#cmbType").val();
        let reviewerEmail = $("#txtEmail").val();
        let reviewerComments = $("#txtComments").val();
        let reviewDate = $("#visitingDate").val();
        let hasRating = $("#cbRating").prop("checked");
        let rating1 = $("#numQuality").val();
        let rating2 = $("#numService").val();
        let rating3 = $("#numValue").val();

        let options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];

        function callback() {
            console.log("New feedback Added");
            alert("New feedback Added");
        }

        Review.insert(options, callback);
    } else {
        console.error("Add Form is invalid");
    }
}

function validationModifyForm() {
    if (validation_Modify()) {
        console.log("Modify Form is valid");

        let businessName = $("#txtDefaultName").val();
        let typeId = $("#cmbDefaultType").val();
        let reviewerEmail = $("#txtDefaultEmail").val();
        let reviewerComments = $("#txtDefaultComments").val();
        let reviewDate = $("#visitingDefaultDate").val();
        let hasRating = $("#cbDefaultRating").prop("checked");
        let rating1 = $("#numDefaultQuality").val();
        let rating2 = $("#numDefaultService").val();
        let rating3 = $("#numDefaultValue").val();
        let id = localStorage.getItem('id');

        let options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];

        function callback() {
            console.log("Feedback Updated successfully");
            alert("Feedback Updated successfully");
        }

        Review.update(options, callback);
    } else {
        console.error("Modify Form is invalid");
    }
}

function updateTypesDropdown() {
    let options = [];
    let htmlCode = "";
    function callback(tx, results) {

        for (var i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];

            if(row['id'] == 5) {
                htmlCode += `<option value="${row['id']}" selected>${row['name']}</option>`;
            }
            else {
                htmlCode += `<option value="${row['id']}">${row['name']}</option>`;
            }
        }
        let cmb = $("#cmbType");
        cmb = cmb.html(htmlCode).change();
    }
    Type.selectAll(options, callback);
}

function updateDefaultTypesDropdown() {
    let options = [];
    let htmlCode = "";
    function callback(tx, results) {

        for (var i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];

            htmlCode += `<option value="${row['id']}">${row['name']}</option>`;
        }
        let cmb = $("#cmbDefaultType");
        cmb = cmb.html(htmlCode).change();
    }
    Type.selectAll(options, callback);
}

function deleteFeedback() {
    let result = confirm("Do you really want to delete the review?");
    if (result) {
        let id = localStorage.getItem('id');
        let options = [id];

        function callback() {
            console.log("Success: record deleted successfully");
            $(location).prop('href', '#BIViewFeedbackPage');
        }

        Review.delete(options, callback);
    }
}

function clearDatabase() {
    let result = confirm("Do you really want to clear database?");
    if (result) {
        try {
            DB.dropTables();
            alert("Database cleared: All tables dropped");
        } catch (e) {
            alert(e);
        }
    }
}

function getReviews() {
    let options = [];
    function callback(tx, results) {
        let htmlCode = "";

        if(results.rows.length == 0) {
            htmlCode = `<h2>No record found</h2>`
        }
        else {
            for (var i = 0; i < results.rows.length; i++) {
                let row = results.rows[i];
                let overall = Math.round((row['rating1'] + row['rating2'] + row['rating3']) / 15 * 100);

                htmlCode += `<li>
                <a data-role="button" data-row-id=${row['id']} href="#">
                <h1>Business Name: ${row['businessName']}</h1>
                <h3>Reviewer Email: ${row['reviewerEmail']}</h3>
                <h3>Comments: ${row['reviewerComments']}</h3>
                <h3>Overall Rating: ${overall}%</h3></a></li>`;
            }
        }
        let lv = $("#ListViewFeedback");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function linkClickHandler() {
            // saving id to local storage
            localStorage.setItem("id", $(this).attr('data-row-id'));
            // navigating to another page
            $(location).prop('href', "#BIModifyFeedbackPage");
        }

        // attach event handler to each <a> tag
        $("#ListViewFeedback a").on("click", linkClickHandler);
    }
    Review.selectAll(options, callback);
}

function showCurrentReview() {
    updateDefaultTypesDropdown();


    let id = localStorage.getItem("id");
    let option = [id];

    function callback(tx, results) {
        let row = results.rows[0];
        let overall = Math.round((row['rating1'] + row['rating2'] + row['rating3']) / 15 * 100);

        $("#txtDefaultName").val(row['businessName']);
        $("#cmbDefaultType").val(row['typeId']).change();
        $("#txtDefaultEmail").val(row['reviewerEmail']);
        $("#txtDefaultComments").val(row['reviewerComments']);
        $("#visitingDefaultDate").val(row['reviewDate']);

        if (row['hasRating'] === 'true') {
            $("#cbDefaultRating").prop("checked", true).checkboxradio('refresh');
            $("#numDefaultQuality").val(row['rating1']);
            $("#numDefaultService").val(row['rating2']);
            $("#numDefaultValue").val(row['rating3']);
            $("#txtDefaultOverall").val(overall);
        }else  {
            $("#cbDefaultRating").prop("checked", false).checkboxradio('refresh');
            $("#defaultRating").hide();
        }
    }

    Review.select(option, callback);
}