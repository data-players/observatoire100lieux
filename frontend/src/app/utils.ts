export class Utils {
  extractUrlHash(url:string): string {
    const strings = url.split('/');
    return strings[strings.length-1]
  }
}
