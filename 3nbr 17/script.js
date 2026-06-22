/* =========================
Login System
========================= */

function checkLogin(){

    let pass = document.getElementById("password").value;

    if(pass === "هو ده صوت الكتيبة"){

        localStorage.setItem("access", "granted");

        window.location.href = "3nbr.html";

    } else {

        document.getElementById("error").innerHTML =
        "ACCESS DENIED";

    }

}

/* =========================
   LOADING SYSTEM
========================= */

/*
const loadingMessages = [

    "Initializing 3nbr 17 Database...",

    "Scanning Personnel Files...",

    "Decrypting Memories...",

    "Access Granted.",

    "Welcome, Survivor."

];


let loadingIndex = 0;


const loadingText =
document.getElementById("loading-text");


const loadingScreen =
document.getElementById("loading-screen");



const loadingInterval =
setInterval(()=>{


if (loadingText) {
    loadingText.textContent = loadingMessages[loadingIndex];
}


    loadingIndex++;



    if(loadingIndex >= loadingMessages.length){


        clearInterval(loadingInterval);



        setTimeout(()=>{

            loadingScreen.style.opacity="0";


            setTimeout(()=>{

                loadingScreen.remove();

            },800);


        },1200);


    }



},1200);

*/





/* =========================
   PERSONNEL DATABASE
========================= */


const members = [


{

name:"Mostafa",

nickname:"El Sbaak",

id:"017-004",

rank:"Veteran",

role:"Sleeper",

status:"Legendary Survivor",

badges:[

"Sharmoot Noum",

"Sanay3e"



],


stats:{

Sleep:95,

Negotiation:40,

Discipline:60

},


quote:

"El ASHAM WAKHDK INK THAZR MA'AYA?"


},



{


name:"Nadeem",

nickname:"Farog el 2ela",

id:"017-008",

rank:"Specialist",

role:"Morale Officer",

status:"Security",

badges:[

"Intel Officer",

"Coward",

"security"

],


stats:{

Sleep:80,

Negotiation:90,

Discipline:50

},


quote:

"Blash ya gd3an hntkadar"


},



{


name:"Youssef",

nickname:"El shaz",

id:"017-011",

rank:"Sakaly",

role:"Nashangy",

status:"Sharmoot",

badges:[

"sakaly",

"Tactical Mind"

],


stats:{

Sleep:99,

Negotiation:85,

Discipline:25

},


quote:

"Wallahi Aklmlk toktok yigilk"


},



{


name:"Samuel",

nickname:"Samola",

id:"017-021",

rank:"Sika",

role:"Grar",

status:"Classified",

badges:[

"Sika",

"Sharmoot"

],


stats:{

Sleep:60,

Negotiation:70,

Discipline:25

},


quote:

"Yakiiii"


},

{


name:"7masa",

nickname:"GRAR",

id:"017-019",

rank:"Amn",

role:"Grar",

status:"Classified",

badges:[

"Sika",

"Dealer",

"Grar",

"security"

],


stats:{

Sleep:70,

Negotiation:60,

Discipline:55

},


quote:

"3omry mrf3t me5la"


},

{


name:"Yahia",

nickname:"Sins",

id:"017-020",

rank:"haigan",

role:"Porn lover",

status:"Legend",

badges:[

"telfonat",

"Dealer",

"ornik"

],


stats:{

Sleep:70,

Negotiation:90,

Discipline:55

},


quote:

"m4 3ayez tfok dahrk"


},

{


name:"Hendawy",

nickname:"Zarta",

id:"017-026",

rank:"7 days",

role:"elkhalil comedy",

status:"Classified",

badges:[

"telfonat",

"Daheya",

],


stats:{

Sleep:70,

Negotiation:60,

Discipline:55

},


quote:

"3ndy wa7da sa7bty fe..."


}







];







/* =========================
   RENDER MEMBERS
========================= */


const membersContainer =
document.getElementById(
"members-container"
);



