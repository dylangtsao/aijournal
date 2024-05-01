"use client"; 
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default Enter behavior
        const currentScrollPosition = textareaRef.current.scrollTop;
        setText(text + '\n');
        setTimeout(() => {
          textareaRef.current.scrollTop = currentScrollPosition;
        }, 0);
      }
    };

    textareaRef.current.addEventListener('keydown', handleKeyPress);

    return () => {
      textareaRef.current.removeEventListener('keydown', handleKeyPress);
    };
  }, [text]);

  return (
    <main className="flex min-h-screen w-full overflow-hidden">
      <textarea 
        ref={textareaRef}
        placeholder={`Type away...${todayDate}`} 
        className="w-full h-full resize-none bg-black text-white p-4 outline-none border-none text-lg"
        autoFocus
        style={{ overflowY: 'auto' }}
        value={text}
        onChange={handleTextChange}
        onBlur={saveText}
      />
    </main>
  );
}
