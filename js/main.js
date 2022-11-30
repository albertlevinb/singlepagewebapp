// Name: Albert Levin
// Date: 11/29/22

// Additional Sources: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#built-in_form_validation_examples
// https://bootstrap-table.com/docs/extensions/sticky-header/

function generateMultiplicationTable() {

	// Using the parseInt function to convert to int values
	// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
	var rowFirst = parseInt(document.getElementById('row-first').value);
	var rowLast = parseInt(document.getElementById('row-last').value);
	var colFirst = parseInt(document.getElementById('col-first').value);
	var colLast = parseInt(document.getElementById('col-last').value);
	var table = document.getElementsByClassName("table");

	// Checking if the input was entered out of order. Then, swap the values accordingly
	if (rowFirst > rowLast) {
		var temp = rowFirst;
		var temp2 = rowLast;
		rowFirst = temp2;
		rowLast = temp;
	}

	if (colFirst > colLast) {
		var temp = colFirst;
		var temp2 = colLast;
		colFirst = temp2;
		colLast = temp;
	}

	// To populate the table with the appropriate rows & columns, etc
	var tableHTML = "<thead> <tr> <th> </th>"
	for (var i = rowFirst; i <= rowLast; i++) {
		tableHTML += "<th>" + i + "</th>";
	}
	tableHTML += "</tr> </thead> <tbody> ";

	for (var j = colFirst; j <= colLast; j++) {
		tableHTML += "<tr> <th scope=\"row\">" + j + "</td>";
		for (var i = rowFirst; i <= rowLast; i++) {
			tableHTML += "<td>" + j * i + "</td>";
		}
		tableHTML += "</tr>";
	}
	tableHTML += "<tbody>";
	table[0].innerHTML = tableHTML;

}

// When the form is fully loaded, select it through id and trigger the validation with specified rules
// Source: https://www.geeksforgeeks.org/form-validation-using-jquery/
$(document).ready(function() {
	$('#inputForm').on('keyup and blur events', function() { // Sources for keyup and blur events respectively: https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event & https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
		if ($('#inputForm').validate().checkForm()) {
			$('#submitButton').prop('disabled', false);
		} else {
			$('#submitButton').prop('disabled', true);
		}
	});
	// Describes what rules should be applied to all of the form fields
	$("#inputForm").validate({
		rules: {
			firstRow: {
				required: true,
				checkFloat: true,
				checkRange: true
			},
			lastRow: {
				required: true,
				checkFloat: true,
				checkRange: true
			},
			firstColumn: {
				required: true,
				checkFloat: true,
				checkRange: true
			},
			lastColumn: {
				required: true,
				checkFloat: true,
				checkRange: true
			}
		},
		// Manually entered in some custom error messages
		messages: {
			firstRow: {
				required: "Both fields are required.",
				number: "Please enter a valid integer."
			},
			lastRow: {
				required: "Both fields are required.",
				number: "Please enter a valid integer."
			},
			firstColumn: {
				required: "Both fields are required.",
				number: "Please enter a valid integer."
			},
			lastColumn: {
				required: "Both fields are required.",
				number: "Please enter a valid integer."
			}
		}
	});

	$('#submitButton').click(generateMultiplicationTable);

});

// Error handling for floats (decimals) and, if necessary, display an error message afterwards
// Source: https://jqueryvalidation.org/documentation/
jQuery.validator.addMethod("checkFloat", function(value, element) {
	return this.optional(element) || (Number.isInteger(parseFloat(value)));
}, "Floats are not supported, please enter integers only.");

jQuery.validator.addMethod("checkRange", function(value, element) {
	return this.optional(element) || (-50 <= value) && (value <= 50);
}, "Please enter an integer between -50 and 50.");