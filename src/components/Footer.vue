<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-about">
          <h3>Samsul Huda</h3>
          <p>
            A passionate Frontend Developer & UI Designer dedicated to building
            beautiful and functional web experiences.
          </p>
        </div>
        <div class="footer-social">
          <h3>Follow Me</h3>
          <div class="social-links">
            <a
              href="https://github.com/samsul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/samsul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              href="https://instagram.com/samsul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://dribbble.com/samsul"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dribbble"
            >
              <i class="fab fa-dribbble"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          © {{ new Date().getFullYear() }} Samsul Huda. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>


<style lang="scss" scoped>
@use "sass:color";
$primary: #f05922;
$dark-bg: #000000;
$dark-card: #111827;
$text-primary: #f9fafb;
$text-secondary: #9ca3af;

.site-footer {
  background-color: $dark-card;
  color: $text-secondary;
  padding: 4rem 0 2rem 0;
  border-top: 1px solid color.adjust($dark-card, $lightness: 5%);

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap; // Agar responsif
  }

  .footer-about {
    flex: 2;
    min-width: 250px;
    h3 {
      color: $text-primary;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      line-height: 1.7;
      max-width: 400px;
    }
  }

  .footer-social {
    flex: 1;
    min-width: 200px;
    h3 {
      color: $text-primary;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }

  .social-links {
    display: flex;
    gap: 1.5rem;
    a {
      color: $text-secondary;
      font-size: 1.5rem;
      transition: color 0.3s ease, transform 0.3s ease;
      &:hover {
        color: $primary;
        transform: translateY(-3px);
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid color.adjust($dark-card, $lightness: 5%);
    font-size: 0.9rem;
  }
}
</style>
