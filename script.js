document.addEventListener('DOMContentLoaded', () => {
    // Анимации при скролле
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
      threshold: 0.2, //Элемент становится видимым на 20%
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Модальное окно
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('portfolio-modal');
    const closeModalButton = document.querySelector('.close-modal');

    function openModal(modalId, projectTitle) {
      modal.classList.add('active');
      const modalBody = modal.querySelector('.modal-body');
      modalBody.innerHTML = `
       <h2>${projectTitle}</h2>
       <p>
            Здесь будет информация о проекте, вы можете добавлять ее, когда создадите контент для каждого модального окна
       </p>
      `;
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.dataset.modalTarget;
             const projectTitle = item.querySelector('.portfolio-item-overlay h3').textContent;
             openModal(modalId, projectTitle);
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });


    // Отображение цены
    function fetchPrice() {
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
          const walkPriceSpan = document.getElementById('walkPrice');
          const price = data.binancecoin.usd;
          walkPriceSpan.textContent = `$${price.toFixed(4)}`;
        })
        .catch(error => {
          console.error('Error fetching price:', error);
          const walkPriceSpan = document.getElementById('walkPrice');
          walkPriceSpan.textContent = 'Error fetching price';
        });
    }
    fetchPrice(); // Получить цену при загрузке страницы
    setInterval(fetchPrice, 60000); // Обновлять цену каждую минуту
});