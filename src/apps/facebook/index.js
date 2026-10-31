import FacebookApp from './FacebookApp';
import { lessons } from './lessons';
import { Share2 } from 'lucide-react';

export default {
  id: 'facebook',
  name: { en: 'Facebook', ur: 'فیس بک' },
  color: '#1877F2',
  Icon: Share2,
  Component: FacebookApp,
  lessons,
};
