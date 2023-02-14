const nameEP = document.getElementById("name");
const emailEP = document.getElementById("email");
const passEP = document.getElementById("password");
const doobEP = document.getElementById("dob");
const termEP = document.getElementById("acceptTerms");
const subEP = document.getElementById("submit");
const hisEP = document.getElementById("history");

const date = new Date();
let entries = []

const dateValidity = (givenDate) => {

    const userDate = givenDate.split("-").map((d) => Number(d))
    const validDateYear = (userDate[0] >= (date.getFullYear() - 55) && userDate[0] <= (date.getFullYear() - 18))

    let validDateMonth;
    let validDateDay;

    if (userDate[0] === date.getFullYear() - 55) {
        validDateMonth = userDate[1] >= (date.getMonth() + 1)
        validDateDay = userDate[2] >= (date.getDate())
    } else if (userDate[0] === date.getFullYear() - 18) {
        validDateMonth = userDate[1] <= (date.getMonth() + 1)
        validDateDay = userDate[2] <= (date.getDate())
    } else if (validDateYear) {
        validDateMonth = true
        validDateDay = true
    } else {
        validDateMonth = false
        validDateDay = false
    }

    return validDateYear && validDateMonth && validDateDay
}

const checkValidity = (element) => {
    return element.validity.valid
}

const digits = (num) => {
    if (num < 10) {
        return "0" + num
    } else {
        return num
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    entries.push(userData)
    localStorage.setItem('userData', JSON.stringify(entries))
}

const getStorage = () => {
    entries = JSON.parse(localStorage.getItem("userData"))
    if (entries === null) {
        entries = []
    } else {
        const view = entries.map((entry) => {
            let row = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                row += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${row}</tr>`
        })
        hisEP.innerHTML += view.join("\n")
    }
}


subEP.addEventListener("click", () => {
    const userDate = doobEP.value

    if (!dateValidity(userDate)) {
        doobEP.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        doobEP.setCustomValidity("")
    }

    const allValid = checkValidity(nameEP) && checkValidity(emailEP) && checkValidity(passEP) && checkValidity(doobEP)

    if (allValid) {
        sendStorage(nameEP.value, emailEP.value, passEP.value, doobEP.value, termEP.checked)
    }
})

getStorage()
