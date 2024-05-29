import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLog: any;
  private token: string = '';

  constructor(private http: HttpClient, private storage: StorageService,
    private router: Router) {
  }

  async ngOnInit() {
  }

  async getLogUser(){
    this.userLog = await this.storage.get("user");
    const user = this.userLog ? JSON.parse(this.userLog) : { id: 0 };
    return user;
  }

  async login(user: { email: string; password: string; }): Promise<boolean> {
    if (user) {
      return this.http
        .post<boolean>(`${environment.backend}/users/login`, user)
        .toPromise()
        .then((result: any) => {
          this.token = result.token;
          this.storage.set("token", this.token);
          this.storage.set("user", result.data);
          return true;
        })
        .catch((err) => {
          this.token = '';
          return false;
        });
    }
    return false;
  }

  async logout() {
    await this.storage.remove("token");
    await this.storage.remove("user");
    this.router.navigate(['/login']);
  }
}
