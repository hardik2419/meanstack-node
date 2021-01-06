import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    userForm: FormGroup;
    image:any = '';
    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'email': [null, [Validators.required,Validators.email]],
            'phone': [null, [Validators.required,Validators.max(10)]],
            'image': [null, Validators.required],
        });
    }
    onImage(event){
        if (event.target.files.length > 0) {
            this.image = event.target.files[0];
        }
    }
    onFormSubmit(form) {
        console.log(form);

        var formData: any = new FormData();
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("image", this.image);
        this.api.postUser(formData)
            .subscribe(res => {
                let id = res['_id'];
                this.router.navigate(['/user-details', id]);
            }, (err) => {
                console.log(err);
            });
    }

}
