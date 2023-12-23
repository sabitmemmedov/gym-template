
let cards = document.getElementById("cards");
let loadMore = document.getElementById("loadMore");
let inp = document.getElementById("inp")
let db;
let limit = 3;
let page = 1;

function getCards() {
    let skip = (page - 1) * limit
    axios.get(`https://6569b50bde53105b0dd78115.mockapi.io/products`)
        .then(res => {
            db = res.data;
            db.forEach(element => {
                let cardBox = document.createElement("div");
                cardBox.className = "cardBox";
                cardBox.innerHTML = `
                    <img src=${element.avatar} alt="">
                    <h4>${element.name}</h4>
                    <p>$ ${element.price}</p>
                    <button onclick="adCard(${element.id})">adCard</button>    
                `;
                cards.appendChild(cardBox);
            });
            page++
        })
        .catch(error => {
            console.error("Error fetching cards:", error);
        });
}

window.onload = () => {
    getCards();
};




loadMore.addEventListener("click", getCards)

async function adCard(id) {
    let datalar = []
    datalar.push(db.find(item => item.id == id))
    await axios.post(`https://6569b50bde53105b0dd78115.mockapi.io/adCart`, datalar)
}


function searchByName() {
    cards.innerHTML = ""
    axios.get(`https://6569b50bde53105b0dd78115.mockapi.io/products?name=${inp.value}`)
        .then(res => {
            db = res.data;
            db.forEach(element => {
                let cardBox = document.createElement("div");
                cardBox.className = "cardBox";
                cardBox.innerHTML = `
                <img src=${element.avatar} alt="">
                <h4>${element.name}</h4>
                <p>$ ${element.price}</p>
                <button onclick="adCard(${element.id})">adCard</button>    
            `;
                cards.appendChild(cardBox);
            });
        })
        .catch(error => {
            console.error("Error fetching cards:", error);
        });

}

document.getElementById("btn").addEventListener("click",searchByName)


function sortByName() {
    cards.innerHTML = '';
    axios.get(`https://6569b50bde53105b0dd78115.mockapi.io/products`)
        .then(res => {
            db = res.data;
            let sortedData = db.sort((a, b) => a.name.localeCompare(b.name));
            sortedData.forEach(element => {
                let cardBox = document.createElement("div");
                cardBox.className = "cardBox";
                cardBox.innerHTML = `
                <img src=${element.avatar} alt="">
                <h4>${element.name}</h4>
                <p>$ ${element.price}</p>
                <button onclick="adCard(${element.id})">adCard</button>    
            `;
                cards.appendChild(cardBox);
            });
        })
        .catch(error => {
            console.error("Error fetching cards:", error);
        });
}

document.getElementById("sortBtn").addEventListener("click", sortByName);
