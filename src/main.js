import "./style.css"

const characters = [
  {
    name: "Акинфий Демидов",
    description:
      "Владелец Невьянских заводов и один из самых влиятельных промышленников России.",
    page: "akinfiy-demidov.html",
    active: true
  },
  {
    name: "Никита Демидов",
    description:
      "Основатель промышленной династии Демидовых.",
    active: false
  },
  {
    name: "Анисья Демидова",
    description:
      "Умная и сильная женщина, хранящая интересы семьи.",
    active: false
  },
  {
    name: "Яков Штелин",
    description:
      "Инженер, изобретатель и человек передовых идей.",
    active: false
  },
  {
    name: "Иван Барятинский",
    description:
      "Горный офицер, честный и принципиальный.",
    active: false
  }
]

function createCharacterCard(character) {
  const cardContent = `
    <div class="portrait-placeholder">
      ${character.name[0]}
    </div>

    <div class="card-content">

      <h2>${character.name}</h2>

      <div class="card-line"></div>

      <p>${character.description}</p>

    </div>
  `

  if (character.active) {
    return `
      <a
        class="character-card character-card-link"
        href="${character.page}"
        aria-label="Открыть страницу персонажа ${character.name}"
      >
        ${cardContent}
      </a>
    `
  }

  return `
    <article class="character-card character-card-disabled">
      ${cardContent}
    </article>
  `
}

document.querySelector("#app").innerHTML = `
<div class="overlay"></div>

<aside class="sidebar">

    <div class="logo">

        <img
            class="logo-image"
            src="/nevyansk-tower.png"
            alt="Невьянская башня"
        >

        <div class="logo-title">
            Мир<br>
            «Невьянской»<br>
            башни
        </div>

        <div class="logo-subtitle">
            Литературная энциклопедия
        </div>

    </div>

    <nav class="sidebar-menu">

        <a class="active" href="/">Главная</a>
        <a href="#characters">Персонажи</a>
        <a href="#">Места</a>
        <a href="#">Хроника</a>
        <a href="#">О проекте</a>

    </nav>

</aside>

<main class="page">

    <button class="menu-button" aria-label="Открыть меню">
        ☰
    </button>

    <section class="hero-section">

        <div class="hero">

            <p class="eyebrow">
                Литературная энциклопедия
            </p>

            <h1>Персонажи</h1>

            <div class="ornament">
                <span></span>
                <b>◇</b>
                <span></span>
            </div>

            <p class="hero-text">
                Герои романа Алексея Иванова
                «Невьянская башня» —
                люди эпохи,
                их амбиции,
                характеры и судьбы.
            </p>

        </div>

    </section>

    <section class="characters-section">

        <section class="characters" id="characters">

            ${characters.map(createCharacterCard).join("")}

        </section>

    </section>

</main>
`

const sidebar = document.querySelector(".sidebar")
const overlay = document.querySelector(".overlay")
const menuButton = document.querySelector(".menu-button")

let menuTimer = null

function openMenu() {
  clearTimeout(menuTimer)

  sidebar.classList.add("open")
  overlay.classList.add("show")
  menuButton.classList.add("hide")
}

function closeMenu() {
  clearTimeout(menuTimer)

  sidebar.classList.remove("open")
  overlay.classList.remove("show")
  menuButton.classList.remove("hide")
}

menuButton.addEventListener("click", openMenu)
overlay.addEventListener("click", closeMenu)

sidebar.addEventListener("mouseenter", () => {
  clearTimeout(menuTimer)
})

sidebar.addEventListener("mouseleave", () => {
  menuTimer = setTimeout(closeMenu, 250)
})