// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const skills = document.querySelectorAll('.movimiento_skills-grid-skill');
    const numSkills = skills.length;
    const radius = 120; // Radio de la esfera
    let rotateX = 0, rotateY = 0;
    let isMouseDown = false;
    let startX, startY, startRotateX = 0, startRotateY = 0;

    // Posicionar las habilidades en una esfera 3D
    skills.forEach((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / numSkills); // De 0 a PI
        const theta = Math.sqrt(numSkills * Math.PI) * phi; // De 0 a 2PI

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        skill.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px)`;
    });

    // Controlar el movimiento con el mouse
    const skillsGrid = document.querySelector('.movimiento_skills-grid');

    document.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        startX = event.pageX;
        startY = event.pageY;
    });

    document.addEventListener('mousemove', (event) => {
        if (!isMouseDown) return;

        const deltaX = event.pageX - startX;
        const deltaY = event.pageY - startY;

        rotateX = startRotateX + deltaY * 0.1;
        rotateY = startRotateY + deltaX * 0.1;

        skillsGrid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        startRotateX = rotateX;
        startRotateY = rotateY;
    });

    // Aumentar tamaño al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scale = 1 + scrollY / 1000000;

        skills.forEach(skill => {
            skill.style.transform += ` scale(${scale})`;
        });
    });

    // Movimiento constante
    const animate = () => {
        if (!isMouseDown) {
            rotateY += 0.1; // Velocidad de rotación constante
            skillsGrid.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        requestAnimationFrame(animate);
    };

    animate();
});
