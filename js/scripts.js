

// Navbar on mobile
let elements = document.querySelectorAll(".navbar-nav .nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", () => {
		document.querySelector(".offcanvas-collapse").classList.toggle("open");
	});
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  	document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
	const _d = e.target.closest(".dropdown");
	let _m = document.querySelector(".dropdown-menu", _d);

	setTimeout(
		function () {
		const shouldOpen = _d.matches(":hover");
		_m.classList.toggle("show", shouldOpen);
		_d.classList.toggle("show", shouldOpen);

		_d.setAttribute("aria-expanded", shouldOpen);
		},
		e.type === "mouseleave" ? 300 : 0
	);
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) { 
	document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
	document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

	// On click
	document.querySelector(".dropdown").addEventListener("click", (e) => {
		const _d = e.target.closest(".dropdown");
		let _m = document.querySelector(".dropdown-menu", _d);
		if (_d.classList.contains("show")) {
			_m.classList.remove("show");
			_d.classList.remove("show");
		} else {
			_m.classList.add("show");
			_d.classList.add("show");
		}
	});
}


/* Rotating Text - ReplaceMe */
var checkReplace = document.querySelector('.replace-me');
if (checkReplace !== null) { 
	var replace = new ReplaceMe(document.querySelector('.replace-me'), {
		animation: 'animated fadeIn', // Animation class or classes
		speed: 2000, // Delay between each phrase in miliseconds
		separator: ',', // Phrases separator
		hoverStop: false, // Stop rotator on phrase hover
		clickChange: false, // Change phrase on click
		loopCount: 'infinite', // Loop Count - 'infinite' or number
		autoRun: true, // Run rotator automatically
		onInit: false, // Function
		onChange: false, // Function
		onComplete: false // Function
	});
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
	  event.preventDefault();
	  document.querySelector('.gamesearchButton[type="submit"]').click();
	}
  });

/* Video Modal */
var videoBtn = document.querySelector('.video-btn')
var videoModal = document.getElementById('videoModal')
var video = document.getElementById('video')
var videoSrc

var checkVideoSrc = document.querySelector('.video-btn');
if (checkVideoSrc !== null) { 
	videoBtn.addEventListener('click',function(e){
		videoSrc = videoBtn.getAttribute('data-bs-src')
	})
}

var checkVideoModal = document.getElementById('videoModal');
if (checkVideoModal !== null) { 
	videoModal.addEventListener('shown.bs.modal',(e)=>{
		video.setAttribute('src', videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0')
	})

	videoModal.addEventListener('hide.bs.modal',(e)=>{
		video.setAttribute('src', videoSrc)
	})
}


