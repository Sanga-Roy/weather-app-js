// http://api.weatherapi.com/v1/current.json?key=6eb60a87fe6b4cbdb9b123751252404&q=Burdwan&aqi=no

const temparatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector('form')
// const searchButton  = document.querySelector(".search_button");

form.addEventListener('submit', searchForLocation)


let target = 'Kolkata'

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=6eb60a87fe6b4cbdb9b123751252404&q=${targetLocation}&aqi=no`

    const res = await fetch(url)

    const data = await res.json()

    console.log(data)

    let locationName = data.location.name
    console.log(locationName)

    let time = data.location.localtime
    console.log(time)

    let temp = data.current.temp_c
    console.log(temp)

    let condition = data.current.condition.text
    console.log(condition)

    updateDetails(temp, locationName, time, condition)
}

function updateDetails(temp, locationName, time, condition){
    temparatureField.innerText = temp
    locationField.innerText = locationName

    let splitDate = time.split(' ')[0]
    let splitTime = time.split(' ')[1]
    let currentDay = getDayName(new Date(splitDate).getDay())

    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`
    
    conditionField.innerText = condition

}

function searchForLocation(e){
    e.preventDefault()

    target = searchField.value

    fetchResults(target)
}


fetchResults(target)

function getDayName(number){
    switch(number){
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
    }
}