"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

const BlobSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fill="#FFF9C4" d="M44.8,-67.2C57.7,-59.2,67.7,-48.1,73.2,-34.9C78.7,-21.7,79.7,-6.4,76.2,7.7C72.7,21.8,64.7,34.7,55.1,46.2C45.5,57.7,34.3,67.8,21.1,72.7C7.9,77.6,-7.3,77.3,-22.2,73.2C-37.1,69.1,-51.7,61.2,-61.2,49.1C-70.7,37.1,-75.1,20.9,-75.2,5.1C-75.3,-10.7,-71.2,-26.1,-62.7,-37.7C-54.2,-49.3,-41.3,-57.1,-27.5,-64.2C-13.7,-71.3,1,-77.7,15.7,-77.2C30.4,-76.7,44.8,-67.2,44.8,-67.2Z" transform="translate(100 100)" />
  </svg>
);

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function CountUp({ end, inView, prefix = '', suffix = '', duration = 1200 }: { end: string; inView: boolean; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const isCurrency = typeof end === 'string' && end.startsWith('$');
    const isPlus = typeof end === 'string' && end.endsWith('+');
    let target: number = 0;
    if (isCurrency) target = parseFloat(end.replace(/[$+,]/g, ''));
    else if (isPlus) target = parseFloat(end.replace(/[+,]/g, ''));
    else target = parseFloat(end);
    if (isNaN(target)) return setCount(0);
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(target);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [inView, end]);
  let display: string = count.toLocaleString();
  if (typeof end === 'string') {
    if (end.startsWith('$')) display = `$${count.toLocaleString()}`;
    else display = count.toLocaleString();
    if (end.endsWith('+')) display += '+';
    if (end.includes('M')) display = `$${(count / 1e6).toFixed(1)}M+`;
    if (end.includes('K')) display = `$${(count / 1e3).toFixed(1)}K+`;
  }
  return <span>{prefix}{display}{suffix}</span>;
}

const stats = [
  {
    label: "Total Resellers",
    value: "2500+",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#FFD600"/></svg>
    ),
  },
  {
    label: "Total Transaction Amount",
    value: "$12000000+",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9zm0-16c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7zm1 10h-2v-1h2v1zm0-2h-2V7h2v6z" fill="#FFD600"/></svg>
    ),
  },
  {
    label: "Total Commission Given",
    value: "$1200000+",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M17 17v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m14 0v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2m14 0h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-6 0V7a4 4 0 018 0v2" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
  {
    label: "Total Countries",
    value: "30+",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#FFD600"/></svg>
    ),
  },
];

