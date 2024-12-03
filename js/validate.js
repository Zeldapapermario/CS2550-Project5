/*    
 
Project:  Project 5
Name: Kyle Allred
Submitted: 12/2/24
 
I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that  If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.
 
Reflection (1-2 paragraphs):  I learned more about Javascript than I did before. There was a moment where I kept getting an error message at a certain point in the code. 
In the checkRequired function I kept a null value when I used document.getElementById(id). I thought it was some issue with that function but I eventually discovered it
was an issue with how I added the error message in the setElementValidity function. 
 
*/

let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net|org|dev){1}/;
let zipCodeRegex = /(?<zip1>\d{5})([-]?(?<zip2>\d{4}))?(?<ERROR>.+)?/;

const stateCodes = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

let form=null;
let successMsg=null;

function Validation(formId, successId) {
    form = document.getElementById(formId);
    successMsg = document.getElementById(successId);
    let inputs = document.querySelectorAll("input");

    for (input of inputs) {
        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
    let el = ev.currentTarget;
    validateForm();
    el.classList.add("wasValidated");
}

function submitForm(ev) {
    console.log("submit form")
    let form = ev.currentTarget;
    ev.preventDefault();
    ev.stopPropagation();
    validateForm();

    if (!form.checkValidity()) {
        console.log("not valid!")
        let inputs = document.querySelectorAll("input");
        for (input of inputs) {
          input.classList.add("wasValidated");
        }
    } else {
        form.style.display = 'none';
        document.getElementById("success").style.display = 'block';
    }
}

function validateForm() {
    checkRequired("firstName", "First Name is Required!");
    checkRequired("lastName", "Last Name is Required!");
    checkRequired("streetAddress", "Address is Required!");
    checkRequired("city", "City is Required!");

    if (checkRequired("state", "State is Required!")) {
        validateState("state", "Not a valid State, enter two digit code. Ex: CA")
    }
    if (checkRequired("email", "Email is Required!")) {
        checkFormat("email", "Not a valid email format.", emailRegex)
    }
    if (checkRequired("zipcode", "ZipCode is Required!")) {
        checkFormat("zipcode", "Incorrect ZipCode, please use '#####' or '#####-####' format.", zipCodeRegex)
    }
    if (checkRequired("phone", "Phone Number is Required!")) {
        checkFormat("phone", "Phone Number format is incorrect!", phoneRegex)
    }
    
    checkRequired("ad", "You must select at least one option!");
}

function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;
    let stateValue = el.value;
    let stateUpperCase = stateValue.toUpperCase();
    valid = stateCodes.includes(stateUpperCase);

    setElementValidity(id, valid, msg);
}

function checkFormat(id, msg, regex) {
    let value = document.getElementById(id).value;
    let valid = regex.test(value);

    setElementValidity(id, valid, msg);
    return valid;
}

function checkRequired(id, msg) {
    let el1 = document.getElementById(id);
    let valid = false;
    let type = el1.type;
    switch (type) {
        case 'text':
        case 'password':
            if (el1.value === "") {
                valid = false;
            } else {
                valid = true;
            }
            break;
        case 'checkbox':
            inputCheck = document.getElementsByName("findPage");
            for (var i = 0; i < inputCheck.length; i++) {
                if (inputCheck[i].checked) {
                    valid = true;
                }
                    
            }
        case 'radio':
    }

    setElementValidity(id, valid, msg);
    return valid;
}

function setElementValidity(id, valid, msg) {
    let el = document.getElementById(id);

    if (valid) {
        el.setCustomValidity('');
    } else {
        el.setCustomValidity(msg);
        el.parentNode.getElementsByTagName('div')[0].innerHTML = msg;
    }
}