function renderMembers(data){


if (!membersContainer) return;

membersContainer.innerHTML = "";



data.forEach((member,index)=>{


const card =
document.createElement("div");


card.className =
"member-card";



card.innerHTML = `


<div class="profile-image">
🪖
</div>



<h3>

${member.name}
"${member.nickname}"

</h3>



<div class="member-info">


<p>
ID:
${member.id}
</p>


<p>
Rank:
${member.rank}
</p>


<p>
Role:
${member.role}
</p>


<p>
Status:
${member.status}
</p>



</div>



<div class="badges">


${member.badges.map(
badge=>

`
<span class="badge">
${badge}
</span>

`

).join("")}


</div>


`;



card.onclick=()=>{

openProfile(member);

};



membersContainer.appendChild(card);



});


}



renderMembers(members);









/* =========================
   SEARCH MEMBERS
========================= */


const searchInput =
document.getElementById(
"member-search"
);



searchInput.addEventListener(
"input",
()=>{


const value =
searchInput.value
.toLowerCase();



const filtered =
members.filter(member=>{


return (

member.name
.toLowerCase()
.includes(value)


||

member.nickname
.toLowerCase()
.includes(value)


||

member.badges
.join(" ")
.toLowerCase()
.includes(value)


);


});



renderMembers(filtered);



});









/* =========================
   BADGE FILTER
========================= */


const badgeFilter =
document.getElementById(
"badge-filter"
);



badgeFilter.addEventListener(
"change",
()=>{


const value =
badgeFilter.value;



if(value==="all"){

renderMembers(members);

return;

}



const filtered =
members.filter(member=>

member.badges.includes(value)

);



renderMembers(filtered);



});


/* =========================
   PROFILE MODAL
========================= */


const modal =
document.getElementById(
"profile-modal"
);


const profileDetails =
document.getElementById(
"profile-details"
);


const closeModal =
document.getElementById(
"close-modal"
);



function openProfile(member){



profileDetails.innerHTML = `


<h2>
${member.name}
"${member.nickname}"
</h2>



<p>
ID:
${member.id}
</p>


<p>
Rank:
${member.rank}
</p>


<p>
Role:
${member.role}
</p>


<p>
Status:
${member.status}
</p>



<h3>
Badges
</h3>


<div class="badges">


${member.badges.map(b=>

`
<span class="badge gold">
${b}
</span>

`

).join("")}



</div>



<h3>
Performance Analysis
</h3>


${Object.entries(member.stats)
.map(stat=>{


return `


<label>
${stat[0]}
:
${stat[1]}%
</label>


<div class="skill-bar">

<div 
class="skill-fill"
style="
width:${stat[1]}%
">

</div>

</div>


`;


})
.join("")}



<h3>
Famous Quote
</h3>


<p>
"${member.quote}"
</p>


`;



modal.classList.add(
"active"
);


}



closeModal.onclick=()=>{


modal.classList.remove(
"active"
);


};



modal.onclick=(e)=>{


if(e.target===modal){

modal.classList.remove(
"active"
);

}

};









/* =========================
   TACTICAL MAP
========================= */


const locations =
document.querySelectorAll(
".map-location"
);



const mapPopup =
document.getElementById(
"map-popup"
);



locations.forEach(location=>{


location.onclick=()=>{


mapPopup.innerHTML = `


<h3>
${location.innerText}
</h3>


<p>

${location.dataset.info}

</p>


`;



};


});









/* =========================
   DARK MODE TOGGLE
========================= */


const themeButton =
document.getElementById(
"theme-toggle"
);



let tacticalMode=true;



themeButton.onclick=()=>{


tacticalMode =
!tacticalMode;



if(!tacticalMode){


document.body.style.filter =
"brightness(1.25)";


themeButton.innerHTML =
"☀️";


}

else{


document.body.style.filter =
"brightness(1)";


themeButton.innerHTML =
"◐";


}



};









