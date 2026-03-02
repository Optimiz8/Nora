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
        { id: 'etre-touchee', emoji: '🤝', nom: 'Être touché(e)' },
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
        { id: 'etre-seule', emoji: '🚪', nom: 'Être seul(e)' },
        { id: 'etre-accompagnee', emoji: '👥', nom: 'Être accompagné(e)' },
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

// Contextes par défaut (toujours présents)
const DEFAULT_CONTEXTES = [
    { id: 'maison', emoji: '🏠', nom: 'Maison', default: true },
    { id: 'exterieur', emoji: '🌍', nom: 'Extérieur', default: true },
    { id: 'travail', emoji: '💼', nom: 'Travail', default: true },
    { id: 'secours', emoji: '🚑', nom: 'Secours', default: true }
];

// Garantit que les 4 contextes par défaut existent dans localStorage
function ensureDefaultContextes() {
    let contextes;
    try { contextes = JSON.parse(localStorage.getItem('contextes') || '[]'); } catch(e) { contextes = []; }

    let modified = false;
    DEFAULT_CONTEXTES.forEach(def => {
        if (!contextes.find(c => c.id === def.id)) {
            contextes.push(def);
            modified = true;
        }
    });

    if (modified) {
        localStorage.setItem('contextes', JSON.stringify(contextes));
    }
    return contextes;
}

/**
 * Fonctions utilitaires pour le flux de crise
 */

// Retourne la config du profil actif (commun ou individuel)
function getProfileConfig(profilId) {
    const isCommun = localStorage.getItem('contexte_messageUnique') === 'true';
    const key = isCommun ? 'contexte_commun' : `contexte_${profilId}`;
    const saved = localStorage.getItem(key);

    if (saved) {
        let data;
        try { data = JSON.parse(saved); } catch(e) {
            localStorage.removeItem(key);
            return getProfileConfig(profilId);
        }
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
    let contextes;
    try { contextes = JSON.parse(localStorage.getItem('contextes') || '[]'); } catch(e) { contextes = []; }
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

// Retourne le texte de présentation par défaut avec prénom/nom
function getDefaultPresentationText() {
    const prenom = localStorage.getItem('userPrenom') || '';
    const nom = localStorage.getItem('userNom') || '';
    const prenomAffiche = prenom || '[Prénom]';
    const nomAffiche = nom || '[Nom]';

    return `Bonjour,
Je m'appelle ${prenomAffiche} ${nomAffiche}.

Si vous voyez ce message, je suis actuellement en difficulté ou en crise autistique.
Dans cet état, je peux être dans l'incapacité de parler ou de réagir normalement.

Ce n'est pas volontaire.
Ce n'est pas dangereux.
Ce n'est pas un malaise médical classique.

Mon état est involontaire et lié à une surcharge du système nerveux.
Il peut fluctuer : je peux aller un peu mieux puis moins bien.
Une crise peut durer de quelques dizaines de minutes à plusieurs heures.

Je peux pleurer, trembler, crier, me figer, avoir des mouvements involontaires ou de réassurance (stim)...
N'essayez pas de m'empêcher de bouger, cela m'aide à me réguler.`;
}

// Retourne le texte d'intro "Bonjour, je m'appelle..." pour le récap
function getIdentiteLine() {
    const prenom = localStorage.getItem('userPrenom') || '';
    const nom = localStorage.getItem('userNom') || '';
    const prenomAffiche = prenom || '[Prénom]';
    const nomAffiche = nom || '[Nom]';
    return `Bonjour,<br>Je m'appelle ${prenomAffiche} ${nomAffiche}.`;
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

/* ---------- DÉCLENCHEURS ---------- */
const TRIGGER_CATEGORIES = [
    {
        key: "Sensoriel",
        label: "Déclencheurs sensoriels",
        items: [
            { name: "Auditif", desc: "Bruit soudain, répétitif ou de fond" },
            { name: "Visuel", desc: "Lumière vive, néon, clignotement, motifs, foule en mouvement…" },
            { name: "Tactile", desc: "Contact physique non désiré, étiquette ou matière de vêtement, variation de température…" },
            { name: "Olfactif", desc: "Parfum fort, odeur alimentaire, produit ménager, odeur persistante…" },
            { name: "Goût", desc: "Texture, mélange alimentaire, saveur intense…" }
        ]
    },
    {
        key: "Social",
        label: "Interactions sociales",
        items: [
            { name: "Conversation superficielle", desc: "Échange informel forcé, discussion banale prolongée…" },
            { name: "Interaction sociale imposée", desc: "Obligation de participer, prise de parole forcée, présentation publique, réunion…" },
            { name: "Conflit relationnel", desc: "Dispute, tension familiale, désaccord marqué, reproche direct…" },
            { name: "Difficulté de compréhension sociale", desc: "Sous-entendus, ironie, sarcasme, règle implicite, message indirect…" },
            { name: "Difficulté d'expression", desc: "Blocage verbal, incapacité à formuler une demande, sentiment de ne pas être compris…" }
        ]
    },
    {
        key: "Changement",
        label: "Changement d'habitude / d'environnement",
        items: [
            { name: "Imprévu", desc: "Événement non anticipé, information soudaine, changement non préparé…" },
            { name: "Modification / annulation de plan", desc: "" },
            { name: "Transition", desc: "Passage rapide d'une activité à une autre, interruption soudaine, fin brutale d'un moment sécurisant…" },
            { name: "Rupture de routine", desc: "Impossibilité ou modification d'un rituel, changement d'ordre habituel…" },
            { name: "Règle modifiée", desc: "Consigne changée, cadre ajusté sans prévenir, nouvelle exigence introduite…" }
        ]
    },
    {
        key: "Cadre",
        label: "Cadre, règles et contrôle",
        items: [
            { name: "Non-respect d'une règle établie", desc: "" },
            { name: "Injustice", desc: "Subie ou constatée" },
            { name: "Incohérence logique", desc: "Contradiction, raisonnement illogique, règle incohérente…" },
            { name: "Limite personnelle non respectée", desc: "Insistance malgré un refus, non-respect d'un besoin exprimé, pression…" },
            { name: "Intrusion dans l'espace sécurisant", desc: "Entrée non prévue dans un espace personnel, modification d'un lieu refuge, présence imposée…" },
            { name: "Décision imposée", desc: "Choix retiré, absence de négociation possible, obligation stricte / arbitraire…" }
        ]
    },
    {
        key: "Cognitif",
        label: "Surcharge cognitive",
        items: [
            { name: "Trop d'informations simultanées", desc: "Conversations multiples, instructions complexes, multitâche, accumulation de demandes…" },
            { name: "Instructions floues ou ambiguës", desc: "Consigne imprécise, manque de clarté, double sens, sous-entendus…" },
            { name: "Démarches administratives", desc: "Démarches complexes, formulaires, procédures…" },
            { name: "Pression de résultat", desc: "Exigence de perfection, crainte de se tromper…" },
            { name: "Appel téléphonique", desc: "Appel imprévu, obligation d'appeler…" }
        ]
    },
    {
        key: "Divers",
        label: "Autre / Divers",
        items: [
            { name: "Autre déclencheur", desc: "", custom: true },
            { name: "Déclencheur flou ou non identifié", desc: "Impression de déclenchement sans cause claire, ressenti diffus, difficulté à identifier l'élément précis" }
        ]
    }
];
