document.addEventListener('DOMContentLoaded', function() {
    // Copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get the code to copy
            const codeBlock = btn.previousElementSibling;
            const textToCopy = codeBlock.textContent;

            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                btn.textContent = 'Copied!';
                btn.classList.add('copied');

                // Reset after 2 seconds
                setTimeout(() => {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                btn.textContent = 'Failed!';
                setTimeout(() => {
                    btn.textContent = 'Copy';
                }, 2000);
            });
        });
    });

    // Language switching
    const langButtons = document.querySelectorAll('.lang-btn');
    const codeBlocks = document.querySelectorAll('.code-block');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button states
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding code block
            const lang = btn.getAttribute('data-lang');
            codeBlocks.forEach(block => {
                if (block.getAttribute('data-lang') === lang) {
                    block.classList.add('active');
                } else {
                    block.classList.remove('active');
                }
            });
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});