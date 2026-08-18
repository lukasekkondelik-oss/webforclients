document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-item__q");
    const a = item.querySelector(".faq-item__a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-item__a").style.maxHeight = null;
          openItem.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
        }
      });
      if (isOpen) {
        item.classList.remove("is-open");
        a.style.maxHeight = null;
        q.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Testimonial carousel ---------- */
  const testimonials = [
    {
      quote: "„Profesionální přístup a schopnost řešit neočekávané problémy. Paní Trefná vždy zachovala chladnou hlavu a byla perfektně připravená. Po této zkušenosti už zůstane naším makléřem.“",
      cite: "— Rodina P. · Prodej rodinného domu, Středočeský kraj",
    },
    {
      quote: "„Lidský přístup, přesné dodržení dohod a kompletní právní servis po celou dobu prodeje.“",
      cite: "— Ing. J. N. · Prodej bytu, Praha",
    },
    {
      quote: "„Vyřešila komplikace s dokumenty a komunikovala za nás s úřady, aniž bychom se museli o cokoliv starat.“",
      cite: "— M. a K. H. · Prodej nemovitosti z dědictví",
    },
    {
      quote: "„Znalost lokality, profesionální prezentace a rychlá komunikace po celou dobu spolupráce.“",
      cite: "— P. Z. · Prodej bytu, Praha",
    },
  ];

  let testimonialIndex = 0;
  const testimonialQuote = document.getElementById("testimonialQuote");
  const testimonialCite = document.getElementById("testimonialCite");
  const testimonialCounter = document.getElementById("testimonialCounter");

  function renderTestimonial() {
    const t = testimonials[testimonialIndex];
    testimonialQuote.textContent = t.quote;
    testimonialCite.textContent = t.cite;
    testimonialCounter.textContent = `${testimonialIndex + 1} / ${testimonials.length}`;
  }

  document.getElementById("testimonialPrev")?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });
  document.getElementById("testimonialNext")?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  });

  /* ---------- Valuation wizard ---------- */
  const wizard = document.getElementById("valuationWizard");
  if (wizard) {
    const steps = Array.from(wizard.querySelectorAll(".wizard__step"));
    const totalSteps = steps.length - 1; // exclude success step
    const stepLabel = document.getElementById("wizardStepLabel");
    const stepName = document.getElementById("wizardStepName");
    const progressBar = document.getElementById("wizardProgressBar");
    const backBtn = document.getElementById("wizardBack");
    const nextBtn = document.getElementById("wizardNext");
    const wizardNav = wizard.querySelector(".wizard__nav");
    const wizardHead = wizard.querySelector(".wizard__head");
    const wizardProgress = wizard.querySelector(".wizard__progress");

    const stepNames = {
      1: "Typ nemovitosti",
      2: "Lokalita",
      3: "Velikost",
      4: "Účel",
      5: "Kontakt",
    };

    const answers = { typ: "", cil: "" };
    let current = 1;

    function showStep(n) {
      steps.forEach((s) => s.classList.remove("is-active"));
      wizard.querySelector(`[data-step="${n}"]`).classList.add("is-active");
      if (n === "success") {
        wizardNav.style.display = "none";
        wizardHead.style.display = "none";
        wizardProgress.style.display = "none";
        return;
      }
      stepLabel.textContent = `Krok ${n} / ${totalSteps}`;
      stepName.textContent = stepNames[n];
      progressBar.style.width = `${(n / totalSteps) * 100}%`;
      backBtn.style.visibility = n === 1 ? "hidden" : "visible";
      nextBtn.textContent = n === totalSteps ? "Odeslat poptávku" : "";
      if (n === totalSteps) {
        nextBtn.innerHTML = 'Odeslat poptávku <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      } else {
        nextBtn.innerHTML = 'Pokračovat <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      }
    }

    wizard.querySelectorAll(".wizard__options").forEach((group) => {
      const key = group.dataset.group;
      group.querySelectorAll(".option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          group.querySelectorAll(".option-btn").forEach((b) => b.classList.remove("is-selected"));
          btn.classList.add("is-selected");
          answers[key] = btn.textContent.trim();
        });
      });
    });

    backBtn.addEventListener("click", () => {
      if (current > 1) {
        current -= 1;
        showStep(current);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (current < totalSteps) {
        current += 1;
        showStep(current);
        return;
      }

      const location = wizard.querySelector("#wLocation").value || "neuvedeno";
      const size = wizard.querySelector("#wSize").value || "neuvedeno";
      const layout = wizard.querySelector("#wLayout").value || "neuvedeno";
      const name = wizard.querySelector("#wName").value || "neuvedeno";
      const contact = wizard.querySelector("#wContact").value || "neuvedeno";

      const body = [
        `Jméno: ${name}`,
        `Kontakt: ${contact}`,
        `Typ nemovitosti: ${answers.typ || "neuvedeno"}`,
        `Lokalita: ${location}`,
        `Velikost: ${size} m²`,
        `Dispozice: ${layout}`,
        `Cíl: ${answers.cil || "neuvedeno"}`,
      ].join("\n");

      const mailto = `mailto:romana@romanareality.cz?subject=${encodeURIComponent(
        "Poptávka: orientační ocenění nemovitosti"
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;

      showStep("success");
    });

    showStep(1);
  }

  /* ---------- Cookie banner ---------- */
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieKey = "romanareality_cookie_choice";

  function openCookieBanner() {
    if (cookieBanner) cookieBanner.hidden = false;
  }

  if (!localStorage.getItem(cookieKey)) {
    openCookieBanner();
  }

  document.getElementById("cookieAccept")?.addEventListener("click", () => {
    localStorage.setItem(cookieKey, "accepted");
    cookieBanner.hidden = true;
  });
  document.getElementById("cookieDecline")?.addEventListener("click", () => {
    localStorage.setItem(cookieKey, "essential-only");
    cookieBanner.hidden = true;
  });
  document.getElementById("cookieSettingsBtn")?.addEventListener("click", openCookieBanner);
});
