$(document).ready(function() {
    // Replace with your OpenAI API key (client-side for demo; use server-side in production)
    const openaiApiKey = "YOUR_OPENAI_API_KEY_HERE";

    // Handle gender selection for dynamic heading color (no border changes)
    $('input[name="gender"]').on('change', function() {
        const gender = $(this).val();
        $('.pet-name-generator-container').removeClass('male-selected female-selected');
        if (gender === 'male') {
            $('.gender-heading').css('color', '#2196F3');
        } else if (gender === 'female') {
            $('.gender-heading').css('color', '#E91E63');
        }
    });

    $('#generate-name-button').on('click', function() {
        const gender = $('input[name="gender"]:checked').val();
        const category = $('input[name="category"]:checked').val();

        if (!category) {
            alert("Please select a category.");
            return;
        }

        let prompt = `Generate a unique dog name for a ${gender} dog with a ${category.toLowerCase()} personality/theme/interest.`;

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
                max_tokens: 50,
                temperature: 0.8
            }),
            success: function(response) {
                const name = response.choices[0].text.trim().split("\n")[0] || "Buddy";
                $('#pet-name-output').text(name);
                $('#pet-name-result').show();
            },
            error: function(xhr) {
                $('#pet-name-output').text("Error generating name: " + xhr.statusText);
                $('#pet-name-result').show();
            }
        });
    });
});
