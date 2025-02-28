let selectedGender = "boy";
let savedNames = JSON.parse(localStorage.getItem("savedNames")) || [];

function selectGender(gender) {
    selectedGender = gender;
    document.getElementById("header").className = gender;
    document.getElementById("findBtn").className = gender;
    document.getElementById("boyBtn").classList.toggle("active", gender === "boy");
    document.getElementById("girlBtn").classList.toggle("active", gender === "girl");
}

function generateNames() {
    const styles = Array.from(document.querySelectorAll('.name-styles input:checked')).map(input => input.value);
    const themes = Array.from(document.querySelectorAll('.name-themes input:checked')).map(input => input.value);

    // Sample names database
    const names = {
        boy: {
            friendly: ["Buddy", "Max", "Charlie", "Cooper", "Jack"],
            cute: ["Toby", "Scout", "Milo", "Ollie", "Finn"],
            tough: ["Rocky", "Rover", "Fido", "Tank", "Duke"],
            international: ["Pablo", "Loki", "Sven", "Rico", "Kai"],
            elegant: ["Winston", "Reginald", "Percy", "Sterling", "Jasper"],
            classic: ["Rex", "Duke", "Spot", "Rusty", "Benji"],
            funny: ["Barkley", "Woofie", "Sir Barksalot", "Chewy", "Noodle"],
            general: ["Jack", "Sam", "Ben", "Luke", "Cody"],
            funnyTheme: ["Pickles", "Biscuit", "Taco"],
            sporty: ["Ace", "Blitz", "Racer"]
        },
        girl: {
            friendly: ["Daisy", "Molly", "Bella", "Lucy", "Sadie"],
            cute: ["Luna", "Coco", "Pepper", "Rosie", "Poppy"],
            tough: ["Raven", "Storm", "Vixen", "Onyx", "Blaze"],
            international: ["Suki", "Anya", "Mila", "Zara", "Nia"],
            elegant: ["Addison", "Agatha", "Ambrosia", "Amelie", "Aretha", "Angelica", "Anastasia", "Amethyst", "Audrey", "Atwood", "Avalon", "Bell", "Buffy", "Blake", "Bianca", "Bella", "Camilla", "Cardi", "Carmen", "Caroline", "Chanel", "Chantilly", "Charlotte", "Cherry", "Coco", "Cora", "Cordelia", "Daenerys", "Daisy", "Dakota", "Danica", "Darcy", "Desdemona", "Diamond", "Diana", "Diva", "Duchess", "Ebony", "Effie", "Eloise", "Emmy", "Endi", "Esme", "Espresso", "Eva", "Fancy", "Fauna", "Fifi", "Fiona", "Flora", "Freya", "Frida", "Gabriella", "Gaia", "Galina", "Garbo", "Georgia", "Gertrude", "Gucci"],
            classic: ["Lassie", "Lady", "Sadie", "Ginger", "Ruby"],
            funny: ["Biscuit", "Waffles", "Puddles", "Muffin", "Cupcake"],
            general: ["Emma", "Ava", "Mia", "Zoe", "Ella"],
            funnyTheme: ["Cupcake", "Muffin", "Pancake"],
            sporty: ["Skye", "Dash", "Roxy"]
        }
    };

    let selectedNames = [];
    styles.forEach(style => {
        if (names[selectedGender][style]) {
            selectedNames = selectedNames.concat(names[selectedGender][style]);
        }
    });
    themes.forEach(theme => {
        if (names[selectedGender][theme + "Theme"]) {
            selectedNames = selectedNames.concat(names[selectedGender][theme + "Theme"]);
        }
    });

    localStorage.setItem("generatedNames", JSON.stringify(selectedNames));
    localStorage.setItem("gender", selectedGender);
    localStorage.setItem("style", styles[0] || "general");
    window.location.href = "results.html";
}

// Load names on results page and saved names on both pages
document.addEventListener("DOMContentLoaded", () => {
    // Update saved names count on load
    document.getElementById("savedCount").innerText = savedNames.length;

    if (window.location.pathname.includes("results.html")) {
        const names = JSON.parse(localStorage.getItem("generatedNames")) || [];
        const gender = localStorage.getItem("gender") || "boy";
        const style = localStorage.getItem("style") || "general";

        // Update header and title based on gender
        document.getElementById("header").className = gender;
        document.getElementById("resultsTitle").innerText = `${style.charAt(0).toUpperCase() + style.slice(1)} Dog Names for ${gender === "boy" ? "Boy" : "Girl"} Dogs`;
        document.getElementById("resultsTitle").className = gender;
        document.getElementById("resultsDesc").innerHTML = `A list of great ${style} dog names for your pup. Or view ${style} dog names for ${gender === "boy" ? "girls" : "boys"} instead.<br>Check the names you like the best to save them to your list.`;

        // Populate names
        const namesList = document.getElementById("namesList");
        names.forEach(name => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" value="${name}" onchange="saveName(this)" ${savedNames.includes(name) ? "checked" : ""}> ${name}`;
            namesList.appendChild(label);
        });
    }
});

function saveName(checkbox) {
    const name = checkbox.value;
    if (checkbox.checked) {
        if (!savedNames.includes(name)) savedNames.push(name);
    } else {
        savedNames = savedNames.filter(n => n !== name);
    }
    localStorage.setItem("savedNames", JSON.stringify(savedNames));
    document.getElementById("savedCount").innerText = savedNames.length;
}
