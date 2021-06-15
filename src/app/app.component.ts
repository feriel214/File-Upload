import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userForm: FormGroup;
  isPhotoError = false;
  image: string;
  submitted : boolean = false;
  uploadError: string = '';
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.newForm();
  }

  newForm = function () {
    this.userForm = this.fb.group({
      photo         : ['', Validators.compose([Validators.required])],
      lastname      : [''],
      age      : [''],
      class      : ['']
    })
  }

  PostData() {
    this.submitted = true;
    if(!this.userForm.valid) {
      return false;
    }
    if (this.userForm.get('photo').invalid) {
      this.isPhotoError = true;
    }
    this.uploadError = '';
    const formData = new FormData();
    formData.append('photo', this.userForm.get('photo').value);
    formData.append(' lastname', this.userForm.get('lastname').value)
    formData.append(' age', this.userForm.get('age').value)
    formData.append(' class', this.userForm.get('class').value)
     this.http.post('http://localhost:8082/upload', formData).subscribe(resp => {
      if(resp['status'] == 'success') {
        console.log('/////////////////formData',formData)
        alert('File saved in file-upload-server/uploads');
      }
    }, (resp)=> {
      this.uploadError = 'Some error occured please try later';
      console.log(resp);
    });
 

  }

  onFileSelect(file: Event) {
    console.log('**********file',file)
    this.userForm.patchValue({ photo: file });
    this.userForm.get('photo').updateValueAndValidity();
  }
}