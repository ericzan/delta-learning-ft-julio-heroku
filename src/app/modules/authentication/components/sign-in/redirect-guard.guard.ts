import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
@Injectable()
export class RedirectGuard implements CanActivate
{



  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {

      //  console.log(route.url[0].path);
      //  console.log(route.queryParamMap.keys);
      //  console.log(route.queryParamMap.get('chilURL'));
      //  console.log(route.queryParamMap.getAll);

       let _URL = route.queryParamMap.get('stripeURL')!.toString();
      window.location.href = _URL;
      return true;

  }


}
