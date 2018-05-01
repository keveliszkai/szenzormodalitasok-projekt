export class ServerInfo {
  public freeSpace: number;
  public totalSpace: number;
  public memoryUsage: number;
  public totalMemory: number;
  public cpuUsage: number;
  public ip: string;

  public get spaceInMegabytes(): string {
    return `${(this.totalSpace - this.freeSpace) / 1000000}/${this.totalSpace / 1000000}`;
  }

  public get memoryInMegabytes(): string {
    return `${this.memoryUsage / 1000000}/${this.totalMemory / 1000000}`;
  }
}
