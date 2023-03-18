/**
 * File Name: BIutil.js
 *
 * Revision History:
 *       Boa Im, 2023-02-14: Created
 */

function validation_Add() {
    let AddForm = $("#formAdd");

    AddForm.validate({
        rules:{
            txtName:{
                required: true,
                rangelength:[2, 20]
            },
            txtEmail:{
                required: true,
                email: true
            },
            visitingDate:{
                required: true
            },
            numQuality: {
                range: [0,5]
            },
            numService: {
                range: [0,5]
            },
            numValue: {
                range: [0,5]
            }
        },
        messages:{
            txtName:{
                required: "You must enter name",
                rangelength: "Name must be 2-20 chars long"
            },
            txtEmail:{
                required: "You must enter email",
                email:"Please enter valid email address"
            },
            visitingDate:{
                required: "You must enter Review date"
            },
            numQuality: {
                range: "Quality score must be between 0-5"
            },
            numService: {
                range: "Service score must be between 0-5"
            },
            numValue: {
                range: "Value score must be between 0-5"
            }
        }
    })

    return AddForm.valid();
}

function validation_Modify() {
    let ModifyForm = $("#formModify");

    ModifyForm.validate({
        rules:{
            txtDefaultName:{
                required: true,
                rangelength:[2, 20]
            },
            txtDefaultEmail:{
                required: true,
                email: true
            },
            visitingDefaultDate:{
                required: true
            },
            numDefaultQuality: {
                range: [0,5]
            },
            numDefaultService: {
                range: [0,5]
            },
            numDefaultValue: {
                range: [0,5]
            }
        },
        messages:{
            txtDefaultName:{
                required: "You must enter name",
                rangelength: "Name must be 2-20 chars long"
            },
            txtDefaultEmail:{
                required: "You must enter email",
                email:"Please enter valid email address"
            },
            visitingDefaultDate:{
                required: "You must enter Review date"
            },
            numDefaultQuality: {
                range: "Quality score must be between 0-5"
            },
            numDefaultService: {
                range: "Service score must be between 0-5"
            },
            numDefaultValue: {
                range: "Value score must be between 0-5"
            }
        }
    })

    return ModifyForm.valid();
}