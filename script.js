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
            friendly: [
                "Buddy", "Max", "Charlie", "Cooper", "Jack", "Milo", "Toby", "Duke", "Bear", "Rocky",
                "Buster", "Sam", "Jake", "Finn", "Oliver", "Henry", "George", "Leo", "Benji", "Rusty",
                "Cody", "Scout", "Teddy", "Louie", "Chase", "Archie", "Wally", "Otis", "Hank", "Rex",
                "Gus", "Joey", "Baxter", "Winston", "Boomer", "Murphy", "Rocco", "Simba", "Zeus", "Thor",
                "Marley", "Blue", "Riley", "Tucker", "Diesel", "Shadow", "Coco", "Bruno", "Loki", "Jasper",
                "Rufus", "Frankie", "Bandit", "Chester", "Moose"
            ],
            cute: [
                "Toby", "Scout", "Milo", "Ollie", "Finn", "Pip", "Noodle", "Biscuit", "Pippin", "Snickers",
                "Muffin", "Bean", "Puddle", "Waffle", "Coco", "Jelly", "Fudge", "Sprout", "Bunny", "Doodle",
                "Chico", "Pebbles", "Taco", "Marshmallow", "Bambi", "Cupcake", "Gizmo", "Nugget", "Skittles",
                "Button", "Patches", "Snoopy", "Chip", "Poppy", "Twinkle", "Bubbles", "Rolo", "Cinnamon",
                "Honey", "Freckles", "Caramel", "Snuggle", "Pippin", "Paws", "Whisper", "Dimples", "Spark",
                "Cuddles", "Toffee", "Truffle", "Pebble", "S’mores", "Daisy", "Fluffy", "Lollipop"
            ],
            tough: [
                "Rocky", "Rover", "Fido", "Tank", "Duke", "Blaze", "Titan", "Rex", "Brutus", "Gunner",
                "Hercules", "Thor", "Zeus", "Spike", "Rambo", "Maverick", "Kane", "Sarge", "Bandit", "Axel",
                "Jagger", "Rocco", "Viper", "Diesel", "Hawk", "Fang", "Bear", "Wolf", "Storm", "Draco",
                "Saber", "Hunter", "Talon", "Goliath", "Knox", "Jet", "Ranger", "Cannon", "Bolt", "Tyson",
                "Shadow", "Rubble", "Cruz", "Zane", "Ryder", "Gage", "Bronson", "Kaiser", "Ace", "Brick",
                "Drake", "Jett", "Mako", "Ruin", "Vader"
            ],
            international: [
                "Pablo", "Loki", "Sven", "Rico", "Kai", "Mateo", "Hiro", "Niko", "Santino", "Dante",
                "Arlo", "Enzo", "Javi", "Koa", "Taro", "Ravi", "Amir", "Luca", "Yuki", "Sami",
                "Igor", "Nero", "Zephyr", "Kieran", "Elias", "Aki", "Raul", "Miko", "Cairo", "Finn",
                "Omar", "Jiro", "Khalid", "Leon", "Ruben", "Tito", "Zain", "Asher", "Basil", "Dax",
                "Emir", "Hugo", "Ivo", "Johan", "Kato", "Lior", "Milo", "Nero", "Otto", "Pasha",
                "Sasha", "Tarek", "Uri", "Vito", "Xavi"
            ],
            elegant: [
                "Winston", "Reginald", "Percy", "Sterling", "Jasper", "Augustus", "Montague", "Theodore", "Sebastian", "Clarence",
                "Edward", "Alistair", "Barnaby", "Caspian", "Dorian", "Elliot", "Frederick", "Gideon", "Harrison", "Ignatius",
                "Julian", "Kingsley", "Lawrence", "Maxwell", "Nathaniel", "Oliver", "Preston", "Quentin", "Roderick", "Silas",
                "Thatcher", "Ulysses", "Vincent", "Wesley", "Xavier", "Zachary", "Ambrose", "Bartholomew", "Cornelius", "Dominic",
                "Everett", "Franklin", "Grayson", "Hadley", "Isaiah", "Jerome", "Kendrick", "Lysander", "Merrick", "Nigel",
                "Orlando", "Phineas", "Roland", "Sampson", "Tristan"
            ],
            classic: [
                "Rex", "Duke", "Spot", "Rusty", "Benji", "Lassie", "Buster", "Fido", "Rover", "Spike",
                "Buddy", "Max", "Sam", "Jack", "Toby", "Charlie", "Jake", "Rocky", "Bear", "Scout",
                "Shadow", "Gus", "Hank", "Joey", "Bandit", "Bruno", "Cody", "Diesel", "Finn", "George",
                "Hunter", "Koda", "Leo", "Marley", "Murphy", "Otis", "Riley", "Simba", "Teddy", "Thor",
                "Tucker", "Winston", "Zeus", "Ace", "Baxter", "Chester", "Duffy", "Eddie", "Frankie", "Gizmo",
                "Harley", "Ike", "Jasper", "King", "Louie"
            ],
            funny: [
                "Barkley", "Woofie", "Sir Barksalot", "Chewy", "Noodle", "Pickles", "Biscuit", "Taco", "Waffles", "Puddles",
                "Snickers", "Muffin", "Fudge", "Giggles", "Snoopy", "Bloop", "Chuckles", "Doodle", "Frito", "Goofy",
                "Jellybean", "Ketchup", "Meatball", "Nachos", "Pancake", "Quack", "Ruffles", "Sizzle", "Tater", "Wiggly",
                "Zippy", "Bacon", "Churro", "Dumpling", "Eggroll", "Flapjack", "Gumbo", "Hamburger", "Icecream", "Jello",
                "Kiwi", "Lollipop", "Mochi", "Nacho", "Oreo", "Popcorn", "Sausage", "Tofu", "Vanilla", "Whopper",
                "Yogurt", "Zucchini", "Burrito", "Chips", "Donut"
            ],
            general: [
                "Jack", "Sam", "Ben", "Luke", "Cody", "Max", "Finn", "Jake", "Toby", "Charlie",
                "Riley", "Oliver", "Henry", "George", "Leo", "Mason", "Ethan", "Noah", "Liam", "Owen",
                "Caleb", "Dylan", "Logan", "Aiden", "James", "William", "Michael", "David", "Thomas", "Charles",
                "Christopher", "Daniel", "Matthew", "Andrew", "Joseph", "Mark", "Paul", "Steven", "Richard", "Edward",
                "Brian", "Kevin", "Scott", "Jeff", "Eric", "Adam", "Patrick", "Jason", "Ryan", "Kyle",
                "Brandon", "Justin", "Chris", "Sean", "Greg"
            ],
            funnyTheme: [
                "Pickles", "Biscuit", "Taco", "Waffles", "Puddles", "Snickers", "Muffin", "Fudge", "Giggles", "Snoopy",
                "Bloop", "Chuckles", "Doodle", "Frito", "Goofy", "Jellybean", "Ketchup", "Meatball", "Nachos", "Pancake",
                "Quack", "Ruffles", "Sizzle", "Tater", "Wiggly", "Zippy", "Bacon", "Churro", "Dumpling", "Eggroll",
                "Flapjack", "Gumbo", "Hamburger", "Icecream", "Jello", "Kiwi", "Lollipop", "Mochi", "Nacho", "Oreo",
                "Popcorn", "Sausage", "Tofu", "Vanilla", "Whopper", "Yogurt", "Zucchini", "Burrito", "Chips", "Donut",
                "Pretzel", "Sundae", "Twizzler", "Poppy", "Smore"
            ],
            sporty: [
                "Ace", "Blitz", "Racer", "Dash", "Slam", "Spike", "Jock", "Rookie", "Striker", "Champ",
                "Bolt", "Dunk", "Goalie", "Rally", "Skater", "Trophy", "Winner", "Buzzer", "Catcher", "Dribble",
                "Fielder", "Homer", "Kicker", "Paddle", "Runner", "Scooter", "Sprinter", "Swifty", "Tackle", "Volley",
                "Acey", "Batter", "Cyclone", "Diver", "Fencer", "Golfer", "Hooper", "Jumper", "Pitcher", "Racer",
                "Skipper", "Slider", "Spinner", "Sprinter", "Striker", "Surfer", "Swimmer", "Tennis", "Winger", "Zinger",
                "Blazer", "Cruiser", "Drifty", "Hurdler", "Kicker"
            ],
            natureTheme: [
                "River", "Cedar", "Oak", "Pebble", "Sunny", "Willow", "Canyon", "Ridge", "Forest", "Moss",
                "Breeze", "Flint", "Sage", "Brook", "Pine", "Ash", "Cliff", "Dune", "Frost", "Hazel",
                "Maple", "Stone", "Thorn", "Vale", "Ember", "Fjord", "Grove", "Heath", "Jade", "Lark",
                "Meadow", "Nero", "Onyx", "Petal", "Quartz", "Raven", "Slate", "Tulip", "Vine", "Wheat",
                "Zephyr", "Acorn", "Birch", "Clover", "Drift", "Fern", "Glade", "Ivy", "Juniper", "Kale",
                "Leaf", "Mesa", "Reed", "Sky", "Twig"
            ],
            foodTheme: [
                "Bacon", "Churro", "Donut", "Fudge", "Ginger", "Honey", "Jelly", "Kiwi", "Lemon", "Mango",
                "Nacho", "Olive", "Peach", "Quince", "Raisin", "Salsa", "Taffy", "Vanilla", "Waffle", "Yam",
                "Zest", "Apple", "Bagel", "Cocoa", "Danish", "Eclair", "Fig", "Grape", "Hummus", "Icicle",
                "Jam", "Kale", "Latte", "Mocha", "Nectar", "Oat", "Pepper", "Rye", "Saffron", "Taco",
                "Umber", "Vino", "Wonton", "Xeno", "Yogurt", "Zucchini", "Basil", "Cider", "Dill", "Flax",
                "Guava", "Herb", "Mint", "Nutty", "Plum"
            ],
            mythicalTheme: [
                "Draco", "Griffin", "Phoenix", "Titan", "Odin", "Thor", "Loki", "Zeus", "Apollo", "Hercules",
                "Atlas", "Nero", "Orion", "Pegasus", "Spartan", "Vulcan", "Ares", "Cronos", "Dion", "Eros",
                "Fenrir", "Ganymede", "Hades", "Icarus", "Janus", "Kronos", "Midas", "Neptune", "Osiris", "Pluto",
                "Ragnar", "Saxon", "Triton", "Ulysses", "Vidar", "Woden", "Xander", "Ymir", "Zephyr", "Bacchus",
                "Castor", "Demetri", "Erebos", "Faunus", "Goliath", "Hyperion", "Icarus", "Jove", "Kael", "Lupus",
                "Mars", "Nyx", "Pollux", "Silvan", "Thanatos"
            ],
            royalTheme: [
                "King", "Prince", "Duke", "Baron", "Earl", "Lord", "Regent", "Sire", "Majesty", "Noble",
                "Czar", "Emperor", "Knight", "Sultan", "Viceroy", "Caliph", "Khan", "Shah", "Tsar", "Raja",
                "Archduke", "Baron", "Count", "Dauphin", "Fief", "Grandee", "Heir", "Imperial", "Jarl", "Kaiser",
                "Laird", "Marquis", "Navab", "Overlord", "Paladin", "Quasar", "Royal", "Sovereign", "Thane", "Usher",
                "Vassal", "Warden", "Xeno", "Yarl", "Zodiac", "Archer", "Banner", "Crown", "Dominion", "Excalibur",
                "Fortune", "Gentry", "Herald", "Ivory", "Jewel"
            ],
            popCultureTheme: [
                "Yoda", "Simba", "Buzz", "Nemo", "Pikachu", "Groot", "Shrek", "Dobby", "Sonic", "Mario",
                "Luigi", "Kirby", "Chewbacca", "Homer", "Spock", "Vader", "Frodo", "Gandalf", "Thor", "Hulk",
                "Iron", "Cap", "Flash", "Wolverine", "Batman", "Joker", "Loki", "Neo", "Morpheus", "Tron",
                "Rocky", "Rambo", "Indy", "Han", "Luke", "Marty", "Doc", "Woody", "Buzz", "Rex",
                "Stitch", "Bolt", "Dumbo", "Bambi", "Mufasa", "Scar", "Tarzan", "Aladdin", "Jafar", "Genie",
                "Pumbaa", "Timon", "Zazu", "Kovu", "Nala"
            ],
            vintageTheme: [
                "Alfie", "Bertie", "Clyde", "Dudley", "Ernie", "Frank", "Gus", "Hank", "Ivor", "Jock",
                "Kip", "Lenny", "Moe", "Ned", "Ollie", "Percy", "Ralph", "Sid", "Ted", "Vic",
                "Walt", "Xander", "Yank", "Zeb", "Abel", "Basil", "Cecil", "Doyle", "Elmer", "Floyd",
                "Gibbs", "Homer", "Ira", "Jeb", "Knox", "Lyle", "Milt", "Nate", "Omar", "Pete",
                "Quade", "Rube", "Stan", "Tate", "Uly", "Vince", "Wade", "Xeno", "Yale", "Zane",
                "Amos", "Burt", "Cole", "Dale", "Earl"
            ]
        },
        girl: {
            friendly: [
                "Daisy", "Molly", "Bella", "Lucy", "Sadie", "Ruby", "Chloe", "Lola", "Sophie", "Zoe",
                "Lily", "Mia", "Rosie", "Ellie", "Gracie", "Coco", "Pepper", "Honey", "Ginger", "Maddie",
                "Luna", "Stella", "Nala", "Willow", "Poppy", "Freya", "Ivy", "Hazel", "Juno", "Kiki",
                "Lulu", "Mimi", "Nora", "Olive", "Pippin", "Roxy", "Sunny", "Tilly", "Violet", "Wendy",
                "Amber", "Bonnie", "Candy", "Dolly", "Emma", "Fiona", "Gemma", "Holly", "Indie", "Joy",
                "Kitty", "Lexi", "Macy", "Nellie", "Penny"
            ],
            cute: [
                "Luna", "Coco", "Pepper", "Rosie", "Poppy", "Biscuit", "Pippin", "Snickers", "Muffin", "Puddle",
                "Waffle", "Jelly", "Fudge", "Sprout", "Bunny", "Doodle", "Chico", "Pebbles", "Taco", "Marshmallow",
                "Bambi", "Cupcake", "Gizmo", "Nugget", "Skittles", "Button", "Patches", "Snoopy", "Chip", "Twinkle",
                "Bubbles", "Rolo", "Cinnamon", "Honey", "Freckles", "Caramel", "Snuggle", "Paws", "Whisper", "Dimples",
                "Spark", "Cuddles", "Toffee", "Truffle", "Pebble", "S’mores", "Fluffy", "Lollipop", "Tinker", "Winky",
                "Zara", "Fizzy", "Glitter", "Pinky", "Sissy"
            ],
            tough: [
                "Raven", "Storm", "Vixen", "Onyx", "Blaze", "Sable", "Jinx", "Rogue", "Sasha", "Tigra",
                "Nyx", "Zara", "Koda", "Echo", "Fury", "Viper", "Shadow", "Luna", "Cleo", "Jet",
                "Roxy", "Dakota", "Saffron", "Indigo", "Ebony", "Ember", "Zelda", "Karma", "Mystique", "Sahara",
                "Talon", "Nix", "Rebel", "Sable", "Tundra", "Vega", "Wren", "Xena", "Yara", "Ziva",
                "Aspen", "Banshee", "Cinder", "Draven", "Fable", "Gala", "Haven", "Ibis", "Jade", "Kestrel",
                "Lyric", "Mara", "Nova", "Oasis", "Puma"
            ],
            international: [
                "Suki", "Anya", "Mila", "Zara", "Nia", "Aiko", "Chika", "Daria", "Esme", "Freja",
                "Gita", "Hana", "Ines", "Jana", "Kira", "Lila", "Mara", "Noor", "Olga", "Pia",
                "Rina", "Sana", "Tara", "Uma", "Vera", "Willa", "Xena", "Yuki", "Zoe", "Amara",
                "Bela", "Coco", "Dina", "Elke", "Fiona", "Gia", "Hera", "Isla", "Jade", "Kali",
                "Lina", "Maya", "Nera", "Oona", "Rhea", "Sia", "Tina", "Una", "Vida", "Wren",
                "Xara", "Yara", "Zina", "Ava", "Bria"
            ],
            elegant: [
                "Addison", "Agatha", "Ambrosia", "Amelie", "Aretha", "Angelica", "Anastasia", "Amethyst", "Audrey", "Atwood",
                "Avalon", "Bell", "Buffy", "Blake", "Bianca", "Bella", "Camilla", "Cardi", "Carmen", "Caroline",
                "Chanel", "Chantilly", "Charlotte", "Cherry", "Coco", "Cora", "Cordelia", "Daenerys", "Daisy", "Dakota",
                "Danica", "Darcy", "Desdemona", "Diamond", "Diana", "Diva", "Duchess", "Ebony", "Effie", "Eloise",
                "Emmy", "Endi", "Esme", "Espresso", "Eva", "Fancy", "Fauna", "Fifi", "Fiona", "Flora",
                "Freya", "Frida", "Gabriella", "Gaia", "Galina", "Garbo", "Georgia"
            ],
            classic: [
                "Lassie", "Lady", "Sadie", "Ginger", "Ruby", "Daisy", "Molly", "Bella", "Lucy", "Chloe",
                "Sophie", "Zoe", "Lily", "Mia", "Rosie", "Ellie", "Gracie", "Coco", "Pepper", "Honey",
                "Maddie", "Luna", "Stella", "Nala", "Willow", "Poppy", "Freya", "Ivy", "Hazel", "Juno",
                "Kiki", "Lulu", "Mimi", "Nora", "Olive", "Pippin", "Roxy", "Sunny", "Tilly", "Violet",
                "Wendy", "Amber", "Bonnie", "Candy", "Dolly", "Emma", "Fiona", "Gemma", "Holly", "Indie",
                "Joy", "Kitty", "Lexi", "Macy", "Nellie", "Penny"
            ],
            funny: [
                "Biscuit", "Waffles", "Puddles", "Muffin", "Cupcake", "Snickers", "Pickles", "Taco", "Fudge", "Giggles",
                "Snoopy", "Bloop", "Chuckles", "Doodle", "Frito", "Goofy", "Jellybean", "Ketchup", "Meatball", "Nachos",
                "Pancake", "Quack", "Ruffles", "Sizzle", "Tater", "Wiggly", "Zippy", "Bacon", "Churro", "Dumpling",
                "Eggroll", "Flapjack", "Gumbo", "Hamburger", "Icecream", "Jello", "Kiwi", "Lollipop", "Mochi", "Nacho",
                "Oreo", "Popcorn", "Sausage", "Tofu", "Vanilla", "Whopper", "Yogurt", "Zucchini", "Burrito", "Chips",
                "Donut", "Pretzel", "Sundae", "Twizzler", "Poppy", "Smore"
            ],
            general: [
                "Emma", "Ava", "Mia", "Zoe", "Ella", "Olivia", "Sophia", "Isabella", "Charlotte", "Amelia",
                "Evelyn", "Abigail", "Emily", "Harper", "Avery", "Madison", "Lily", "Aria", "Chloe", "Hannah",
                "Julia", "Sofia", "Grace", "Scarlett", "Victoria", "Riley", "Nora", "Hazel", "Zoey", "Lillian",
                "Addison", "Aubrey", "Ellie", "Stella", "Natalie", "Leah", "Audrey", "Savannah", "Brooklyn", "Bella",
                "Claire", "Skylar", "Lucy", "Paisley", "Everly", "Anna", "Caroline", "Nova", "Genesis", "Emilia",
                "Kennedy", "Samantha", "Maya", "Willow", "Kinsley"
            ],
            funnyTheme: [
                "Cupcake", "Muffin", "Pancake", "Waffles", "Puddles", "Snickers", "Pickles", "Taco", "Fudge", "Giggles",
                "Snoopy", "Bloop", "Chuckles", "Doodle", "Frito", "Goofy", "Jellybean", "Ketchup", "Meatball", "Nachos",
                "Quack", "Ruffles", "Sizzle", "Tater", "Wiggly", "Zippy", "Bacon", "Churro", "Dumpling", "Eggroll",
                "Flapjack", "Gumbo", "Hamburger", "Icecream", "Jello", "Kiwi", "Lollipop", "Mochi", "Nacho", "Oreo",
                "Popcorn", "Sausage", "Tofu", "Vanilla", "Whopper", "Yogurt", "Zucchini", "Burrito", "Chips", "Donut",
                "Pretzel", "Sundae", "Twizzler", "Poppy", "Smore"
            ],
            sporty: [
                "Skye", "Dash", "Roxy", "Ace", "Blitz", "Racer", "Slam", "Spike", "Jock", "Rookie",
                "Striker", "Champ", "Bolt", "Dunk", "Goalie", "Rally", "Skater", "Trophy", "Winner", "Buzzer",
                "Catcher", "Dribble", "Fielder", "Homer", "Kicker", "Paddle", "Runner", "Scooter", "Sprinter", "Swifty",
                "Tackle", "Volley", "Acey", "Batter", "Cyclone", "Diver", "Fencer", "Golfer", "Hooper", "Jumper",
                "Pitcher", "Skipper", "Slider", "Spinner", "Striker", "Surfer", "Swimmer", "Tennis", "Winger", "Zinger",
                "Blazer", "Cruiser", "Drifty", "Hurdler", "Kicker"
            ],
            natureTheme: [
                "Willow", "Daisy", "Luna", "Hazel", "Ivy", "River", "Cedar", "Oak", "Pebble", "Sunny",
                "Canyon", "Ridge", "Forest", "Moss", "Breeze", "Flint", "Sage", "Brook", "Pine", "Ash",
                "Cliff", "Dune", "Frost", "Maple", "Stone", "Thorn", "Vale", "Ember", "Fjord", "Grove",
                "Heath", "Jade", "Lark", "Meadow", "Nero", "Onyx", "Petal", "Quartz", "Raven", "Slate",
                "Tulip", "Vine", "Wheat", "Zephyr", "Acorn", "Birch", "Clover", "Drift", "Fern", "Glade",
                "Juniper", "Kale", "Leaf", "Mesa", "Reed"
            ],
            foodTheme: [
                "Honey", "Coco", "Pepper", "Ginger", "Cinnamon", "Biscuit", "Muffin", "Fudge", "Toffee", "Truffle",
                "S’mores", "Lollipop", "Caramel", "Snuggle", "Paws", "Bacon", "Churro", "Donut", "Jelly", "Kiwi",
                "Lemon", "Mango", "Nacho", "Olive", "Peach", "Quince", "Raisin", "Salsa", "Taffy", "Vanilla",
                "Waffle", "Yam", "Zest", "Apple", "Bagel", "Cocoa", "Danish", "Eclair", "Fig", "Grape",
                "Hummus", "Icicle", "Jam", "Kale", "Latte", "Mocha", "Nectar", "Oat", "Rye", "Saffron",
                "Taco", "Umber", "Vino", "Wonton", "Yogurt"
            ],
            mythicalTheme: [
                "Luna", "Nyx", "Selene", "Aurora", "Freya", "Athena", "Hera", "Isis", "Gaia", "Rhea",
                "Eos", "Circe", "Medusa", "Pandora", "Siren", "Vesta", "Aphrodite", "Artemis", "Demeter", "Hestia",
                "Juno", "Minerva", "Nemesis", "Persephone", "Theia", "Andromeda", "Ariadne", "Calypso", "Cassandra", "Daphne",
                "Elektra", "Fiora", "Galatea", "Helena", "Ione", "Jocasta", "Kora", "Leda", "Maia", "Nereid",
                "Ophelia", "Phoebe", "Runa", "Sigrid", "Thalia", "Urania", "Vega", "Willa", "Xena", "Zara",
                "Astra", "Clio", "Eir", "Freyja", "Lyra"
            ],
            royalTheme: [
                "Queen", "Princess", "Duchess", "Lady", "Empress", "Regina", "Sultana", "Baroness", "Countess", "Majesty",
                "Noble", "Czarina", "Kaiserin", "Rani", "Archduchess", "Consort", "Dame", "Fief", "Grandee", "Heir",
                "Imperial", "Jewel", "Khaleesi", "Ladyship", "Marchioness", "Navab", "Overlady", "Paladina", "Quasara", "Royal",
                "Sovereign", "Thane", "Usher", "Vassal", "Warden", "Xena", "Yara", "Zara", "Anastasia", "Beatrice",
                "Catherine", "Diana", "Eleanor", "Fiona", "Genevieve", "Henrietta", "Isabelle", "Josephine", "Katherine", "Lillian",
                "Margaret", "Ophelia", "Penelope", "Seraphina", "Victoria"
            ],
            popCultureTheme: [
                "Nala", "Elsa", "Marge", "Leia", "Marge", "Ariel", "Jasmine", "Belle", "Marge", "Tiana",
                "Moana", "Merida", "Rapunzel", "Cinderella", "Aurora", "Snow", "Megara", "Esmeralda", "Pocahontas", "Mulan",
                "Dory", "Jessie", "Boots", "Dora", "Minnie", "Daisy", "Wendy", "Tinker", "Fiona", "Shuri",
                "Gamora", "Nebula", "Wanda", "Natasha", "Okoye", "Sansa", "Arya", "Daenerys", "Cersei", "Marge",
                "Hermione", "Luna", "Ginny", "Fleur", "Katniss", "Tris", "Clary", "Rey", "Jyn", "Padme",
                "Eowyn", "Arwen", "Galadriel", "Legolas", "Sigrid"
            ],
            vintageTheme: [
                "Elsie", "Mabel", "Nellie", "Dottie", "Bessie", "Flossie", "Hattie", "Ida", "Josie", "Kitty",
                "Lottie", "Minnie", "Nora", "Opal", "Pearl", "Queenie", "Ruthie", "Sadie", "Tillie", "Vera",
                "Winnie", "Agnes", "Bea", "Clara", "Dora", "Edith", "Fanny", "Greta", "Hilda", "Irene",
                "June", "Kit", "Lila", "Marge", "Nan", "Olive", "Polly", "Rita", "Stella", "Thelma",
                "Una", "Viola", "Willa", "Xena", "Yetta", "Zelda", "Ada", "Belle", "Cora", "Daisy",
                "Ethel", "Flora", "Gertie", "Hetty", "Ivy"
            ]
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

    const breeds = {
        small: {
            low: {
                yes: [
                    "Shih Tzu", "Pomeranian", "Chihuahua", "Pug", "Maltese",
                    "Papillon", "Cavalier King Charles Spaniel", "Havanese", "Bichon Frise", "Pekingese",
                    "Toy Poodle", "Yorkshire Terrier", "Dachshund", "Miniature Pinscher", "French Bulldog",
                    "Italian Greyhound", "Lhasa Apso", "Shiba Inu", "Boston Terrier", "Norfolk Terrier",
                    "Norwich Terrier", "West Highland White Terrier", "Cairn Terrier", "Shetland Sheepdog", "Miniature Schnauzer",
                    "Japanese Chin", "Brussels Griffon", "Affenpinscher", "Silky Terrier", "Toy Fox Terrier",
                    "English Toy Spaniel", "Chinese Crested", "Tibetan Spaniel", "Schipperke", "Rat Terrier",
                    "Jack Russell Terrier", "Parson Russell Terrier", "Border Terrier", "Manchester Terrier", "Dandie Dinmont Terrier",
                    "Sealyham Terrier", "Cesky Terrier", "Glen of Imaal Terrier", "Australian Terrier", "Scottish Terrier",
                    "Skye Terrier", "Lakeland Terrier", "Welsh Terrier", "Irish Terrier", "Soft Coated Wheaten Terrier",
                    "Miniature Bull Terrier", "Smooth Fox Terrier", "Wire Fox Terrier", "Bedlington Terrier", "Kerry Blue Terrier"
                ],
                no: [
                    "Dachshund", "Chihuahua", "Pomeranian", "Pug", "Maltese",
                    "Shih Tzu", "Papillon", "Havanese", "Bichon Frise", "Pekingese",
                    "Toy Poodle", "Yorkshire Terrier", "Miniature Pinscher", "French Bulldog", "Italian Greyhound",
                    "Lhasa Apso", "Shiba Inu", "Boston Terrier", "Norfolk Terrier", "Norwich Terrier",
                    "West Highland White Terrier", "Cairn Terrier", "Shetland Sheepdog", "Miniature Schnauzer", "Japanese Chin",
                    "Brussels Griffon", "Affenpinscher", "Silky Terrier", "Toy Fox Terrier", "English Toy Spaniel",
                    "Chinese Crested", "Tibetan Spaniel", "Schipperke", "Rat Terrier", "Jack Russell Terrier",
                    "Parson Russell Terrier", "Border Terrier", "Manchester Terrier", "Dandie Dinmont Terrier", "Sealyham Terrier",
                    "Cesky Terrier", "Glen of Imaal Terrier", "Australian Terrier", "Scottish Terrier", "Skye Terrier",
                    "Lakeland Terrier", "Welsh Terrier", "Irish Terrier", "Soft Coated Wheaten Terrier", "Miniature Bull Terrier",
                    "Smooth Fox Terrier", "Wire Fox Terrier", "Bedlington Terrier", "Kerry Blue Terrier", "Lowchen"
                ]
            },
            medium: {
                yes: [
                    "Beagle", "Cocker Spaniel", "Springer Spaniel", "Shetland Sheepdog", "Brittany",
                    "English Cocker Spaniel", "Shiba Inu", "Whippet", "Miniature American Shepherd", "Border Collie",
                    "Australian Terrier", "Basenji", "Bedlington Terrier", "Bichon Frise", "Boston Terrier",
                    "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund", "French Bulldog",
                    "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond", "Kerry Blue Terrier",
                    "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
                    "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Pug", "Scottish Terrier",
                    "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier",
                    "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie",
                    "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel",
                    "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel"
                ],
                no: [
                    "Australian Cattle Dog", "Beagle", "Cocker Spaniel", "Springer Spaniel", "Shetland Sheepdog",
                    "Brittany", "English Cocker Spaniel", "Shiba Inu", "Whippet", "Miniature American Shepherd",
                    "Border Collie", "Australian Terrier", "Basenji", "Bedlington Terrier", "Bichon Frise",
                    "Boston Terrier", "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund",
                    "French Bulldog", "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond",
                    "Kerry Blue Terrier", "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher",
                    "Miniature Schnauzer", "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Pug",
                    "Scottish Terrier", "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier",
                    "Tibetan Terrier", "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog",
                    "Australian Kelpie", "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter",
                    "Field Spaniel", "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever"
                ]
            },
            high: {
                yes: [
                    "Jack Russell Terrier", "Parson Russell Terrier", "Border Terrier", "Shetland Sheepdog", "Miniature American Shepherd",
                    "Beagle", "Cocker Spaniel", "Springer Spaniel", "Brittany", "English Cocker Spaniel",
                    "Shiba Inu", "Whippet", "Australian Terrier", "Basenji", "Bedlington Terrier",
                    "Boston Terrier", "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund",
                    "French Bulldog", "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond",
                    "Kerry Blue Terrier", "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher",
                    "Miniature Schnauzer", "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Scottish Terrier",
                    "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier",
                    "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie",
                    "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel",
                    "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel"
                ],
                no: [
                    "Australian Cattle Dog", "Jack Russell Terrier", "Parson Russell Terrier", "Border Terrier", "Shetland Sheepdog",
                    "Miniature American Shepherd", "Beagle", "Cocker Spaniel", "Springer Spaniel", "Brittany",
                    "English Cocker Spaniel", "Shiba Inu", "Whippet", "Australian Terrier", "Basenji",
                    "Bedlington Terrier", "Boston Terrier", "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel",
                    "Dachshund", "French Bulldog", "Havanese", "Irish Terrier", "Japanese Spitz",
                    "Keeshond", "Kerry Blue Terrier", "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier",
                    "Miniature Pinscher", "Miniature Schnauzer", "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi",
                    "Scottish Terrier", "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier",
                    "Tibetan Terrier", "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog",
                    "Australian Kelpie", "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter",
                    "Field Spaniel", "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever"
                ]
            }
        },
        medium: {
            low: {
                yes: [
                    "Beagle", "Cocker Spaniel", "Springer Spaniel", "Shetland Sheepdog", "Brittany",
                    "English Cocker Spaniel", "Shiba Inu", "Whippet", "Miniature American Shepherd", "Border Collie",
                    "Australian Terrier", "Basenji", "Bedlington Terrier", "Bichon Frise", "Boston Terrier",
                    "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund", "French Bulldog",
                    "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond", "Kerry Blue Terrier",
                    "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
                    "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Pug", "Scottish Terrier",
                    "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier",
                    "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie",
                    "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel",
                    "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel"
                ],
                no: [
                    "Dachshund", "Beagle", "Cocker Spaniel", "Springer Spaniel", "Shetland Sheepdog",
                    "Brittany", "English Cocker Spaniel", "Shiba Inu", "Whippet", "Miniature American Shepherd",
                    "Border Collie", "Australian Terrier", "Basenji", "Bedlington Terrier", "Bichon Frise",
                    "Boston Terrier", "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "French Bulldog",
                    "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond", "Kerry Blue Terrier",
                    "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
                    "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Pug", "Scottish Terrier",
                    "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier",
                    "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie",
                    "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel",
                    "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel"
                ]
            },
            medium: {
                yes: [
                    "Beagle", "Cocker Spaniel", "Springer Spaniel", "Shetland Sheepdog", "Brittany",
                    "English Cocker Spaniel", "Shiba Inu", "Whippet", "Miniature American Shepherd", "Border Collie",
                    "Australian Terrier", "Basenji", "Bedlington Terrier", "Bichon Frise", "Boston Terrier",
                    "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund", "French Bulldog",
                    "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond", "Kerry Blue Terrier",
                    "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
                    "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Pug", "Scottish Terrier",
                    "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier",
                    "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie",
                    "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel",
                    "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel"
                ],
                no: [
                    "Australian Cattle Dog", "Beagle", "Cocker Spaniel", "Springer Spaniel", "Shetland Sheepdog",
                    "Brittany", "English Cocker Spaniel", "Shiba Inu", "Whippet", "Miniature American Shepherd",
                    "Border Collie", "Australian Terrier", "Basenji", "Bedlington Terrier", "Bichon Frise",
                    "Boston Terrier", "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund",
                    "French Bulldog", "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond",
                    "Kerry Blue Terrier", "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher",
                    "Miniature Schnauzer", "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Pug",
                    "Scottish Terrier", "Sealyham Terrier", "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier",
                    "Tibetan Terrier", "Welsh Terrier", "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog",
                    "Australian Kelpie", "Boykin Spaniel", "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter",
                    "Field Spaniel", "Gordon Setter", "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever"
                ]
            },
            high: {
                yes: [
                    "Australian Cattle Dog", "Border Collie", "Beagle", "Cocker Spaniel", "Springer Spaniel",
                    "Shetland Sheepdog", "Brittany", "English Cocker Spaniel", "Shiba Inu", "Whippet",
                    "Miniature American Shepherd", "Australian Terrier", "Basenji", "Bedlington Terrier", "Boston Terrier",
                    "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund", "French Bulldog",
                    "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond", "Kerry Blue Terrier",
                    "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
                    "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Scottish Terrier", "Sealyham Terrier",
                    "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier", "Welsh Terrier",
                    "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie", "Boykin Spaniel",
                    "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel", "Gordon Setter",
                    "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel", "Vizsla"
                ],
                no: [
                    "Australian Cattle Dog", "Border Collie", "Beagle", "Cocker Spaniel", "Springer Spaniel",
                    "Shetland Sheepdog", "Brittany", "English Cocker Spaniel", "Shiba Inu", "Whippet",
                    "Miniature American Shepherd", "Australian Terrier", "Basenji", "Bedlington Terrier", "Boston Terrier",
                    "Cairn Terrier", "Cardigan Welsh Corgi", "Clumber Spaniel", "Dachshund", "French Bulldog",
                    "Havanese", "Irish Terrier", "Japanese Spitz", "Keeshond", "Kerry Blue Terrier",
                    "Lakeland Terrier", "Lowchen", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
                    "Norfolk Terrier", "Norwich Terrier", "Pembroke Welsh Corgi", "Scottish Terrier", "Sealyham Terrier",
                    "Silky Terrier", "Skye Terrier", "Soft Coated Wheaten Terrier", "Tibetan Terrier", "Welsh Terrier",
                    "West Highland White Terrier", "Wire Fox Terrier", "American Eskimo Dog", "Australian Kelpie", "Boykin Spaniel",
                    "Cesky Terrier", "Dandie Dinmont Terrier", "English Setter", "Field Spaniel", "Gordon Setter",
                    "Irish Setter", "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel", "Vizsla"
                ]
            }
        },
        large: {
            low: {
                yes: [
                    "Great Dane", "Mastiff", "Newfoundland", "Saint Bernard", "Bernese Mountain Dog",
                    "Great Pyrenees", "Leonberger", "Irish Wolfhound", "Scottish Deerhound", "Anatolian Shepherd",
                    "Tibetan Mastiff", "Black Russian Terrier", "Komondor", "Kuvasz", "Neapolitan Mastiff",
                    "Cane Corso", "Dogue de Bordeaux", "Bullmastiff", "English Mastiff", "Fila Brasileiro",
                    "Perro de Presa Canario", "Tosa Inu", "Boerboel", "Argentine Dogo", "Greater Swiss Mountain Dog",
                    "Rottweiler", "Doberman Pinscher", "Boxer", "German Shepherd", "Akita",
                    "Alaskan Malamute", "Siberian Husky", "Samoyed", "Chow Chow", "Keeshond",
                    "Norwegian Elkhound", "Finnish Spitz", "Icelandic Sheepdog", "Swedish Vallhund", "Lapponian Herder",
                    "Canadian Eskimo Dog", "Greenland Dog", "Caucasian Shepherd Dog", "Central Asian Shepherd Dog", "Kangal Shepherd Dog",
                    "Alaskan Klee Kai", "American Bulldog", "Old English Sheepdog", "Briard", "Bearded Collie",
                    "Bouvier des Flandres", "Belgian Sheepdog", "Belgian Tervuren", "Belgian Malinois", "German Shorthaired Pointer"
                ],
                no: [
                    "Great Dane", "Mastiff", "Newfoundland", "Saint Bernard", "Bernese Mountain Dog",
                    "Great Pyrenees", "Leonberger", "Irish Wolfhound", "Scottish Deerhound", "Anatolian Shepherd",
                    "Tibetan Mastiff", "Black Russian Terrier", "Komondor", "Kuvasz", "Neapolitan Mastiff",
                    "Cane Corso", "Dogue de Bordeaux", "Bullmastiff", "English Mastiff", "Fila Brasileiro",
                    "Perro de Presa Canario", "Tosa Inu", "Boerboel", "Argentine Dogo", "Greater Swiss Mountain Dog",
                    "Rottweiler", "Doberman Pinscher", "Boxer", "German Shepherd", "Akita",
                    "Alaskan Malamute", "Siberian Husky", "Samoyed", "Chow Chow", "Keeshond",
                    "Norwegian Elkhound", "Finnish Spitz", "Icelandic Sheepdog", "Swedish Vallhund", "Lapponian Herder",
                    "Canadian Eskimo Dog", "Greenland Dog", "Caucasian Shepherd Dog", "Central Asian Shepherd Dog", "Kangal Shepherd Dog",
                    "Alaskan Klee Kai", "American Bulldog", "Old English Sheepdog", "Briard", "Bearded Collie",
                    "Bouvier des Flandres", "Belgian Sheepdog", "Belgian Tervuren", "Belgian Malinois", "German Shorthaired Pointer"
                ]
            },
            medium: {
                yes: [
                    "Labrador Retriever", "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher",
                    "Boxer", "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed",
                    "Chow Chow", "Keeshond", "Norwegian Elkhound", "Finnish Spitz", "Icelandic Sheepdog",
                    "Swedish Vallhund", "Lapponian Herder", "Canadian Eskimo Dog", "Greenland Dog", "Caucasian Shepherd Dog",
                    "Central Asian Shepherd Dog", "Kangal Shepherd Dog", "Alaskan Klee Kai", "American Bulldog", "Old English Sheepdog",
                    "Briard", "Bearded Collie", "Bouvier des Flandres", "Belgian Sheepdog", "Belgian Tervuren",
                    "Belgian Malinois", "German Shorthaired Pointer", "English Setter", "Gordon Setter", "Irish Setter",
                    "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel", "Vizsla", "Weimaraner",
                    "Pointer", "Chesapeake Bay Retriever", "Curly-Coated Retriever", "Flat-Coated Retriever", "Labrador Retriever",
                    "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher", "Boxer",
                    "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed", "Chow Chow"
                ],
                no: [
                    "Labrador Retriever", "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher",
                    "Boxer", "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed",
                    "Chow Chow", "Keeshond", "Norwegian Elkhound", "Finnish Spitz", "Icelandic Sheepdog",
                    "Swedish Vallhund", "Lapponian Herder", "Canadian Eskimo Dog", "Greenland Dog", "Caucasian Shepherd Dog",
                    "Central Asian Shepherd Dog", "Kangal Shepherd Dog", "Alaskan Klee Kai", "American Bulldog", "Old English Sheepdog",
                    "Briard", "Bearded Collie", "Bouvier des Flandres", "Belgian Sheepdog", "Belgian Tervuren",
                    "Belgian Malinois", "German Shorthaired Pointer", "English Setter", "Gordon Setter", "Irish Setter",
                    "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel", "Vizsla", "Weimaraner",
                    "Pointer", "Chesapeake Bay Retriever", "Curly-Coated Retriever", "Flat-Coated Retriever", "Labrador Retriever",
                    "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher", "Boxer",
                    "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed", "Chow Chow"
                ]
            },
            high: {
                yes: [
                    "Labrador Retriever", "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher",
                    "Boxer", "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed",
                    "Chow Chow", "Keeshond", "Norwegian Elkhound", "Finnish Spitz", "Icelandic Sheepdog",
                    "Swedish Vallhund", "Lapponian Herder", "Canadian Eskimo Dog", "Greenland Dog", "Caucasian Shepherd Dog",
                    "Central Asian Shepherd Dog", "Kangal Shepherd Dog", "Alaskan Klee Kai", "American Bulldog", "Old English Sheepdog",
                    "Briard", "Bearded Collie", "Bouvier des Flandres", "Belgian Sheepdog", "Belgian Tervuren",
                    "Belgian Malinois", "German Shorthaired Pointer", "English Setter", "Gordon Setter", "Irish Setter",
                    "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel", "Vizsla", "Weimaraner",
                    "Pointer", "Chesapeake Bay Retriever", "Curly-Coated Retriever", "Flat-Coated Retriever", "Labrador Retriever",
                    "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher", "Boxer",
                    "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed", "Chow Chow"
                ],
                no: [
                    "Labrador Retriever", "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher",
                    "Boxer", "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed",
                    "Chow Chow", "Keeshond", "Norwegian Elkhound", "Finnish Spitz", "Icelandic Sheepdog",
                    "Swedish Vallhund", "Lapponian Herder", "Canadian Eskimo Dog", "Greenland Dog", "Caucasian Shepherd Dog",
                    "Central Asian Shepherd Dog", "Kangal Shepherd Dog", "Alaskan Klee Kai", "American Bulldog", "Old English Sheepdog",
                    "Briard", "Bearded Collie", "Bouvier des Flandres", "Belgian Sheepdog", "Belgian Tervuren",
                    "Belgian Malinois", "German Shorthaired Pointer", "English Setter", "Gordon Setter", "Irish Setter",
                    "Irish Water Spaniel", "Nova Scotia Duck Tolling Retriever", "Sussex Spaniel", "Vizsla", "Weimaraner",
                    "Pointer", "Chesapeake Bay Retriever", "Curly-Coated Retriever", "Flat-Coated Retriever", "Labrador Retriever",
                    "Golden Retriever", "German Shepherd", "Rottweiler", "Doberman Pinscher", "Boxer",
                    "Akita", "Alaskan Malamute", "Siberian Husky", "Samoyed", "Chow Chow"
                ]
            }
        }
    };

    // Construct the category key based on user input
    const category = breeds[size][activity][family];

    // Select a random breed from the category
    const randomIndex = Math.floor(Math.random() * category.length);
    const recommendedBreed = category[randomIndex];

    resultDiv.innerHTML = `<strong>Your Recommended Breed:</strong> ${recommendedBreed}`;
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize saved names counter
    document.getElementById("savedCount").innerText = savedNames.length;

    // Hamburger Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navContent = document.getElementById("nav-content");

    if (hamburger && navContent) {
        hamburger.addEventListener("click", () => {
            navContent.classList.toggle("active");
        });

        // Close the menu when a link is clicked
        const navLinks = navContent.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navContent.classList.remove("active");
            });
        });
    }

    // Handle generated names page
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

    // Handle saved names page
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

    // Handle contact form submission
    if (window.location.pathname.includes("contact.html")) {
        const form = document.getElementById("contact-form");
        const submitBtn = document.getElementById("submitBtn");
        const formMessage = document.getElementById("form-message");

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset error messages
        const resetErrors = () => {
            document.getElementById("name-error").textContent = "";
            document.getElementById("email-error").textContent = "";
            document.getElementById("message-error").textContent = "";
            formMessage.classList.remove("success", "error");
            formMessage.style.display = "none";
            formMessage.textContent = "";
        };

        // Validate form
        const validateForm = () => {
            let isValid = true;
            resetErrors();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name) {
                document.getElementById("name-error").textContent = "Please enter your name.";
                isValid = false;
            }

            if (!email) {
                document.getElementById("email-error").textContent = "Please enter your email.";
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById("email-error").textContent = "Please enter a valid email address.";
                isValid = false;
            }

            if (!message) {
                document.getElementById("message-error").textContent = "Please enter your message.";
                isValid = false;
            }

            return isValid;
        };

        // Handle form submission
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent default form submission

            if (!validateForm()) {
                return;
            }

            // Show loading state
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (response.ok) {
                    // Show success message
                    formMessage.classList.add("success");
                    formMessage.textContent = "Thank you for your message! We'll get back to you soon.";
                    formMessage.style.display = "block";
                    form.reset(); // Reset the form
                } else {
                    throw new Error("Failed to submit the form.");
                }
            } catch (error) {
                // Show error message
                formMessage.classList.add("error");
                formMessage.textContent = "Oops! Something went wrong. Please try again later.";
                formMessage.style.display = "block";
            } finally {
                // Hide loading state
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            }
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
