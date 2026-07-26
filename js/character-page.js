const characterRelations = {
    family: [
        {
            name: "Никита Демидов",
            type: "Отец",
            image: "nikita-demidov.png",
            page: "#",
        },
        {
            name: "Анисья Демидова",
            type: "Семья",
            image: "anisya-demidova.png",
            page: "#",
        },
    ],

    story: [
        {
            name: "Яков Штелин",
            type: "Сюжетная связь",
            image: "yakov-shtelin.png",
            page: "#",
        },
        {
            name: "Василий Татищев",
            type: "Сюжетная связь",
            image: "vasiliy-tatishchev.png",
            page: "#",
        },
    ],
};

function createRelationCard(character) {
    const card = document.createElement("article");
    card.className = "relation-card";

    const link = document.createElement("a");
    link.className = "relation-link";
    link.href = character.page || "#";
    link.setAttribute("aria-label", character.name);

    const photo = document.createElement("div");
    photo.className = "relation-photo";

    const fallback = document.createElement("span");
    fallback.className = "relation-fallback";
    fallback.textContent = character.name.trim().charAt(0);

    const image = document.createElement("img");
    image.className = "relation-image";
    image.src = character.image;
    image.alt = character.name;
    image.loading = "lazy";

    image.addEventListener("load", () => {
        fallback.hidden = true;
    });

    image.addEventListener("error", () => {
        image.remove();
        fallback.hidden = false;
    });

    const label = document.createElement("div");
    label.className = "relation-label";

    const name = document.createElement("h3");
    name.className = "relation-name";
    name.textContent = character.name;

    const type = document.createElement("span");
    type.className = "relation-type";
    type.textContent = character.type;

    photo.append(fallback, image);
    label.append(name, type);
    link.append(photo, label);
    card.append(link);

    return card;
}

document.querySelectorAll("[data-relations]").forEach((container) => {
    const groupName = container.dataset.relations;
    const relations = characterRelations[groupName] || [];

    relations.forEach((character) => {
        container.append(createRelationCard(character));
    });
});

const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const menuButton = document.querySelector(".menu-button");
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");

function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("show");
    menuButton.classList.add("hide");
    menuButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
}

function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    menuButton.classList.remove("hide");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function isMenuOpen() {
    return sidebar.classList.contains("open");
}

menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (isMenuOpen()) {
        closeMenu();
    } else {
        openMenu();
    }
});

/*
 * Закрываем меню при нажатии в любом месте страницы.
 * Исключение — сама кнопка открытия.
 */
document.addEventListener("click", (event) => {
    if (!isMenuOpen()) {
        return;
    }

    if (menuButton.contains(event.target)) {
        return;
    }

    closeMenu();
});

/*
 * Нажатие на ссылку закрывает меню,
 * после чего браузер выполняет переход.
 */
sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
        closeMenu();
    }
});