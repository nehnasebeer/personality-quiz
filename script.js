console.log("script.js connected!");


let selections = []; 

const questionBlocks = document.querySelectorAll(".question-block");


questionBlocks.forEach((block, index) => {
  const buttons = block.querySelectorAll(".answer-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
    
      buttons.forEach((b) => b.classList.remove("selected"));

  
      btn.classList.add("selected");

    
      const type = btn.getAttribute("data-type");
      selections[index] = type;

      console.log(`Question ${index + 1} answer:`, type);
    });
  });
});


function displayResult() {
  if (selections.length < questionBlocks.length || selections.includes(undefined)) {
    document.getElementById("result-container").textContent =
      "Please answer all the questions first 😊";
    return;
  }


  const scores = {
    encourager: 0,
    organizer: 0,
    prayer: 0,
  };

  selections.forEach((type) => {
    if (scores[type] !== undefined) {
      scores[type] += 1;
    }
  });

  console.log("Scores:", scores);

  // Determine highest
  let finalType = "encourager";
  let highestScore = scores.encourager;

  if (scores.organizer > highestScore) {
    finalType = "organizer";
    highestScore = scores.organizer;
  }
  if (scores.prayer > highestScore) {
    finalType = "prayer";
    highestScore = scores.prayer;
  }

  // Build result message
  let heading = "";
  let description = "";

  if (finalType === "encourager") {
    heading = "You are an Encourager 💬";
    description =
      "You reflect Christ by speaking life, comfort, and courage into others. God uses your words to lift weary hearts.";
  } else if (finalType === "organizer") {
    heading = "You are an Organizer 🗂️";
    description =
      "You reflect Christ by bringing structure and order. God uses your planning to make ministry effective and fruitful.";
  } else if (finalType === "prayer") {
    heading = "You are a Prayer Warrior 🙏";
    description =
      "You reflect Christ by standing in the gap in prayer. God uses your intercession to shift atmospheres and protect others.";
  }

  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = `
    <div class="card shadow-sm mx-auto" style="max-width: 480px;">
      <div class="card-body">
        <h2 class="h4 mb-3">${heading}</h2>
        <p class="mb-0">${description}</p>
      </div>
    </div>
  `;
}

// Add click listener to result button
const resultButton = document.getElementById("get-result-btn");
resultButton.addEventListener("click", displayResult);
