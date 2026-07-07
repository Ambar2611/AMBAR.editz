import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      setScrollProgress(pct);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#14161a]/90 backdrop-blur-md border-b border-line">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 py-[18px]">
        <div className="font-display text-[22px] tracking-[0.5px]">
          AMBAR<span className="text-accent-amber">.editz</span>
        </div>
        <div className="hidden md:flex gap-7 text-sm text-text-muted font-mono">
          <a href="#about" className="hover:text-text-main transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber rounded-sm">About</a>
          <a href="#services" className="hover:text-text-main transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber rounded-sm">Services</a>
          <a href="#contact" className="hover:text-text-main transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber rounded-sm">Contact</a>
        </div>
      </div>
      <div className="h-[3px] bg-line relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full scrubhead"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="max-w-[1100px] mx-auto px-6 pt-[110px] pb-[90px]">
      <div className="font-mono text-[13px] text-accent-amber tracking-[2px] uppercase mb-[18px] flex items-center gap-2.5 eyebrow-dot">
        00:00:00:00 — Now Playing
      </div>
      <h1 className="font-display font-normal text-[clamp(42px,7vw,84px)] leading-[0.98] tracking-[0.5px] max-w-[900px]">
        Frame by frame,<br/>story by <em className="not-italic text-accent-teal">story.</em>
      </h1>
      <p className="mt-[26px] max-w-[560px] text-text-muted text-[17px]">
        I'm a video editor specializing in YouTube vlogs, working in DaVinci Resolve to turn raw footage into clean, engaging edits — with the range to handle reels, promos, and every other format in between.
      </p>
      <div className="mt-[36px] flex flex-wrap gap-4">
        <a href="#services" className="font-mono text-sm px-[26px] py-[14px] rounded-[3px] inline-flex items-center gap-2.5 bg-accent-amber text-[#14161a] font-semibold hover:bg-[#ee8c4f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-amber">
          View services <ArrowRight size={16} />
        </a>
        <a href="https://www.fiverr.com/ambar2611" target="_blank" rel="noopener noreferrer" className="font-mono text-sm px-[26px] py-[14px] rounded-[3px] inline-flex items-center gap-2.5 border border-line text-text-main hover:border-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-amber">
          Hire me on Fiverr
        </a>
      </div>
    </header>
  );
}

function Waveform() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const renderLoop = () => {
      time += 0.05;
      if (containerRef.current) {
        const spans = containerRef.current.children;
        for (let i = 0; i < spans.length; i++) {
          const base = Math.sin(i * 0.4 + time) * 10;
          const secondary = Math.sin(i * 0.7 - time * 1.2) * 8;
          const h = 22 + base + secondary;
          (spans[i] as HTMLElement).style.height = `${Math.max(6, Math.min(46, h))}px`;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    animationFrameId = requestAnimationFrame(renderLoop);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1100px] mx-auto px-6 flex items-end gap-[3px] h-[46px] opacity-60">
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="flex-1 bg-line rounded-sm"
          style={{ height: '6px' }}
        />
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-[90px] px-6">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[60px]">
        <div>
          <div className="font-mono text-[13px] text-accent-teal tracking-[2px] uppercase mb-3">
            // About
          </div>
          <h2 className="font-display font-normal text-[clamp(30px,4vw,46px)] mb-[26px]">
            Edited for retention,<br/>graded for mood.
          </h2>
          <p className="text-text-muted text-[16px] mb-4 leading-relaxed">
            <strong className="text-text-main font-semibold">Vlogs are my niche</strong> — I know what keeps a viewer watching: a strong hook in the first few seconds, cuts that never drag, and pacing that matches the energy of the story.
          </p>
          <p className="text-text-muted text-[16px] mb-4 leading-relaxed">
            But the editing itself doesn't stop at vlogs. Travel diaries, gaming highlights, brand promos, Instagram reels — same eye for pacing and color, applied to whatever the project needs.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-6">
            {['DaVinci Resolve', 'Color Grading', 'Sound Design', 'Fast Turnaround'].map(tool => (
              <span key={tool} className="font-mono text-[13px] border border-line px-3.5 py-2 rounded-full text-text-muted cursor-default hover:text-text-main hover:border-text-muted transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-[26px]">
          {[
            { tc: '00:00:04:12', title: 'Hooks that hold', desc: 'Edits built around the first 5 seconds, because that\'s where viewers decide to stay.' },
            { tc: '00:01:12:08', title: 'Consistent grade', desc: 'Color that stays consistent shot to shot, so the whole video feels intentional.' },
            { tc: '00:02:30:00', title: 'Sound that fits', desc: 'Music and mix chosen to match the mood, not just fill the silence.' }
          ].map((stat, i) => (
            <div key={i} className="border-l-2 border-line pl-[22px]">
              <div className="font-mono text-accent-amber text-[13px]">{stat.tc}</div>
              <h3 className="font-display font-normal text-[28px] my-1.5">{stat.title}</h3>
              <p className="text-text-muted text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { num: '01', title: 'Vlog Editing', desc: 'Cuts, pacing, and hooks built to keep YouTube viewers watching to the end.' },
    { num: '02', title: 'Color Grading', desc: 'DaVinci Resolve grading for a consistent, cinematic look across every shot.' },
    { num: '03', title: 'Sound Design', desc: 'Music syncing, audio cleanup, and a mix that matches the story\'s mood.' },
    { num: '04', title: 'Reels & Shorts', desc: 'Fast, vertical edits built for Instagram, TikTok, and YouTube Shorts.' },
  ];

  return (
    <section id="services" className="py-[90px] px-6 bg-bg-soft">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-[46px]">
          <div className="font-mono text-[13px] text-accent-teal tracking-[2px] uppercase mb-3">
            // Services
          </div>
          <h2 className="font-display font-normal text-[clamp(30px,4vw,46px)]">
            What I edit
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[1px] bg-line border border-line">
          {services.map(s => (
            <div key={s.num} className="bg-bg-soft py-8 px-[26px]">
              <div className="font-mono text-xs text-text-muted">{s.num}</div>
              <h3 className="font-display font-normal text-[22px] mt-3.5 mb-3">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="text-center pt-[90px] pb-[130px] px-6">
      <div className="font-mono text-[13px] text-accent-teal tracking-[2px] uppercase mb-3 flex justify-center">
        // Contact
      </div>
      <h2 className="font-display font-normal text-[clamp(32px,6vw,64px)] max-w-[760px] mx-auto mb-6">
        Got footage?<br/>Let's cut it together.
      </h2>
      <p className="text-text-muted max-w-[480px] mx-auto mb-8 leading-relaxed">
        Available for YouTube vlogs, reels, and full video editing projects — quick turnaround, clean edits, graded to match your channel's tone.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="https://www.fiverr.com/ambar2611" target="_blank" rel="noopener noreferrer" className="font-mono text-[15px] px-[34px] py-4 rounded-[3px] inline-flex items-center gap-2.5 bg-accent-amber text-[#14161a] font-semibold hover:bg-[#ee8c4f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-amber">
          Message me on Fiverr <ArrowRight size={16} />
        </a>
        <a href="tel:9888082205" className="font-mono text-[15px] px-[34px] py-4 rounded-[3px] inline-flex items-center gap-2.5 border border-line text-text-main hover:border-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-amber">
          Call 9888082205
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-7 px-6 text-center font-mono text-xs text-text-muted flex flex-col gap-2">
      <div>AMBAR.EDITZ — VIDEO EDITOR — LUDHIANA, INDIA</div>
      <div>Ph: 9888082205</div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Waveform />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}
