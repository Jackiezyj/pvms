import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
@Injectable()
export class LoginGuard implements CanActivate {
  loggedIn: boolean = false;
  todolist: any;
  constructor(
    private router: Router,
  ) {
  }

  async canActivate() {
    if (!this.loggedIn) {
      console.log("用户未登录");
      this.router.navigateByUrl("/login");
    }
    console.log(this.loggedIn);
    return this.loggedIn;
  }
}
