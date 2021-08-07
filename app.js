
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

document.querySelector('#reset').addEventListener('click', function () {
    defaultValue('-', '-', '-', 'Input Your Birth Date');

});

function defaultValue(textYears, textMonths, textdays, worning) {
    document.getElementById('years').textContent = textYears;
    document.getElementById('months').textContent = textMonths;
    document.getElementById('days').textContent = textdays;
    document.getElementById('worning').textContent = worning;
}

function ageCalculate() {
    let inputDate = new Date(document.getElementById("date-input").value);

    if (inputDate == '' || inputDate == null || inputDate == NaN) {
        defaultValue('-', '-', '-', 'Input Your Birth Date');


    }
    else if (inputDate != '') {
        let today = new Date();

        let birthMonth, birthDate, birthYear;

        let birthDetails = {
            date: inputDate.getDate(),
            month: inputDate.getMonth() + 1,
            year: inputDate.getFullYear()
        }

        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1;
        let currentDate = today.getDate();

        leapChecker(currentYear)
        // Not Born check


        if (birthDetails.year > currentYear || (birthDetails.month > currentMonth && birthDetails.year == currentYear) || (birthDetails.date > currentDate && birthDetails.year == currentYear)) {
            defaultValue('-', '-', '-', 'Not Born Yet');
            return;
        }
        // Calculate Birth Year
        birthYear = currentYear - birthDetails.year;
        // Calculate Birth Month
        if (currentMonth >= birthDetails.month) {
            birthMonth = currentMonth - birthDetails.month;
        }
        else {
            birthYear--;
            birthMonth = 12 + currentMonth - birthDetails.month;
        }
        //Calculate Birth Date
        if (currentDate >= birthDetails.date) {
            birthDate = currentDate - birthDetails.date;
        }
        else {
            birthMonth--;
            let days = months[currentMonth - 2];
            birthDate = days + currentDate - birthDetails.date;
            if (birthMonth < 0) {
                birthMonth = 11;
                birthYear--;
            }
        }
        // Message Content logic
        let message;
        if (birthYear !== 0 && birthMonth !== 0) {
            message = `You age is ${birthYear} Years ${birthMonth} Months ${birthDate} Days`
        }
        else if (birthYear !== 0 && birthMonth === 0) {
            message = `Your Age is ${birthYear} Years ${birthDate} Days`
        }
        else if (birthYear === 0 && birthMonth === 0) {
            message = `Your Age is  ${birthDate} Days`
        }
        else if (birthYear === 0) { message = `Your Age is ${birthMonth} Months ${birthDate} Days` }

        displayResult(birthYear, birthMonth, birthDate, message);

    }

    // Lear year function
    function leapChecker(year) {
        if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
            months[1] = 29;
        }
        else {
            months[1] = 28;
        }
    }







    // Dom Function
    function displayResult(birthYear, birthMonth, birthDate, message) {
        document.getElementById('years').textContent = birthYear;
        document.getElementById('months').textContent = birthMonth;
        document.getElementById('days').textContent = birthDate;
        document.getElementById('worning').textContent = message;

    }
}



