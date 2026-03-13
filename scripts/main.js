// shob issues er jonno array 
let allIssues = [];

// get all issues from API
async function loadAllIssues(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data);
    
    allIssues = data.data;

    allIssues.forEach( state => console.log(state.status));
}
// loadAllIssues();


// button toggle 
const loadBtns = (btns)=>{
    // main container, initialize empty
    const btnsContainer = document.getElementById("btns-Container");
    btnsContainer.innerHTML = "";

    // forEach btn
    btns.forEach(btn => {

        // create elem
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button id="load-btn-${btn.status}" class="text-[#64748B] w-[120px] py-2 px-3 border border-[#E4E4E7] rounded-sm" onclick="loadTypesIssues('${btn.status}')">${btn.status}</button>`;

        // appendChild in parent
        btnsContainer.appendChild(btnDiv);
        console.log(btnDiv);
    });
}
loadAllIssues();


// btn type wise issue load
const loadTypesIssues = (id)=> {
    // console.log(id);

    async function levelData() {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const Data = await res.json();
        
        const btnClick = document.getElementById(`load-btn-${id}`);
        btnClick.classList.add("active-btn");

        displayTypesIssues(Data.data)
    };

    levelData();
};

// btn type wise issue display
const displayTypesIssues = (issues)=>{

}


