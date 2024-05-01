"use client"; 
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const saveText = async () => {
    try {
      await axios.post('/api/saveText', { text });
      console.log('Text saved successfully');
    } catch (error) {
      console.error('Failed to save text', error);
    }
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <main className="flex min-h-screen w-full overflow-hidden">
      <textarea 
        placeholder={`Type away...${todayDate}`} 
        className="w-full h-full resize-none bg-black text-white p-4 outline-none border-none text-lg"
        autoFocus
        style={{ overflowY: 'hidden' }}
        value={text}
        onChange={handleTextChange}
        onBlur={saveText}
      />
    </main>
  );
}
