import InstagramApp from './InstagramApp';
import { lessons } from './lessons';
import { Camera } from 'lucide-react';

export default {
  id: 'instagram',
  name: { en: 'Instagram', ur: 'انسٹاگرام' },
  color: '#E1306C',
  Icon: Camera,
  Component: InstagramApp,
  lessons,
};
