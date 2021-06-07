import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/core/models/connected.user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy{

  defaultUserImage: string = "/assets/images/default_user_image_header_26px.png";
  userImageUrl: string;

  userSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
   this.userSub = this.authService.user$
                    .pipe(
                      map((user: User)=> {
                        return user.imageUrl
                      })
                    )
                    .subscribe(
                      result => this.userImageUrl = result
                    )
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