export default function Home() {
  // Feature image refs and inView states
  const [img1Ref, img1InView] = useInView();
  const [img2Ref, img2InView] = useInView();
  const [img3Ref, img3InView] = useInView();
  const [statsRef, statsInView] = useInView();

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-yellow-400/90 overflow-hidden animate-fade-in-up">
        <BlobSVG className="absolute -top-32 -left-32 w-[400px] h-[400px] opacity-40 -z-10 animate-blob-float" />
        <Image src="/images/logo.png" alt="Global Send Logo" width={80} height={80} className="mb-4 animate-fade-in-up delay-100 rounded-full shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in-up delay-200 text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #f34236, #e91e62)' }}>Global Send</h1>
        <TypingText className="text-lg md:text-2xl text-gray-800 mb-8 max-w-xl animate-fade-in-up delay-300" />
        <DownloadWithProgress />
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative z-10 max-w-5xl mx-auto w-full -mt-10 mb-10 px-4 animate-fade-in-up delay-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white rounded-2xl shadow-lg py-8 px-4 md:px-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col items-center text-center animate-pop-in`} style={{ animationDelay: `${i * 120}ms` }}>
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">
                <CountUp end={stat.value} inView={statsInView} />
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Section 1: Image Left, Text Right */}
      <section className="relative flex flex-col md:flex-row items-center gap-10 py-16 px-4 max-w-6xl mx-auto w-full overflow-hidden animate-fade-in-up delay-300">
        <BlobSVG className="absolute -top-24 -left-24 w-[300px] h-[300px] opacity-30 -z-10 animate-blob-float-slow" />
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <Image
            ref={img1Ref}
            src="/images/homescreen.png"
            alt="App Home Screen"
            width={220}
            height={380}
            className={`rounded-2xl shadow-2xl object-cover w-full max-w-[220px] animate-fade-in-up transition-all duration-700 ${img1InView ? 'slide-in-left opacity-100' : 'opacity-0 -translate-x-16'}`}
          />
        </div>
        <div className="flex-1 z-10 animate-fade-in-up delay-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Secure Transfers</h2>
          <p className="text-gray-700 text-lg mb-4">Your money is protected with industry-leading security and encryption. Send with confidence, knowing your funds are safe.</p>
        </div>
      </section>

      {/* Feature Section 2: Image Right, Text Left */}
      <section className="relative flex flex-col md:flex-row-reverse items-center gap-10 py-16 px-4 max-w-6xl mx-auto w-full bg-white/80 overflow-hidden animate-fade-in-up delay-400">
        <BlobSVG className="absolute -bottom-24 -right-24 w-[300px] h-[300px] opacity-30 -z-10 animate-blob-float" />
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <Image
            ref={img2Ref}
            src="/images/add_money.png"
            alt="App Home Screen"
            width={220}
            height={380}
            className={`rounded-2xl shadow-2xl object-cover w-full max-w-[220px] animate-fade-in-up transition-all duration-700 ${img2InView ? 'slide-in-right opacity-100' : 'opacity-0 translate-x-16'}`}
          />
        </div>
        <div className="flex-1 z-10 animate-fade-in-up delay-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Fast Delivery</h2>
          <p className="text-gray-700 text-lg mb-4">Send money instantly to your loved ones, anytime, anywhere. Experience lightning-fast transfers with Global Send.</p>
        </div>
      </section>

      {/* Feature Section 3: Image Left, Text Right */}
      <section className="relative flex flex-col md:flex-row items-center gap-10 py-16 px-4 max-w-6xl mx-auto w-full overflow-hidden animate-fade-in-up delay-500">
        <BlobSVG className="absolute -top-24 -left-24 w-[300px] h-[300px] opacity-30 -z-10 animate-blob-float-slow" />
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <Image
            ref={img3Ref}
            src="/images/history.png"
            alt="App Home Screen"
            width={220}
            height={380}
            className={`rounded-2xl shadow-2xl object-cover w-full max-w-[220px] animate-fade-in-up transition-all duration-700 ${img3InView ? 'slide-in-left opacity-100' : 'opacity-0 -translate-x-16'}`}
          />
        </div>
        <div className="flex-1 z-10 animate-fade-in-up delay-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Low Fees</h2>
          <p className="text-gray-700 text-lg mb-4">Enjoy some of the lowest transfer fees in the market. More money stays in your pocket and reaches your loved ones.</p>
        </div>
      </section>

      {/* Customer Review Carousel */}
      <section className="relative py-16 px-4 max-w-2xl mx-auto w-full flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">What Our Customers Say</h2>
        <CustomerReviewCarousel />
      </section>

      {/* Map Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">Visit Our Office</h2>
          
          {/* Location Marker */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-yellow-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#f34236] to-[#e91e62] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Global Send Head Office</p>
                <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7827324378677!2d90.3507053!3d23.79075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c100711feb3f%3A0x3869472d4bbac175!2z4KaX4KeN4Kay4KeL4Kas4Ka-4KayIOCmuOCnh-CmqOCnjeCmoSDgprLgpr_gpq7gpr_gpp_gp4fgpqE!5e0!3m2!1sen!2sbd!4v1746421179437!5m2!1sen!2sbd" 
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Custom Map Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-[#f34236] to-[#e91e62] rounded-full flex items-center justify-center shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
                  </svg>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                  <p className="font-semibold text-gray-900 text-sm">Global Send</p>
                  <p className="text-xs text-gray-600">Head Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-600 bg-white border-t border-yellow-100 animate-fade-in-up delay-700">
        &copy; {new Date().getFullYear()} Global Send. All rights reserved.
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/1234567890" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl animate-wa-bounce hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#25D366" />
          <path d="M23.472 19.339c-.355-.177-2.104-1.037-2.43-1.156-.326-.119-.563-.177-.8.178-.237.355-.914 1.156-1.122 1.393-.207.237-.414.267-.769.089-.355-.178-1.5-.553-2.86-1.763-1.057-.944-1.77-2.108-1.98-2.463-.207-.355-.022-.546.155-.723.159-.158.355-.414.533-.622.178-.207.237-.355.355-.592.119-.237.06-.444-.03-.622-.089-.178-.8-1.924-1.096-2.637-.289-.693-.583-.599-.8-.61-.207-.009-.444-.011-.681-.011-.237 0-.622.089-.948.444-.326.355-1.24 1.211-1.24 2.951 0 1.74 1.267 3.422 1.444 3.659.178.237 2.5 3.822 6.063 5.215.849.292 1.51.466 2.027.596.851.203 1.626.174 2.24.106.683-.076 2.104-.859 2.403-1.691.296-.832.296-1.545.207-1.691-.089-.148-.326-.237-.681-.414z" fill="#fff" />
        </svg>
      </a>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7); }
          80% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in {
          animation: pop-in 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes blob-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        .animate-blob-float {
          animation: blob-float 7s ease-in-out infinite;
        }
        .animate-blob-float-slow {
          animation: blob-float 12s ease-in-out infinite;
        }
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .slide-in-left {
          animation: slide-in-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right {
          animation: slide-in-right 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes logo-bounce {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-18px); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-10px); }
          80% { transform: translateY(0); }
        }
        .animate-logo-bounce {
          animation: logo-bounce 2.2s cubic-bezier(0.23, 1, 0.32, 1) infinite;
        }
        @keyframes wa-bounce {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-10px); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-6px); }
          80% { transform: translateY(0); }
        }
        .animate-wa-bounce {
          animation: wa-bounce 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
        }
      `}</style>
    </div>
  );
}

