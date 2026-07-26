"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

type ImageDotsSliderProps = {
  slides: Slide[];
  className?: string;
  sizes?: string;
  quality?: number;
  autoPlayMs?: number;
};

const SWIPE_THRESHOLD_PX = 40;

export default function ImageDotsSlider({
  slides,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  quality = 90,
  autoPlayMs = 4500,
}: ImageDotsSliderProps) {
  const [index, setIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerId = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1 || autoPlayMs <= 0) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [slides.length, autoPlayMs, index]);

  if (slides.length === 0) return null;

  const goPrev = () =>
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((current) => (current + 1) % slides.length);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (slides.length <= 1) return;
    pointerStartX.current = event.clientX;
    pointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current == null || pointerId.current !== event.pointerId) {
      return;
    }
    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    pointerId.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // already released
    }
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
    if (deltaX < 0) goNext();
    else goPrev();
  };

  const onPointerCancel = () => {
    pointerStartX.current = null;
    pointerId.current = null;
  };

  return (
    <div
      className={`relative touch-pan-y overflow-hidden ${className}`}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div className="relative aspect-[16/10] w-full cursor-grab active:cursor-grabbing">
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            quality={quality}
            draggable={false}
            className={`pointer-events-none select-none object-cover transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Foto precedente"
            className="absolute left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/35 text-[var(--color-brown)] backdrop-blur-[2px] transition hover:bg-white/55 lg:flex"
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Foto successiva"
            className="absolute right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/35 text-[var(--color-brown)] backdrop-blur-[2px] transition hover:bg-white/55 lg:flex"
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-2"
            role="tablist"
            aria-label="Galleria prodotti"
          >
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Foto ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`pointer-events-auto h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "scale-110 bg-white/90"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
