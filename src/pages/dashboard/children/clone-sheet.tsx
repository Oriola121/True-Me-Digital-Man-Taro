import { View, Text, ScrollView, Image, Video, Button } from '@tarojs/components'
import { useState } from 'react';
import { X } from 'lucide-react';
import { RiLoader5Fill } from "react-icons/ri";
import './clone-sheet.scss'

export default function CloneSheet() {
    const [currentLevel, setCurrentLevel] = useState(1); 
    const [videoFile, setVideoFile] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const [progress, setProgress] = useState(0); 
    const maxFileSize = 500 * 1024 * 1024; // Maximum file size (500MB)

    const nextLevel = () => setCurrentLevel(2);
    const previousLevel = () => setCurrentLevel(1);

    const handleVideoUpload = async (event) => {
        // Get the uploaded file
        const file = event.target.files?.[0];
        // Check if file is within the size limit
        if (file) {
            if (file.size > maxFileSize) {
                alert('文件大小超过500MB限制，请选择较小的视频。');
                return;
            }

            setVideoFile(file);
            setLoading(true);

            // Simulate video upload progress
            let progressCount = 0;
            const interval = setInterval(() => {
                progressCount += 10;
                setProgress(progressCount);

                if (progressCount >= 100) {
                    clearInterval(interval);
                    setLoading(false);
                }
            }, 300);
        }
    };
    return (
        <View className='sheet-container'>
            <View className='clone-sheet-head'>
                <Text className='sheet-title'>{currentLevel === 1 ? '上传视频要求' : '创建您的数字人分身'}</Text>
            </View>
            <ScrollView scrollY className='sheet-body'>
                <View>
                    {currentLevel === 1 ? (
                        <View className='requirements'>
                            <Text className='requirements-list'>1、只有一张人脸出境</Text>
                            <Text className='requirements-list'>2、人脸不要太小，建议人脸宽度占整体画面宽度的1/3以上</Text>
                            <Text className='requirements-list'>3、人脸不要太大，确保整张人脸都在屏幕区域内，人脸不要出屏幕</Text>
                            <Text className='requirements-list'>4、确保面部特征没有被遮挡，并努力让面部清晰可见</Text>
                            <Text className='requirements-list'>5、不要出现1、2、3手势动作</Text>
                        </View>
                    ) : (
                        <View className='clone-sheet-head'>
                            <Text style={{ margin: '16px 0', fontSize: '16px', color: '#6B7280' }}>
                                通过上传您的手机拍摄的视频(支持1080p、2K、4K)，1分钟轻松复刻您的专属数字人分身。
                            </Text>
                        </View>
                    )}
                </View>

                <View className='sheet-section-2'>
                    {currentLevel === 1 ? (
                        <>
                            <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>拍摄不佳实例</Text>
                            <Image src={require('../../../assets/example-avatar.png')} style={{ width: '100%', height: 'auto' }} />
                        </>
                    ) : (
                        <View className='upload-section'>
                            <View className='upload-area'>
                                <Text style={{ fontSize: '16px', fontWeight: 500 }}>上传视频素材</Text>
                                {!videoFile ? (
                                    <label className='upload-box' htmlFor='video-upload'>
                                        <input id='video-upload' type='file' accept='video/*' onChange={handleVideoUpload} style={{ display: 'none' }} />
                                        <img src={require('../../../assets/cloudUpload.png')} alt='Upload' />
                                        <View className='upload-instruction'>
                                            <p style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '18px', fontWeight: 'bold' }}>
                                                <span style={{ color: '#ff5c01' }}>
                                                    点击上传
                                                </span>
                                                视频文件
                                            </p>
                                            <span style={{ fontSize: '14px', color: '#6B7280' }}>
                                                支持mp4视频30s以上, 最大500M
                                            </span>
                                        </View>
                                    </label>
                                ) : loading ? (
                                    <View className='upload-box'>
                                        <RiLoader5Fill className='loader-spin' />
                                        <Text style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>视频上传中
                                            <span style={{ color: '#ff5c01' }}>{progress}%</span>
                                        </Text>
                                    </View>
                                ) : (
                                    <View className='upload-box' style={{ position: 'relative' }}>
                                        <Video src={URL.createObjectURL(videoFile)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} controls />
                                        <Button className='remove-video-btn' onClick={() => setVideoFile(null)}>
                                            <X size={16} />
                                        </Button>
                                    </View>
                                )}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <View style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '18px', fontWeight: 500 }} htmlFor='name'>名称</label>
                                    <input id='name' type='text' placeholder='我的数字人名称' className='upload-name' />
                                </View>

                                <Text style={{ fontSize: '18px', fontWeight: 500 }}>免责声明</Text>

                                <ul className='disclaimer-list'>
                                    <li>
                                        请确认您使用的视频已获取其本人或团队授权
                                    </li>
                                    <li>
                                        您承诺您上传的视频严格遭守中国的法律法规要求,不涉及黄、赌、毒，及任何形式的政治敏感信息等
                                    </li>
                                    <li>
                                        如果您违反上述规定，存在任何违法行为，由此产生的所有法律责任由使用者自行承担
                                    </li>
                                </ul>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <View className='sheet-footer'>
                {currentLevel === 1 ? (
                    <View className='level-1-footer'>
                        <Button className='next-btn' onClick={nextLevel}>下一步</Button></View>
                ) : (
                    <View className='level-2-footer'>
                        <Button className='cancel-btn' onClick={previousLevel}>取消复刻</Button>
                        <Button className='submit-btn'>立即复刻</Button>
                    </View>
                )}
            </View>
        </View>
    )
}