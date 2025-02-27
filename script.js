$(document).ready(function() {
    // Replace with your OpenAI API key (client-side for demo; use server-side in production)
    const openaiApiKey = "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";

    // Handle gender selection for dynamic colors
    function updateGenderStyles(gender) {
        $('.pet-name-generator-container').removeClass('male female').addClass(gender);
        $('.generate-button').removeClass('male female').addClass(gender);
        $('.pet-name-result').removeClass('male female').addClass(gender);
        $('.result-heading').removeClass('male female').addClass(gender);
        $('.pet-name-text').removeClass('male female').addClass(gender);
    }

    // Initial state
    updateGenderStyles('male');

    // Handle gender selection changes
    $('input[name="gender"]').on('change', function() {
        const gender = $(this).val();
        updateGenderStyles(gender);
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
                $('#pet-name-output').text(name).removeClass('male female').addClass(gender);
                $('#pet-name-result').removeClass('male female').addClass(gender);
                $('.result-heading').removeClass('male female').addClass(gender);
                $('#pet-name-result').show();
            },
            error: function(xhr) {
                $('#pet-name-output').text("Error generating name: " + xhr.statusText).removeClass('male female').addClass(gender);
                $('#pet-name-result').removeClass('male female').addClass(gender);
                $('.result-heading').removeClass('male female').addClass(gender);
                $('#pet-name-result').show();
            }
        });
    });
});
