import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, LogOut, Languages, Settings } from 'lucide-react';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, language, setLanguage } = useAppContext();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <Layout>
      <div className="container max-w-lg px-4 py-8">
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.profile')}</h1>
          {user && <p className="text-muted-foreground">{user.email}</p>}
        </div>

        <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Languages className="h-5 w-5 text-primary" />
              <span className="font-medium">Language</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}>
              {language === 'en' ? 'தமிழ்' : 'English'}
            </Button>
          </div>

          {user ? (
            <Button variant="destructive" className="w-full gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              {t('auth.logout')}
            </Button>
          ) : (
            <Button className="w-full bg-gradient-primary gap-2" onClick={() => navigate('/auth')}>
              {t('auth.login')}
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
