// get all issues from API
async function loadAllIssues(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data);
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
        btnDiv.innerHTML = `<button id="load-btn-${btn.status}" class="text-[#64748B] w-[120px] py-2 px-3 border border-[#E4E4E7] rounded-sm" onclick="loadIssues(${btn.status})">${btn.status}</button>`;

        // appendChild in parent
        btnsContainer.appendChild(btnDiv);
        console.log(btnDiv);
    });
}
loadAllIssues();