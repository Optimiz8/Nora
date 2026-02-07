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
