import { View, Text, Navigator } from '@tarojs/components';
import { useRouter } from '@tarojs/taro';
import { MdKeyboardVoice } from "react-icons/md";
import { PiHouse, PiVideoCamera } from "react-icons/pi";
import { RiChatVoiceLine } from "react-icons/ri";
import { TbAi } from "react-icons/tb";
import './app-sidebar.scss';

const navigationItems = [
  { title: "形象克隆", icon: <PiHouse size={20} />, link: "/pages/dashboard/index" },
  { title: "声音克隆", icon: <MdKeyboardVoice size={20} />, link: "/pages/dashboard/index/voice-clone" },
  { title: "声音合成", icon: <RiChatVoiceLine size={20} />, link: "/pages/dashboard/index/sound-synthesis" },
  { title: "数字人作品", icon: <PiVideoCamera size={20} />, link: "/pages/dashboard/index/video-works" },
  { title: "AI助手", icon: <TbAi size={20} style={{  padding: '1px', border: '1px solid', borderRadius: '50%' }} />, link: "/pages/dashboard/index/ai-assistant" },
];

export default function AppSidebar() {
  const router = useRouter();
  const cleanPath = router.path.split('?')[0].split('#')[0]; // Normalize path

  return (
    <View className='sidebar'>
      <Text className='sidebar-title'>AI数字人</Text>
      <View className='nav-items'>
        {navigationItems.map((nav, index) => (
          <Navigator
            key={index}
            url={nav.link}
            className={`nav-item ${cleanPath === nav.link ? 'active' : ''}`}
          >
            <View>{nav.icon}</View>
            <Text className='nav-text'>{nav.title}</Text>
          </Navigator>
        ))}
      </View>
    </View>
  );
}
