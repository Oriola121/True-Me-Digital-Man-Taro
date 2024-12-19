import { Textarea, Text, View, Picker, Input, Button } from "@tarojs/components";
import { PiCaretUp } from "react-icons/pi";
import { LuPencilLine } from "react-icons/lu";
import './text-driven.scss'

export function AIWritten() {
    return (
        <View className='ai-written'>
            <View style={{ width: '100%', height: '75%' }}>
                <View className='ai-written-instruction'>
                    <label htmlFor='名称'>名称</label>
                    <input className='ai-written-input' type='名称' placeholder='请输入视频的名称，方便查找识别' />
                </View>

                <View className='ai-written-editor'>
                    <Textarea className='ai-written-textarea' placeholder='欢迎使用语音编辑器' maxlength={3000} />
                    <View className='ai-written-select-option'>
                        AI改写
                    </View>
                    <Text className='ai-written-char-counter'>0 / 3000</Text>
                </View>
            </View>

            <View className='ai-written-word-setting'>
                <View className='ai-written-picker'>
                    100字/随意/通用场景
                    <PiCaretUp />
                </View>
                <View className='ai-written-picker'>
                    中文（简体）
                    <PiCaretUp />
                </View>
            </View>
            <View className='ai-written-footer'>
                <Input className='ai-written-footer-input' placeholder='请告诉我需要写些什么' />
                <Button className='ai-written-footer-button'><LuPencilLine /> AI创作</Button>
            </View>
        </View>
    );
}

export default function TextDriven() {
    return (
        <View className='text-driven'>
            <AIWritten />
        </View>
    );
}

