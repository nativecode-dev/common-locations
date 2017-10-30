import { PlatformConfigLocation } from './PlatformConfigLocation'

export interface PlatformConfig extends PlatformConfigProperties {
  [key: string]: PlatformConfigLocation
}

export interface PlatformConfigProperties {
  app: PlatformConfigLocation
  bin: PlatformConfigLocation
  config: PlatformConfigLocation
  lib: PlatformConfigLocation
  log: PlatformConfigLocation
}
