import { View, Text, Image, Input, Button, Checkbox } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';

export default function Index() {
  const [phone, setPhone] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);

  const handleSubmit = () => {
    if (!agreementChecked) {
      console.error('You must agree to the terms and conditions.');
      return;
    }
    console.log({ phone, captcha, verificationCode });
    // Add form submission logic
  };

  return (
    <View className='onboarding-page'>
      <View className='form-container'>
        <View className='header'>
          <View className='logo-title-container'>
            <Image src={require('../../assets/logo.png')} className='logo' />
            <Text className='title'>真我数字人</Text>
          </View>
          <Text className='subtitle'>
            30秒视频，1分钟轻松复刻专属您的数字人分身
          </Text>
        </View>

        <View className='form'>
          <View className='form-group'>
            <View className='input-group'>
              <Text className='label'>手机号</Text>
              <Input
                type='text'
                placeholder='请输入手机号'
                value={phone}
                onInput={(e) => setPhone(e.detail.value)}
                className='input'
              />
            </View>

            <View className='input-group'>
              <Text className='label'>图形验证码</Text>
              <View className='captcha-container'>
                <Input
                  type='text'
                  placeholder='请输入图形验证码'
                  value={captcha}
                  onInput={(e) => setCaptcha(e.detail.value)}
                  className='captcha-input'
                />
                <Image src={require('../../assets/logo.png')} className='captcha-image' />
              </View>
            </View>

            <View className='input-group'>
              <Text className='label'>短信验证码</Text>
              <View className='verification-code-container'>
                <Input
                  type='text'
                  placeholder='请输入短信验证码'
                  value={verificationCode}
                  onInput={(e) => setVerificationCode(e.detail.value)}
                  className='verification-code-input'
                />
                <Button className='verification-code-button'>获取验证码</Button>
              </View>
            </View>
          </View>

          <View className='agreement-button'>
            <Button className='submit-button' onClick={handleSubmit}>
              登录
            </Button>

            <View className='agreement'>
              <Checkbox
                style={{
                  width: '25px',
                  height: '20px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -15,
                  cursor: 'pointer'
                }}
                value='agreement'
                checked={agreementChecked}
                onClick={() => setAgreementChecked(!agreementChecked)}
              />
              <Text className='agreement-text'>
                未注册的手机号将自动注册，勾选即代表您同意并接受
                <Text className='link'>《服务协议》</Text>与
                <Text className='link'>《隐私政策》</Text>
              </Text>
            </View>
          </View>
          <Text className='footer'>
            淮安向上进化文化传媒有限公司 版权所有 苏ICP备2023007175号
          </Text>
        </View>
      </View>
    </View>
  );
}
