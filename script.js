$(document).ready(function() {
    // Sample static pet names (simulating WordPress database)
    const staticNames = {
        "1": ["Fluffy", "Biscuit", "Pippin"],
        "2": ["Rex", "Shadow", "Blaze"],
        "3": ["Zephyr", "Lunara", "Quixotic"],
        "4": ["Tiny", "Pebble", "Nibbles"],
        "5": ["Tank", "Goliath", "Bruiser"],
        "6": ["Iguana", "Koi", "Tarantula"]
    };

    // Replace with your OpenAI API key (client-side for demo; use server-side in production)
    const openaiApiKey = "YOUR_OPENAI_API_KEY_HERE";

    function displayNames(names, title) {
        const $grid = $('#pet-names-grid');
        $grid.empty();
        names.forEach(name => $grid.append(`<div class="pet-name-item">${name}</div>`));
        $('#pet-names-title').text(title);
        $('#pet-names-container').show();
    }

    // Fetch static names
    $('#fetch-names-button').on('click', function() {
        const selectedCategories = [];
        $('input[name="static_category"]:checked, input[name="dynamic_category"]:checked').each(function() {
            selectedCategories.push($(this).val());
        });

        let names = [];
        selectedCategories.forEach(cat => {
            if (staticNames[cat]) names = names.concat(staticNames[cat]);
        });

        if (names.length === 0) {
            names = ["No names found for these categories."];
        }
        displayNames(names, "Existing Pet Names");
    });

    // Generate AI names
    $('#generate-ai-names-button').on('click', function() {
        const selectedCategories = [];
        const categoryLabels = {
            "1": "Cute", "2": "Cool", "3": "Unique", 
            "4": "Small Pets", "5": "Big Pets", "6": "Exotic"
        };
        $('input[name="static_category"]:checked, input[name="dynamic_category"]:checked').each(function() {
            selectedCategories.push(categoryLabels[$(this).val()]);
        });

        let prompt = "Generate 10 unique pet names";
        if (selectedCategories.length > 0) {
            prompt += " inspired by: " + selectedCategories.join(", ");
        }

        $.ajax({
            url: "https://api.openai.com/v1/completions",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + openaiApiKey
            },
            data: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 100,
                temperature: 0.8
            }),
            success: function(response) {
                const names = response.choices[0].text.split("\n")
                    .map(name => name.trim())
                    .filter(name => name)
                    .slice(0, 10);
                displayNames(names, "AI-Generated Pet Names");
            },
            error: function(xhr) {
                displayNames(["Error generating names: " + xhr.statusText], "Error");
            }
        });
    });
});
