const resultElement = document.querySelector('.result')
const formElement = document.querySelector('.get-weather')
const nameCityElement = document.querySelector('#city')
const nameCountryElement = document.querySelector('#country')

formElement.addEventListener('submit', e => {
  e.preventDefault()
  
  if (nameCityElement.value === '' || nameCountryElement.value === ''){
    showError('Ambos campos son obligatorios')
  }
  
  callAPI(nameCityElement.value, nameCountryElement.value)
  
  // console.log(nameCityElement.value)
  // console.log(nameCountryElement.value)
})

function showError(message) {
  console.log(message)
  const alert = document.createElement('p')
  alert.classList.add('alert-message')
  alert.textContent = message
  formElement.appendChild(alert)
  
  setTimeout(()=>{
    alert.remove()
  }, 3000)
}

function callAPI(city, country) {
  const apiKey = 'a5e10f274c240f286b0af15cb52a8a4c'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
  
  fetch(url)
      .then(response=>response.json())
      .then(data=>{
        
        clearHTML()
        if (data?.cod === '404') showError('Ciudad no encontrada')
        else showWeather(data)
        
        console.log(data)
      })
      .catch(error=>{
        console.log(error)
      })
}

function showWeather(data) {
  const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data
  const contentElement = document.createElement('div')
  const degree = kelvinToCelcius(temp)
  const degreeMax = kelvinToCelcius(temp_max)
  const degreeMin = kelvinToCelcius(temp_min)
  
  contentElement.innerHTML = `
      <h5>Clima en ${name}</h5>
      <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
      <h2>${degree}°C</h2>
      <p>Max: ${degreeMax}°C</p>
      <p>Min: ${degreeMax}°C</p>
  `
  
  resultElement.appendChild(contentElement)
  
  console.log(name, temp, temp_min, temp_max, arr?.icon)
}

function kelvinToCelcius(grades) {
  return parseInt(grades - 273.15)
}

function clearHTML() {
  resultElement.innerHTML = ''
}