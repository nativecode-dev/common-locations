import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import { PathResolver } from './PathResolver'
import { PlatformConfig, PlatformConfigProperties } from './PlatformConfig'
import { PlatformConfigLocation } from './PlatformConfigLocation'
import { PlatformLocation } from './PlatformLocation'

export class Platform {
  private readonly appname: string
  private readonly platform: PlatformConfig
  private readonly resolver: PathResolver

  constructor(appname: string) {
    this.appname = appname

    const filename = `${os.platform()}.json`
    const filepath = path.join(__dirname, 'platforms', filename)
    const file = fs.readFileSync(filepath)
    this.platform = JSON.parse(file.toString())
    this.resolver = new PathResolver(this.appname)
    this.configure()
  }

  public get app(): PlatformLocation {
    return new PlatformLocation(this.platform.app)
  }

  public get bin(): PlatformLocation {
    return new PlatformLocation(this.platform.bin)
  }

  public get config(): PlatformLocation {
    return new PlatformLocation(this.platform.config)
  }

  public get lib(): PlatformLocation {
    return new PlatformLocation(this.platform.lib)
  }

  public get log(): PlatformLocation {
    return new PlatformLocation(this.platform.log)
  }

  public resolve(path: string): string {
    return this.resolver.resolve(path)
  }

  private configure(): void {
    Object.keys(this.platform).map(key => this.platform[key]).forEach(location => {
      Object.keys(location).forEach(key => location[key] = this.resolver.resolve(location[key]))
    })
  }
}
