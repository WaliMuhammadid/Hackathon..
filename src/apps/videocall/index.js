import VideoCallApp from './VideoCallApp';
import { lessons } from './lessons';
import { Video } from 'lucide-react';

export default {
  id: 'videocall',
  name: { en: 'Video Call', ur: 'ویڈیو کال' },
  color: '#059669',
  Icon: Video,
  Component: VideoCallApp,
  lessons,
};
