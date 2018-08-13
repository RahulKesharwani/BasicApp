import { Component, OnInit } from '@angular/core';
import { FormControl,FormArray, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import * as cloneDeep from 'lodash/cloneDeep';
import { UserRequest } from '../../../models/user-request';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  
  jobTypes = [
    { id: 1, name: 'Onsite' },
    { id: 2, name: 'Partial Remote' },
    { id: 3, name: 'Full Time Remote' }
  ];

  technologies = ['Front-end development', 'Back-end development', 'Full-stack developement','Data Science', 'DB Administrator'];
  constructor(private formBuilder: FormBuilder) { 
    const controls = this.jobTypes.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to 
    this.userForm = this.createFormGroupWithBuilder(formBuilder , controls);
  }

  ngOnInit() {
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
    const result: UserRequest = cloneDeep(Object.assign({}, this.userForm));
    console.log('after submit');
    console.log(result);
    const selectedOrderIds = this.userForm.value.jobTypes
      .map((v, i) => v ? this.jobTypes[i].id : null)
      .filter(v => v !== null);
      console.log(selectedOrderIds);
  }

  revert(){
    this.userForm.reset(UserRequest);
  }

 
}
