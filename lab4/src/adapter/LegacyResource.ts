export class LegacyResource {
  private opened = false;

  constructor(readonly id: string) {}

  open(): void {
    this.opened = true;
  }

  doWork(tag?: string): void {
    if (!this.opened) {
      throw new Error(`LegacyResource ${this.id} is not opened`);
    }
    
    void tag;
  }

  close(): void {
    this.opened = false;
  }

  isOpen(): boolean {
    return this.opened;
  }
}
