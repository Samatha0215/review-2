import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize from Local Storage safely
  const loadData = (key, defaultVal) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [users, setUsers] = useState(() => loadData('users', [{ email: 'admin@college.edu', password: 'password', name: 'Admin Account', role: 'admin' }]));
  const [currentUser, setCurrentUser] = useState(() => loadData('currentUser', null));
  const [bookings, setBookings] = useState(() => loadData('bookings', []));
  const [coupons, setCoupons] = useState(() => loadData('coupons', [{ code: 'FEST20', discount: 20 }]));
  const [availableTickets, setAvailableTickets] = useState(() => loadData('availableTickets', 100));

  // Sync to local storage
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { 
    if (!coupons.find(c => c.code === 'FEST20')) {
      setCoupons(prev => [...prev, { code: 'FEST20', discount: 20 }]);
    } else {
      localStorage.setItem('coupons', JSON.stringify(coupons)); 
    }
  }, [coupons]);
  useEffect(() => { localStorage.setItem('availableTickets', JSON.stringify(availableTickets)); }, [availableTickets]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if(user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    if(users.find(u => u.email === email)) return false; // Account Exists
    const newU = { name, email, password, role: 'user' };
    setUsers([...users, newU]);
    setCurrentUser(newU);
    return true;
  };

  const logout = () => setCurrentUser(null);
  
  const applyCoupon = (code) => coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

  const executeBooking = (bookingData, paymentData) => {
    const newBooking = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      date: new Date().toISOString(),
      userEmail: currentUser.email,
      ...bookingData,
      paymentData
    };
    
    setBookings([...bookings, newBooking]);
    setAvailableTickets(prev => prev - bookingData.tickets);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const bk = bookings.find(b => b.id === bookingId);
    if(bk) {
      setAvailableTickets(prev => prev + Number(bk.tickets));
      setBookings(bookings.filter(b => b.id !== bookingId));
    }
  };

  return (
    <AppContext.Provider value={{
      users, currentUser, bookings, coupons, availableTickets,
      login, register, logout, applyCoupon, executeBooking, cancelBooking,
      setCoupons, setAvailableTickets
    }}>
      {children}
    </AppContext.Provider>
  );
};
