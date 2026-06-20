
window.addEventListener("scroll", () => {
    document.querySelector("header")?.classList.toggle("scrolled", window.scrollY > 50);
});






const burger = document.querySelector(".burger-menu");
const nav = document.querySelector("nav");

if (burger && nav) {
    // ბურგერზე კლიკი - მენიუს გახსნა/დაკეტვა
    burger.onclick = () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    };
    
   
    nav.querySelectorAll("a").forEach(link => {
        link.onclick = () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        };
    });
    
  
    document.onclick = (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    };
}









const spellsContainer = document.getElementById('spells-grid');

if (spellsContainer) {
    async function getSpells() {
        try {
            
            const response = await fetch('https://potterhead-api.vercel.app/api/spells');
            
        
            if (!response.ok) {
                throw new Error('Server Error');
            }
            
            const data = await response.json();
            spellsContainer.innerHTML = '';
         
            data.slice(0, 15).forEach((spell, index) => {
                const spellRow = document.createElement('div');
                spellRow.className = 'spell-row';
                spellRow.style.animationDelay = `${index * 0.05}s`;
                
                spellRow.innerHTML = `
                    <div class="spell-info">
                        <span class="spell-name">${spell.name}</span>
                        <span class="spell-desc">${spell.description}</span>
                    </div>
                `;
                spellsContainer.appendChild(spellRow);
            });
        } catch(error) {
           
            spellsContainer.innerHTML = '<p class="error">The magic failed. Try again.</p>';
        }
    }
    getSpells();
}















const owlForm = document.querySelector('.owl-form');

if (owlForm) {
    owlForm.addEventListener('submit', (e) => {
        const nameInput = owlForm.querySelector('input[type="text"]');
        const emailInput = owlForm.querySelector('input[type="email"]');
        const messageInput = owlForm.querySelector('textarea');
        
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       
        if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
            e.preventDefault(); //
            alert("Please fill in all fields before sending the owl! 🦉");
            return;
        }

      
        if (!emailRegex.test(emailInput.value.trim())) {
            e.preventDefault(); 
            alert("Please enter a valid email address!");
            return;
        }

        alert("Your message has been successfully sent via Owl Post! ✉️");
    });
}









function setCustomCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}


function getCustomCookie(name) {
    const cName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(cName) == 0) {
            return cookie.substring(cName.length, cookie.length);
        }
    }
    return "";
}














document.addEventListener("DOMContentLoaded", () => {
    
    if (getCustomCookie("hogwartsCookies") !== "accepted") {
       
        const banner = document.createElement("div");
        banner.className = "cookie-banner";
        banner.innerHTML = `
            <p>This castle uses magical cookies to enhance your experience. 🍪</p>
            <button id="accept-magic-cookies" class="glass-button" style="margin-top:0; padding:8px 15px; opacity:1; animation:none;">Accept</button>
        `;
        document.body.appendChild(banner);

        
        document.getElementById("accept-magic-cookies").onclick = () => {
            setCustomCookie("hogwartsCookies", "accepted", 30); 
            banner.remove(); 
        };
    }
});

