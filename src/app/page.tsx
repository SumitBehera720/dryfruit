'use client';

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import PressMarquee from '../components/PressMarquee';
import Categories from '../components/Categories';
import ShopByBenefits from '../components/ShopByBenefits';
import BestSellers from '../components/BestSellers';
import PromoBannerGrid from '../components/PromoBannerGrid';
import AboutSection from '../components/AboutSection';
import BrandStory from '../components/BrandStory';
import BlogSection from '../components/BlogSection';
import ClientSpotlight from '../components/ClientSpotlight';
import ShoppableVideos from '../components/ShoppableVideos';
import FestiveGiftingBanner from '../components/FestiveGiftingBanner';
import ClientReviewsMarquee from '../components/ClientReviewsMarquee';
import InstagramGallery from '../components/InstagramGallery';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <PressMarquee />
        
        {/* Shop By Category */}
        <Categories />
        
        {/* Shop By Health Benefits */}
        <ShopByBenefits />
        
        <BestSellers />
        <PromoBannerGrid />
        
        {/* About Section */}
        <AboutSection />
        <BrandStory />

        {/* Blog / Wellness Journal Section */}
        <BlogSection />

        <ClientSpotlight />
        <ShoppableVideos />
        <FestiveGiftingBanner />
        <ClientReviewsMarquee />
        <InstagramGallery />
      </main>
      <Footer />
      
      {/* Floating WhatsApp Quick Chat */}
      <WhatsAppButton />
    </div>
  );
}
