import { View, Image, Input } from '@tarojs/components';
import { useState, useEffect } from 'react';
import './index.scss';

// Function to generate a random captcha string
const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 4; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

// Function to generate a base64 captcha image
const generateCaptchaImage = (text: string): string => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 120;
  canvas.height = 40;
  
  // Safely get context with type assertion
  const ctx = canvas.getContext('2d');
  
  // Additional null check
  if (!ctx) {
    console.error('Unable to get canvas context');
    return '';
  }

  // Fill background with a light color
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add some noise lines
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`;
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // Draw text
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Add some rotation and spacing to make it look more like a captcha
  text.split('').forEach((char, index) => {
    ctx.save();
    ctx.translate(20 + index * 20, 20);
    ctx.rotate((Math.random() - 0.5) * 0.5);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  });

  // Convert to base64
  return canvas.toDataURL('image/png');
};

// Define the prop types
interface CaptchaProps {
  onCaptchaChange: (captchaInfo: {
    inputValue: string;
    isValid: boolean;
    expectedCaptcha: string;
  }) => void;
}

export default function Captcha({ onCaptchaChange }: CaptchaProps) {
  const [captcha, setCaptcha] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');

  // Generate a new captcha on component mount
  useEffect(() => {
    refreshCaptcha();
  }, []);

  // Function to handle captcha refresh
  const refreshCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setCaptchaImage(generateCaptchaImage(newCaptcha));
    // Reset input when refreshing
    setInputCaptcha('');
  };

  // Handle input change and validation
  const handleInputChange = (e: any) => {
    const value = e.detail.value;
    setInputCaptcha(value);
    
    // Optional: Validate captcha in real-time
    const isValid = value.toLowerCase() === captcha.toLowerCase();
    onCaptchaChange({
      inputValue: value,
      isValid: isValid,
      expectedCaptcha: captcha
    });
  };

  return (
    <View className='captcha-container'>
        <Input
          type='text'
          placeholder='请输入图形验证码'
          value={inputCaptcha}
          onInput={handleInputChange}
          className='captcha-input'
          maxlength={4}
        />
        <Image
          src={captchaImage}
          className='captcha-image'
          onClick={refreshCaptcha}
          style={{ cursor: 'pointer' }}
        />
    </View>
  );
}