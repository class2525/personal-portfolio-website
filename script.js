document.addEventListener('DOMContentLoaded', () => {
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const projectsContainer = document.getElementById('projects-container');
  const skillsContainer = document.getElementById('skills-container');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  // Fetch profile data
  fetch('/api/profile')
    .then(res => res.json())
    .then(data => {
      profileName.textContent = data.name;
      profileBio.textContent = data.bio;
    })
    .catch(() => {
      profileName.textContent = 'Rita';
      profileBio.textContent = 'Full Stack Developer.';
    });

  // Fetch projects
  fetch('/api/projects')
    .then(res => res.json())
    .then(projects => {
      projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${project.title}</h3>
          <img src="${project.image}" alt="${project.title}" style="width:100%;border-radius:8px; margin-bottom:10px;">
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectsContainer.appendChild(card);
      });
    });

  // Fetch skills
  fetch('/api/skills')
    .then(res => res.json())
    .then(skills => {
      skills.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `
          <strong>${skill.name}</strong> (${skill.proficiency}%)`;
        skillsContainer.appendChild(skillDiv);
      });
    });

  // Contact form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill all fields.';
      return;
    }

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })
      .then(res => res.json())
      .then(data => {
        formStatus.textContent = data.message;
        contactForm.reset();
      })
      .catch(() => {
        formStatus.textContent = 'Error sending message. Please try again later.';
      });
  });
});
