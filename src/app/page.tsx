"use client"; 
import Link from "next/link";
import { useState, useEffect } from 'react';
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from 'axios';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [text, setText] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (textarea) {
          const lines = textarea.value.split('\n').length;
          const maxLines = Math.floor(window.innerHeight * 2 / 3 / parseFloat(getComputedStyle(textarea).lineHeight));
          if (lines >= maxLines) {
            event.preventDefault(); // Prevent default Enter behavior
            // Optionally handle the max line scenario, e.g., show a message
          }
        }
      }
    };

    textarea.addEventListener('keydown', handleKeyPress);

    return () => {
      textarea.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full overflow-hidden">
      <Link href={"/auth/login"}>Login</Link>
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
