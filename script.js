$(document).ready(function(){
    // Prevent resubmit on refresh and back button
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    let $image = $('#image'),
        $fname = $('#firstname'),
        $lname = $('#lastname'),
        $email = $('#email'),
        $mob = $('#mob'),
        $dob = $('#dob'),
        $password = $('#password'),
        $state = $('#state'),
        $experience = $('#exp'),
        $gender = $('input[name="gender"]'),
        $intAreas = $('#area-int'),
        $qual = $('#qualifications'),
        $terms = $('#terms');

    let $imgError = $('#img-error'),
        $fnameError = $('#fname-error'),
        $lnameError = $('#lname-error'),
        $emailError = $('#email-error'),
        $mobError = $('#mob-error'),
        $dobError = $('#dob-error'),
        $passwordError = $('#password-error'),
        $stateError = $('#state-error'),
        $expError = $('#exp-error'),
        $genderError = $('#gender-error'),
        $fieldError = $('#int-error'),
        $qualError = $('#qual-error'),
        $termError = $('#term-error'),
        $submitError = $('#submit-error');

    // Check form empty fields and Input patterns
    function validateImg() {
        let file = $image[0].files[0],
            maxSize = 2 * 1024 * 1024,
            allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (!file) {
            $imgError.text("*Please upload your image");
            return false;
        } else if (!allowedExtensions.exec(file.name)) {
            $imgError.text("*Only jpg, jpeg, png, gif formats are supported");
            return false;
        } else if (file.size > maxSize) {
            $imgError.text("*Image size cannot exceed 2MB");
            return false;
        } else {
            $imgError.text('');
            return true;
        }
    }

    function validateFname() {
        let value = $fname.val();
        if (!value.length) {
            $fnameError.text("*Please enter your first name");
            $fname[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        } else if (!/^[A-Za-z]+(\s[A-Za-z]+)?$/.test(value)) {
            $fnameError.text("*Please enter a valid first name");
            return false;
        } else {
            $fnameError.text('');
            return true;
        }
    }

    function validateLname() {
        let value = $lname.val();
        if (!value.length) {
            $lnameError.text("*Please enter your last name");
            return false;
        } else if (!/^[A-Za-z]+(\s[A-Za-z]+)?$/.test(value)) {
            $lnameError.text("*Please enter a valid last name");
            return false;
        } else {
            $lnameError.text('');
            return true;
        }
    }

    function validateEmail() {
        let value = $email.val();
        if (!value.length) {
            $emailError.text("*Please enter your email");
            return false;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            $emailError.text("*Please enter a valid email");
            return false;
        } else {
            $emailError.text('');
            return true;
        }
    }

    function validateMob() {
        let value = $mob.val();
        if (!value.length) {
            $mobError.text("*Please enter your mobile number");
            return false;
        } else if (!/^[6-9]\d{9}$/.test(value)) {
            $mobError.text("*Please enter a valid mobile number");
            return false;
        } else {
            $mobError.text('');
            return true;
        }
    }

    function validateDob() {
        let date = $dob.val();
        if (!date.length) {
            $dobError.text("*Please enter your date of birth");
            return false;
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            $dobError.text("Please enter a valid date of birth");
            return false;
        } else {
            $dobError.text('');
            return true;
        }
    }

    function validatePassword() {
        let value = $password.val();
        if (!value.length) {
            $passwordError.text("*Please enter your password");
            return false;
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
            $passwordError.text("*Please enter a valid password");
            return false;
        } else {
            $passwordError.text('');
            return true;
        }
    }

    function validateState() {
        let value = $state.val();
        if (!value.length) {
            $stateError.text("*Please enter your state");
            return false;
        } else {
            $stateError.text('');
            return true;
        }
    }

    function validateExp() {
        let value = $experience.val();
        if (!value.length || isNaN(value) || value < 0 || !Number.isInteger(Number(value))) {
            $expError.text("*Please enter valid experience in years");
            return false;
        } else {
            $expError.text('');
            return true;
        }
    }

    function validateGender() {
        if ($gender.is(':checked')) {
            $genderError.text('');
            return true;
        } else {
            $genderError.text("Gender should be specified");
            return false;
        }
    }

    function validateIntArea() {
        if (!$intAreas.val().length) {
            $fieldError.text("Please enter your interests");
            return false;
        } else {
            $fieldError.text('');
            return true;
        }
    }

    function validateQual() {
        if (!$qual.val().length) {
            $qualError.text("*Please enter your qualification");
            return false;
        } else {
            $qualError.text('');
            return true;
        }
    }

    function validateTerms() {
        if (!$terms.is(':checked')) {
            $termError.text("*Please accept the terms and conditions");
            return false;
        } else {
            $termError.text('');
            return true;
        }
    }

    // Form Submission
    function validateForm(event) {
        event.preventDefault();
        let isValid = true;

        if (!validateImg()) isValid = false;
        if (!validateFname()) isValid = false;
        if (!validateLname()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateMob()) isValid = false;
        if (!validateDob()) isValid = false;
        if (!validatePassword()) isValid = false;
        if (!validateState()) isValid = false;
        if (!validateExp()) isValid = false;
        if (!validateGender()) isValid = false;
        if (!validateIntArea()) isValid = false;
        if (!validateQual()) isValid = false;
        if (!validateTerms()) isValid = false;

        if (!isValid) {
            $submitError.text("Complete the form");
            setTimeout(function(){
                $submitError.text('');
            }, 5000);
        }
    }

    // Bind form submit event
    $('form').on('submit', validateForm);
});
