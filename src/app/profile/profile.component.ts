import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
    private http:HttpClient) {
    this.user =localStorage.getItem('user')
    console.log(this.user)

     }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:[''],
      email:[''],
      mobile_no:['']
    })
    this.getDetailsById()
  }
  

  getDetailsById() {
    var user=JSON.parse(this.user)
    // console.log('http://localhost:8000/api/v1/todo/'+user.id+"/")
    this.http.get('http://localhost:8000/api/v1/todo/'+user.id+"/").subscribe((res: any) => {
      if (!res.error) {
        var data = res;
        this.profileForm.patchValue({
          name: data.name,
          email: data.email,
          mobile_no:data.mobile_no,
        });
        
        
      }
    },
      (error: any) => {  
        console.log("Oops! Something went wrong!");
      });
  }
  onProductAddForm() {
    var self = this;
    var user=JSON.parse(this.user)

    if (self.profileForm.invalid) {
      return;
    } else {
      var sendRequestData = self.profileForm.value;
      sendRequestData.id=user.id
      sendRequestData.password=user.password
      sendRequestData.image_url
      console.log("sendRequestData :::: ",sendRequestData)

      self.http.put('http://localhost:8000/api/v1/todo/update/'+user.id+"/", sendRequestData).subscribe((res: any) => {
        console.log(res)
        if (!res.error) {
          if (res.replyCode == 'success') {
            alert("Profile is updated Successfully")

            this.router.navigate(['profile']);
          } 

        }
      });
    }
  }

}
