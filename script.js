const name_entry = document.getElementById("name");
const email_entry = document.getElementById("email");
const pass_entry = document.getElementById("password");
const dob_entry = document.getElementById("dob");
const terms_entry = document.getElementById("acceptTerms");
const submission = document.getElementById("submit");
const history_entry = document.getElementById("da");
const date = new Date();
let list_entry = []


const dateValidity = (start_date) => {
    const date_u=start_date
    const date_user=date_u.split("-").map((d) => Number(d))
    const date_year = (date_user[0] >= (date.getFullYear() - 55) && date_user[0] <= (date.getFullYear() - 18))
    let date_month;
    let date_day;
    if (date_user[0] === date.getFullYear() - 55) {
        date_month = date_user[1] >= (date.getMonth() + 1)
        date_day = date_user[2] >= (date.getDate())
    } else if (date_year) {
        date_month = true
        date_day = true
    } else if (date_user[0] === date.getFullYear() - 18) {
        date_month = date_user[1] <= (date.getMonth() + 1)
        date_day = date_user[2] <= (date.getDate())
    } else {
        date_month = false
        date_day = false
    }
    final=date_year && date_month && date_day;
    return final
}

const is_valid = (element) => {
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
    list_entry.push(userData)
    localStorage.setItem('userData', JSON.stringify(list_entry))
}

const getStorage = () => {
    list_entry = JSON.parse(localStorage.getItem("userData"))
    if (list_entry === null) {
        list_entry = []
    } else {
        const view = list_entry.map((entry) => {
            let row = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                row += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${row}</tr>`
        })
        history_entry.innerHTML += view.join("\n")
    }
}


submission.addEventListener("click", () => {
    const date_user = dob_entry.value

    if (!dateValidity(date_user)) {
        dob_entry.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        dob_entry.setCustomValidity("")
    }

    const allValid = is_valid(name_entry) && is_valid(email_entry) && is_valid(pass_entry) && is_valid(dob_entry)

    if (allValid) {
        sendStorage(name_entry.value, email_entry.value, pass_entry.value, dob_entry.value, terms_entry.checked)
    }
})

getStorage()