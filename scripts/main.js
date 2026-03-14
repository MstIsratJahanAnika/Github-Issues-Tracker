const btnsContainer = document.getElementById("btns-Container");

const allIssuesContainer = document.getElementById("all-issuesContainer")

// shob issues er jonno array 
let allIssues = [];

// get all issues from API
async function loadAllIssues(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data);

    allIssues = data.data;

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
        btn.textContent =status;

        btn.onclick =()=> selectBtnCategory(status, btn);

        btnsContainer.appendChild(btn);
    });
};

// btn click a 
const selectBtnCategory = async (categoryStatus, btn)=>{

    const allTypeBtn = document.querySelectorAll("#btns-Container button, #allIssueBtn");
    // console.log(allTypeBtn);

    allTypeBtn.forEach(button =>{
        button.className = "neutral-btn w-[120px] py-2 px-3 border border-[#E4E4E7] rounded-sm mb-[8px]";
    })

    // clicked button highlight korte 
    btn.className = "active-btn w-[120px] py-2 px-3 rounded-sm";

    // API fetch 
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${categoryStatus}`);
    const data = await res.json();
    console.log(data.data);
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
loadAllIssues();



