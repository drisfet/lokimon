import { Rabbit, Bird, Turtle, Fish, Cat, Dog, Bug, Ghost, Feather, LucideProps } from "lucide-react";
import { ComponentType } from "react";

export interface Focumon {
  id: number;
  name: string;
  icon: ComponentType<LucideProps>;
  discoveryThreshold: number; // Number of completed sessions to discover
}

export const focumonLibrary: Focumon[] = [
  { id: 1, name: "Focu", icon: Rabbit, discoveryThreshold: 0 },
  { id: 2, name: "Tweetom", icon: Bird, discoveryThreshold: 1 },
  { id: 3, name: "Shelly", icon: Turtle, discoveryThreshold: 3 },
  { id: 4, name: "Finny", icon: Fish, discoveryThreshold: 5 },
  { id: 5, name: "Purrfect", icon: Cat, discoveryThreshold: 8 },
  { id: 6, name: "Puppy", icon: Dog, discoveryThreshold: 12 },
  { id: 7, name: "Buggy", icon: Bug, discoveryThreshold: 15 },
  { id: 8, name: "Ghosty", icon: Ghost, discoveryThreshold: 20 },
  { id: 9, name: "Feathy", icon: Feather, discoveryThreshold: 25 },
];

export function getDiscoveredFocumon(completedSessions: number): Focumon[] {
    return focumonLibrary.filter(f => completedSessions >= f.discoveryThreshold);
}
