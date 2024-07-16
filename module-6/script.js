// Define possible options
const fitnessLevels = ["Beginner", "Intermediate", "Advanced"];
const fitnessGoals = ["Strength Training", "Weight Loss", "Muscle Hypertrophy"];
const availableEquipment = ["Dumbbells", "Barbells and Weight Plates", "Resistance Bands", "Treadmill"];

// Function to generate workout plan based on user input
function generateWorkoutPlan() {
    const fitnessLevel = document.getElementById("fitnessLevel").value;
    const fitnessGoal = document.getElementById("fitnessGoal").value;
    const equipment = document.getElementById("equipment").value;

    // Find matching workout plan
    const workoutPlan = findWorkoutPlan(fitnessLevel, fitnessGoal, equipment);

    // Display workout plan on the page
    displayWorkoutPlan(workoutPlan);
}

// Function to find workout plan based on selected options
function findWorkoutPlan(level, goal, equipment) {
    const workoutPlans = [];

    // Iterate over each combination of options
    fitnessLevels.forEach(fitLevel => {
        fitnessGoals.forEach(fitGoal => {
            availableEquipment.forEach(equip => {
                if (fitLevel === level && fitGoal === goal && equip === equipment) {
                    // Generate exercises for each day
                    const days = [];
                    for (let day = 1; day <= 7; day++) {
                        const exercises = generateExercises(goal, equip);
                        days.push({ day: `Day ${day}`, exercises: exercises });
                    }

                    workoutPlans.push({
                        level: fitLevel,
                        goal: fitGoal,
                        equipment: equip,
                        days: days
                    });
                }
            });
        });
    });

    return workoutPlans.length > 0 ? workoutPlans : [{ level: level, goal: goal, equipment: equipment, days: ["No workout available"] }];
}

// Function to generate exercises based on fitness goal and equipment
function generateExercises(goal, equipment) {
    switch (goal) {
        case "Strength Training":
            if (equipment === "Dumbbells") {
                return ["Dumbbell Squats - 3 sets of 12 reps", "Dumbbell Bench Press - 3 sets of 10 reps", "Dumbbell Rows - 3 sets of 10 reps"];
            } else if (equipment === "Barbells and Weight Plates") {
                return ["Barbell Squats - 3 sets of 12 reps", "Barbell Bench Press - 3 sets of 10 reps", "Barbell Rows - 3 sets of 10 reps"];
            } else if (equipment === "Resistance Bands") {
                return ["Resistance Band Squats - 3 sets of 15 reps", "Resistance Band Chest Press - 3 sets of 12 reps", "Resistance Band Rows - 3 sets of 12 reps"];
            } else if (equipment === "Treadmill") {
                return ["Treadmill Incline Walk - 30 minutes", "Treadmill Jogging - 20 minutes", "Treadmill Sprints - 10 minutes"];
            }
            break;
        case "Weight Loss":
            if (equipment === "Dumbbells") {
                return ["Dumbbell Lunges - 3 sets of 15 reps", "Dumbbell Shoulder Press - 3 sets of 12 reps", "Dumbbell Deadlifts - 3 sets of 12 reps"];
            } else if (equipment === "Barbells and Weight Plates") {
                return ["Barbell Lunges - 3 sets of 15 reps", "Barbell Shoulder Press - 3 sets of 12 reps", "Barbell Deadlifts - 3 sets of 12 reps"];
            } else if (equipment === "Resistance Bands") {
                return ["Resistance Band Lunges - 3 sets of 15 reps", "Resistance Band Shoulder Press - 3 sets of 12 reps", "Resistance Band Deadlifts - 3 sets of 12 reps"];
            } else if (equipment === "Treadmill") {
                return ["Treadmill Running - 30 minutes", "Treadmill Incline Walk - 20 minutes", "Treadmill HIIT - 15 minutes"];
            }
            break;
        case "Muscle Hypertrophy":
            if (equipment === "Dumbbells") {
                return ["Dumbbell Deadlifts - 4 sets of 8 reps", "Dumbbell Chest Flyes - 4 sets of 10 reps", "Dumbbell Shoulder Press - 4 sets of 8 reps"];
            } else if (equipment === "Barbells and Weight Plates") {
                return ["Barbell Deadlifts - 4 sets of 8 reps", "Barbell Chest Press - 4 sets of 10 reps", "Barbell Shoulder Press - 4 sets of 8 reps"];
            } else if (equipment === "Resistance Bands") {
                return ["Resistance Band Deadlifts - 4 sets of 8 reps", "Resistance Band Chest Press - 4 sets of 10 reps", "Resistance Band Shoulder Press - 4 sets of 8 reps"];
            } else if (equipment === "Treadmill") {
                return ["Treadmill Sprint Intervals - 4 sets of 1 minute", "Treadmill Incline Walk - 4 sets of 10 minutes", "Treadmill Jogging - 4 sets of 5 minutes"];
            }
            break;
        default:
            return [];
    }
}

// Function to display workout plan on the page
function displayWorkoutPlan(plan) {
    const workoutPlanElement = document.getElementById("workoutPlan");
    workoutPlanElement.innerHTML = "";

    if (plan.length === 0 || plan[0].days[0] === "No workout available") {
        workoutPlanElement.innerHTML = "<p>No workout available for this combination.</p>";
    } else {
        plan.forEach(item => {
            workoutPlanElement.innerHTML += `<div class="plan">
                <h3>${item.level} - ${item.goal} (${item.equipment})</h3>
                <ul>`;
            item.days.forEach(day => {
                workoutPlanElement.innerHTML += `<li><strong>${day.day}</strong>:<ul>`;
                day.exercises.forEach(exercise => {
                    workoutPlanElement.innerHTML += `<li>${exercise}</li>`;
                });
                workoutPlanElement.innerHTML += `</ul></li>`;
            });
            workoutPlanElement.innerHTML += `</ul></div>`;
        });
    }
}
