export interface Route {
  id: string;
  name: string;
  river: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Viegli' | 'Vidēji' | 'Izaicinoši';
  price: number;
  description: string;
  images: string[];
  mapUrl?: string;
  schedule?: string[];
  faq?: { q: string; a: string }[];
}

export interface Booking {
  id: string;
  routeId: string;
  date: string;
  participants: number;
  extras: string[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}
