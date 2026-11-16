# Selgitus: leitud vead ja TDD

## Parooli viga (`password.js`)
Test `isValidPassword('abcdefgh')` ootas `true`, aga funktsioon tagastas `false`
(Expected: true, Received: false). Põhjus: tingimus oli `password.length > 8`,
seega täpselt 8 märki ei läbinud. Nõue on „vähemalt 8 märki“, seega parandasin
selle kujule `password.length >= 8`. 9 märgiga parool läbis ka vigase koodiga,
sest viga oli just piirväärtusel.

## Ostukorvi viga (`cart.js`)
Ebaõnnestusid testid:
- `[{ price: 100, qty: 1 }]` → Expected 100, Received 105
- `[{ price: 100, qty: 1 }]`, `STUDENT10` → Expected 90, Received 95

Põhjus: saatmiskulu tingimus oli `total <= 100`, seega täpselt 100 € ostule lisati
saatmiskulu, ja seda kontrolliti pärast allahindlust. Parandasin nii, et saatmine
on tasuta, kui ostusumma (enne allahindlust) on vähemalt 100 € (`subtotal >= 100`).

## TDD (FREESHIP)
- **Red:** kirjutasin testi `calculateTotal([{ price: 10, qty: 1 }], 'FREESHIP')` → 10.
  Test ebaõnnestus (Received: 15).
- **Green:** lisasin `cart.js` faili tingimuse `discountCode === 'FREESHIP'`, mille korral
  saatmiskulu ei lisata. Test läbis.
- **Refactor:** tõin saatmise tingimuse eraldi muutujasse `freeShipping` ja
  kontrollisin, et kõik varasemad testid (STUDENT10, saatmiskulu, tühi ostukorv,
  vigane sisend) läbivad endiselt – regressioonikontroll.

## Tulemus
`npm test`: 20/20 testi läbivad. `npm run coverage`: 100% Stmts / Branch / Funcs / Lines.
