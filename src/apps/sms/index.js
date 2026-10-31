import SMSApp from './SMSApp';
import { lessons } from './lessons';
import { MessageSquareText } from 'lucide-react';

export default {
  id: 'sms',
  name: { en: 'SMS & Safety', ur: 'پیغامات اور تحفظ' },
  color: '#EA4335',
  Icon: MessageSquareText,
  Component: SMSApp,
  lessons,
};
