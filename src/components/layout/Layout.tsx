import React from 'react';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { VoiceChatButton } from '@/components/voice/VoiceChatButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-20 md:pb-8">
        {children}
      </main>
      <BottomNav />
      <VoiceChatButton />
    </div>
  );
};
