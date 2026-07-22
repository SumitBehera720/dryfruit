'use client';

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import PressMarquee from '../components/PressMarquee';
import BestSellers from '../components/BestSellers';
import ClientSpotlight from '../components/ClientSpotlight';
// import Infographic from '../components/Infographic';
import BrandStory from '../components/BrandStory';
import Categories from '../components/Categories';
import ClientReviewsMarquee from '../components/ClientReviewsMarquee';
import InstagramGallery from '../components/InstagramGallery';
import JournalSection from '../components/JournalSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <PressMarquee />
        <BestSellers />
        <ClientSpotlight />
        {/* <Infographic /> */}
        <BrandStory />
        <Categories />
        <ClientReviewsMarquee />
        <InstagramGallery />
        <JournalSection />
      </main>
      <Footer />
    </div>
  );
}
