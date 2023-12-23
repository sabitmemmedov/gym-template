
let cards = document.getElementById("cards");
let db;

function getCards() {
    cards.innerHTML = ""
    axios.get(`https://6569b50bde53105b0dd78115.mockapi.io/adCart`)
        .then(res => {
            db = res.data;
            db.forEach(element => {
                let cardBox = document.createElement("div");
                cardBox.className = "cardBox";
                cardBox.innerHTML = `
                    <img src=${element["0"].avatar} alt="">
                    <h4>${element["0"].name}</h4>
                    <p>$ ${element["0"].price}</p>
                    <button onclick="sil(${element.id})">sil</button>    
                `;
                cards.appendChild(cardBox);
            });
        })
        .catch(error => {
            console.error("Error fetching cards:", error);
        });
}

async function sil(id){
  await  axios.delete(`https://6569b50bde53105b0dd78115.mockapi.io/adCart/${id}`)
    getCards()
}

getCards();