/* =========================
   MOBILE MENU
========================= */


const mobileButton =
document.getElementById(
"mobile-menu"
);


const nav =
document.querySelector(
"nav"
);



mobileButton.onclick=()=>{


nav.classList.toggle(
"active"
);


};









/* =========================
   SCROLL REVEAL
========================= */


const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"reveal"
);


}



});


},
{

threshold:.15

});





document.querySelectorAll(
"section"
)
.forEach(section=>{


observer.observe(section);


});


/* =========================
   VOTING SYSTEM
========================= */


const voteButtons =
document.querySelectorAll(
".vote-card button"
);



let votes =
JSON.parse(
localStorage.getItem("3nbr17Votes")
)
||
{};



voteButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


const category =
button.dataset.category;


const name =
button.dataset.name;



if(!votes[category]){

votes[category]={};

}



if(!votes[category][name]){

votes[category][name]=0;

}



votes[category][name]++;



localStorage.setItem(

"3nbr17Votes",

JSON.stringify(votes)

);



button.innerHTML =
`
${name}
✓ Voted
`;



button.style.background =
"#d4af37";

button.style.color =
"#000";



setTimeout(()=>{


button.innerHTML =
name;


button.style.background =
"";


button.style.color =
"";


},1500);



});


});









/* =========================
   CLASSIFIED RANDOM EVENTS
========================= */


const classifiedMessages = [


"Scanning old memories...",


"Checking tea supply records...",


"Unauthorized sleep detected...",


"Archive integrity: 99%",


"Legendary status confirmed...",


"New survivor discovered..."

];



setInterval(()=>{


const random =

classifiedMessages[
Math.floor(
Math.random() *
classifiedMessages.length
)
];



console.log(
"[3nbr 17 SYSTEM]",
random
);



},5000);









/* =========================
   FAKE TERMINAL EFFECT
========================= */


const terminalTexts=[

"Connecting to Barracks Network",

"Loading Survivor Database",

"Analyzing Legendary Events",

"Decrypting Historical Files"

];



let terminalIndex=0;



setInterval(()=>{


terminalIndex++;



if(
terminalIndex>=terminalTexts.length
){

terminalIndex=0;

}



document.title =
terminalTexts[terminalIndex]
+
" | Hall of 3nbr 17";



},3000);









/* =========================
   CLASSIFIED STAMP ANIMATION
========================= */


document
.querySelectorAll(
".classified"
)
.forEach(stamp=>{


stamp.addEventListener(
"mouseenter",
()=>{


stamp.style.transform =
"rotate(0deg) scale(1.1)";


});



stamp.addEventListener(
"mouseleave",
()=>{


stamp.style.transform =
"rotate(10deg)";


});


});









/* =========================
   RANDOM SYSTEM STATUS
========================= */


const statusMessages=[


"All systems operational",

"Tea reserves monitored",

"Personnel files secured",

"Memory archive stable"

];



function systemCheck(){


const message =

statusMessages[
Math.floor(
Math.random()
*
statusMessages.length
)
];



console.log(
"🛡️ 3nbr17:",
message
);


}



systemCheck();








/* =========================
   ARCHIVE ACCESS BUTTON
========================= */


const enterButton =
document.querySelector(
".primary-btn"
);



if(enterButton){


enterButton.onclick=()=>{


document
.querySelector("#members")
.scrollIntoView({

behavior:"smooth"

});


};


}








/* =========================
   ESCAPE KEY CLOSE MODAL
========================= */


document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape"){


modal.classList.remove(
"active"
);


}


});








/* =========================
   FINAL STARTUP MESSAGE
========================= */


setTimeout(()=>{


console.log(`

================================

  HALL OF 3NBR 17
  DIGITAL ARCHIVE SYSTEM

  STATUS:
  ONLINE

  ACCESS:
  FRIENDS ONLY

  WELCOME SURVIVOR

================================

`);


},3000);