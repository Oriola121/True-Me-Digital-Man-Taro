import { Button, Text, View, Image } from '@tarojs/components';
import { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import './page.scss';

export function ImageClone() {
    return (
        <View className='clone-container'>
            <View className='icon-wrapper'>
                <PiPlusBold size={16} />
            </View>
            <Text className='clone-text'>复刻形象克隆</Text>
        </View>
    )
}

export default function Page() {
    const [tabs] = useState([
        { title: '我的形象', action: <ImageClone /> },
        { title: '公共形象',  },
    ]);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const handleClick = (item: any) => {
        console.log('Clicked item:', item);
    };

    return (
        <View className='page'>
            <View className='page-head'>
                <Text className='head-text'>形象克隆</Text>

                <View>
                    <Button className='head-button'>
                        <PiPlusBold color='white' />
                        创建视频
                    </Button>
                </View>
            </View>

            <View className='page-body'>
                <Image className='vr-image' src={require('../../../assets/vr.png')} />

                <View className='tabs-container'>
                    <View className='tabs-bar'>
                        {tabs.map((tab, index) => (
                            <View key={index} className={`tab-bar-title ${activeTab === index ? 'tab-bar-title__selected' : ''}`} onClick={() => handleTabClick(index)} >
                                {tab.title}
                            </View>
                        ))}
                    </View>

                    <View className='tabs-content'>
                        {tabs.map((tab, index) => (
                            <View key={index} className={`tab-content ${activeTab === index ? 'active' : ''}`} onClick={() => handleClick(tab)} >
                                {tab.action}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
}
