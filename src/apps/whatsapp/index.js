import WhatsAppApp from './WhatsAppApp';
import { lessons } from './lessons';
import { MessageCircle } from 'lucide-react';

export default {
  id: 'whatsapp',
  name: { en: 'WhatsApp', ur: 'واٹس ایپ' },
  color: '#25D366',
  Icon: MessageCircle,
  Component: WhatsAppApp,
  lessons,
};
