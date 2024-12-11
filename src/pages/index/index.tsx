import Taro from '@tarojs/taro';
import { View, Text, Image, Input, Button, Checkbox, Picker } from '@tarojs/components';
import { useState } from 'react';
import Captcha from './captcha';
import './index.scss';

// Country code data
const countryCodes = [
  { name: 'China', code: '+86' },
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'India', code: '+91' },
  { name: 'Australia', code: '+61' },
  { name: 'Nigeria', code: '+234' }
];

export default function Index() {
  // State variables
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  
  // OTP-related states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [generatedOTP, setGeneratedOTP] = useState('');

  // Handle captcha change from the Captcha component
  const handleCaptchaChange = (captchaInfo) => {
    setCaptchaValid(captchaInfo.isValid);
    setCaptchaInput(captchaInfo.inputValue);
  };

  // Generate 4-digit OTP
  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Handle OTP request
  const handleRequestOTP = () => {
    // Validate phone number
    const phoneRegex = /^\d{10}$/; // Adjust regex based on country-specific phone number formats
    if (!phoneRegex.test(phone)) {
      Taro.showToast({ 
        title: '请输入有效的手机号码', 
        icon: 'none' 
      });
      return;
    }

    if (!captchaValid) {
      Taro.showToast({ 
        title: '请先完成图形验证码', 
        icon: 'none' 
      });
      return;
    }

    // Generate and send OTP
    const otp = generateOTP();
    setGeneratedOTP(otp);
    setOtpSent(true);
    
    // Start countdown
    setOtpCountdown(60);

    // In a real app, you would send this OTP to the user's phone via SMS
    console.log(`OTP sent to ${countryCode.code}${phone}: ${otp}`);

    // Start countdown timer
    const timer = setInterval(() => {
      setOtpCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          setOtpSent(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Check agreement
    if (!agreementChecked) {
      Taro.showToast({ 
        title: '请同意服务协议', 
        icon: 'none' 
      });
      return;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/; // Adjust as needed
    if (!phoneRegex.test(phone)) {
      Taro.showToast({ 
        title: '请输入有效的手机号码', 
        icon: 'none' 
      });
      return;
    }

    // Validate OTP
    if (verificationCode !== generatedOTP) {
      Taro.showToast({ 
        title: '验证码错误', 
        icon: 'none' 
      });
      return;
    }

    // If all validations pass, proceed to dashboard
    Taro.navigateTo({ url: '/pages/dashboard/index' });
  };

  // Handle country code selection
  const handleCountryCodeChange = (e) => {
    setCountryCode(countryCodes[e.detail.value]);
  };

  return (
    <View className='onboarding-page'>
      <View className='form-container'>
        <View className='logo-display'>
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
            {/* Country Code and Phone Number */}
            <View className='input-group'>
              <Text className='label'>手机号</Text>
              <View className='phone-input-container'>
                <Picker 
                  mode='selector' 
                  range={countryCodes.map(c => c.code)} 
                  onChange={handleCountryCodeChange}
                  className='country-code-picker'
                >
                  <View className='country-code-selector'>
                    {countryCode.code}
                  </View>
                </Picker>
                <Input
                  type='number'
                  placeholder='请输入手机号'
                  value={phone}
                  onInput={(e) => setPhone(e.detail.value)}
                  className='phone-input'
                  maxlength={11}
                />
              </View>
            </View>

            {/* Captcha */}
            <View className='input-group'>
              <Text className='label'>图形验证码</Text>
              <Captcha onCaptchaChange={handleCaptchaChange} />
            </View>

            {/* Verification Code */}
            <View className='input-group'>
              <Text className='label'>短信验证码</Text>
              <View className='verification-code-container'>
                <Input
                  type='number'
                  placeholder='请输入短信验证码'
                  value={verificationCode}
                  onInput={(e) => setVerificationCode(e.detail.value)}
                  className='verification-code-input'
                  maxlength={4}
                />
                <Button 
                  className='verification-code-button'
                  disabled={otpSent && otpCountdown > 0}
                  onClick={handleRequestOTP}
                >
                  {otpSent && otpCountdown > 0 
                    ? `重新发送 (${otpCountdown}s)` 
                    : '获取验证码'}
                </Button>
              </View>
            </View>
          </View>

          {/* Submit Button and Agreement */}
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