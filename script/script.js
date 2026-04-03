// console.log("Hello world");

// Sign In Part //

function signIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" & password === "admin123") {
        alert("Congratulation! Your Sign In is Successful.");
        window.location.href = "./dashboard.html"

    }
    else {
        alert("Invalid Sign In, Please try again.")
    }
}

// Dashboard Part //

const issuesContainer = document.getElementById("issuesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const count = document.getElementById("issueCount");
const issueDetailsModal = document.getElementById ("issue_details_modal");
const modalTitle = document.getElementById ("modalTitle");
const modalDescription = document.getElementById ("modalDescription");
const modalStatus = document.getElementById ("modalStatus");
const modalPriority = document.getElementById ("modalPriority");
const searchInput = document.getElementById ("searchInput");
const searchButton = document.getElementById ("searchButton");

let allIssues = [];


// Search function

async function searchIssue () {
    const text = searchInput.value.trim ().toLowerCase(); 

    // empty condition

    if ( text === "") {
        displayIssues (allIssues);
        return;
    }

    // Filter

    const filtered = allIssues.filter (issue => 
        issue.title.toLowerCase().startsWith(text)
    )

    displayIssues (filtered);
    
}

// Search button 

searchButton.addEventListener ("click", searchIssue);

// When press search button 

searchInput.addEventListener ("input", searchIssue);





function showLoading() {
    loadingSpinner.classList.remove("hidden");
    issuesContainer.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}





async function loadIssues() {
    showLoading();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    allIssues = data.data;
    hideLoading();
    displayIssues(allIssues);

}

// tab function and adding active class

function handleTab(btn, type) {

    // Remove all active class

    document.querySelectorAll (".tab-button").forEach (b => {
        b.classList.remove ("btn-primary");
        b.classList.add ("btn-outline");
    })

    

    // filtered and rendering issues

    let filtered = [];

    if (type === "all") {
        filtered = allIssues;
    }
    else if (type === "open") {
        filtered = allIssues.filter(issue => issue.status === "open");
    }
    else if (type === "closed") {
        filtered = allIssues.filter(issue => issue.status === "closed");
    }

    displayIssues(filtered);

    // Active button

    btn.classList.remove ("btn-outline");
    btn.classList.add ("btn-primary");
}

// Display issue


function displayIssues(issues) {
    issuesContainer.innerHTML = "";
    count.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {

        const borderColor = issue.status === "open"
            ? "border-green-300"
            : "border-purple-300";
            

        const icon = issue.status === "open"
        ? src="./assets/Open-Status.png"
        : src="./assets/Closed- Status .png";

        const card = document.createElement("div");

        card.className = `border-t-4 ${borderColor} rounded-xl`;

        card.innerHTML = `
           <div class="card bg-base-100 shadow-md hover:bg-blue-50 cursor-pointer" onclick="openIssueModal(${issue.id})">
                        <figure>
                            <div class="flex justify-between gap-40 items-center pt-4">
                                <img src="${icon}" alt="">
                                <div class="badge badge-soft badge-secondary font-semibold">${issue.priority.toUpperCase()}</div>

                            </div>
                        </figure>
                        <div class="card-body">
                            <h2 class="text-xl font-bold">${issue.title}</h2>
                            <p class="text-gray-500 pb-2">${issue.description}
                            </p>

                            <div class="card-actions justify-start gap-4">
                                <div class="badge badge-soft bg-red-100 badge-secondary flex items-center gap-1">

                                    <img class="w-2 h-[10px]" src="./assets/Vector-1.png" alt="" class="w-4 h-4">

                                    <span class="font-semibold">BUG</span>

                                </div>

                                <div class="badge badge-soft bg-yellow-100 badge-warning flex items-center gap-1">

                                    <img class="w-2 h-[10px]" src="./assets/Vector-2.png" alt="" class="w-4 h-4">

                                    <span class="font-semibold">HELP WANTED</span>

                                </div>
                            </div>

                            <div class="text-gray-400 border-t-1 mt-3 pt-4">
                                <p>${issue.author}</p>
                                <p>1/15/2024</p>
                            </div>



                        </div>
                    </div> 
            
            `



        issuesContainer.appendChild(card);
    });

    // console.log(issues);

    
}

async function openIssueModal (issueId) {
    console.log(issueId)
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`)
    const data = await response.json()
    const issueDetails = data.data
    console.log(issueDetails, "data")
    
    modalTitle.innerHTML = issueDetails.title;
    modalDescription.innerHTML = issueDetails.description;
    modalStatus.innerHTML = issueDetails.status;
    modalPriority.innerHTML = issueDetails.priority.toUpperCase();
    issueDetailsModal.showModal();

}




loadIssues();
