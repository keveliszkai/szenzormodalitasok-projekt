import * as humps from 'humps';
import * as moment from 'moment';

/**
 * Absctract base class of every Factory.
 */
export abstract class FactoryBase {
  /**
   * Converts the underscore case objects to camelCase objects.
   * @param o Input object (underscore case)
   * @param excepts Array of the properties to except.
   * @example MyFactory.getCamelizedObject({id: 1, last_name: 'Last name', some_profile: {}}, ['some_profile'])
   * @returns Object with camelCase properties.
   * @example {id: 1, lastName: 'Last name'}
   */
  public static getCamelizedObject(o: object, excepts: string[] = []): object {
    const temp = Object.assign({}, o);

    excepts.forEach(key => {
      delete temp[key];
    });

    return humps.camelizeKeys(temp);
  }

  /**
   * Converts the camelCase objects to underscore case objects.
   * @param o Input object (camelCase)
   * @param excepts Array of the properties to except.
   * @example MyFactory.getCamelizedObject({id: 1, lastName: 'Last name', someProfile: {}}, ['someProfile'])
   * @returns Object with underscore case properties.
   * @example {id: 1, last_name: 'Last name'}
   */
  public static getDecamelizedObject(o: object, excepts: string[] = []): object {
    const temp = Object.assign({}, o);

    excepts.forEach(key => {
      delete temp[key];
    });

    return humps.decamelizeKeys(temp);
  }
}
