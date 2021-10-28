'use strict';
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
document.querySelector('#btn').addEventListener('click', function () {
    let inputDate = document.querySelector('#date-input').value;

    if (inputDate == '') {
        DisplayResult('-', '-', '-', "You don't put any value please input your birth date");
    }
    else {
        inputDate = new Date(document.getElementById("date-input").value);
        let today = new Date();
        let birthMonth, birthDate, birthYear;
        let birthDetails = {
            date: inputDate.getDate(),
            month: inputDate.getMonth() + 1,
            year: inputDate.getFullYear()
        };

        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1;
        let currentDate = today.getDate();

        leapChecker(currentYear);
        // Not Born check
        if (birthDetails.year > currentYear || (birthDetails.month > currentMonth && birthDetails.year == currentYear) || (birthDetails.date > currentDate && birthDetails.year == currentYear)) {
            DisplayResult('-', '-', '-', 'Not Born Yet');
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

        DisplayResult(birthYear, birthMonth, birthDate, message);

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
    document.querySelector('#date-input').value = '';
});

// Reset Button
document.querySelector('#reset').addEventListener('click', function () {
    DisplayResult('-', '-', '-', 'Input Your Birth Date');
    document.querySelector('#date-input').value = '';


});

// Dom Function
function DisplayResult(birthYear, birthMonth, birthDate, message) {
    document.getElementById('years').textContent = birthYear;
    document.getElementById('months').textContent = birthMonth;
    document.getElementById('days').textContent = birthDate;
    document.getElementById('message').textContent = message;
}






