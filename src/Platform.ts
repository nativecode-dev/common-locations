import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import { PathResolver } from './PathResolver'
import { PlatformConfig, PlatformConfigProperties } from './PlatformConfig'
import { PlatformConfigLocation } from './PlatformConfigLocation'

export class Platform implements PlatformConfigProperties {
  private readonly appname: string
  private readonly platform: PlatformConfig
  private readonly resolver: PathResolver

  constructor(appname: string) {
    this.appname = appname

    const filename = `${os.platform()}.json`
    const filepath = path.join(process.cwd(), 'platforms', filename)
    const file = fs.readFileSync(filepath)
    this.platform = JSON.parse(file.toString())
    this.resolve(new PathResolver(this.appname))
  }

  public get app(): PlatformConfigLocation {
    return this.platform.app
  }

  public get bin(): PlatformConfigLocation {
    return this.platform.bin
  }

  public get config(): PlatformConfigLocation {
    return this.platform.config
  }

  public get lib(): PlatformConfigLocation {
    return this.platform.lib
  }

  public get log(): PlatformConfigLocation {
    return this.platform.log
  }

  private resolve(resolver: PathResolver): void {
    Object.keys(this.platform)
      .map(key => this.platform[key])
      .forEach(location => {
        Object.keys(location)
          .forEach(key => location[key] = resolver.resolve(location[key]))
      })
  }
}
