import { Route } from './types';

export const ROUTES: Route[] = [
  {
    id: 'gauja-sigulda',
    name: 'Gauja: Sigulda - Murjāņi',
    river: 'Gauja',
    duration: 'Pilna diena',
    difficulty: 'Viegli',
    price: 35,
    description: 'Klasisks maršruts caur Gaujas Nacionālo parku. Izbaudiet smilšakmens iežus un krāšņos mežus.',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'],
    schedule: ['09:00 - Tikšanās Siguldā', '10:00 - Drošības instruktāža', '10:30 - Brauciena sākums', '13:00 - Pusdienu pauze', '17:00 - Finišs Murjāņos'],
    faq: [{ q: 'Vai piemērots bērniem?', a: 'Jā, šis maršruts ir ļoti mierīgs un drošs.' }]
  },
  {
    id: 'salaca-mazsalaca',
    name: 'Salaca: Mazsalaca - Skaņaiskalns',
    river: 'Salaca',
    duration: 'Puse dienas',
    difficulty: 'Viegli',
    price: 25,
    description: 'Skaistākā Salacas upes daļa ar slaveno Skaņākalna klinti.',
    images: ['https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800'],
    schedule: ['10:00 - Tikšanās Mazsalacā', '11:00 - Brauciena sākums', '14:00 - Finišs pie Skaņākalna'],
    faq: [{ q: 'Vai var ņemt līdzi suni?', a: 'Jā, suņi ir laipni gaidīti mūsu laivās.' }]
  },
  {
    id: 'amata-melturi',
    name: 'Amata: Melturi - Veclauči',
    river: 'Amata',
    duration: 'Pilna diena',
    difficulty: 'Izaicinoši',
    price: 45,
    description: 'Ātrākā un aizraujošākā upe Latvijā. Tikai pieredzējušiem braucējiem augsta ūdens līmeņa laikā.',
    images: ['https://images.unsplash.com/photo-1502920513543-d0382b74c596?auto=format&fit=crop&q=80&w=800'],
    schedule: ['09:00 - Tikšanās Melturos', '09:30 - Ekipējuma pārbaude', '10:00 - Brauciena sākums', '16:00 - Finišs Veclaučos'],
    faq: [{ q: 'Vai nepieciešama ķivere?', a: 'Jā, ķiveres ir obligātas un mēs tās nodrošinām.' }]
  }
];
