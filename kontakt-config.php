<?php
/**
 * Konfiguration des Kontaktformulars (Malerwerk).
 * Vor dem Livegang anpassen – siehe Launch-Checkliste.
 * Direktaufruf ist per .htaccess gesperrt und liefert ohnehin nichts aus.
 */
if (!defined('MALERWERK_KONTAKT')) {
    http_response_code(404);
    exit;
}

return [
    // Empfänger der Anfragen. Solange hier ein Platzhalter steht, wird nicht versendet
    // (das Formular zeigt dann die Fehlermeldung „konnte nicht gesendet werden“).
    'empfaenger'   => '[PLATZHALTER: E-Mail-Adresse]',

    // Fester Absender der eigenen Domain (nie die Adresse des Besuchers – SPF/DMARC).
    'absender'     => 'kontakt@malerwerk.example',
    'absender_name'=> 'Malerwerk Website',

    // Envelope-Sender für mail() (-f). Leer lassen, wenn der Hoster das nicht erlaubt.
    'envelope'     => 'kontakt@malerwerk.example',

    'betreff'      => 'Neue Anfrage über malerwerk.example',

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
