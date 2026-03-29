const btnsContainer = document.getElementById("btns-container");

const allIssuesContainer = document.getElementById("all-issuesContainer");

const totalNumberIssues = document.getElementById("total-NumberIssues");


// shob issues er jonno array 
let allIssues = [];

// button gula load er jonno 
async function loadAllButtons(){
    
    // ekhane showloading dekhabe 
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data);

    allIssues = data.data;

    btnsContainer.innerHTML = "";

    const filteredBtn = [];
    allIssues.forEach(issue =>{
        if(!filteredBtn.includes(issue.status)){
            filteredBtn.push(issue.status);
        }
    })
    
    // btn er status property dhore 
    filteredBtn.forEach(status => {
        
        const btn = document.createElement("button");
        btn.className = "neutral-btn w-[120px] py-2 px-3 rounded-sm"

        const firstLetter = status[0].toUpperCase();
        
        btn.textContent = firstLetter + status.slice(1); //button er nam select

        btn.onclick =()=> selectBtnCategory(status, btn);

        btnsContainer.appendChild(btn);
    });

    // total issue number dekhabe 
    totalNumberIssues.innerText = `${allIssues.length} Issues`;
};

// btn click a je function ta ashbe  
const selectBtnCategory = async (categoryStatus, btn)=>{

    showLoading();

    const allTypeBtn = document.querySelectorAll("#btns-container button, #allIssueBtn");
    // console.log(allTypeBtn);

    allTypeBtn.forEach(button =>{
        button.className = "neutral-btn w-[120px] py-2 px-3 border border-[#E4E4E7] rounded-sm";
    })

    // clicked button highlight korte 
    btn.className = "active-btn w-[120px] py-2 px-3 rounded-sm";

    // API fetch 

    // issue er status jodi 'categoryStatus hoy'
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues?status=${categoryStatus}`);
    const data = await res.json();

    console.log(data);
    // display issue function call
    const issues = data.data;
    displayAllIssues(issues);

    // filter issue count hobe 
    totalNumberIssues.innerText = `${issues.length} Issues`;

    hideLoading();
}

//loading spinner related
const loadingSpinner = document.getElementById("loading-spinner");

const showLoading = () => {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    allIssuesContainer.innerHTML = ""; //spinner show, div faka
}

const hideLoading = () => {
    loadingSpinner.classList.remove("flex");
    loadingSpinner.classList.add("hidden");
}

//shob gula issue load korar jonno 
async function loadAllIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const jData = await res.json();

    // shob issue display korar jonno
    displayAllIssues(jData.data);
}

// checkLevels 
const checkLevels = (levels) =>{
    if(levels.length === 0){
        
    }
}


// API label wise load - bug/help-wanted/enhancement
const labels = (labelStatus) => {
    let result = "";

    labelStatus.forEach(label => {

        let badgeClass = "";
        let textClass = "";
        // let bgClass = "";
        let borderClass = "";
        let imgSrc = "";

        if (label === "bug") {
            badgeClass = "text-[#EF4444] bg-[#FEECEC]";
            borderClass = "border-[#EF4444]/30";
            imgSrc = "./assets/bug.png";
        } 
        else if (label === "help wanted") {
            badgeClass = "text-[#D97706] bg-[#FFF8DB]";
            borderClass = "border-[#D97706]/30";
            imgSrc = "./assets/help-wanted.png";
        } 
        else {
            badgeClass = "text-[#00A96E] bg-[#DEFCE8]";
            borderClass = "border-[#00A96E]/30";
            imgSrc = "./assets/enhancement.png";
        }

        result += `
        <div class="py-1.5 px-2 flex items-center text-[12px] rounded-[100px] border ${badgeClass} ${borderClass} gap-1">
            <span>
                <img src="${imgSrc}" class="w-3 h-3 inline-block" alt="">
            </span>
            ${label.toUpperCase()}
        </div>
        `;
    });

    return result;
};


const displayAllIssues = (issues) =>{
    console.log(issues);
    allIssuesContainer.innerHTML ="";

    issues.forEach(issue =>{
        const issueCard = document.createElement("div");

        // priority type er moddhe conditional rendering 
        let priorityTypeClass = "";
        if(issue.priority === "high"){
            priorityTypeClass = "bg-[#FEECEC] text-[#EF4444]";
        }
        else if(issue.priority === "medium"){
            priorityTypeClass = "bg-[#FFF6D1] text-[#F59E0B]"
        }
        else if(issue.priority === "low"){
            priorityTypeClass = "bg-[#EEEFF2] text-[#9CA3AF]"
        }

        issueCard.className = "shadow h-full w-full";
        issueCard.innerHTML = `
            <div class="border-t-[3px] ${issue.status === "open"? "border-t-[#00A96E]" : "border-t-[#A855F7]"} p-4 rounded-sm space-y-4">

                <div class="flex justify-between items-center">

                    <span><img src="${issue.status === "open" ? './assets/open-status.png' : './assets/closed-status.png'}" alt="Status-Image"></span>
                        <span class="rounded-[100px] ${priorityTypeClass} py-1.5 px-[25px]">
                                        ${issue.priority.toUpperCase()}
                        </span>

                </div>

                <div class = "space-y-2">
                    <h3 class="font-semibold text-[14px]">${issue.title}</h3>
                        <p class="text-[#64748B] text-[12px] line-clamp-2">
                            ${issue.description}
                        </p>
                </div>
                <div class="flex flex-wrap justify-start items-center gap-1">
                    ${labels(issue.labels)}
                </div>

            </div>
            <div class="border-t border-[#E4E4E7] p-4 text-[12px] space-y-2 text-[#64748B]">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;
        allIssuesContainer.appendChild(issueCard);
    })
}

// // Total number issue manage 
// function updateTotalNumberIssues(issues){
//     const total = issues.length;

//     const openedIssues = issues.filter(issue => issue.status === "open").length;
//     const closedIssues = issues.filter(issue => issue.status === "closed").length;

//     if(totalNumberIssues)
// }


loadAllIssues();
loadAllButtons();



