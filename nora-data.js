/**
 * NORA-DATA.JS
 * Constantes partagées pour l'application Nora-2
 *
 * Ce fichier centralise toutes les données de référence :
 * - Capacités (18 items)
 * - Besoins (21 items)
 * - États/Ressentis (16 items)
 *
 * À inclure dans les pages avec : <script src="nora-data.js"></script>
 */

const NORA_DATA = {
    // CAPACITÉS PAR DÉFAUT (18 items)
    CAPACITES: [
        { id: 'parler', emoji: '💬', nom: 'Parler' },
        { id: 'etre-touchee', emoji: '🤝', nom: 'Être touchée' },
        { id: 'bouger', emoji: '🚶', nom: 'Bouger' },
        { id: 'rester-ici', emoji: '📍', nom: 'Rester ici' },
        { id: 'ecrire', emoji: '⌨️', nom: 'Écrire / taper sur un clavier' },
        { id: 'lire', emoji: '📖', nom: 'Lire' },
        { id: 'comprendre', emoji: '🧠', nom: 'Comprendre ce qu\'on me dit' },
        { id: 'repondre', emoji: '💭', nom: 'Répondre à des questions' },
        { id: 'marcher', emoji: '🚶‍♀️', nom: 'Marcher' },
        { id: 'rester-debout', emoji: '🧍', nom: 'Rester debout' },
        { id: 'asseoir', emoji: '🪑', nom: 'M\'asseoir' },
        { id: 'lever', emoji: '⬆️', nom: 'Me lever' },
        { id: 'proche-autres', emoji: '👥', nom: 'Être proche des autres' },
        { id: 'changer-endroit', emoji: '🔄', nom: 'Changer d\'endroit' },
        { id: 'attendre', emoji: '⏳', nom: 'Attendre' },
        { id: 'concentrer', emoji: '🎯', nom: 'Me concentrer' },
        { id: 'prendre-decision', emoji: '🤔', nom: 'Prendre une décision' },
        { id: 'arreter', emoji: '🛑', nom: 'Arrêter ce que je fais' }
    ],

    // BESOINS PAR DÉFAUT (21 items)
    BESOINS: [
        { id: 'reduire-bruit', emoji: '🔇', nom: 'Réduire le bruit' },
        { id: 'etre-noir', emoji: '🌑', nom: 'Être dans le noir / pénombre' },
        { id: 'etre-calme', emoji: '🤫', nom: 'Être au calme' },
        { id: 'casque', emoji: '🎧', nom: 'Casque / écouteurs' },
        { id: 'coucher', emoji: '🛏️', nom: 'Me coucher / m\'allonger' },
        { id: 'asseoir', emoji: '🪑', nom: 'M\'asseoir' },
        { id: 'appeler-secours', emoji: '🚑', nom: 'Appeler les secours' },
        { id: 'boire', emoji: '💧', nom: 'Boire' },
        { id: 'manger', emoji: '🍽️', nom: 'Manger' },
        { id: 'aller-wc', emoji: '🚻', nom: 'Aller aux WC' },
        { id: 'dormir', emoji: '😴', nom: 'Dormir' },
        { id: 'calin', emoji: '🤗', nom: 'Un câlin' },
        { id: 'etre-seule', emoji: '🚪', nom: 'Être seule' },
        { id: 'etre-accompagnee', emoji: '👥', nom: 'Être accompagnée' },
        { id: 'rester-avec-moi', emoji: '🫂', nom: 'Qu\'on reste avec moi' },
        { id: 'attendre', emoji: '⏳', nom: 'Attendre' },
        { id: 'appeler-quelquun', emoji: '📞', nom: 'Appeler quelqu\'un' },
        { id: 'appeler-pour-moi', emoji: '☎️', nom: 'Qu\'on appelle quelqu\'un pour moi' },
        { id: 'connaitre-heure', emoji: '🕐', nom: 'Connaître l\'heure' },
        { id: 'comprendre-situation', emoji: '❓', nom: 'Comprendre ce qui se passe' },
        { id: 'expliquer-calmement', emoji: '💬', nom: 'Qu\'on m\'explique calmement' }
    ],

    // ÉTATS / RESSENTIS PAR DÉFAUT (16 items)
    ETATS: [
        { id: 'surcharge', emoji: '🤯', nom: 'Surchargé(e)' },
        { id: 'fatigue', emoji: '😴', nom: 'Fatigué(e)' },
        { id: 'confus', emoji: '😵', nom: 'Confus(e)' },
        { id: 'impuissant', emoji: '😞', nom: 'Impuissant(e)' },
        { id: 'fige-partiel', emoji: '🧊', nom: 'Figé(e) partiellement' },
        { id: 'fige-total', emoji: '⛔', nom: 'Figé(e) totalement' },
        { id: 'muet', emoji: '🤐', nom: 'Incapable de parler (muet/muette)' },
        { id: 'tendu', emoji: '💪', nom: 'Tendu(e) (tension musculaire)' },
        { id: 'anxieux', emoji: '😰', nom: 'Anxieux(se)' },
        { id: 'panique', emoji: '😱', nom: 'Paniqué(e)' },
        { id: 'stresse', emoji: '😣', nom: 'Stressé(e)' },
        { id: 'triste', emoji: '😢', nom: 'Triste' },
        { id: 'colere', emoji: '😠', nom: 'En colère' },
        { id: 'etourdi', emoji: '😵‍💫', nom: 'Étourdi(e)' },
        { id: 'nausee', emoji: '🤢', nom: 'Nauséeux(se)' },
        { id: 'mal-tete', emoji: '🤕', nom: 'Mal à la tête' }
    ]
};

