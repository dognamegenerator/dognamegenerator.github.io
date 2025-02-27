$(document).ready(function() {
    // Replace with your OpenAI API key (client-side for demo; use server-side in production)
    const openaiApiKey = "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";

    // Manual static names (50 per category for male and female)
    const staticNames = {
        male: {
            Friendly: ["Buddy", "Max", "Charlie", "Cooper", "Milo", "Bear", "Rocky", "Duke", "Oliver", "Toby", "Jack", "Finn", "Leo", "Sam", "Benji", "Cody", "Gus", "Hank", "Joey", "Loki", "Nemo", "Oscar", "Patch", "Rusty", "Scout", "Teddy", "Winston", "Ziggy", "Apollo", "Baxter", "Chester", "Dexter", "Eli", "Freddy", "George", "Harry", "Iggy", "Jasper", "Kobe", "Lenny", "Maverick", "Nixon", "Ollie", "Percy", "Quincy", "Ricky", "Sammy", "Tucker", "Vinny", "Wally"],
            Tough: ["Rambo", "Spike", "Brutus", "Tyson", "Killer", "Jagger", "Hercules", "Viper", "Blaze", "Cobra", "Diesel", "Fang", "Gunner", "Hawk", "Iron", "Jinx", "Knox", "Lobo", "Mace", "Nero", "Onyx", "Phantom", "Quake", "Rage", "Saber", "Tank", "Uzi", "Viking", "Wolf", "Xander", "Yankee", "Zorro", "Axel", "Bane", "Crush", "Drago", "Edge", "Fury", "Grim", "Hunter", "Jett", "Kraken", "Leon", "Mako", "Nitro", "Ogre", "Prowl", "Rogue", "Storm"],
            Elegant: ["Regal", "Prince", "Duke", "Baron", "Earl", "King", "Lord", "Noble", "Sire", "Viscount", "Archie", "Balthazar", "Caspian", "Dorian", "Elias", "Ferdinand", "Gaius", "Hadrian", "Ignatius", "Julian", "Kieran", "Lucian", "Magnus", "Nestor", "Orion", "Percival", "Quentin", "Roderick", "Sebastian", "Theodore", "Ulrich", "Vincent", "Winthrop", "Xavier", "York", "Zephyr", "Aurelius", "Beau", "Cecil", "Damian", "Edmund", "Felix", "Giles", "Hugo", "Ivor", "Jove", "Klaus", "Lysander", "Milo"],
            Funny: ["Waffles", "Barkley", "Snickers", "Pickles", "Biscuit", "Muffin", "Noodle", "Pudding", "Sausage", "Taco", "Burrito", "Cheeto", "Donut", "Fudge", "Gizmo", "Hotdog", "Jellybean", "Ketchup", "Lollipop", "Marshmallow", "Nachos", "Oreo", "Peanut", "Quiche", "Ravioli", "Sprinkle", "Toffee", "Udon", "Veggie", "Wonton", "Xtra", "Yogurt", "Ziti", "Bacon", "Cookie", "Dumpling", "Eclair", "Frito", "Gummy", "Hershey", "Icicle", "Jambalaya", "Kiwi", "Licorice", "Macaron", "Nugget", "Oyster", "Popcorn", "Twix"],
            Sporty: ["Dash", "Bolt", "Racer", "Jeter", "Champ", "Ace", "Blitz", "Flash", "Goalie", "Hitter", "Jock", "Kicker", "Lancer", "Maverick", "Ninja", "Odin", "Pacer", "Quicksilver", "Runner", "Sprint", "Tackle", "Umpire", "Victor", "Winger", "Xerxes", "Yank", "Zinger", "Batter", "Catcher", "Dribble", "Fielder", "Grit", "Hustle", "Interceptor", "Juggernaut", "Kobe", "Leaper", "Mitt", "Nets", "Outlaw", "Pitcher", "Quarterback", "Rookie", "Striker", "Titan", "Uplink", "Velocity", "Wicket", "Zoom"],
            Cute: ["Pancake", "Muffin", "Teddy", "Pebbles", "Bunny", "Cuddles", "Doodle", "Fluffy", "Giggles", "Huggy", "Jelly", "Kitten", "Little", "Nugget", "Puffy", "Quirky", "Rosie", "Snuggle", "Tinker", "Winky", "Yogi", "Zippy", "Angel", "Binky", "Cherry", "Dusty", "Elfie", "Fairy", "Glitter", "Honey", "Icy", "Joy", "Kissy", "Lulu", "Minty", "Nifty", "Ollie", "Patty", "Queenie", "Ruffles", "Sunny", "Twinkle", "Umber", "Violet", "Waddle", "Xena", "Yummy", "Zuzu", "Bubbles"],
            International: ["Kiki", "Lupo", "Sushi", "Boris", "Chico", "Dante", "Enzo", "Fuji", "Gobi", "Hiro", "Igor", "Jiro", "Kano", "Levi", "Miko", "Nico", "Otto", "Pablo", "Quin", "Riku", "Sato", "Taro", "Udo", "Vito", "Wong", "Xiang", "Yuki", "Zane", "Amir", "Bruno", "Carlos", "Diego", "Emil", "Finn", "Gael", "Hank", "Isak", "Johan", "Kael", "Liam", "Mohammed", "Noah", "Omar", "Pedro", "Quinn", "Raul", "Sven", "Tomas", "Ulrich"],
            Classic: ["Spot", "Fido", "Rusty", "Skippy", "Bingo", "Casper", "Duke", "Eddie", "Flash", "Ginger", "Hoss", "Ike", "Jasper", "King", "Lucky", "Mickey", "Nugget", "Odie", "Puffy", "Rover", "Scamp", "Taffy", "Ulysses", "Vance", "Waldo", "Xerxes", "Yogi", "Zack", "Ace", "Bandit", "Chewy", "Dakota", "Elvis", "Fred", "Gunner", "Hector", "Ivan", "Jed", "Kody", "Lancer", "Milo", "Nero", "Ozzy", "Pepper", "Quincy", "Rex", "Sammy", "Tigger", "Willy"],
            Movies: ["Lassie", "Toto", "Hooch", "Beethoven", "Marley", "Sadie", "Rin", "Astro", "Chance", "Shadow", "Benji", "Copper", "Dug", "Ein", "Fang", "Gromit", "Hank", "Iggy", "Jock", "Krypto", "Largo", "Max", "Nemo", "Odie", "Patch", "Quincy", "Rocco", "Slinky", "Trapper", "Ulysses", "Vito", "Wags", "Xander", "Yoda", "Zorro", "Ace", "Barkley", "Clifford", "Dobby", "Eddie", "Falkor", "Gizmo", "Herc", "Icarus", "Jasper", "Koda", "Lobo", "Milo", "Nero"],
            Books: ["Balto", "Nana", "Buck", "White Fang", "Scout", "Pippa", "Clara", "Dante", "Enid", "Fanny", "Gulliver", "Hector", "Isabel", "Jasper", "Kali", "Lara", "Moby", "Nora", "Olaf", "Percy", "Quince", "Rufus", "Sasha", "Tessa", "Ursula", "Vera", "Willa", "Xena", "Yara", "Zelda", "Aiden", "Belle", "Casper", "Dorian", "Elsa", "Finn", "Gina", "Hazel", "Izzy", "Juno", "Kira", "Luna", "Mira", "Nita", "Opal", "Pia", "Quinn", "Rhea", "Sita", "Tara"],
            Comics: ["Batman", "Superman", "Flash", "Wonder", "Storm", "Harley", "Joker", "Robin", "Aquaman", "Cyborg", "Deadpool", "Gambit", "Hawk", "Iceman", "Juggernaut", "Krypto", "Lobo", "Magneto", "Nightwing", "Orion", "Penguin", "Quicksilver", "Rogue", "Sabretooth", "Thor", "Ultron", "Venom", "Wolverine", "Xavier", "Yak", "Zod", "Arrow", "Bane", "Catwoman", "Daredevil", "Electro", "Falcon", "Green Lantern", "Hulk", "Iron Man", "Johnny", "Kang", "Lex", "Mystique", "Namor", "Ozymandias", "Punisher", "Red Hood", "Spider"],
            Geeky: ["Pixel", "Binary", "Nerd", "Byte", "Code", "Gizmo", "Hack", "Jolt", "Kernel", "Linux", "Matrix", "Nix", "Octo", "Ping", "Quantum", "Router", "Script", "Turing", "Unix", "Virus", "Watt", "Xenon", "Yottabyte", "Zeta", "Algor", "Bit", "Chip", "Data", "Ether", "Flux", "Gig", "Hex", "Ion", "Java", "Kilo", "Loop", "Mega", "Nano", "Optic", "Perl", "Quark", "Ram", "Silicon", "Terra", "Unit", "Volt", "Wave", "Xray", "Yolo"],
            Music: ["Jagger", "Mozart", "Beat", "Rhythm", "Jazz", "Lola", "Melody", "Bono", "Drum", "Echo", "Funk", "Guitar", "Harmony", "Indie", "Jive", "Karaoke", "Lyric", "Note", "Opera", "Piano", "Quaver", "Rock", "Sax", "Tempo", "Ukulele", "Viola", "Waltz", "Xylophone", "Yodel", "Zigzag", "Aria", "Bass", "Chord", "Diva", "Flute", "Groove", "Harp", "Improv", "Jam", "Key", "Lute", "Mambo", "Ninja", "Octave", "Pulse", "Riff", "Scale", "Tune", "Vibe"],
            Historic: ["Caesar", "Napoleon", "Viking", "Attila", "Boris", "Cleopatra", "Darius", "Einstein", "Ferdinand", "Gandhi", "Hannibal", "Isis", "Julius", "Kublai", "Leonidas", "Marco", "Nero", "Odin", "Pharaoh", "Quincy", "Ramesses", "Spartacus", "Tutankhamun", "Uther", "Vlad", "William", "Xerxes", "York", "Zeus", "Alexander", "Beowulf", "Charlemagne", "Dido", "Elvis", "Frederic", "Genghis", "Hector", "Icarus", "Joan", "Kaiser", "Lancelot", "Marius", "Nostradamus", "Othello", "Pericles", "Qin", "Roland", "Saladin", "Tamerlane", "Ulysses"],
            TV: ["Scooby", "Rin", "Astro", "Lola", "Pinky", "Dora", "Barkley", "Clifford", "Droopy", "Eddie", "Fido", "Gidget", "Herc", "Iggy", "Jasper", "Krypto", "Lassie", "Max", "Nemo", "Odie", "Patch", "Quincy", "Rocco", "Slinky", "Trapper", "Ulysses", "Vito", "Wags", "Xander", "Yoda", "Zorro", "Ace", "Benji", "Chance", "Dug", "Ein", "Fang", "Gromit", "Hank", "Jock", "Koda", "Largo", "Marley", "Nala", "Ozzy", "Pepper", "Rex", "Shadow", "Toto"],
            Sports: ["Champ", "Jeter", "Puck", "Ace", "Blitz", "Dash", "Flash", "Goalie", "Hitter", "Jock", "Kicker", "Lancer", "Maverick", "Ninja", "Odin", "Pacer", "Quicksilver", "Runner", "Sprint", "Tackle", "Umpire", "Victor", "Winger", "Xerxes", "Yank", "Zinger", "Batter", "Catcher", "Dribble", "Fielder", "Grit", "Hustle", "Interceptor", "Juggernaut", "Kobe", "Leaper", "Mitt", "Nets", "Outlaw", "Pitcher", "Quarterback", "Rookie", "Striker", "Titan", "Uplink", "Velocity", "Wicket", "Zoom"]
        },
        female: {
            Friendly: ["Bella", "Luna", "Daisy", "Lucy", "Molly", "Sadie", "Maggie", "Sophie", "Chloe", "Bailey", "Lily", "Zoe", "Ruby", "Rosie", "Ella", "Grace", "Nala", "Penny", "Coco", "Mimi", "Angel", "Bambi", "Candy", "Dolly", "Evie", "Fifi", "Gigi", "Honey", "Ivy", "Joy", "Kiki", "Lola", "Maddie", "Nina", "Olive", "Peaches", "Queen", "Roxy", "Sunny", "Tilly", "Uma", "Violet", "Willow", "Xena", "Yara", "Zara", "Bonnie", "Cleo", "Dottie"],
            Tough: ["Raven", "Vixen", "Sable", "Jinx", "Kali", "Lara", "Mara", "Nyx", "Onyx", "Puma", "Queenie", "Rogue", "Shadow", "Tara", "Ursa", "Viper", "Wolf", "Xena", "Yara", "Zara", "Blaze", "Cobra", "Dagger", "Echo", "Fury", "Grit", "Hawk", "Ice", "Jaguar", "Kira", "Lynx", "Mako", "Nero", "Panther", "Quinn", "Rhea", "Sabre", "Titan", "Uma", "Valkyrie", "Wren", "Xenon", "Yeti", "Zephyr", "Axel", "Bullet", "Crush", "Draco"],
            Elegant: ["Duchess", "Pearl", "Sapphire", "Aurora", "Belle", "Celine", "Diva", "Elsa", "Fiona", "Giselle", "Hazel", "Isabelle", "Jade", "Katrina", "Lillian", "Marissa", "Nadine", "Opal", "Paris", "Queen", "Rita", "Serena", "Tessa", "Ursula", "Valerie", "Wendy", "Xandra", "Yolanda", "Zoe", "Amelia", "Bianca", "Cecilia", "Delphine", "Evangeline", "Florence", "Genevieve", "Harmony", "Ivy", "Juliet", "Kara", "Luna", "Miranda", "Nora", "Olivia", "Penelope", "Quiana", "Rosetta", "Selene", "Thea"],
            Funny: ["Cupcake", "Pickles", "Bubbles", "Winky", "Doodle", "Fudge", "Gummy", "Hiccup", "Jellybean", "Kooky", "Lollipop", "Munchkin", "Noodle", "Puffy", "Quirky", "Ruffles", "Snickers", "Toffee", "Upsy", "Veggie", "Waffle", "Xtra", "Yodel", "Zigzag", "Biscuit", "Cheeto", "Donut", "Eclair", "Frito", "Gizmo", "Hotdog", "Icicle", "Jambalaya", "Kiwi", "Macaron", "Nugget", "Oreo", "Peanut", "Quiche", "Ravioli", "Sprinkle", "Taco", "Umber", "Vanilla", "Wonton", "Yogurt", "Ziti", "Burrito"],
            Sporty: ["Sprint", "Zoom", "Dash", "Blitz", "Ace", "Flick", "Goalie", "Hustle", "Jolt", "Kicker", "Leap", "Ninja", "Pacer", "Quicksilver", "Racer", "Skate", "Tackle", "Uplink", "Vicky", "Winger", "Xena", "Yank", "Zinger", "Batter", "Catcher", "Dribble", "Fielder", "Grit", "Interceptor", "Jumper", "Kobe", "Lancer", "Maverick", "Outlaw", "Pitcher", "Quarterback", "Rookie", "Striker", "Titan", "Velocity", "Wicket", "Xerxes", "Yogi", "Zane", "Champ", "Dash", "Flash", "Jeter"],
            Cute: ["Pebbles", "Coco", "Fluffy", "Bunny", "Doodle", "Kitten", "Little", "Nugget", "Puffy", "Rosie", "Snuggle", "Tinker", "Winky", "Yogi", "Zippy", "Angel", "Binky", "Cherry", "Dusty", "Elfie", "Fairy", "Glitter", "Honey", "Icy", "Joy", "Kissy", "Lulu", "Minty", "Nifty", "Ollie", "Patty", "Queenie", "Ruffles", "Sunny", "Twinkle", "Umber", "Violet", "Waddle", "Xena", "Yummy", "Zuzu", "Bubbles", "Candy", "Dolly", "Evie", "Fifi", "Gigi", "Huggy", "Jelly"],
            International: ["Sakura", "ChiChi", "Nala", "Amira", "Bindi", "Cleo", "Dani", "Eira", "Fleur", "Gita", "Hana", "Ines", "Juni", "Kaya", "Lila", "Mira", "Nia", "Ola", "Pia", "Quila", "Rani", "Sita", "Tara", "Umi", "Vera", "Wafa", "Xena", "Yara", "Zara", "Anika", "Bebe", "Chana", "Dora", "Elma", "Fara", "Gina", "Hira", "Isha", "Jaya", "Kara", "Lani", "Mali", "Nora", "Opal", "Pema", "Rhea", "Sana", "Tina", "Uma", "Vani"],
            Classic: ["Lady", "Molly", "Ginger", "Ruby", "Sasha", "Tilly", "Wendy", "Betsy", "Clara", "Dixie", "Etta", "Fanny", "Gracie", "Holly", "Ivy", "Juni", "Katy", "Lola", "Macy", "Nell", "Opal", "Peggy", "Queenie", "Rita", "Sally", "Tessa", "Ursula", "Vicky", "Willow", "Xena", "Yuki", "Zoe", "Abbie", "Bonnie", "Cindy", "Dolly", "Ella", "Fiona", "Gemma", "Hanna", "Irina", "Jessa", "Katie", "Lena", "Mira", "Nita", "Olive", "Polly", "Rosie", "Stella"],
            Movies: ["Marley", "Sadie", "Bebe", "Lassie", "Toto", "Nala", "Pinky", "Dora", "Ella", "Fanny", "Gidget", "Hazel", "Ivy", "Juni", "Kiki", "Lola", "Mimi", "Nora", "Opal", "Pia", "Queenie", "Roxy", "Sita", "Tara", "Umi", "Vera", "Wendy", "Xena", "Yara", "Zara", "Angel", "Bambi", "Cleo", "Dani", "Eira", "Fleur", "Gita", "Hana", "Ines", "Jaya", "Kara", "Lani", "Mali", "Nita", "Opal", "Pema", "Rhea", "Sana", "Tina", "Uma"],
            Books: ["Clara", "Pippa", "Scout", "Nana", "Lara", "Mira", "Nora", "Opal", "Pia", "Quince", "Rufus", "Sasha", "Tessa", "Ursula", "Vera", "Willa", "Xena", "Yara", "Zelda", "Amelia", "Belle", "Casper", "Dorian", "Elsa", "Finn", "Gina", "Hazel", "Izzy", "Juno", "Kira", "Luna", "Miranda", "Nita", "Olivia", "Penelope", "Quiana", "Rosetta", "Selene", "Thea", "Uma", "Violet", "Wendy", "Xandra", "Yolanda", "Zoe", "Aiden", "Bianca", "Cecilia", "Delphine"],
            Comics: ["Wonder", "Storm", "Harley", "Joker", "Robin", "Aquaman", "Cyborg", "Deadpool", "Gambit", "Hawk", "Iceman", "Juggernaut", "Krypto", "Lobo", "Magneto", "Nightwing", "Orion", "Penguin", "Quicksilver", "Rogue", "Sabretooth", "Thor", "Ultron", "Venom", "Wolverine", "Xavier", "Yak", "Zod", "Arrow", "Bane", "Catwoman", "Daredevil", "Electro", "Falcon", "Green Lantern", "Hulk", "Iron Man", "Johnny", "Kang", "Lex", "Mystique", "Namor", "Ozymandias", "Punisher", "Red Hood", "Spider", "Titan", "Vixen", "Warlock"],
            Geeky: ["Byte", "Code", "Nix", "Pixel", "Binary", "Gizmo", "Hack", "Jolt", "Kernel", "Linux", "Matrix", "Nerd", "Octo", "Ping", "Quantum", "Router", "Script", "Turing", "Unix", "Virus", "Watt", "Xenon", "Yottabyte", "Zeta", "Algor", "Bit", "Chip", "Data", "Ether", "Flux", "Gig", "Hex", "Ion", "Java", "Kilo", "Loop", "Mega", "Nano", "Optic", "Perl", "Quark", "Ram", "Silicon", "Terra", "Unit", "Volt", "Wave", "Xray", "Yolo"],
            Music: ["Melody", "Jazz", "Lola", "Jagger", "Mozart", "Beat", "Rhythm", "Bono", "Drum", "Echo", "Funk", "Guitar", "Harmony", "Indie", "Jive", "Karaoke", "Lyric", "Note", "Opera", "Piano", "Quaver", "Rock", "Sax", "Tempo", "Ukulele", "Viola", "Waltz", "Xylophone", "Yodel", "Zigzag", "Aria", "Bass", "Chord", "Diva", "Flute", "Groove", "Harp", "Improv", "Jam", "Key", "Lute", "Mambo", "Ninja", "Octave", "Pulse", "Riff", "Scale", "Tune", "Vibe"],
            Historic: ["Cleopatra", "Joan", "Isis", "Caesar", "Napoleon", "Viking", "Attila", "Boris", "Darius", "Einstein", "Ferdinand", "Gandhi", "Hannibal", "Julius", "Kublai", "Leonidas", "Marco", "Nero", "Odin", "Pharaoh", "Quincy", "Ramesses", "Spartacus", "Tutankhamun", "Uther", "Vlad", "William", "Xerxes", "York", "Zeus", "Alexander", "Beowulf", "Charlemagne", "Dido", "Elvis", "Frederic", "Genghis", "Hector", "Icarus", "Kaiser", "Lancelot", "Marius", "Nostradamus", "Othello", "Pericles", "Qin", "Roland", "Saladin", "Tamerlane"],
            TV: ["Lola", "Pinky", "Dora", "Scooby", "Rin", "Astro", "Barkley", "Clifford", "Droopy", "Eddie", "Fido", "Gidget", "Herc", "Iggy", "Jasper", "Krypto", "Lassie", "Max", "Nemo", "Odie", "Patch", "Quincy", "Rocco", "Slinky", "Trapper", "Ulysses", "Vito", "Wags", "Xander", "Yoda", "Zorro", "Ace", "Benji", "Chance", "Dug", "Ein", "Fang", "Gromit", "Hank", "Jock", "Koda", "Largo", "Marley", "Nala", "Ozzy", "Pepper", "Rex", "Shadow", "Toto"],
            Sports: ["Ace", "Vicky", "Blitz", "Champ", "Jeter", "Puck", "Dash", "Flash", "Goalie", "Hitter", "Jock", "Kicker", "Lancer", "Maverick", "Ninja", "Odin", "Pacer", "Quicksilver", "Runner", "Sprint", "Tackle", "Umpire", "Victor", "Winger", "Xerxes", "Yank", "Zinger", "Batter", "Catcher", "Dribble", "Fielder", "Grit", "Hustle", "Interceptor", "Juggernaut", "Kobe", "Leaper", "Mitt", "Nets", "Outlaw", "Pitcher", "Quarterback", "Rookie", "Striker", "Titan", "Uplink", "Velocity", "Wicket", "Zoom"]
        }
    };

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

        // Use CORS proxy to bypass CORS restrictions (temporary workaround)
        const corsProxy = "https://cors-anywhere.herokuapp.com/";
        $.ajax({
            url: corsProxy + "https://api.openai.com/v1/chat/completions",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + openaiApiKey
            },
            data: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50,
                temperature: 0.8
            }),
            success: function(response) {
                const name = response.choices[0].message.content.trim() || "Buddy";
                $('#pet-name-output').text(name).removeClass('male female').addClass(gender);
                $('#pet-name-result').removeClass('male female').addClass(gender);
                $('.result-heading').removeClass('male female').addClass(gender);
                $('#pet-name-result').show();
            },
            error: function(xhr) {
                // Fallback to static names if API fails
                const name = staticNames[gender][category][Math.floor(Math.random() * staticNames[gender][category].length)] || "Buddy";
                $('#pet-name-output').text(name).removeClass('male female').addClass(gender);
                $('#pet-name-result').removeClass('male female').addClass(gender);
                $('.result-heading').removeClass('male female').addClass(gender);
                $('#pet-name-result').show();
                console.error("API Error:", xhr.responseText); // Log error for debugging
            }
        });
    });
});
