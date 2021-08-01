import { UsersService } from "./users.service";
import { User } from "./user";
import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserResolver implements Resolve<User> {
  constructor(private users: UsersService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.users.getUser(route.params?.id).pipe(
      delay(4000),
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY;
      })
    );
  }
}
