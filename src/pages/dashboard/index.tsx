import { View, Text, Image, Button } from '@tarojs/components';
import { useState } from 'react';
import { PiCaretDownBold } from "react-icons/pi";
import AppSidebar from './sidebar/app-sidebar';
import './index.scss';
import Page from './children/page';

// Loader Component
function Loader({ isClosing }: { isClosing: boolean }) {
    return (
        <View className={`top-loader ${isClosing ? 'reverse' : ''}`} />
    );
}

export default function Index() {
    const [showLoader, setShowLoader] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const toggleLoader = (state: boolean, closing = false) => {
        setShowLoader(state);
        setIsClosing(closing);
    };

    return (
        <View className='layout'>
            {/* Top Loader */}
            {showLoader && <Loader isClosing={isClosing} />}

            {/* Header */}
            <View className='header'>
                <View className='header-left'>
                    <Image src={require('../../assets/logo.png')} className='logo-icon' />
                    <Text className='logo-text'>真我数字人</Text>
                </View>

                <View className='header-right'>
                    <View className='side1'>
                        <Button className='btn1'>分销中心</Button>
                        <Button className='btn2'>优惠套餐</Button>
                    </View>

                    <View className='side2'>
                        <View className='points'>
                            <Text>Points:</Text>
                            <Text>0</Text>
                        </View>

                        <View className='user-info'>
                            <Image className='avatar' src={require('../../assets/avatar.jpeg')} />
                            <Text className='username'>微信用户_17205</Text>
                            <View>
                                <PiCaretDownBold size={16} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Content */}
            <View className='content'>
                <AppSidebar />
                <Page toggleLoader={toggleLoader} />
            </View>
        </View>
    );
}
