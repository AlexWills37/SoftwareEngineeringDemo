import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
/**
 * WARNING: The current implementation for this pipe is UNSAFE and opens up XSS risks.
 * It should only be used for URLs that we genuinely trust (such as urls directly from
 * the youtube api, and not anything from users)
 *
 * NOTE: This pipe is pretty much directly copied from stack overflow:
 * https://stackoverflow.com/questions/38037760/how-to-set-iframe-src-without-causing-unsafe-value-exception
 *
 * This pipe exists to clean URLs and make them safe for the iframes.
 * To explain pipes, and to explain this particular pipe (for teammates and anyone looking at code),
 * I have tried to use comments to dissect the code.
 *
 * What is a pipe? A pipe is a way in angular to transform data.
 * Instead of string.toUpper() to make a string uppercase, you would do string | uppercase
 * example:
 *    <p> My name is {{ this.name | uppercase }} </p>
 *
 * This pipe in particular takes a URL and labels it as sanitized it for the browser to trust it.
 * To use this pipe, you can do {{ url | safe }}
 *
 * @author Alex Wills
 */
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  // Here we inject the DomSanitizer from the angular library
  // putting the access modifier in the constructor is shorthand for storing the parameter in a variable with the
  // same name in this object
  constructor(private domSanitizer: DomSanitizer){  }

  transform(url: string) {
    // This pipe bypasses security by converting the url into a SafeResourceUrl
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
