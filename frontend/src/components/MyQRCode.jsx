import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

export const MyQRCode = ({ persona, value, videoUrl }) => {
  const [qrValue, setQrValue] = useState('');
  // console.log('MyQRCode persona:', persona);
  // console.log('MyQRCode value:', value);
  const getVideoUrl = async (persona) => {
    try {
      // const response = await fetch('https://choice-goose-loved.ngrok-free.app/upload_video', {
      // const response = await fetch('https://longhorn-verified-tetra.ngrok-free.app/upload_video', {
      // const response = await fetch('http://localhost:8081/upload_video', {
      const response = await fetch('api/upload_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({ 'persona': persona, 'text': value }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.video_url;
    } catch (error) {
      console.error('Error fetching video URL:', error);
      return '';
    }
  };

	useEffect(() => {
		if (videoUrl !== '') {
			getVideoUrl(persona)
			.then((video_url) => {
				setQrValue(video_url);
			});
		}
		else {
			setQrValue('');
		}
	}, [videoUrl, persona]);

	return (
		<div className="qr-code-wrapper">
			<QRCode
				value={qrValue}
				className={qrValue === '' ? 'qr-code' : 'qr-code qr-code-animation'}
				fgColor="#aa05c7"
			/>
			<div className="short-link" ><a href={qrValue} target='parent' >{qrValue}</a></div>
		</div>
  );
};

