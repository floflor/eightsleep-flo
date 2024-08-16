import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollToPlugin,TextPlugin);

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin, TextPlugin };
