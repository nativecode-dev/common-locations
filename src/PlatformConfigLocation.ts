export interface PlatformConfigLocation extends PlatformConfigLocationProperties {
  [key: string]: string
}

export interface PlatformConfigLocationProperties {
  local: string
  system: string
  user: string
}