// Export pour compatibilité avec les anciennes références
const CAPACITES = NORA_DATA.CAPACITES;
const BESOINS = NORA_DATA.BESOINS;
const ETATS = NORA_DATA.ETATS;

/**
 * Fonctions utilitaires pour le flux de crise
 */

// Retourne la config du profil actif (commun ou individuel)
function getProfileConfig(profilId) {
    const isCommun = localStorage.getItem('contexte_messageUnique') === 'true';
    const key = isCommun ? 'contexte_commun' : `contexte_${profilId}`;
    const saved = localStorage.getItem(key);

    if (saved) {
        const data = JSON.parse(saved);
        // Fallbacks de sécurité (gère aussi l'ancien format où capacites/besoins/etats sont des booléens)
        if (!data.presentation || typeof data.presentation !== 'object') {
            data.presentation = { inclure: data.presentation !== false && data.afficherPresentation !== false, texte: data.textePresentation || '' };
        }
        if (!data.capacites || typeof data.capacites !== 'object') {
            data.capacites = { inclure: data.capacites !== false, visibles: CAPACITES.map(c => c.id), personnalisees: [] };
        }
        if (!data.besoins || typeof data.besoins !== 'object') {
            data.besoins = { inclure: data.besoins !== false, visibles: BESOINS.map(b => b.id), personnalisees: [] };
        }
        if (!data.etats || typeof data.etats !== 'object') {
            data.etats = { inclure: data.etats !== false, visibles: ETATS.map(e => e.id), personnalisees: [] };
        }
        if (!data.contacts || typeof data.contacts !== 'object') {
            data.contacts = { inclure: true, selection: data.contactsVisibles || [] };
        }
        if (!data.medical || typeof data.medical !== 'object') {
            data.medical = { inclure: data.medical !== false && data.afficherMedical !== false };
        }
        if (!data.capacites.visibles) data.capacites.visibles = CAPACITES.map(c => c.id);
        if (!data.capacites.personnalisees) data.capacites.personnalisees = [];
        if (!data.besoins.visibles) data.besoins.visibles = BESOINS.map(b => b.id);
        if (!data.besoins.personnalisees) data.besoins.personnalisees = [];
        if (!data.etats.visibles) data.etats.visibles = ETATS.map(e => e.id);
        if (!data.etats.personnalisees) data.etats.personnalisees = [];
        if (!data.contacts.selection) data.contacts.selection = [];
        return data;
    }

    // Fallback : tout inclus par défaut
    return {
        presentation: { inclure: true, texte: '' },
        capacites: { inclure: true, visibles: CAPACITES.map(c => c.id), personnalisees: [] },
        besoins: { inclure: true, visibles: BESOINS.map(b => b.id), personnalisees: [] },
        etats: { inclure: true, visibles: ETATS.map(e => e.id), personnalisees: [] },
        contacts: { inclure: true, selection: [] },
        medical: { inclure: true }
    };
}

// Retourne {emoji, nom} pour un profil donné
function getContexteInfo(profilId) {
    if (profilId === 'commun') {
        return { emoji: '🌐', nom: 'Profil commun' };
    }
    const contextes = JSON.parse(localStorage.getItem('contextes') || '[]');
    const ctx = contextes.find(c => c.id === profilId);
    if (ctx) return { emoji: ctx.emoji, nom: ctx.nom };
    return { emoji: '📍', nom: 'Contexte' };
}

// Retourne la liste ordonnée des pages du flux selon la config
function getFlowPages(config) {
    const pages = [];
    if (config.capacites.inclure) pages.push('capacites.html');
    if (config.besoins.inclure) pages.push('besoins.html');
    if (config.etats.inclure) pages.push('etats.html');
    pages.push('recap.html');
    return pages;
}

// Retourne la page suivante dans le flux (ou null)
function getNextPage(currentPage, config) {
    const pages = getFlowPages(config);
    const idx = pages.indexOf(currentPage);
    if (idx === -1 || idx >= pages.length - 1) return 'recap.html';
    return pages[idx + 1];
}

// Retourne la page précédente dans le flux (ou index.html)
function getPrevPage(currentPage, config) {
    const pages = getFlowPages(config);
    const idx = pages.indexOf(currentPage);
    if (idx <= 0) return 'index.html';
    return pages[idx - 1];
}
