const select = document.querySelector("select");
const form = document.querySelector(".form");
const display = document.querySelector(".table");
const searchButton = document.querySelector(".searchbutton");
const URL = "https://restcountries.eu/rest/v2/region/";

async function getCountries(){
    display.classList.remove("hidden")
    searchButton.disabled = true;
    const continent = select.value;
    const continentURL = URL + continent;
    const response = await fetch(continentURL);
    var data = await response.json();
    for (let r of data){
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${r.name} </td>
        <td>${r.capital} </td>
        <td>${r.subregion}</td>
        <td>${r.population}</td>
        <td><img class="flag" style="max-width: 30px; max-height: 20px" src="${r.flag}"/></td>`
        display.appendChild(newRow)
    };
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.textContent = "Reset"
    resetButton.className = "resetButton";
    resetButton.onclick = reset;
    form.appendChild(resetButton)
};

const reset = () => {
    display.classList.add("hidden")
    searchButton.disabled = false;
    while(display.lastChild){
        display.removeChild(display.lastChild)
    }
    const newTr = document.createElement("tr");
    newTr.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Capital city</th>
        <th>Subregion</th>
        <th>Population</th>
        <th>Flag</th>
    </tr>`;
    newTr.className="table";
    display.appendChild(newTr);
    document.querySelector(".resetButton").remove();
}