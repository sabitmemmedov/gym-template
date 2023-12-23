let pr;
let form = document.getElementById("formPost");
let Name = document.getElementById("name");
let Surname = document.getElementById("surname");
let Email = document.getElementById("email");
let getForm = document.getElementById("getForm");


async function formPost(event) {
    event.preventDefault();

    try {
        let users = {
            name: Name.value,
            surname: Surname.value,
            email: Email.value,
        };

        const response = await axios.post(
            "https://655e4b479f1e1093c59add07.mockapi.io/users/",
            users
        );
        getData();

        console.log("Başarıyla gönderildi:", response.data);
    } catch (error) {
        console.error("Gönderme işlemi sırasında bir hata oluştu:", error.message);
    }
}

form.addEventListener("submit", formPost);

/////////////////////////


function getData() {
    getForm.innerHTML = ""
    axios.get(`https://655e4b479f1e1093c59add07.mockapi.io/users`).then((res) => {
        pr = res.data;
        getForm.innerHTML = "";
        console.log(pr);
        pr.forEach((user) => {
            let cardBox = document.createElement("div");
            cardBox.className = "formCart";
            cardBox.innerHTML = `
                <p>name:${user.name} </p>
                <p>surname:${user.surname} </p>
                <p>email: ${user.email}</p>
                <p>id: ${user.id}</p>
                <button onclick="sil(${user.id})">sil</button>
            `;
            getForm.appendChild(cardBox);
        });
    });
}

async function sil(id) {
    try {
        await axios.delete(`https://655e4b479f1e1093c59add07.mockapi.io/users/${id}`);
        getData();
    } catch (error) {
        console.error("Veri silme hatası:", error);
    }
}

getData();
