const cardCont = document.querySelector(".card-container");
const form = document.querySelector(".form")
const input = document.querySelector(".form__input")
const falla = document.querySelector(".falla")

const buscarPokemon = async () => {
  const pokemon = input.value.toLowerCase();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await res.json();
    console.log(data)
    const html = `
        <div class="card">
            <h2 class="name">${data.name}</h2>
            <div class="img">
                <img class="img-src" src="${data.sprites.front_default}"alt="">
            </div>
            <div class="type">
                ${data.types
                    .map((tipo) => {
                        return `<span class="${tipo.type.name} poke-type">${tipo.type.name}</span>`;
                    })
                    .join("")}
            </div>
            <p class="info">Altura: ${data.height / 10} m</p>
            <p class="info">Peso: ${data.weight / 10} kg</p>
        </div>
        `
    cardCont.innerHTML = html;
} catch (error) {
    console.log(error)
}
}

const submitForm = () => {
    const inputForm = input.value
    if(inputForm === "") {
        falla.innerHTML = `
            El campo esta vacio
        `
        falla.classList.remove("ok")
    } else if (inputForm < 1 || inputForm > 905) {
        falla.innerHTML = `
            El ID ingresado no existe
        `
        falla.classList.remove("ok")
    }
    else {
        falla.classList.add("ok");
        input.value = ""
    }
}

const btn = document.querySelector('.form__submit');
btn.addEventListener('click', (e) => {
    buscarPokemon()
    submitForm()
    e.preventDefault()
})
