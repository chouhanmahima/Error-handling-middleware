const express = require("express");

const PORT = 3030;
const app = express();

const userData = []; // Array to store user data (in-memory)
app.use(express.json())

// Middleware function
function validateRegistrationData(req, res, next) {

    // Name Check
    // Extract the First Name and Last Name from request body
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // Validate first name and last name capitalization
    const isFirstLetterCapitalized = (name) => {
        return name && name[0] === name[0].toUpperCase();
    };

    // Validate Email function 
    const isValidEmail = (email) => {
        return email && email.includes("@");
    };

    // Validate Password function
    const isValidPassword = (password) => {
        const hasSpecialCharacter = /[!@#$%&~=+-/]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumeric = /\d/.test(password);
        const isLongEnough = password && password.length >= 8;
        return hasSpecialCharacter && hasUpperCase && hasNumeric && isLongEnough;
    };

    // validate Phone Number function
    const isValidPhoneNumber = (phoneNumber) => {
        const maxLength = phoneNumber && phoneNumber.length >= 10;
        const minLength = phoneNumber && phoneNumber.length <= 15;
        return maxLength && minLength;
    };

    /**********************************************************************************************/

    // Check first and last name enter or not
    if (!firstName || !lastName) {
        return res.status(400).json({
            success: false,
            error: "Both first and last name are required."
        });
    }

    // Name Condition Check
    if (!isFirstLetterCapitalized(firstName) || !isFirstLetterCapitalized(lastName)) {
        return res.status(400).json({
            success: false,
            error: "First and last names must start with a capital letter."
        });
    }

    // Email condition check
    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            error: "Invalid email address."
        });
    }

    // Password condition check
    if (!isValidPassword(password)) {
        return res.status(400).json({
            success: false,
            error: "Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long."
        });
    }

    // Phone Number condition check
    if (!isValidPhoneNumber(phoneNumber)) {
        return res.status(400).json({
            success: false,
            error: "Phone number must be at least 10 digits long."
        });
    }


    next();
}

// User Registration Route
app.post("/user/signup", validateRegistrationData, (req, res) => {
    // Assuming user data is stored here
    userData.push = req.body;
    console.log("Registration Successfully Done ! " + new Date())
    res.status(201).json({
        success: true,
        message: "User created successfully !"
    });
});


app.get("/user/signin", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Sing-in successfully !"
    });
});

// Undefined Path Handler
app.use("/*", (req, res) => {
    res.status(404).json({
        success: false,
        error: "PAGE NOT FOUND!"
    })
})


app.listen(PORT, () => {
    console.log(`Express Server is Running at port ${PORT}`);
});
