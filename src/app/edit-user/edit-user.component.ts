import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    userForm: FormGroup;
    id: string = '';
    image: any = '';
    imageUrl = environment.imageUrl
    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.getuser(this.route.snapshot.params['id']);
        this.userForm = this.formBuilder.group({
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'email': [null, [Validators.required, Validators.email]],
            'phone': [null, [Validators.required]],
            'image': [''],
        });
    }

    getuser(id) {
        this.api.getUser(id).subscribe(data => {
            this.id = data._id;
            this.userForm.setValue({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                image: '',
            });
        });
    }
    onImage(event) {
        if (event.target.files.length > 0) {
            this.image = event.target.files[0];
        }
    }
    onFormSubmit(form) {

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

    userDetails() {
        this.router.navigate(['/user-details', this.id]);
    }
}
