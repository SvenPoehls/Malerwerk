<?php
/**
 * Malerwerk – Versand des Anfrageformulars (kontakt.html).
 *
 * Voraussetzungen auf dem Server:
 *  - PHP 8.1 oder neuer (nutzt den Rückgabetyp `never` und den Operator `?->`;
 *    auf älterem PHP endet das Formular mit Fehler 500)
 *  - PHP-Erweiterungen `mbstring` und `dom` (bei den meisten Hostern Standard)
 *  - funktionierende mail()-Funktion des Hosters
 * Einstellungen (Empfänger, Absender, Domain): kontakt-config.php
 *
 * Ablauf:
 *  - nur POST, sonst Weiterleitung auf kontakt.html
 *  - Honeypot gefüllt  -> still verwerfen, Weiterleitung auf danke.html
 *  - Eingabefehler     -> kontakt.html wird mit Meldungen und den eingegebenen Werten
 *                         erneut ausgegeben (funktioniert ohne JavaScript)
 *  - Versandfehler     -> dito, mit allgemeiner Fehlermeldung (Werte bleiben erhalten)
 *  - Erfolg            -> Weiterleitung auf danke.html
 *
 * Sicherheit: Nutzereingaben gelangen nie in Mail-Header – einzige Ausnahme ist
 * Reply-To, und nur als geprüfte E-Mail-Adresse ohne Zeilenumbrüche. From ist fest.
 */
declare(strict_types=1);

define('MALERWERK_KONTAKT', true);
$config = require __DIR__ . '/kontakt-config.php';

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');

