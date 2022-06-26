import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder,private http:HttpClient,private router:Router) { }

  myForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.myForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      password:['', [Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      cpassword:[''],
      mobile_no:['',[Validators.pattern('^[0-9]{10}$'), Validators.required]]
    })
  }
  get f() { return this.myForm.controls; }


  onSubmit(form: FormGroup) {
    var sendRequestData =form.value;
    if(form.valid){
      if(form.get('cpassword')?.value==form.get('password')?.value){
        console.log('value :::: ',form.value)
        this.http.post('http://localhost:8000/api/v1/todo/create/', sendRequestData).subscribe((res: any) => {
          console.log(res)
          localStorage.setItem('user',JSON.stringify(res))
          if (!res.error) {
            alert("You are Registered Successfully")

              this.router.navigate(['/profile'])
            
              this.myForm.reset();
              this.submitted = false;
            

          }
        }, (error: any) => {
          console.log(error)
          
        });
      }
    }

  }

}
