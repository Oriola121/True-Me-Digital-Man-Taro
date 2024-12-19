import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { PiCaretLeft } from 'react-icons/pi';
import './create-video.scss';
import PublicImage from './public-image';
import VoiceDriven from './action-driven/voice/voice-driven';
import TextDriven from './action-driven/text/text-driven';

export function PickDigitalPeople() {
    const [tabs] = useState([
        {
            title: '我的形象',
        },
        {
            title: '公共形象',
            content: <PublicImage />,
        },
    ]);

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };
    return (
        <View className='digital-people'>
            <Text style={{ fontSize: '18px', fontWeight: '600' }} >选择数字人</Text>

            <View className='digital-people-tabs-container'>
                <View className='digital-people-tabs-bar'>
                    {tabs.map((tab, index) => (
                        <View key={index} className={`digital-people-tab-bar-title ${activeTab === index ? 'digital-people-tab-bar-title__selected' : ''}`} onClick={() => handleTabClick(index)} >
                            {tab.title}
                        </View>
                    ))}
                </View>

                <View className='digital-people-tabs-content'>
                    {tabs.map((tab, index) => (
                        <View key={index} className={`digital-people-tab-content ${activeTab === index ? 'active' : ''}`} >
                            {activeTab === index && tab.content}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

export default function CreateVideo({ onClose }: { onClose: () => void }) {
    return (
        <>
            <View className='create-video-header'>
                <View className='close-btn' onClick={onClose} >
                    <PiCaretLeft size={24} />
                    <Text style={{ fontSize: '20px', fontWeight: 'bold' }} >创建数字人视频</Text>
                </View>
                <View className='page-progress'>
                    <View className='progress-count'>
                        1
                    </View>
                    <Text className='progress-text'>选择语言</Text>

                    <View style={{ width: '128px', height: '6px', borderRadius: '8px', background: '#ff5c01' }} />

                    <View className='progress-count'>
                        2
                    </View>
                    <Text className='progress-text'>视频生成</Text>
                </View>
            </View>

            <View className='create-video-body'>
                <PickDigitalPeople />
                <ActionDrive />
            </View>
        </>
    );
}


export function ActionDrive() {
    const [tabs] = useState([
        {
            title: '文本驱动',
            content: <TextDriven />,
        },
        {
            title: '语音驱动',
            content: <VoiceDriven />,
        },
    ]);

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };
    return (
        <View className='action-drive'>
            <View className='action-drive-tabs-container'>
                <View className='action-drive-tabs-bar'>
                    {tabs.map((tab, index) => (
                        <View key={index} className={`action-drive-tab-bar-title ${activeTab === index ? 'action-drive-tab-bar-title__selected' : ''}`} onClick={() => handleTabClick(index)} >
                            {tab.title}
                        </View>
                    ))}
                </View>

                <View className='action-drive-tabs-content'>
                    {tabs.map((tab, index) => (
                        <View key={index} className={`action-drive-tab-content ${activeTab === index ? 'active' : ''}`} >
                            {activeTab === index && tab.content}
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}