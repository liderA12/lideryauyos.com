const url_root = document.getElementById("top").dataset.root;

document.querySelector(".hamburger").addEventListener("click", function(e) {
    e.preventDefault();
    
    let hamburger = document.querySelector(".hamburger");
    let navMenu = document.querySelector(".nav-menu");
    
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
});

const modales = document.querySelectorAll(".open-modal");
modales.forEach(function(modal) {
    
    modal.addEventListener("click", function(e) {
        e.preventDefault();
        const tipo = modal.dataset.page;    
        const overlay =  document.getElementById(tipo);
        const contentModal = overlay.closest(".modalAmura");
        contentModal.style.display = "block";
        overlay.classList.add("open");
    });    
});

document.querySelectorAll(".close-modal").forEach(function(clo) {
    clo.addEventListener("click", function(e) {
        e.preventDefault();
        clo.closest('.overlay-registro').classList.remove("open");
    });    
});



const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const swiper = new Swiper('.slider-uno', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    /*
    navigation: {
      nextEl: ".slider-uno-next",
      prevEl: ".slider-uno-prev",
    }
    */
    autoplay: {
        delay: 5000,
        disableOnInteraction: true
    },    
    pagination: {
        el: ".swiper-pagination",
      },
    on: {
        autoplayTimeLeft(s, time, progress) {
            if(progressCircle){
                progressCircle.style.setProperty("--progress", 1 - progress);
                progressContent.textContent = `${Math.ceil(time / 1000)}s`;                
            }          
        }
    }
});

function scrollReveal() {
    const revealPoint = 10;
    const revealElement = document.querySelectorAll('.animated');
    for (let i = 0; i < revealElement.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = revealElement[i].getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            revealElement[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', scrollReveal);

function scrollToSection(event) {
    event.preventDefault();
    let sectionId = this.getAttribute('href').substring(1);
    let section = document.getElementById(sectionId);
    let offsetTop = section.offsetTop - 90;
    
    window.scroll({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Para agregar el event listener a los elementos que desees
var links = document.querySelectorAll('a[href^="#"]');
links.forEach(function(link) {
    if (!link.classList.contains('noscroll')) {
        link.addEventListener('click', scrollToSection);    
    }    
    
});

//radio  
const stream_audio = document.getElementById("stream_audio");
const stream_src = stream_audio.src;

let stream_sound = false;    

const radios = document.querySelectorAll(".bt-play");
radios.forEach(function(radio) {
    radio.addEventListener('click', async e =>{
        e.preventDefault();
        radios.forEach(function(r) {r.classList.toggle('active');});
        if(stream_sound!==false){
            
            stream_audio.pause();
            stream_audio.src = "";
            stream_sound = false; 
        }else{
            await radioContent();
            stream_audio.src = stream_src;
            stream_audio.play();
            stream_sound = true;            
        }
    });
});

const radioContent = async () => {
    const send = await fetch(`${url_root}process/radio`,{
        method: "GET"
    });
    const response = await send.json();
    if(response.state==2){
        
        let caratulas = document.querySelectorAll(".rp .thumb");
        caratulas.forEach(function(caratula) {
            if(caratula==null){
                return ;
            }
            if(caratula.querySelector("source")){
                caratula.querySelector("source").srcset = unescape(response.image);    
            }        
            caratula.querySelector("img").src = unescape(response.image);
        });
        document.querySelectorAll(".nameprog").forEach(function(prog) {
            prog.innerHTML = unescape(response.data);
        });
    }	    
};  



/**** STIKY  FUNCTION ****/
const element = 300;
window.addEventListener("scroll", function() {
    var y = window.pageYOffset;
    
    if (y >= element) {
        document.querySelector(".header").classList.add("stiky");
        document.querySelector(".main").classList.add("stk");
    } else if (y < element) {
        document.querySelector(".header").classList.remove("stiky");
        document.querySelector(".main").classList.remove("stk");
    }
});