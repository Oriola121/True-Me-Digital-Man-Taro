import { Button, Text, View, Image, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { X } from 'lucide-react';
import './page.scss';
import CloneSheet from './clone-sheet';
import CreateVideo from './create-video';

export function ImageClone({ letsCloneImage, handleCloneImage }: { letsCloneImage: boolean, handleCloneImage: () => void }) {
    return (
        <View className='clone-container' onClick={handleCloneImage}>
            <View className='icon-wrapper'>
                <PiPlusBold size={16} />
            </View>
            <Text className='clone-text'>复刻形象克隆</Text>
            {letsCloneImage && <Text>克隆中...</Text>}
        </View>
    )
}

export default function Page({ toggleLoader }) {
    const [letsCloneImage, setLetsCloneImage] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [letsCreateVideo, setLetsCreateVideo] = useState(false);

    const handleCreateVideo = () => {
        if (letsCreateVideo) {
            toggleLoader(true, true); // Show loader moving right-to-left
            setIsClosing(true);

            setTimeout(() => {
                setLetsCreateVideo(false);
                setIsClosing(false);
                toggleLoader(false); // Hide loader after animation
            }, 500);
        } else {
            toggleLoader(true); // Show loader moving left-to-right
            setLetsCreateVideo(true);

            setTimeout(() => {
                toggleLoader(false); // Hide loader after animation
            }, 500);
        }
    };

    const handleCloneImage = () => {
        if (letsCloneImage) {
            setIsClosing(true);
            setTimeout(() => {
                setLetsCloneImage(false);
                setIsClosing(false);
            }, 500);
        } else {
            setLetsCloneImage(true);
        }
    }

    const [tabs] = useState([
        { title: '我的形象', action: <ImageClone letsCloneImage={letsCloneImage} handleCloneImage={handleCloneImage} /> },
        { title: '公共形象', },
    ]);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const handleClick = (item: any) => {
        console.log('Clicked item:', item);
    };

    const [isHovered, setIsHovered] = useState(false);

    return (
        <View className='page'>
            <View className='page-head'>
                <Text className='head-text'>形象克隆</Text>

                <View>
                    <Button onClick={handleCreateVideo} className='head-button'>
                        <PiPlusBold color='white' />
                        创建视频
                    </Button>
                </View>
            </View>

            <View className='page-body'>
                <Image onClick={handleCloneImage} className='vr-image' src={require('../../../assets/vr.png')} />

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

            {letsCloneImage && (
                <View className='sheet-overlay' onClick={handleCloneImage}>
                    <View className={`sheet-overlay-content ${isClosing ? 'close' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <View className='close-button' onClick={handleCloneImage} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} >
                            <X onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ cursor: 'pointer', color: isHovered ? 'red' : 'black', transition: 'color 0.3s ease' }} />
                        </View>
                        <CloneSheet />
                    </View>
                </View>
            )}

            {letsCreateVideo && (
                <View className={`create-video ${isClosing ? 'close' : ''}`} onClick={(e) => e.stopPropagation()} >
                    <ScrollView className='create-video-content'>
                        <CreateVideo onClose={handleCreateVideo} />
                    </ScrollView>
                </View>
            )}
        </View>
    );
}
