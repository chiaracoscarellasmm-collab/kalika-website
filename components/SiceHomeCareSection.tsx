import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import type { Dictionary } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
});

type Props = {
  dict: Dictionary;
  imageSrc: string;
  imageAlt: string;
};

export function SiceHomeCareSection({ dict, imageSrc, imageAlt }: Props) {
  const copy = dict.estetica.sice;

  return (
    <section className="mt-20 border-t border-[var(--color-line)] pt-16 sm:mt-24 sm:pt-20">
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <h2
              className={`${cormorant.className} text-3xl font-normal italic text-[var(--color-brown)] sm:text-4xl`}
            >
              {copy.continueTitle}
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-8 text-[var(--color-espresso)]/75 sm:text-lg sm:leading-8">
              {copy.continueBody}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white/70 shadow-sm sm:aspect-[5/4]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 448px"
                quality={90}
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
