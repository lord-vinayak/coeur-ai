"use client";

import { Button } from "@/components/ui/button";
import BackgroundParticles from "@/components/background-particles";
import { FadeIn } from "@/components/fade-in";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import TextType from "../ui/TextType";
import Prism from "../ui/Prism";
import LogoCarousel from "../ui/LogoCarousel";
import Link from "next/link";

export default function HeroSection() {
  const logos = [
    {
      src: "/logo1.png",
      alt: "Partner Logo 1",
    },
    {
      src: "/logo2.webp",
      alt: "Partner Logo 2",
    },
    {
      src: "/logo3.png",
      alt: "Partner Logo 3",
    },
    {
      src: "/logo4.png",
      alt: "Partner Logo 4",
    },
    {
      src: "/logo5.png",
      alt: "Partner Logo 5",
    },
  ];

  return (
    <section className="relative flex items-center justify-center text-center overflow-hidden min-h-[700px] py-12">
      <div className="absolute inset-0 z-0">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.2}
          glow={1}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center">
          <FadeIn>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 py-2">
              <TextType
                text={["The Future of Cardiac Care is Here"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                startOnVisible={true}
              />
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white md:text-xl">
              Coeur AI revolutionizes cardiac monitoring with cutting-edge
              artificial intelligence, providing life-saving insights for
              clinicians and patients.
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              {/* <Button
                size="lg"
                className="text-base font-semibold px-8 py-6 w-full sm:w-auto">
                Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button> */}
              <Button
                size="lg"
                className="text-base font-semibold px-8 py-6 w-full sm:w-auto"
                asChild>
                <Link href="/demo">
                  Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={600}>
          <div className="mt-6">
            <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
              Trusted & Supported By:
            </p>
            <div className="mt-2 flex justify-center items-center">
              <LogoCarousel columnCount={1} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
