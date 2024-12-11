import { View, Text, Image, Button } from '@tarojs/components';
import { PiCaretDownBold } from "react-icons/pi";
import AppSidebar from './sidebar/app-sidebar';
import './index.scss';

export default function Index() {
    return (
        <View className='layout'>
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
                        </View></View>
                </View>
            </View>
            <View className='content'>
                <AppSidebar />
            </View>
        </View>
    )
}