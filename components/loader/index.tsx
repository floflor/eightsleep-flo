"use client";

import Image from "next/image";
import NumberLogo from "@/public/eight-sleep-number-logo.svg";
import TextLogo from "@/public/eight-sleep-text-logo.svg";
import { gsap, useGSAP } from "@/lib/gsap/index";
import { useRef } from "react";

export default function Loader() {
  const imageRef = useRef<any>(null);
  const loaderRef = useRef<any>(null);
  const textImageRef = useRef<any>(null);

  useGSAP(() => {
    gsap.to(textImageRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "ease-in-out",
    });
    gsap
      .to(imageRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "ease-in-out",
      })
      .eventCallback("onComplete", () => {
        gsap.to(loaderRef.current, {
          duration: 1,
          height: 0,
          display: "none",
        });
      });
  });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black flex justify-center items-center z-50"
    >
      <div className="flex items-center gap-x-3">
        <Image height={150} ref={imageRef} src={NumberLogo} alt="8" />
        <Image
          height={150}
          src={TextLogo}
          ref={textImageRef}
          alt="Eight Sleep"
        />
      </div>
    </div>
  );
}
