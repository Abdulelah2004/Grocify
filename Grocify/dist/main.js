// =================================
// GAMEHUB JAVASCRIPT FILE
// Simple and beginner-friendly code
// =================================

// Wait for the page to load completely before running our code
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 GameHub website loaded successfully!")

  // Initialize all our functions
  initMobileMenu()
  initNavbarScroll() // Add this line
  initSmoothScrolling()
  initActiveNavigation()
  initContactForm()
  initAnimations()
})

// =================================
// MOBILE MENU FUNCTIONALITY
// =================================
function initMobileMenu() {
  // Get the mobile menu elements
  const menuBtn = document.getElementById("menuBtn")
  const closeMenu = document.getElementById("closeMenu")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuPanel = document.getElementById("mobileMenuPanel")
  const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link")

  // Check if elements exist (safety check)
  if (!menuBtn || !closeMenu || !mobileMenu || !mobileMenuPanel) {
    console.log("Mobile menu elements not found")
    return
  }

  // Open mobile menu when hamburger button is clicked
  menuBtn.addEventListener("click", () => {
    console.log("Opening mobile menu")
    mobileMenu.classList.remove("hidden")
    setTimeout(() => {
      mobileMenuPanel.classList.add("slide-in")
    }, 10)
    // Prevent body scrolling when menu is open
    document.body.style.overflow = "hidden"
  })

  // Close mobile menu when X button is clicked
  closeMenu.addEventListener("click", () => {
    console.log("Closing mobile menu")
    mobileMenuPanel.classList.remove("slide-in")
    setTimeout(() => {
      mobileMenu.classList.add("hidden")
    }, 300)
    // Allow body scrolling again
    document.body.style.overflow = "auto"
  })

  // Close mobile menu when any link is clicked
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Mobile menu link clicked, closing menu")
      mobileMenuPanel.classList.remove("slide-in")
      setTimeout(() => {
        mobileMenu.classList.add("hidden")
      }, 300)
      document.body.style.overflow = "auto"
    })
  })

  // Close mobile menu when clicking outside of it
  mobileMenu.addEventListener("click", (e) => {
    // If the clicked element is the background (not the panel)
    if (e.target === mobileMenu) {
      console.log("Clicked outside menu, closing")
      mobileMenuPanel.classList.remove("slide-in")
      setTimeout(() => {
        mobileMenu.classList.add("hidden")
      }, 300)
      document.body.style.overflow = "auto"
    }
  })
}

// =================================
// SMOOTH SCROLLING FOR NAVIGATION
// =================================
function initSmoothScrolling() {
  // Get all navigation links that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]')

  // Add smooth scrolling to each link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent the default jump behavior
      e.preventDefault()

      // Get the target section ID from the link
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      // Check if the target section exists
      if (targetSection) {
        console.log("Scrolling to:", targetId)

        // Smooth scroll to the target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      } else {
        console.log("Target section not found:", targetId)
      }
    })
  })
}

// =================================
// ACTIVE NAVIGATION HIGHLIGHTING
// =================================
function initActiveNavigation() {
  // Get all sections with IDs and navigation links
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('nav a[href^="#"]')

  // Function to update active navigation
  function updateActiveNav() {
    let currentSection = ""

    // Check which section is currently in view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const scrollPosition = window.scrollY

      // If we're in this section (with some offset for better UX)
      if (scrollPosition >= sectionTop - 200) {
        currentSection = section.getAttribute("id")
      }
    })

    // Update navigation links
    navLinks.forEach((link) => {
      // Remove active class from all links
      link.classList.remove("active")

      // Add active class to current section link
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active")
      }
    })
  }

  // Update active navigation on scroll
  window.addEventListener("scroll", updateActiveNav)

  // Update active navigation on page load
  updateActiveNav()
}

// =================================
// CONTACT FORM FUNCTIONALITY
// =================================
function initContactForm() {
  const contactForm = document.getElementById("contactForm")

  // Check if contact form exists
  if (!contactForm) {
    console.log("Contact form not found")
    return
  }

  // Handle form submission
  contactForm.addEventListener("submit", (e) => {
    // Prevent the form from actually submitting (for demo purposes)
    e.preventDefault()

    console.log("Contact form submitted")

    // Get form data
    const formData = new FormData(contactForm)
    const name = contactForm.querySelector('input[type="text"]').value
    const email = contactForm.querySelector('input[type="email"]').value
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value
    const message = contactForm.querySelector("textarea").value

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields!")
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!")
      return
    }

    // Show success message (in a real app, you'd send this to a server)
    alert("Thank you for your message! We'll get back to you soon.")

    // Reset the form
    contactForm.reset()

    console.log("Form data:", {
      name: name,
      email: email,
      subject: subject,
      message: message,
    })
  })
}

// =================================
// SIMPLE ANIMATIONS AND EFFECTS
// =================================
function initAnimations() {
  // Add hover effects to game cards
  const gameCards = document.querySelectorAll(".game-card")

  gameCards.forEach((card) => {
    // Add mouse enter effect
    card.addEventListener("mouseenter", () => {
      console.log("Game card hovered")
      // The CSS handles the visual effects, we just log it
    })
  })

  // Add click effects to buttons
  const buttons = document.querySelectorAll("button, .btn-primary, .btn-secondary")

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Button clicked:", this.textContent)

      // Add a simple click effect
      this.style.transform = "scale(0.95)"

      // Reset the effect after a short delay
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Simple scroll-based animations
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY
    const rate = scrolled * -0.5

    // Parallax effect for hero section (if it exists)
    const heroVisual = document.querySelector(".hero-visual")
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${rate}px)`
    }
  })
}

// =================================
// UTILITY FUNCTIONS
// =================================

// Function to show/hide loading states (for future use)
function showLoading(element) {
  if (element) {
    element.innerHTML = '<i class="bx bx-loader-alt animate-spin"></i> Loading...'
    element.disabled = true
  }
}

function hideLoading(element, originalText) {
  if (element) {
    element.innerHTML = originalText
    element.disabled = false
  }
}

// Function to handle responsive behavior
function handleResize() {
  const width = window.innerWidth

  // Close mobile menu on desktop
  if (width >= 768) {
    const mobileMenu = document.getElementById("mobileMenu")
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
      document.body.style.overflow = "auto"
    }
  }

  console.log("Window resized to:", width + "px")
}

// Listen for window resize
window.addEventListener("resize", handleResize)

// Add navbar scroll effect
function initNavbarScroll() {
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// =================================
// CONSOLE WELCOME MESSAGE
// =================================
console.log(`
🎮 Welcome to GameHub!
===================
This website is built with:
- HTML5 for structure
- Tailwind CSS for styling
- Vanilla JavaScript for functionality

Features:
✅ Fully responsive design
✅ Mobile-friendly navigation
✅ Smooth scrolling
✅ Active navigation highlighting
✅ Contact form validation
✅ Simple animations

Happy gaming! 🎯
`)
