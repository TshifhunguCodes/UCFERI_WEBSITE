document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (!faqQuestions.length) return;

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            faqQuestions.forEach(item => {
                item.parentElement.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});
