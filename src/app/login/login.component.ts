import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private fb: FormBuilder,private http:HttpClient) { }

  loginForm!: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:[''],
      password:[''],
    })
  }

  onSubmit(form: FormGroup) {
    if(form.valid){
        this.http.get('http://localhost:8000/api/v1/todo/login/'+form.get('email')?.value+"/"+form.get('password')?.value).subscribe((res: any) => {
          
          if (!res.error) {
            if (res) {
              this.loginForm.reset();
              localStorage.setItem('user',JSON.stringify(res))
              alert("Logged in Successfully")
              this.router.navigate(['/profile'])
              this.submitted = false;
            } 
          }
        }, (error: any) => {
          console.log(error)
          
        });
    }

  }

}
