import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;
  displayedColumns = ['name', 'email', 'phone','image'];
  dataSource = new userDataSource(this.api);
  imageUrl = environment.imageUrl
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res => {
        console.log(res);
        this.users = res;
      }, err => {
        console.log(err);
      });
  }
}

export class userDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getUsers();
  }

  disconnect() {

  }
}
