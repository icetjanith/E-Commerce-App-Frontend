import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { NavigationserviceService } from '../../navigationservice.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent implements AfterViewInit, OnInit {

  constructor(private router: Router,private navigation:NavigationserviceService) {}

  ngOnInit(): void {
    
  }

  @ViewChild("signInModal") signInElement!: ElementRef;
  private signInModal!: Modal;

  @ViewChild("forgotPassWordModal") forgotPasswordElement!: ElementRef;
  private forgotPasswordModal!: Modal;

  @ViewChild("signUpModal") signUpElement!: ElementRef;
  private signUpModal!: Modal;

  @ViewChild("spinner") spinnerElement!: ElementRef;

  loading = false;
  public showAvatar = false;
  showSignInButtons = true;

  public signUp: any = {
    userId:"",
    fullName: "",
    email: "",
    password: "",
    userType: "",
    phoneNumber: "",
    city: ""
  };

  public signIn = {
    email: "",
    password: ""
  };
 

  ngAfterViewInit(): void {
    this.signInModal = new Modal(this.signInElement.nativeElement);
    this.forgotPasswordModal = new Modal(this.forgotPasswordElement.nativeElement);
    this.signUpModal = new Modal(this.signUpElement.nativeElement);
  }

  showSignIn() {
    this.signInModal.show();
  }

  showSignUp() {
    this.signUpModal.show();
  }

  forgotPassword() {
    console.log("forgot password");
    this.signInModal.hide();
    this.forgotPasswordModal.show();
  }

  firstLetter!:String;

  async btnSignUp() {
    console.log("signup");
    this.signUpModal.hide();
    this.loading = true;
    this.spinnerElement.nativeElement.style.display = 'inline';
    try {

      let response = await fetch("http://localhost:8080/users/api/v1/save", {
        method: "Post",
        body: JSON.stringify(this.signUp),
        headers: {
          "Content-Type": "application/json"
        }
      });

      let data = await response.json();

      console.log(data);
      this.signUp=data;
      this.firstLetter=data.fullName.split("",1);
      console.log(this.firstLetter);
      this.showSignInButtons = false;
      this.showAvatar = true;
      this.navigation.avatarImg=true;
      this.navigation.customerId=data.userId;
    } catch(error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.spinnerElement.nativeElement.style.display = 'none';
    }

  }


  async btnSignIn() {
    console.log("signin");
    this.signInModal.hide();
    this.loading = true;
    this.spinnerElement.nativeElement.style.display = 'inline';
    try {

      let response = await fetch("http://localhost:8080/users/api/v1/sign-in", {
        method: "Post",
        body: JSON.stringify(this.signIn),
        headers: {
          "Content-Type": "application/json"
        }
      });

      let data = await response.json();

      console.log(data);
      this.signUp=data;
      this.firstLetter=data.fullName.split("",1);
      console.log(this.firstLetter)
      this.showSignInButtons = false;
      this.showAvatar = true;
      this.navigation.avatarImg=true;
      this.navigation.customerId=data.userId;
    } catch(error) {
      console.log(error);
    } finally {
      this.loading = false;
      this.spinnerElement.nativeElement.style.display = 'none';
    }

  }

  avatar_pop_over: boolean = false;
  showAvatarPopOver() {
    console.log('clicked');
    this.avatar_pop_over = !this.avatar_pop_over;
    console.log('Popover visibility:', this.avatar_pop_over ? 'Shown' : 'Hidden');
  }

  goToDashboard(){
    console.log('dash')
    const userId = this.signUp.userId;
    if(this.signUp.userType==="admin"){
      this.router.navigate(['/admin-dashboard',userId]);
    }else if (this.signUp.userType === 'user') {
      this.router.navigate(['/user-dashboard',userId]);
    }
  }
}
