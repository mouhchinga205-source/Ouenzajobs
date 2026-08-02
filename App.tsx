/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DirectoryView } from './components/DirectoryView';
import { AdminDashboard } from './components/AdminDashboard';
import { StaticPageView } from './components/StaticPageView';
import { Footer } from './components/Footer';
import { SubmissionModal } from './components/SubmissionModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { AdDetailModal } from './components/AdDetailModal';
import { StaticPageModal } from './components/StaticPageModal';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-cairo transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'admin' ? (
          <AdminDashboard />
        ) : activeTab === 'static-page' ? (
          <StaticPageView />
        ) : (
          <>
            <HeroBanner />
            <DirectoryView />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <SubmissionModal />
      <ProfileDetailModal />
      <AdDetailModal />
      <StaticPageModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

