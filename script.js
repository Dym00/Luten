document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Função para animar o ícone Hamburger
    function toggleHamburger(expanded) {
        const bars = mobileToggle.querySelectorAll('.bar');
        if (expanded) {
            // X shape
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            // Reset to 3 bars
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }

    // Toggle Menu Mobile
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Previne que o clique feche imediatamente
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        toggleHamburger(!isExpanded);
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            toggleHamburger(false);
        });
    });

    // Fechar menu ao clicar fora dele (NOVO)
    document.addEventListener('click', (e) => {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnToggle = mobileToggle.contains(e.target);
        
        if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            nav.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            toggleHamburger(false);
        }
    });

    // Smooth Scroll robusto para browsers antigos e comportamento consistente
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Compensa a altura do header fixo
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- FORM HANDLING LOGIC (MAILTO) ---

    // Generic function to send email via mailto
    const sendMailTo = (subject, body) => {
        const recipient = 'tenoriolt@outlook.com.br';
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    // 1. Contact Page Form (Solicitar Orçamento)
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = quoteForm.querySelector('#nome').value;
            const empresa = quoteForm.querySelector('#empresa').value;
            const cargo = quoteForm.querySelector('#cargo').value || 'Não informado';
            const telefone = quoteForm.querySelector('#telefone_contato').value;
            const mensagem = quoteForm.querySelector('#mensagem').value;

            const subject = `Solicitação de Orçamento - ${empresa}`;
            const body = `Nome: ${nome}\nEmpresa: ${empresa}\nCargo: ${cargo}\nTelefone: ${telefone}\n\nMensagem:\n${mensagem}`;

            sendMailTo(subject, body);
        });
    }

    // 2. RH Page Form (Trabalhe Conosco)
    const rhForm = document.querySelector('.rh-form');
    if (rhForm) {
        rhForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = rhForm.querySelector('#nome').value;
            const telefone = rhForm.querySelector('#telefone').value;
            const vagaSelect = rhForm.querySelector('#vaga');
            const vagaNome = vagaSelect.options[vagaSelect.selectedIndex].text;
            const mensagem = rhForm.querySelector('#mensagem').value;

            const subject = `Candidatura Luten - ${vagaNome}`;
            const body = `Nome: ${nome}\nTelefone: ${telefone}\nVaga de Interesse: ${vagaNome}\n\nSobre o candidato:\n${mensagem}`;

            sendMailTo(subject, body);
        });
    }
});