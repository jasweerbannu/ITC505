let story = {
    start: {
        text: "You find yourself in a dense, enchanted forest. A path winds deeper into the woods.",
        choices: [
            { text: "Follow the path", nextStage: "encounter" },
            { text: "Explore off the path", nextStage: "lost" }
        ],
        image: "forest.jpg"
    },
    encounter: {
        text: "Suddenly, a mystical creature appears, blocking your path.",
        choices: [
            { text: "Fight the creature", nextStage: "fight" },
            { text: "Negotiate with the creature", nextStage: "negotiate" }
        ],
        image: "creature.jpg"
    },
    fight: {
        text: "You engage in battle with the creature and emerge victorious!",
        choices: [
            { text: "Continue deeper into the forest", nextStage: "artifact" },
            { text: "Rest and tend to wounds", nextStage: "rest" }
        ],
        image: "victory.jpg"
    },
    negotiate: {
        text: "You successfully negotiate with the creature and it offers to guide you deeper into the forest.",
        choices: [
            { text: "Accept the guide's offer", nextStage: "guide" },
            { text: "Decline and explore on your own", nextStage: "artifact" }
        ],
        image: "negotiate.jpg"
    },
    guide: {
        text: "The creature guides you through the forest, revealing hidden paths and secrets.",
        choices: [
            { text: "Follow the guide to a hidden grove", nextStage: "artifact" },
            { text: "Part ways with the guide and explore alone", nextStage: "alone" }
        ],
        image: "guide.jpg"
    },
    artifact: {
        text: "You stumble upon a hidden grove with a powerful artifact glowing softly.",
        choices: [
            { text: "Take the artifact", nextStage: "guardian" },
            { text: "Leave it untouched", nextStage: "leave" }
        ],
        image: "artifact.jpg"
    },
    guardian: {
        text: "A guardian spirit appears, protecting the heart of the forest.",
        choices: [
            { text: "Challenge the guardian", nextStage: "challenge" },
            { text: "Sneak past the guardian", nextStage: "sneak" }
        ],
        image: "guardian.jpg"
    },
    challenge: {
        text: "You face the guardian in a test of strength and courage.",
        choices: [
            { text: "Harness the artifact's power", nextStage: "success" },
            { text: "Fight without using the artifact", nextStage: "failure" }
        ],
        image: "challenge.jpg"
    },
    success: {
        text: "With the artifact's power, you overcome the guardian and restore balance to the forest.",
        choices: [],
        image: "success.jpg"
    },
    failure: {
        text: "You fight valiantly but are defeated. The forest's peace is disturbed, and you must face its consequences.",
        choices: [],
        image: "failure.jpg"
    },
    rest: {
        text: "You rest and tend to your wounds, reflecting on your journey.",
        choices: [],
        image: "rest.jpg"
    },
    lost: {
        text: "You wander off the path and become lost in the enchanted forest.",
        choices: [],
        image: "lost.jpg"
    },
    leave: {
        text: "You decide to leave the artifact untouched, respecting the balance of nature.",
        choices: [],
        image: "leave.jpg"
    },
    alone: {
        text: "You part ways with the guide and explore the forest alone, discovering hidden wonders.",
        choices: [],
        image: "alone.jpg"
    }
};

function startGame() {
    currentStage = "start";
    updatePage();
}

function updatePage() {
    let stage = story[currentStage];
    document.getElementById('story').textContent = stage.text;

    let choicesElement = document.getElementById('choices');
    choicesElement.innerHTML = '';

    stage.choices.forEach(choice => {
        let button = document.createElement('button');
        button.textContent = choice.text;
        button.addEventListener('click', function() {
            currentStage = choice.nextStage;
            if (story[currentStage].choices.length === 0) {
                endGame();
            } else {
                updatePage();
            }
        });
        choicesElement.appendChild(button);
    });

    document.getElementById('image').innerHTML = `<img src="${stage.image}" alt="Scene Image">`;
}

function endGame() {
    let stage = story[currentStage];
    document.getElementById('story').textContent = stage.text;
    document.getElementById('choices').innerHTML = '';
    document.getElementById('image').innerHTML = `<img src="${stage.image}" alt="Scene Image">`;
}

let currentStage;
startGame();
