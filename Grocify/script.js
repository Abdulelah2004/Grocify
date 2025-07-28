// ========================================
// GROCIFY ADVANCED JAVASCRIPT
// Mobile-first, responsive, feature-rich
// ========================================

class GrocifyApp {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("grocify-cart")) || []
    this.products = []
    this.isLoading = false
    this.currentSection = "home"

    this.init()
  }

  // Initialize the application
  init() {
    this.showLoadingScreen()
    this.setupEventListeners()
    this.loadProducts()
    this.updateCartUI()
    this.initIntersectionObserver()
    this.initSmoothScrolling()
    this.hideLoadingScreen()

    console.log("🛒 Grocify App initialized successfully!")
  }

  // ========================================
  // LOADING AND UI MANAGEMENT
  // ========================================

  showLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.style.opacity = "0"
        setTimeout(() => {
          loadingScreen.style.display = "none"
        }, 500)
      }, 1500)
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      loadingScreen.style.display = "none"
    }
  }

  // ========================================
  // EVENT LISTENERS SETUP
  // ========================================

  setupEventListeners() {
    // Mobile menu
    this.setupMobileMenu()

    // Cart functionality
    this.setupCart()

    // Navigation
    this.setupNavigation()

    // Forms
    this.setupForms()

    // Buttons
    this.setupButtons()

    // Window events
    this.setupWindowEvents()

    // Touch events for mobile
    this.setupTouchEvents()
  }

  setupMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
    const mobileMenu = document.getElementById("mobileMenu")
    const closeMobileMenu = document.getElementById("closeMobileMenu")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

    if (mobileMenuToggle && mobileMenuOverlay && mobileMenu) {
      mobileMenuToggle.addEventListener("click", () => {
        this.openMobileMenu()
      })

      closeMobileMenu?.addEventListener("click", () => {
        this.closeMobileMenu()
      })

      mobileMenuOverlay.addEventListener("click", (e) => {
        if (e.target === mobileMenuOverlay) {
          this.closeMobileMenu()
        }
      })

      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu()
        })
      })
    }
  }

  setupCart() {
    const cartToggle = document.getElementById("cartToggle")
    const cartSidebar = document.getElementById("cartSidebar")
    const closeCart = document.getElementById("closeCart")
    const checkoutBtn = document.getElementById("checkoutBtn")

    cartToggle?.addEventListener("click", () => {
      this.toggleCart()
    })

    closeCart?.addEventListener("click", () => {
      this.closeCart()
    })

    checkoutBtn?.addEventListener("click", () => {
      this.checkout()
    })
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = link.getAttribute("href")
        if (target.startsWith("#")) {
          this.scrollToSection(target)
        }
      })
    })

    // Back to top button
    const backToTop = document.getElementById("backToTop")
    backToTop?.addEventListener("click", () => {
      this.scrollToTop()
    })
  }

  setupForms() {
    // Contact form
    const contactForm = document.getElementById("contactForm")
    contactForm?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleContactForm(e)
    })

    // Newsletter form
    const newsletterForm = document.getElementById("newsletterForm")
    newsletterForm?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleNewsletterForm(e)
    })
  }

  setupButtons() {
    // Order now button
    const orderNowBtn = document.querySelector(".order-now-btn")
    orderNowBtn?.addEventListener("click", () => {
      this.scrollToSection("#products")
      this.showToast("Browse our products below!", "info")
    })

    // Learn more button
    const learnMoreBtn = document.querySelector(".learn-more-btn")
    learnMoreBtn?.addEventListener("click", () => {
      this.scrollToSection("#features")
    })

    // View all products button
    const viewAllBtn = document.querySelector(".view-all-btn")
    viewAllBtn?.addEventListener("click", () => {
      this.loadMoreProducts()
    })

    // App store buttons
    const appStoreBtn = document.querySelector(".app-store-btn")
    const playStoreBtn = document.querySelector(".play-store-btn")

    appStoreBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showToast("App Store download coming soon!", "info")
    })

    playStoreBtn?.addEventListener("click", (e) => {
      e.preventDefault()
      this.showToast("Google Play download coming soon!", "info")
    })
  }

  setupWindowEvents() {
    // Scroll events
    window.addEventListener(
      "scroll",
      this.throttle(() => {
        this.handleScroll()
      }, 100),
    )

    // Resize events
    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize()
      }, 250),
    )

    // Online/offline events
    window.addEventListener("online", () => {
      this.showToast("Connection restored!", "success")
    })

    window.addEventListener("offline", () => {
      this.showToast("You are offline", "error")
    })
  }

  setupTouchEvents() {
    // Add touch support for mobile interactions
    let touchStartX = 0
    let touchStartY = 0

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    })

    document.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY

      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY

      // Swipe gestures
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe right - close mobile menu or cart
          this.closeMobileMenu()
          this.closeCart()
        } else {
          // Swipe left - could open cart
          // this.toggleCart();
        }
      }
    })
  }

  // ========================================
  // MOBILE MENU FUNCTIONALITY
  // ========================================

  openMobileMenu() {
    const overlay = document.getElementById("mobileMenuOverlay")
    const menu = document.getElementById("mobileMenu")

    if (overlay && menu) {
      overlay.classList.remove("hidden")
      setTimeout(() => {
        menu.classList.add("mobile-menu-slide-in")
      }, 10)

      document.body.style.overflow = "hidden"
    }
  }

  closeMobileMenu() {
    const overlay = document.getElementById("mobileMenuOverlay")
    const menu = document.getElementById("mobileMenu")

    if (overlay && menu) {
      menu.classList.remove("mobile-menu-slide-in")
      setTimeout(() => {
        overlay.classList.add("hidden")
        document.body.style.overflow = ""
      }, 300)
    }
  }

  // ========================================
  // CART FUNCTIONALITY
  // ========================================

  toggleCart() {
    const cartSidebar = document.getElementById("cartSidebar")
    if (cartSidebar) {
      const isOpen = cartSidebar.classList.contains("cart-slide-in")
      if (isOpen) {
        this.closeCart()
      } else {
        this.openCart()
      }
    }
  }

  openCart() {
    const cartSidebar = document.getElementById("cartSidebar")
    if (cartSidebar) {
      cartSidebar.classList.add("cart-slide-in")
      document.body.style.overflow = "hidden"
    }
  }

  closeCart() {
    const cartSidebar = document.getElementById("cartSidebar")
    if (cartSidebar) {
      cartSidebar.classList.remove("cart-slide-in")
      document.body.style.overflow = ""
    }
  }

  addToCart(product) {
    const existingItem = this.cart.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      })
    }

    this.saveCart()
    this.updateCartUI()
    this.showToast(`${product.name} added to cart!`, "success")

    // Add visual feedback
    this.animateCartIcon()
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId)
    this.saveCart()
    this.updateCartUI()
    this.showToast("Item removed from cart", "info")
  }

  updateCartQuantity(productId, quantity) {
    const item = this.cart.find((item) => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId)
      } else {
        item.quantity = quantity
        this.saveCart()
        this.updateCartUI()
      }
    }
  }

  updateCartUI() {
    const cartCount = document.getElementById("cartCount")
    const cartItems = document.getElementById("cartItems")
    const cartTotal = document.getElementById("cartTotal")

    // Update cart count
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
    if (cartCount) {
      cartCount.textContent = totalItems
      cartCount.classList.toggle("hidden", totalItems === 0)
    }

    // Update cart items
    if (cartItems) {
      if (this.cart.length === 0) {
        cartItems.innerHTML = `
                    <div class="text-center py-8">
                        <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Your cart is empty</p>
                    </div>
                `
      } else {
        cartItems.innerHTML = this.cart
          .map(
            (item) => `
                    <div class="flex items-center justify-between py-4 border-b">
                        <div class="flex items-center">
                            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                            <div class="ml-3">
                                <h4 class="font-medium text-sm">${item.name}</h4>
                                <p class="text-yellow-500 font-bold">$${item.price}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button onclick="window.grocifyApp.updateCartQuantity('${item.id}', ${item.quantity - 1})" 
                                    class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <i class="fas fa-minus text-xs"></i>
                            </button>
                            <span class="w-8 text-center">${item.quantity}</span>
                            <button onclick="window.grocifyApp.updateCartQuantity('${item.id}', ${item.quantity + 1})" 
                                    class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                        </div>
                    </div>
                `,
          )
          .join("")
      }
    }

    // Update cart total
    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    if (cartTotal) {
      cartTotal.textContent = `$${total.toFixed(2)}`
    }
  }

  saveCart() {
    localStorage.setItem("grocify-cart", JSON.stringify(this.cart))
  }

  checkout() {
    if (this.cart.length === 0) {
      this.showToast("Your cart is empty!", "error")
      return
    }

    // Simulate checkout process
    this.showToast("Processing your order...", "info")

    setTimeout(() => {
      this.cart = []
      this.saveCart()
      this.updateCartUI()
      this.closeCart()
      this.showToast("Order placed successfully! Delivery in 15 minutes.", "success")
    }, 2000)
  }

  animateCartIcon() {
    const cartToggle = document.getElementById("cartToggle")
    if (cartToggle) {
      cartToggle.classList.add("animate-bounce")
      setTimeout(() => {
        cartToggle.classList.remove("animate-bounce")
      }, 1000)
    }
  }

  // ========================================
  // PRODUCTS MANAGEMENT
  // ========================================

  loadProducts() {
    this.products = [
      {
        id: "1",
        name: "Fresh Apples",
        price: 2.99,
        image: "/placeholder.svg?height=150&width=150&text=Fresh+Apples",
        category: "fruits",
      },
      {
        id: "2",
        name: "Organic Milk",
        price: 4.49,
        image: "/placeholder.svg?height=150&width=150&text=Organic+Milk",
        category: "dairy",
      },
      {
        id: "3",
        name: "Fresh Bread",
        price: 3.99,
        image: "/placeholder.svg?height=150&width=150&text=Fresh+Bread",
        category: "bakery",
      },
      {
        id: "4",
        name: "Organic Eggs",
        price: 5.29,
        image: "/placeholder.svg?height=150&width=150&text=Organic+Eggs",
        category: "dairy",
      },
      {
        id: "5",
        name: "Fresh Bananas",
        price: 1.99,
        image: "/placeholder.svg?height=150&width=150&text=Fresh+Bananas",
        category: "fruits",
      },
      {
        id: "6",
        name: "Greek Yogurt",
        price: 3.79,
        image: "/placeholder.svg?height=150&width=150&text=Greek+Yogurt",
        category: "dairy",
      },
      {
        id: "7",
        name: "Chicken Breast",
        price: 8.99,
        image: "/placeholder.svg?height=150&width=150&text=Chicken+Breast",
        category: "meat",
      },
      {
        id: "8",
        name: "Fresh Spinach",
        price: 2.49,
        image: "/placeholder.svg?height=150&width=150&text=Fresh+Spinach",
        category: "vegetables",
      },
    ]

    this.renderProducts()
  }

  renderProducts() {
    const productsGrid = document.getElementById("productsGrid")
    if (productsGrid) {
      productsGrid.innerHTML = this.products
        .map(
          (product) => `
                <div class="product-card bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover rounded-lg mb-3">
                    <h3 class="font-semibold text-gray-900 mb-1">${product.name}</h3>
                    <p class="text-yellow-500 font-bold text-lg mb-3">$${product.price}</p>
                    <button onclick="window.grocifyApp.addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})" 
                            class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors">
                        <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                    </button>
                </div>
            `,
        )
        .join("")
    }
  }

  loadMoreProducts() {
    // Simulate loading more products
    this.showToast("Loading more products...", "info")

    setTimeout(() => {
      const moreProducts = [
        {
          id: "9",
          name: "Avocados",
          price: 3.99,
          image: "/placeholder.svg?height=150&width=150&text=Avocados",
          category: "fruits",
        },
        {
          id: "10",
          name: "Salmon Fillet",
          price: 12.99,
          image: "/placeholder.svg?height=150&width=150&text=Salmon+Fillet",
          category: "seafood",
        },
      ]

      this.products = [...this.products, ...moreProducts]
      this.renderProducts()
      this.showToast("More products loaded!", "success")
    }, 1000)
  }

  // ========================================
  // NAVIGATION AND SCROLLING
  // ========================================

  scrollToSection(target) {
    const element = document.querySelector(target)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  initSmoothScrolling() {
    // Enhanced smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = anchor.getAttribute("href")
        this.scrollToSection(target)
      })
    })
  }

  initIntersectionObserver() {
    // Observe sections for navigation highlighting
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.currentSection = entry.target.id

            // Update navigation
            navLinks.forEach((link) => {
              link.classList.remove("active")
              if (link.getAttribute("href") === `#${entry.target.id}`) {
                link.classList.add("active")
              }
            })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-80px 0px -80px 0px",
      },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    // Animate stats when they come into view
    const statItems = document.querySelectorAll(".stat-item")
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target)
          statsObserver.unobserve(entry.target)
        }
      })
    })

    statItems.forEach((item) => {
      statsObserver.observe(item)
    })
  }

  animateCounter(element) {
    const target = Number.parseInt(element.dataset.target)
    const counter = element.querySelector("h3")
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        counter.textContent = target.toLocaleString()
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current).toLocaleString()
      }
    }, 16)
  }

  // ========================================
  // FORM HANDLING
  // ========================================

  handleContactForm(e) {
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    // Validate form
    if (!data.name || !data.email || !data.subject || !data.message) {
      this.showToast("Please fill in all fields", "error")
      return
    }

    if (!this.isValidEmail(data.email)) {
      this.showToast("Please enter a valid email address", "error")
      return
    }

    // Simulate form submission
    this.showToast("Sending message...", "info")

    setTimeout(() => {
      this.showToast("Message sent successfully! We'll get back to you soon.", "success")
      e.target.reset()
    }, 2000)
  }

  handleNewsletterForm(e) {
    const formData = new FormData(e.target)
    const email = formData.get("email")

    if (!email || !this.isValidEmail(email)) {
      this.showToast("Please enter a valid email address", "error")
      return
    }

    this.showToast("Subscribing...", "info")

    setTimeout(() => {
      this.showToast("Successfully subscribed to newsletter!", "success")
      e.target.reset()
    }, 1500)
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // ========================================
  // SCROLL AND RESIZE HANDLERS
  // ========================================

  handleScroll() {
    const scrollTop = window.pageYOffset
    const backToTop = document.getElementById("backToTop")

    // Show/hide back to top button
    if (backToTop) {
      if (scrollTop > 500) {
        backToTop.classList.remove("opacity-0", "invisible")
        backToTop.classList.add("opacity-100", "visible")
      } else {
        backToTop.classList.add("opacity-0", "invisible")
        backToTop.classList.remove("opacity-100", "visible")
      }
    }

    // Parallax effect for hero section
    const heroSection = document.getElementById("home")
    if (heroSection && scrollTop < window.innerHeight) {
      heroSection.style.transform = `translateY(${scrollTop * 0.5}px)`
    }
  }

  handleResize() {
    const width = window.innerWidth

    // Close mobile menu on desktop
    if (width >= 1024) {
      this.closeMobileMenu()
    }

    // Adjust cart sidebar width on mobile
    const cartSidebar = document.getElementById("cartSidebar")
    if (cartSidebar) {
      if (width < 480) {
        cartSidebar.style.width = "100vw"
      } else {
        cartSidebar.style.width = "320px"
      }
    }
  }

  // ========================================
  // TOAST NOTIFICATIONS
  // ========================================

  showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastContainer")
    if (!toastContainer) return

    const toast = document.createElement("div")
    toast.className = `toast ${type}`

    const icon = this.getToastIcon(type)

    toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${icon} mr-3 text-lg"></i>
                <span class="flex-1">${message}</span>
                <button class="ml-3 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `

    toastContainer.appendChild(toast)

    // Show toast
    setTimeout(() => {
      toast.classList.add("show")
    }, 100)

    // Auto remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        toast.remove()
      }, 300)
    }, 5000)
  }

  getToastIcon(type) {
    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      info: "fa-info-circle",
      warning: "fa-exclamation-triangle",
    }
    return icons[type] || icons.info
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // ========================================
  // PERFORMANCE MONITORING
  // ========================================

  logPerformance() {
    if ("performance" in window) {
      const navigation = performance.getEntriesByType("navigation")[0]
      console.log("🚀 Page Load Performance:")
      console.log(
        `DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`,
      )
      console.log(`Page Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`)
    }
  }

  // ========================================
  // ACCESSIBILITY FEATURES
  // ========================================

  initAccessibility() {
    // Add skip link
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.className = "skip-link"
    skipLink.textContent = "Skip to main content"
    document.body.insertBefore(skipLink, document.body.firstChild)

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMobileMenu()
        this.closeCart()
      }
    })

    // Focus management
    this.manageFocus()
  }

  manageFocus() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    // Trap focus in mobile menu when open
    const mobileMenu = document.getElementById("mobileMenu")
    if (mobileMenu) {
      mobileMenu.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          const focusable = mobileMenu.querySelectorAll(focusableElements)
          const firstFocusable = focusable[0]
          const lastFocusable = focusable[focusable.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus()
              e.preventDefault()
            }
          }
        }
      })
    }
  }
}

// ========================================
// INITIALIZE APPLICATION
// ========================================

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Create global instance
  const grocifyApp = new GrocifyApp()
  window.grocifyApp = grocifyApp

  // Log performance after everything loads
  window.addEventListener("load", () => {
    grocifyApp.logPerformance()
    grocifyApp.initAccessibility()
  })
})

// ========================================
// SERVICE WORKER REGISTRATION
// ========================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

console.log(`
🛒 Welcome to Grocify!
=====================

🚀 Features:
✅ Mobile-first responsive design
✅ Advanced cart functionality
✅ Smooth scrolling & animations
✅ Touch gesture support
✅ Offline capability
✅ Performance optimized
✅ Accessibility compliant
✅ Local storage integration

📱 Responsive Breakpoints:
• Mobile: < 640px
• Tablet: 640px - 1024px  
• Desktop: > 1024px

🎯 Current Section: ${window.grocifyApp?.currentSection || "home"}

Happy shopping! 🛍️
`)
