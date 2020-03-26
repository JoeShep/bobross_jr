console.log("I am here!!")

const displayBirthdays = (birthdays) => {
  const list_container = document.querySelector('#birthday_list')
  const fragment = document.createDocumentFragment()
  const list = document.createElement('ul')
  birthdays.forEach(birthday => {
    console.log('birthday', birthday.name);

    const list_item = document.createElement('li')
    list_item.innerHTML = `On ${birthday.name}'s birthday -- ${birthday.date}, I said "${birthday.greeting}"`
    list.appendChild(list_item)
  });
  fragment.appendChild(list)
  list_container.appendChild(fragment)
}

document.querySelector("#btn__birthday_list").addEventListener("click", () => {
  console.log("Hey, that tickles")
  fetch('/birthdays')
    .then((birth_json) => birth_json.json())
    .then((birth_data) => {
      console.table(birth_data)
      displayBirthdays(birth_data)
    })
    .catch((error) => {
      console.log("error!", error)
    })
})

document.querySelector("#btn__add_birthday").addEventListener("click", () => {
  document.querySelector("#birthday-form").classList.toggle("is_hidden")
})

document.querySelector("#btn__post_birthday").addEventListener("click", () => {
  const date = document.querySelector("#date_input").value
  const name = document.querySelector("#name_input").value
  const greeting = document.querySelector("#greeting_input").value
  const data = { date, name, greeting }
  let formData  = new FormData();
  for(let inputVal in data) {
    formData.append(inputVal, data[inputVal]);
  }
  console.log("dataaaaaa", formData)
  // Get the csrftoken created by Django and sent to the browser and stored in a cookie. Using js-cookies library, installed locally and included in a script tag in index.html
  // https://docs.djangoproject.com/en/2.1/ref/csrf/
  csrf_token = Cookies.get('csrftoken')
  fetch('/birthdays',{
    method: "POST",
    body: formData,
    headers: {
      "X-CSRFToken": csrf_token
    }
  })
  .then(() => {
    return fetch('/birthdays')
  })
  .then((birth_json) => birth_json.json())
  .then((birth_data) => {
    console.table(birth_data)
    displayBirthdays(birth_data)
  })
  .catch((error) => {
    console.log("error!", error)
  })
})
