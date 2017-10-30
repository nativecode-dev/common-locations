import * as os from 'os'
import * as path from 'path'

type Resolver = (value: string) => string

export class PathResolver {
  private readonly appname: string

  constructor(appname: string) {
    this.appname = appname
  }

  public resolve(value: string): string {
    const resolver = [this.resolveEnvironment, this.resolveHomePath, this.resolveVariables]
      .reduce((previous: Resolver, current: Resolver): Resolver => {
        return v => previous(current(v))
      }, value => value)

    return resolver(value)
  }

  private resolveEnvironment = (value: string): string => {
    const parts = value.split(':')
    if (parts.length > 0 && parts[0] === 'env') {
      const envname = parts[1]
      const env = process.env[envname]
      if (env && parts.length > 2) {
        const joinpath = parts[2]
        const resolved = path.resolve(path.join(env, joinpath))
        return resolved
      }
      return env || value
    }
    return value
  }

  private resolveHomePath = (value: string): string => {
    if (value && value[0] === '~') {
      return path.join(os.homedir(), value.substring(1))
    }
    return value
  }

  private resolveVariables = (value: string): string => {
    const regex = new RegExp(`\{\{appname\}\}`, 'gm')
    const result = value.replace(regex, this.appname)
    return result
  }
}
