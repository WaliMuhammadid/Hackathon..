import MeezanApp from './MeezanApp';
import { lessons } from './lessons';
import { Landmark } from 'lucide-react';

export default {
  id: 'meezan',
  name: { en: 'Meezan Bank', ur: 'میزان بینک' },
  color: '#5B1E4E',
  Icon: Landmark,
  Component: MeezanApp,
  lessons,
};
