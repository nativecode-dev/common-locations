import * as path from 'path'
import { PlatformConfigLocation } from './PlatformConfigLocation'

export class PlatformLocation {
  private readonly location: PlatformConfigLocation

  constructor(location: PlatformConfigLocation) {
    this.location = location
  }

  public local(...args: string[]): string {
    return path.join(this.location.local, ...args)
  }

  public system(...args: string[]): string {
    return path.join(this.location.system, ...args)
  }

  public user(...args: string[]): string {
    return path.join(this.location.user, ...args)
  }
}