function weiterleiten(string $ziel): void
{
    header('Location: ' . $ziel, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    weiterleiten('kontakt.html');
}

/** Liest ein Feld als gültiges UTF-8, entfernt Steuerzeichen (Zeilenumbrüche nur, wo erlaubt). */
function feld(string $name, bool $mehrzeilig = false): string
{
    $wert = $_POST[$name] ?? '';
    if (!is_string($wert)) {
        return '';
    }
    if (!mb_check_encoding($wert, 'UTF-8')) {
        $wert = mb_convert_encoding($wert, 'UTF-8', 'UTF-8');
    }
    $wert = str_replace(["\r\n", "\r"], "\n", $wert);
    $muster = $mehrzeilig ? '/[\x00-\x09\x0B-\x1F\x7F]/u' : '/[\x00-\x1F\x7F]/u';
    $wert = preg_replace($muster, ' ', $wert) ?? '';
    return trim($wert);
}

$werte = [
    'name'      => feld('name'),
    'telefon'   => feld('telefon'),
    'email'     => feld('email'),
    'ort'       => feld('ort'),
    'leistung'  => feld('leistung'),
    'nachricht' => feld('nachricht', true),
    'zeitraum'  => feld('zeitraum'),
];

// Honeypot: Bots füllen das versteckte Feld – still annehmen, nichts senden.
if (feld('website') !== '') {
    weiterleiten('danke.html');
}

// ---------- Serverseitige Prüfung ----------
$max = $config['max'];
$fehler = []; // Feld-ID => Meldung

if ($werte['name'] === '') {
    $fehler['f-name'] = 'Bitte geben Sie Ihren Namen an.';
} elseif (mb_strlen($werte['name']) > $max['name']) {
    $fehler['f-name'] = 'Bitte kürzen Sie Ihren Namen.';
}

$telefonOk = $werte['telefon'] === '' || (
    mb_strlen($werte['telefon']) <= $max['telefon']
    && preg_match('/^[0-9+()\/\- ]{5,40}$/', $werte['telefon']) === 1
    && strlen(preg_replace('/\D/', '', $werte['telefon']) ?? '') >= 3
);
$emailOk = $werte['email'] === '' || (
    mb_strlen($werte['email']) <= $max['email']
    && filter_var($werte['email'], FILTER_VALIDATE_EMAIL) !== false
);

if ($werte['telefon'] === '' && $werte['email'] === '') {
    $fehler['f-erreichbar'] = 'Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.';
}
if (!$telefonOk) {
    $fehler['f-telefon'] = 'Bitte geben Sie eine gültige Telefonnummer an – nur Ziffern, Leerzeichen und die Zeichen + ( ) / -.';
}
if (!$emailOk) {
    $fehler['f-email'] = 'Bitte geben Sie eine gültige E-Mail-Adresse an, zum Beispiel name@beispiel.de.';
}
if (mb_strlen($werte['ort']) > $max['ort']) {
    $fehler['f-ort'] = 'Bitte kürzen Sie die Ortsangabe.';
}
if ($werte['leistung'] !== '' && !array_key_exists($werte['leistung'], $config['leistungen'])) {
    $fehler['f-leistung'] = 'Bitte wählen Sie eine Leistung aus der Liste.';
    $werte['leistung'] = '';
}
if ($werte['nachricht'] === '') {
    $fehler['f-nachricht'] = 'Bitte beschreiben Sie kurz, was gemacht werden soll.';
} elseif (mb_strlen($werte['nachricht']) > $max['nachricht']) {
    $fehler['f-nachricht'] = 'Ihre Nachricht ist zu lang. Bitte kürzen Sie sie auf höchstens ' . $max['nachricht'] . ' Zeichen.';
}
if (mb_strlen($werte['zeitraum']) > $max['zeitraum']) {
    $fehler['f-zeitraum'] = 'Bitte kürzen Sie die Angabe zum Zeitraum.';
}

if ($fehler) {
    formularAusgeben($werte, $fehler, false, 422);
}

// ---------- Versand ----------
$empfaenger = (string) $config['empfaenger'];
$versandOk = false;

if (filter_var($empfaenger, FILTER_VALIDATE_EMAIL) !== false) {
    $kodiere = static fn (string $s): string => '=?UTF-8?B?' . base64_encode($s) . '?=';

    $leistung = $werte['leistung'] !== '' ? $config['leistungen'][$werte['leistung']] : '–';
    $zeilen = [
        'Neue Anfrage über das Formular auf ' . $config['domain'],
        '',
        'Name:       ' . $werte['name'],
        'Telefon:    ' . ($werte['telefon'] ?: '–'),
        'E-Mail:     ' . ($werte['email'] ?: '–'),
        'Objekt:     ' . ($werte['ort'] ?: '–'),
        'Leistung:   ' . $leistung,
        'Zeitraum:   ' . ($werte['zeitraum'] ?: '–'),
        '',
        'Nachricht:',
        $werte['nachricht'],
        '',
        '--',
        'Gesendet am ' . date('d.m.Y \u\m H:i') . ' Uhr',
    ];
    $text = implode("\r\n", array_map(static fn ($z) => str_replace("\n", "\r\n", $z), $zeilen));
    // quoted-printable hält jede Zeile unter der SMTP-Grenze von 998 Zeichen (lange Nachrichten ohne Umbruch)
    $text = quoted_printable_encode($text);

    $header = [
        'From'                      => $kodiere((string) $config['absender_name']) . ' <' . $config['absender'] . '>',
        'MIME-Version'              => '1.0',
        'Content-Type'              => 'text/plain; charset=UTF-8',
        'Content-Transfer-Encoding' => 'quoted-printable',
        'X-Mailer'                  => 'Malerwerk-Kontaktformular',
    ];
    // Reply-To nur mit geprüfter Adresse ohne CR/LF (Schutz vor Header-Injection)
    if ($werte['email'] !== '' && $emailOk && strpbrk($werte['email'], "\r\n") === false) {
        $header['Reply-To'] = $werte['email'];
    }

    $parameter = '';
    if (!empty($config['envelope']) && filter_var($config['envelope'], FILTER_VALIDATE_EMAIL)) {
        $parameter = '-f' . $config['envelope'];
    }

    try {
        $versandOk = @mail($empfaenger, $kodiere((string) $config['betreff']), $text, $header, $parameter);
    } catch (Throwable $e) {
        $versandOk = false;
    }
    if (!$versandOk) {
        error_log('Malerwerk-Kontaktformular: mail() fehlgeschlagen.');
    }
} else {
    error_log('Malerwerk-Kontaktformular: Empfängeradresse in kontakt-config.php ist nicht eingerichtet.');
}

if ($versandOk) {
    weiterleiten('danke.html');
}
formularAusgeben($werte, [], true, 503);

// ---------- Ausgabe des Formulars mit Meldungen (ohne JavaScript nutzbar) ----------
/**
 * Gibt kontakt.html mit eingetragenen Werten und Fehlermeldungen aus.
 * @param array<string,string> $werte
 * @param array<string,string> $fehler
 */
function formularAusgeben(array $werte, array $fehler, bool $versandFehler, int $status): never
{
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');

    $html = (string) file_get_contents(__DIR__ . '/kontakt.html');
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NODEFDTD | LIBXML_NONET);
    libxml_clear_errors();
    $xp = new DOMXPath($dom);
    $id = static fn (string $i): ?DOMElement => ($n = $xp->query('//*[@id="' . $i . '"]')->item(0)) instanceof DOMElement ? $n : null;

    // Werte zurückschreiben
    foreach (['name', 'telefon', 'email', 'ort', 'zeitraum'] as $f) {
        $id('f-' . $f)?->setAttribute('value', $werte[$f]);
    }
    if ($n = $id('f-nachricht')) {
        $n->textContent = $werte['nachricht'];
    }
    foreach ($xp->query('//*[@id="f-leistung"]/option') as $opt) {
        if ($opt instanceof DOMElement) {
            $opt->removeAttribute('selected');
            if ($opt->getAttribute('value') === $werte['leistung'] && $werte['leistung'] !== '') {
                $opt->setAttribute('selected', 'selected');
            }
        }
    }

    // Feldmeldungen
    foreach ($fehler as $feldId => $text) {
        $p = $id($feldId . '-fehler');
        if ($p) {
            $p->removeAttribute('hidden');
            foreach ($xp->query('.//*[contains(@class,"fehlertext__text")]', $p) as $span) {
                $span->textContent = $text;
            }
        }
        $ziele = $feldId === 'f-erreichbar' ? ['f-telefon', 'f-email'] : [$feldId];
        foreach ($ziele as $zielId) {
            if ($feld = $id($zielId)) {
                $feld->setAttribute('aria-invalid', 'true');
                $alt = trim($feld->getAttribute('aria-describedby'));
                $feld->setAttribute('aria-describedby', trim($feldId . '-fehler ' . $alt));
            }
        }
    }

    // Fehlerzusammenfassung mit Sprunglinks
    if ($fehler && ($box = $id('fehler-zusammenfassung'))) {
        $box->removeAttribute('hidden');
        $liste = $xp->query('.//*[@data-fehlerliste]', $box)->item(0);
        foreach ($fehler as $feldId => $text) {
            $li = $dom->createElement('li');
            $a = $dom->createElement('a');
            $a->setAttribute('href', '#' . ($feldId === 'f-erreichbar' ? 'f-telefon' : $feldId));
            $a->textContent = $text;
            $li->appendChild($a);
            $liste?->appendChild($li);
        }
    }

    if ($versandFehler) {
        $id('meldung-versand')?->removeAttribute('hidden');
    }

    // Seite nicht indexieren
    $head = $dom->getElementsByTagName('head')->item(0);
    if ($head) {
        $meta = $dom->createElement('meta');
        $meta->setAttribute('name', 'robots');
        $meta->setAttribute('content', 'noindex');
        $head->appendChild($meta);
    }

    $ausgabe = (string) $dom->saveHTML();
    $ausgabe = str_replace('<?xml encoding="UTF-8">', '', $ausgabe);
    echo "<!DOCTYPE html>\n" . preg_replace('/^\s*<!DOCTYPE[^>]*>\s*/i', '', $ausgabe);
    exit;
}
