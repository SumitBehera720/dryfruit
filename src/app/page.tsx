'use client';

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import PressMarquee from '../components/PressMarquee';
import BestSellers from '../components/BestSellers';
import PromoBannerGrid from '../components/PromoBannerGrid';
import ClientSpotlight from '../components/ClientSpotlight';
import ShoppableVideos from '../components/ShoppableVideos';
import BrandStory from '../components/BrandStory';
import Categories from '../components/Categories';
import FestiveGiftingBanner from '../components/FestiveGiftingBanner';
import ClientReviewsMarquee from '../components/ClientReviewsMarquee';
import InstagramGallery from '../components/InstagramGallery';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <PressMarquee />
        <BestSellers />
        <PromoBannerGrid />
        <ClientSpotlight />
        <ShoppableVideos />
        <BrandStory />
        <Categories />
        <FestiveGiftingBanner />
        <ClientReviewsMarquee />
        <InstagramGallery />
      </main>
      <Footer />
    </div>
  );
}
