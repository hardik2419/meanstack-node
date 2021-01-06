import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit {

    user = {};
    imageUrl = environment.imageUrl
    constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

    ngOnInit() {
      this.getuserDetails(this.route.snapshot.params['id']);
    }

    getuserDetails(id) {
      this.api.getUser(id)
        .subscribe(data => {
          console.log(data);
          this.user = data;
        });
    }

    deleteuser(id) {
      this.api.deleteUser(id)
        .subscribe(res => {
            this.router.navigate(['/users']);
          }, (err) => {
            console.log(err);
          }
        );
    }

}
