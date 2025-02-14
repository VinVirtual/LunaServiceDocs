document.addEventListener('DOMContentLoaded', function() {
    // Mode toggle functionality
    const modeToggle = document.getElementById('mode-toggle');
    const tttLabel = document.getElementById('ttt-label');
    const ttsLabel = document.getElementById('tts-label');

    // Content elements that need to be updated
    const overviewContent = document.getElementById('overview-content');
    const featuresContent = document.getElementById('features-content');
    const codeContainer = document.querySelector('.code-container');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const codeBlock = document.querySelector('.code-block code');

    // Content for different modes
    const content = {
        ttt: {
            overview: "The Luna Text API provides a seamless way to interact with Luna AI platform, enabling natural text-based conversations.",
            features: [
                {
                    title: "Natural Conversations",
                    description: "Engage users with human-like interactions through text responses"
                },
                {
                    title: "Contextual Understanding",
                    description: "Support for message history to maintain conversation context"
                },
                {
                    title: "Secure Integration",
                    description: "Built-in authentication and error handling"
                },
                {
                    title: "Easy Integration",
                    description: "Simple REST API with support for multiple languages"
                }
            ],
            code: {
                shell: `curl -X POST http://ec2-13-236-94-100.ap-southeast-2.compute.amazonaws.com/api/v1/text/chat \\
-H "Authorization: Bearer your_api_key_here" \\
-H "Content-Type: application/json" \\
-d '{
  "text": "Hello Luna, how are you?",
  "messageHistory": []
}'`,
                python: `import requests

url = "http://ec2-13-236-94-100.ap-southeast-2.compute.amazonaws.com/api/v1/text/chat"
headers = {
    "Authorization": "Bearer your_api_key_here",
    "Content-Type": "application/json"
}
data = {
    "text": "Hello Luna, how are you?",
    "messageHistory": []
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
`,
                javascript: `const fetch = require('node-fetch');

const url = "http://ec2-13-236-94-100.ap-southeast-2.compute.amazonaws.com/api/v1/text/chat";
const headers = {
    "Authorization": "Bearer your_api_key_here",
    "Content-Type": "application/json"
};
const data = {
    text: "Hello Luna, how are you?",
    messageHistory: []
};

fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));
`
            }
        },
        tts: {
            overview: "The Luna Speech API provides a seamless way to interact with Luna AI platform, enabling natural text-to-speech conversations. ",
            features: [
                {
                    title: "Voice Output",
                    description: "Convert text responses into natural-sounding speech"
                },
                {
                    title: "Contextual Understanding",
                    description: "Support for message history to maintain conversation context"
                },
                {
                    title: "Secure Integration",
                    description: "Built-in authentication and error handling"
                },
                {
                    title: "Multi-modal Output",
                    description: "Receive both text and audio responses in a single API call"
                }
            ],
            code: {
                shell: `curl -X POST http://ec2-13-236-94-100.ap-southeast-2.compute.amazonaws.com/api/v1/speech/chat \\
-H "Authorization: Bearer your_api_key_here" \\
-H "Content-Type: application/json" \\
-d '{
  "text": "Hello Luna, how are you?",
  "messageHistory": []
}'`,
                python: `import requests

url = "http://ec2-13-236-94-100.ap-southeast-2.compute.amazonaws.com/api/v1/speech/chat"
headers = {
    "Authorization": "Bearer your_api_key_here",
    "Content-Type": "application/json"
}
data = {
    "text": "Hello Luna, how are you?",
    "messageHistory": []
}

response = requests.post(url, json=data, headers=headers)
print(response.json())  # This will return both text and base64-encoded audio
`,
                javascript: `const fetch = require('node-fetch');

const url = "http://ec2-13-236-94-100.ap-southeast-2.compute.amazonaws.com/api/v1/speech/chat";
const headers = {
    "Authorization": "Bearer your_api_key_here",
    "Content-Type": "application/json"
};
const data = {
    text: "Hello Luna, how are you?",
    messageHistory: []
};

fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data))  // This will return both text and base64-encoded audio
.catch(error => console.error("Error:", error));
`
            }
        }
    };

    // Function to update code based on selected language
    function updateCode(mode, language) {
        codeBlock.textContent = content[mode].code[language];
    }

    // Function to update content based on mode
    function updateContent(mode) {
        const modeContent = content[mode];
        
        // Add fade-out class
        overviewContent.classList.add('fade-out');
        
        // Update content after brief delay for animation
        setTimeout(() => {
            // Update overview
            overviewContent.textContent = modeContent.overview;
            
            // Update features
            featuresContent.innerHTML = modeContent.features.map(feature => `
                <div class="feature-card">
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>
            `).join('');
            
            // Update code example
            const activeLanguage = document.querySelector('.tab-btn.active').textContent.toLowerCase();
            updateCode(mode, activeLanguage);
            
            // Remove fade-out class
            overviewContent.classList.remove('fade-out');
        }, 300);
    }

    // Mode toggle event listener
    modeToggle.addEventListener('change', function() {
        if (this.checked) {
            // TTS mode
            tttLabel.classList.remove('active');
            ttsLabel.classList.add('active');
            updateContent('tts');
        } else {
            // TTT mode
            ttsLabel.classList.remove('active');
            tttLabel.classList.add('active');
            updateContent('ttt');
        }
    });

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update code content
            const language = button.textContent.toLowerCase();
            const mode = modeToggle.checked ? 'tts' : 'ttt';
            updateCode(mode, language);
        });
    });

    // Copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(copyButton => {
        copyButton.addEventListener('click', () => {
            const codeBlock = copyButton.closest('.code-section').querySelector('code');
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                copyButton.textContent = 'Failed!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
        });
    });

    // Collapsible sections
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const toggleIcon = header.querySelector('.toggle-icon');
            
            content.classList.toggle('expanded');
            toggleIcon.classList.toggle('rotated');
        });
    });

    // Initialize with TTT mode
    updateContent('ttt');
});