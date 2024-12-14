import { useState } from 'react';
import { ScrollView, View, Image } from '@tarojs/components';
import { FaCheck } from "react-icons/fa";
import './public-image.scss';

const exampleImage = [
  'https://media.istockphoto.com/id/1356386941/photo/mature-man-looking-at-a-digital-tablet-that-a-colleague-is-showing-at-work.jpg?s=612x612&w=0&k=20&c=EQX9lSvl9cZsa6Ff4JrYtlyDLJwijWZfo84GC9C7otc=',
  'https://media.istockphoto.com/id/1502896527/photo/office-meeting-and-documents-of-business-people-clients-or-team-for-taxes-audit-or-revenue.jpg?s=612x612&w=0&k=20&c=tTrdNr2hqjUlq4totp3_Onn6b5h9L2KClfDGeIDvwik=',
  'https://media.istockphoto.com/id/637152194/photo/two-businesswomen-working-on-computer-in-office.jpg?s=612x612&w=0&k=20&c=n8W7BLHS_FqTYa2fo0bh1SaXkC94GEj0qnIEMURQ2L4=',
  'https://media.istockphoto.com/id/511549233/photo/college-student-having-meeting-with-tutor-to-discuss-work.jpg?s=612x612&w=0&k=20&c=mRLnOfA-_rQbiWxkjcbhP6nt-HAWqymW3in2lQEpucQ=',
  'https://media.istockphoto.com/id/1372615051/photo/caring-female-high-school-teacher-tutors-female-student.jpg?s=612x612&w=0&k=20&c=80rQ9bYR2K5L-K3l_BHfF6RZ_uwl9M5R-VWWgVB0_IU=',
  'https://media.istockphoto.com/id/1330966690/photo/taking-the-new-opportunity.jpg?s=612x612&w=0&k=20&c=6qcWCejrjurarLn_WVE2PzDuWkDmSAPeiYC3o83W7qs=',
  'https://media.istockphoto.com/id/1418067903/photo/a-saleswoman-soliciting-insurance-for-a-businessman.jpg?s=612x612&w=0&k=20&c=a73nuCuWgKFZ6MOzGN8Eiu4tZuprhNg1gDFnD4M-0KI=',
  'https://media.istockphoto.com/id/1216308723/photo/korean-graphic-designer-sharing-ideas-during-meeting-in-modern-office-studio.jpg?s=612x612&w=0&k=20&c=nvU0LY0piqHqHB17qcbWYkk3J72CCZxKmZnTPurqAZ0=',
];

export default function PublicImage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <ScrollView scrollY className='scroll-area'>
      <View className='image-grid'>
        {exampleImage.map((image, index) => (
          <View
            key={index}
            onClick={() => handleSelect(index)}
            className={`image-card ${selectedImage === index ? 'image-card--selected' : ''}`}
          >
            {selectedImage === index && (
              <View className='selection-indicator'>
                <FaCheck size={16} />
              </View>
            )}
            <Image src={image} className='image-preview' mode='aspectFill' />
            <View className='image-label'>适用模型: v8/v6/v5.1</View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
