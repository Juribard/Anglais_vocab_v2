document.addEventListener('DOMContentLoaded', function() {
    let mot = null;
    let bonnesReponses = 0;
    let totalReponses = 0;
    let attenteCorrection = false;

    // Ajoute la zone pour le mot incorrect si elle n'existe pas
    if (!document.getElementById('incorrect')) {
        const incorrect = document.createElement('div');
        incorrect.id = 'incorrect';
        incorrect.style.marginBottom = '5px';
        incorrect.style.fontWeight = 'bold';
        incorrect.style.color = 'orange';
        document.getElementById('vocab-form').insertBefore(incorrect, document.getElementById('mot'));
    }

    function motAleatoire() {
        const index = Math.floor(Math.random() * dictionnaire.length);
        return dictionnaire[index];
    }

    function afficherMot() {
        mot = motAleatoire();
        const label = document.querySelector('label[for="mot"]');
        label.innerHTML = `Traduis ce mot : <strong>${Array.isArray(mot.m_fr) ? mot.m_fr.join(' / ') : mot.m_fr}</strong>`;
        document.getElementById('mot').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('incorrect').textContent = '';
    }

    function majCompteur() {
        document.getElementById('compteur').textContent = `Bonnes réponses : ${bonnesReponses} / Réponses envoyées : ${totalReponses}`;
    }

    afficherMot();
    majCompteur();

    document.getElementById('vocab-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const reponse = document.getElementById('mot').value.trim().toLowerCase();

        let solutions = mot.m_en;
        if (!Array.isArray(solutions)) {
            solutions = [solutions];
        }
        const correct = solutions.some(sol => sol.trim().toLowerCase() === reponse);

        totalReponses++;
        majCompteur();

        const feedback = document.getElementById('feedback');
        const incorrect = document.getElementById('incorrect');

        if (attenteCorrection) {
            if (correct) {
                bonnesReponses++;
                majCompteur();
                feedback.textContent = "Bonne Réponse !";
                feedback.className = "feedback-bonne";
                incorrect.textContent = '';
                attenteCorrection = false;
                setTimeout(() => {
                    afficherMot();
                    majCompteur();
                }, 2000);
            } else {
                feedback.textContent = `Encore faux. La bonne traduction est : ${solutions.join(' / ')}`;
                feedback.className = "feedback-mauvaise";
                incorrect.textContent = `Mot incorrect : ${document.getElementById('mot').value}`;
                document.getElementById('mot').value = '';
            }
            return;
        }

        if (correct) {
            bonnesReponses++;
            majCompteur();
            feedback.textContent = "Bonne Réponse !";
            feedback.className = "feedback-bonne";
            incorrect.textContent = '';
            setTimeout(() => {
                afficherMot();
                majCompteur();
            }, 2000);
        } else {
            feedback.textContent = `Mauvaise réponse. La bonne traduction est : "${solutions.join(' / ')}". Réécris la bonne traduction pour continuer.`;
            feedback.className = "feedback-mauvaise";
            incorrect.textContent = `Mot incorrect : ${document.getElementById('mot').value}`;
            document.getElementById('mot').value = '';
            attenteCorrection = true;
        }
    });
});