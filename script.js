// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark-theme' : '');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        header.style.padding = '15px 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '20px 0';
    }
});

// // Form submission
// const contactForm = document.querySelector('.contact-form form');
// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         alert('Thank you for your message! I will get back to you soon.');
//         contactForm.reset();
//     });
// }

// UPDATE //

const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    const botToken = '7781813957:AAFsAf3HuQUU9rqM4UeNObgrWUMrQdiIpJY';
    const chatId = '5131828940';

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        // Debugging log
        console.log("Form Values:", { name, email, subject, message });

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        const telegramMessage = `
New Contact Form Submission:
👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject || "(No Subject)"}
💬 Message: ${message}
`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: telegramMessage
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error("Telegram API error");
            }
            alert('Message sent successfully via Telegram!');
            contactForm.reset();
        }).catch(error => {
            alert('Failed to send message via Telegram. Check console for details.');
            console.error('Telegram Error:', error);
        });
    });
}
