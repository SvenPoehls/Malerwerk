<?php
/**
 * Konfiguration des Kontaktformulars (Malerwerk).
 * Vor dem Livegang anpassen – siehe Launch-Checkliste.
 * Direktaufruf ist per .htaccess gesperrt und liefert ohnehin nichts aus.
 *
 * Voraussetzungen für kontakt.php: PHP 8.1 oder neuer, Erweiterungen `mbstring` und `dom`,
 * funktionierende mail()-Funktion des Hosters.
 */
if (!defined('MALERWERK_KONTAKT')) {
    http_response_code(404);
    exit;
}

// Domain der Website (ohne https://) – wird für Absender, Betreff und Mailtext verwendet.
// Beim Domain-Tausch nur hier ändern.
$domain = 'malerwerk.example';

return [
    // Empfänger der Anfragen. Solange hier ein Platzhalter steht, wird nicht versendet
    // (das Formular zeigt dann die Fehlermeldung „konnte nicht gesendet werden“).
    'empfaenger'   => '[PLATZHALTER: E-Mail-Adresse]',

    // Fester Absender der eigenen Domain (nie die Adresse des Besuchers – SPF/DMARC).
    'absender'     => 'kontakt@' . $domain,
    'absender_name'=> 'Malerwerk Website',

    // Envelope-Sender für mail() (-f). Leer lassen, wenn der Hoster das nicht erlaubt.
    'envelope'     => 'kontakt@' . $domain,

    'domain'       => $domain,

    'betreff'      => 'Neue Anfrage über ' . $domain,

    // Längenbegrenzungen (Zeichen)
    'max' => [
        'name'      => 100,
        'telefon'   => 40,
        'email'     => 254,
        'ort'       => 120,
        'zeitraum'  => 120,
        'nachricht' => 5000,
    ],

    // Erlaubte Werte des Feldes „Leistung“
    'leistungen' => [
        'innenanstrich'     => 'Innenanstrich',
        'tapezierarbeiten'  => 'Tapezierarbeiten',
        'fassade'           => 'Fassade',
        'lackierarbeiten'   => 'Lackierarbeiten',
        'wandgestaltung'    => 'Wandgestaltung',
        'bodenbeschichtung' => 'Bodenbeschichtung',
        'sonstiges'         => 'Sonstiges / weiß ich noch nicht',
    ],
];
