/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ChefsRecommendations } from './components/ChefsRecommendations';
import { SignatureMenu } from './components/SignatureMenu';
import { DiningExperience } from './components/DiningExperience';
import { CustomerReviews } from './components/CustomerReviews';
import { TableReservation } from './components/TableReservation';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import { TableDraftDrawer } from './components/TableDraftDrawer';
import { INITIAL_MENU_ITEMS, MenuItem } from './data/restaurantData';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [orderWishlist, setOrderWishlist] = useState<MenuItem[]>([]);

  // Smooth scroll helper to reservation section
  const scrollToReservation = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll helper to menu section
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update price placeholder per requirement: "Do not invent official menu prices. Use editable placeholders until verified."
  const handleUpdatePrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pricePlaceholder: newPrice } : item))
    );
    if (selectedDish && selectedDish.id === id) {
      setSelectedDish((prev) => (prev ? { ...prev, pricePlaceholder: newPrice } : null));
    }
  };

  // Toggle dish in table order wishlist
  const handleToggleWishlist = (dish: MenuItem) => {
    setOrderWishlist((prev) => {
      const exists = prev.some((item) => item.id === dish.id);
      if (exists) {
        return prev.filter((item) => item.id !== dish.id);
      } else {
        return [...prev, dish];
      }
    });
  };

  const handleRemoveWishlistItem = (id: string) => {
    setOrderWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearWishlist = () => {
    setOrderWishlist([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#242A22] flex flex-col font-sans selection:bg-[#435334] selection:text-[#FAF8F5]">
      {/* Top Navigation Bar */}
      <Navbar onReserveClick={scrollToReservation} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Full-screen Cinematic Hero */}
        <Hero onExploreMenu={scrollToMenu} onReserveTable={scrollToReservation} />

        {/* 2. About Olive Garden Heritage */}
        <AboutSection />

        {/* 3. Chef's Recommendations Showcase */}
        <ChefsRecommendations
          onSelectDish={(dish) => setSelectedDish(dish)}
          onReserveClick={scrollToReservation}
        />

        {/* 4. Signature Interactive Menu */}
        <SignatureMenu
          menuItems={menuItems}
          onUpdatePrice={handleUpdatePrice}
          onSelectDish={(dish) => setSelectedDish(dish)}
          orderWishlist={orderWishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 5. Dining Experience & Atmosphere Gallery */}
        <DiningExperience />

        {/* 6. Customer Reviews & 4.6 Google Rating Showcase */}
        <CustomerReviews />

        {/* 7. Table Reservations Booking Interface */}
        <TableReservation orderWishlist={orderWishlist} />

        {/* 8. Aerocity Location & Contact Desk */}
        <LocationContact />
      </main>

      {/* Footer */}
      <Footer onReserveClick={scrollToReservation} />

      {/* Dish Detailed Look Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        isWishlisted={selectedDish ? orderWishlist.some((item) => item.id === selectedDish.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onUpdatePrice={handleUpdatePrice}
      />

      {/* Table Draft Wishlist Floating Drawer */}
      <TableDraftDrawer
        orderWishlist={orderWishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onClearAll={handleClearWishlist}
        onProceedToBooking={scrollToReservation}
      />
    </div>
  );
}
