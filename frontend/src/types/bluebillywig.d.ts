interface BBPlayer extends HTMLElement {
  on(event: string, handler: (...args: unknown[]) => void): void;
  off(event: string): void;
  getCurrentTime(): number;
  getDuration(): number;
  play(): boolean;
  pause(): boolean;
  getPhase(): string;
  destruct(): void;
}
