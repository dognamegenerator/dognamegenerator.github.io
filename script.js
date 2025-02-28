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

    if (styles.length === 0 && themes.length === 0) {
        alert("Please select at least one name style or theme to generate names!");
        return;
    }

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

    selectedNames = [...new Set(selectedNames)];
    selectedNames.sort(() => Math.random() - 0.5);

    localStorage.setItem("generatedNames", JSON.stringify(selectedNames));
    localStorage.setItem("gender", selectedGender);
    localStorage.setItem("style", styles[0] || "general");
    window.location.href = "results.html";
}

function findBreed() {
    const size = document.getElementById("size").value;
    const activity = document.getElementById("activity").value;
    const family = document.getElementById("family").value;
    const resultDiv = document.getElementById("breedResult");

    if (!size || !activity || !family) {
        resultDiv.innerHTML = "Please answer all questions to find your perfect breed!";
        return;
    }

    let recommendedBreed = "";
    if (size === "small" && activity === "low" && family === "yes") {
        recommendedBreed = "Shih Tzu - A small, affectionate dog that’s great for families and doesn’t need much exercise.";
    } else if (size === "small" && activity === "medium" && family === "no") {
        recommendedBreed = "Dachshund - A small, playful dog that enjoys moderate activity and is great for individuals.";
    } else if (size === "medium" && activity === "medium" && family === "yes") {
        recommendedBreed = "Beagle - A friendly, medium-sized dog that’s good with kids and loves daily walks.";
    } else if (size === "medium" && activity === "high" && family === "no") {
        recommendedBreed = "Australian Cattle Dog - A medium-sized, energetic breed perfect for active owners.";
    } else if (size === "large" && activity === "high" && family === "yes") {
        recommendedBreed = "Labrador Retriever - A large, active, and family-friendly dog that loves to play.";
    } else if (size === "large" && activity === "low" && family === "no") {
        recommendedBreed = "Great Dane - A gentle giant that doesn’t require much exercise and is good for calm households.";
    } else {
        recommendedBreed = "Golden Retriever - A versatile, friendly breed that adapts well to most lifestyles.";
    }

    resultDiv.innerHTML = `<strong>Your Recommended Breed:</strong> ${recommendedBreed}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("savedCount").innerText = savedNames.length;

    if (window.location.pathname.includes("results.html")) {
        const names = JSON.parse(localStorage.getItem("generatedNames")) || [];
        const gender = localStorage.getItem("gender") || "boy";
        const style = localStorage.getItem("style") || "general";

        document.getElementById("header").className = gender;
        document.getElementById("resultsTitle").innerText = `${style.charAt(0).toUpperCase() + style.slice(1)} Dog Names for ${gender === "boy" ? "Boy" : "Girl"} Dogs`;
        document.getElementById("resultsTitle").className = gender;
        document.getElementById("resultsDesc").innerHTML = `A list of great ${style} dog names for your pup. Or view ${style} dog names for ${gender === "boy" ? "girls" : "boys"} instead.<br>Check the names you like the best to save them to your list.`;

        const namesList = document.getElementById("namesList");
        names.forEach(name => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" value="${name}" onchange="saveName(this)" ${savedNames.includes(name) ? "checked" : ""}> ${name}`;
            namesList.appendChild(label);
        });
    }

    if (window.location.pathname.includes("saved-names.html")) {
        const savedNamesList = document.getElementById("savedNamesList");
        if (savedNames.length === 0) {
            savedNamesList.innerHTML = "<p>You haven't saved any names yet!</p>";
        } else {
            savedNames.forEach(name => {
                const label = document.createElement("label");
                label.innerHTML = `<input type="checkbox" value="${name}" onchange="saveName(this)" checked> ${name}`;
                savedNamesList.appendChild(label);
            });
        }
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

    if (window.location.pathname.includes("saved-names.html")) {
        const savedNamesList = document.getElementById("savedNamesList");
        savedNamesList.innerHTML = "";
        if (savedNames.length === 0) {
            savedNamesList.innerHTML = "<p>You haven't saved any names yet!</p>";
        } else {
            savedNames.forEach(name => {
                const label = document.createElement("label");
                label.innerHTML = `<input type="checkbox" value="${name}" onchange="saveName(this)" checked> ${name}`;
                savedNamesList.appendChild(label);
            });
        }
    }
}