function CustomerReviewCarousel() {
  const reviews = [
    {
      name: "Robiul Islam",
      avatar: "https://agqgdagxuquioslljswr.supabase.co/storage/v1/object/public/images/alamtanvir257@gmail.com/1745775364387",
      text: "লেনদেন সহজ। আমি এটি প্রতিদিন ব্যবহার করি।",
      rating: 5,
    },
    {
      name: "Sohag Hossain",
      avatar: "https://ofxmtsetqvaxyqwdsowg.supabase.co/storage/v1/object/public/fakeimages//451832321_886699950160725_8311947380942117697_n.jpg",
      text: "সবচেয়ে কম ফি এবং সবচেয়ে ভাল রেট।",
      rating: 5,
    },
    {
      name: "Mohammad Sohanur Rahman",
      avatar: "https://ofxmtsetqvaxyqwdsowg.supabase.co/storage/v1/object/public/fakeimages//73.jpg",
      text: "অ্যাপটি ব্যবহার করা খুব সহজ। সেরা অ্যাপ।",
      rating: 4,
    },
    {
      name: "Zobayer Hossain",
      avatar: "https://ofxmtsetqvaxyqwdsowg.supabase.co/storage/v1/object/public/fakeimages//13.jpg",
      text: "রিসেলার গ্রুপ এবং কাস্টমার সাপোর্ট সবচেয়ে ভাল।",
      rating: 5,
    },
  ];
  // Use placeholder avatars if local images are missing
  const placeholderAvatars = [
    "https://agqgdagxuquioslljswr.supabase.co/storage/v1/object/public/images/alamtanvir257@gmail.com/1745775364387",
    "https://ofxmtsetqvaxyqwdsowg.supabase.co/storage/v1/object/public/fakeimages//451832321_886699950160725_8311947380942117697_n.jpg",
    "https://ofxmtsetqvaxyqwdsowg.supabase.co/storage/v1/object/public/fakeimages//73.jpg",
    "https://ofxmtsetqvaxyqwdsowg.supabase.co/storage/v1/object/public/fakeimages//13.jpg",
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => setIdx((i) => (i + 1) % reviews.length), 4000);
    return () => clearTimeout(timer);
  }, [idx]);
  const review = reviews[idx];
  const avatarSrc = review.avatar || placeholderAvatars[idx % placeholderAvatars.length];
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full transition-all duration-500 animate-fade-in-up">
        <div className="flex flex-col items-center">
          <img src={avatarSrc} alt={review.name} className="w-16 h-16 rounded-full shadow mb-4 object-cover" />
          <div className="flex mb-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={i < review.rating ? '#FFD600' : '#E0E0E0'} />
              </svg>
            ))}
          </div>
          <p className="text-gray-700 text-lg text-center mb-4">“{review.text}”</p>
          <div className="font-semibold text-gray-900">{review.name}</div>
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === idx ? 'bg-gradient-to-r from-[#f34236] to-[#e91e62]' : 'bg-gray-300'} transition-all`}
            onClick={() => setIdx(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <button
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          onClick={() => setIdx((idx - 1 + reviews.length) % reviews.length)}
          aria-label="Previous review"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <button
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          onClick={() => setIdx((idx + 1) % reviews.length)}
          aria-label="Next review"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

function TypingText({ className = "" }: { className?: string }) {
  const texts = [
    "Fast, secure, and affordable.",
    "Send money worldwide in seconds.",
    "Trusted by thousands worldwide."
  ];
  const [displayed, setDisplayed] = React.useState("");
  const [textIdx, setTextIdx] = React.useState(0);
  React.useEffect(() => {
    let i = 0;
    let isTyping = true;
    let interval: NodeJS.Timeout;
    function type() {
      interval = setInterval(() => {
        if (isTyping) {
          setDisplayed(texts[textIdx].slice(0, i + 1));
          i++;
          if (i === texts[textIdx].length) {
            isTyping = false;
            clearInterval(interval);
            setTimeout(() => backspace(), 1200); // Pause before backspacing
          }
        }
      }, 55);
    }
    function backspace() {
      interval = setInterval(() => {
        setDisplayed((current) => current.slice(0, -1));
        i--;
        if (i === 0) {
          clearInterval(interval);
          setTextIdx((currentIdx) => (currentIdx + 1) % texts.length);
          setTimeout(() => type(), 600); // Pause before retyping
        }
      }, 30);
    }
    type();
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [textIdx]);
  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-2 h-6 align-middle bg-gradient-to-r from-[#f34236] to-[#e91e62] ml-1 animate-blink-cursor" />
      <style jsx>{`
        .animate-blink-cursor {
          animation: blink-cursor 1s steps(2, start) infinite;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

function DownloadWithProgress() {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleDownload = async () => {
    try {
      setError(null);
      setDownloading(true);
      setProgress(0);
      
      const url = "https://raw.githubusercontent.com/paybd/grs-remit-for-me/main/public/gs_agent.apk";
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      if (!response.body) {
        throw new Error('No response body received from server');
      }
      
      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (total === 0) {
        throw new Error('Could not determine file size');
      }
      
      const reader = response.body.getReader();
      let received = 0;
      const chunks = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        setProgress(total ? Math.round((received / total) * 100) : 0);
      }
      
      // Combine chunks and trigger download
      const blob = new Blob(chunks, { type: 'application/vnd.android.package-archive' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "app.apk";
      link.click();
      
      // Clean up
      URL.revokeObjectURL(link.href);
      
      // Show instructions after download starts
      setShowInstructions(true);
    } catch (error) {
      console.error('Download error:', error);
      setError(error instanceof Error ? error.message : 'Failed to download the app');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="font-bold px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition text-lg flex items-center gap-2 animate-fade-in-up delay-400 text-white bg-gradient-to-r"
        style={{ backgroundImage: 'linear-gradient(to right, #f34236, #e91e62)' }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M7 17l5 5 5-5M12 12v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {downloading ? "Downloading..." : "Download App"}
      </button>
      {downloading && (
        <div className="w-64 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-[#f34236] to-[#e91e62] h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm mt-2 bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      {showInstructions && (
        <div className="text-sm text-gray-600 mt-2 bg-yellow-50 px-4 py-2 rounded-lg max-w-md text-center">
          <p className="font-semibold mb-1">Next Steps:</p>
          <p>After the download completes, open the APK file from your browser&apos;s download bar or your device&apos;s file manager to install.</p>
        </div>
      )}
    </div>
  );
}

