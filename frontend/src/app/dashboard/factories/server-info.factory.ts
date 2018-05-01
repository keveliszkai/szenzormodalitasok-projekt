import { ServerInfo } from '../models/server-info.model';
import { FactoryBase } from '../../shared/factory.base';

export class ServerInfoFactory extends FactoryBase {
  public static loadFromResponse(response): ServerInfo {
    const result: ServerInfo = Object.assign(new ServerInfo(), this.getCamelizedObject(response));
    return result;
  }
}
