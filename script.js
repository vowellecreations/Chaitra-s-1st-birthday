const $ = (id) => document.getElementById(id);
const welcomeScreen = $("welcomeScreen");
const invitation = $("invitation");
const toast = $("toast");
const backgroundMusic = $("backgroundMusic");
const musicToggle = $("musicToggle");
let toastTimer;
let musicWasPausedByVisibility = false;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function updateMusicButton(isPlaying) {
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.title = isPlaying ? "Pause background music" : "Play background music";
  musicToggle.innerHTML = isPlaying ? '♫ <span>Sound on</span>' : '♫ <span>Sound off</span>';
}

async function playBackgroundMusic(showError = false) {
  try {
    backgroundMusic.volume = 0.38;
    await backgroundMusic.play();
    updateMusicButton(true);
    return true;
  } catch (error) {
    updateMusicButton(false);
    if (showError) showToast("Tap Sound off to try playing the music.");
    return false;
  }
}

function pauseBackgroundMusic() {
  backgroundMusic.pause();
  updateMusicButton(false);
}

$("openInvitation").addEventListener("click", () => {
  // Start playback directly from the user's click to comply with browser autoplay rules.
  playBackgroundMusic(true);
  welcomeScreen.classList.add("leaving");
  welcomeScreen.style.transition = "opacity .5s ease, transform .5s ease";
  welcomeScreen.style.opacity = "0";
  welcomeScreen.style.transform = "scale(.98)";
  setTimeout(() => {
    welcomeScreen.hidden = true;
    invitation.hidden = false;
    document.body.classList.add("invitation-open");
    window.scrollTo({ top: 0, behavior: "instant" });
    setupReveals();
    updateCountdown();
  }, 450);
});

const eventDate = new Date("2027-12-01T19:00:00+05:30");
function updateCountdown() {
  const diff = eventDate.getTime() - Date.now();
  if (diff <= 0) {
    $("days").textContent = "000";
    $("hours").textContent = "00";
    $("minutes").textContent = "00";
    $("seconds").textContent = "00";
    document.querySelector(".countdown-note").textContent = "It's Chaitra's special day! Let the celebration begin!";
    return;
  }
  const seconds = Math.floor(diff / 1000);
  $("days").textContent = String(Math.floor(seconds / 86400)).padStart(3, "0");
  $("hours").textContent = String(Math.floor((seconds % 86400) / 3600)).padStart(2, "0");
  $("minutes").textContent = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  $("seconds").textContent = String(seconds % 60).padStart(2, "0");
}
setInterval(() => { if (!invitation.hidden) updateCountdown(); }, 1000);

function setupReveals() {
  const elements = document.querySelectorAll(".countdown-section, .details-content, .details-art, .little-moments, .family-gallery, .closing-section");
  elements.forEach(el => el.classList.add("reveal"));
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}

$("calendarButton").addEventListener("click", () => {
  // User-provided event time: 7:00 PM IST.
  const start = new Date("2027-12-01T19:00:00+05:30");
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Vowelle//Chaitra Birthday//EN",
    "CALSCALE:GREGORIAN","BEGIN:VEVENT",
    "UID:chaitra-first-birthday-vowelle",
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,
    "SUMMARY:Chaitra's First Birthday",
    "LOCATION:Daspalla, Jubilee Hills, Hyderabad",
    "DESCRIPTION:Celebrate Chaitra's first birthday with Vowelle.",
    "END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "Chaitra-First-Birthday.ics";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  showToast("Calendar file downloaded.");
});

$("shareButton").addEventListener("click", async () => {
  const pageUrl = window.location.href.split("#")[0];
  const shareTitle = "Chaitra's 1st Birthday | You're Invited! 🐬🎂";
  const shareText = "🐬 You're invited to celebrate Chaitra's 1st Birthday! 🎂\n\n📅 Date: Wednesday, 1 December 2027 at 7:00 PM\n📍 Venue: Daspalla, Jubilee Hills, Hyderabad\n\n💌 Open the invitation here:\n" + pageUrl;

  const shareData = {
    title: shareTitle,
    text: "🐬 You're invited to celebrate Chaitra's 1st Birthday! 🎂\n📅 Wednesday, 1 December 2027 at 7:00 PM\n📍 Daspalla, Jubilee Hills, Hyderabad",
    url: pageUrl
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== "AbortError") {
        // Fallback directly to WhatsApp
        const waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);
        window.open(waUrl, "_blank");
      }
    }
  } else if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(shareText);
      showToast("Invitation & link copied! Opening WhatsApp...");
      setTimeout(() => {
        const waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);
        window.open(waUrl, "_blank");
      }, 700);
    } catch {
      const waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);
      window.open(waUrl, "_blank");
    }
  } else {
    const waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);
    window.open(waUrl, "_blank");
  }
});

musicToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    await playBackgroundMusic(true);
  } else {
    pauseBackgroundMusic();
  }
});

// Pause when the visitor switches tabs or apps; do not restart without another user action.
document.addEventListener("visibilitychange", () => {
  if (document.hidden && !backgroundMusic.paused) {
    musicWasPausedByVisibility = true;
    pauseBackgroundMusic();
  } else if (!document.hidden && musicWasPausedByVisibility) {
    musicWasPausedByVisibility = false;
    showToast("Music is paused. Tap Sound off to resume.");
  }
});

backgroundMusic.addEventListener("play", () => updateMusicButton(true));
backgroundMusic.addEventListener("pause", () => updateMusicButton(false));

// The birthday photo is stored at assets/chaitra-photo.jpg.
console.info("Vowelle birthday invitation loaded with background music.");
