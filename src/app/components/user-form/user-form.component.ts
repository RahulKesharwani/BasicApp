import { Component } from '@angular/core';
import { FormControl,FormArray, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  userForm: FormGroup;
  jobTypes = [
    { id: 1, name: 'Onsite', value: "OS" },
    { id: 2, name: 'Partial Remote', value: "PR" },
    { id: 3, name: 'Full Time Remote', value: "FR" }
  ];

  technologies = ['Front-end development', 'Back-end development', 'Full-stack developement','Data Science', 'DB Administrator']; 
constructor(private formBuilder: FormBuilder) { 
    const controls = this.jobTypes.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to 
    this.userForm = this.createFormGroupWithBuilder(formBuilder , controls);
  }

  createFormGroupWithBuilder(formBuilder: FormBuilder, controls) {
    return formBuilder.group({
      firstName: ['' , Validators.required],
      lastName: '',
      city: ['' , Validators.required],
      tech: '',
      gender: ['' , Validators.required],
      email: new FormControl('',[Validators.required , Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      phoneNumber: new FormControl('',[Validators.required , Validators.minLength(8), Validators.pattern("[0-9]+")]),
      message: '',
      jobTypes: new FormArray(controls)
    });
  }


  onSubmit(){
    const result: any = Object.assign({}, this.userForm);
    console.log('after submit');
    console.log(result);
    result.value.jobTypes = this.findJobType(this.userForm.value.jobTypes);
    console.log(JSON.stringify(result.value));
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(result.value));
  }

  revert(){
    this.userForm.reset(UserRequest);
  }

   findJobType(selectedJobs : string[]){
     let jobTypes = [];
    for(let job in selectedJobs){
      jobTypes.push(this.jobTypes[job]['value']);
    }
    return jobTypes; 
   }
}


export class UserRequest {
    firstName: string = '';
    lastName: string = '';
    city: string = '';
    gender: string = '';
    tech: string = '';
    email: string = '';
    phoneNumber: string = '';
    message: string = '';
}