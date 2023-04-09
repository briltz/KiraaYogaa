import { Component, OnInit } from '@angular/core';
import { YogaStyle } from '../yoga-style';
import { FormBuilder } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-private-classes',
  templateUrl: './private-classes.component.html',
  styleUrls: ['./private-classes.component.css']
})
export class PrivateClassesComponent implements OnInit {

  styles: YogaStyle[] = [
    {name: "Restorative", description: "", isChecked: false},
    {name: "Yin", description: "", isChecked: false},
    {name: "Hataha", description: "", isChecked: false},
    {name: "Vinyāsa", description: "", isChecked: false},
    {name: "Slow Flow", description: "", isChecked: false}
  ];

  durations: string[] = ["30 Minutes", "1 Hour"];
  experienceLevels: string[] = ["Beginner", "Experienced", "Advanced"];
  requiredFields: boolean[] = [false, false, false, false, false, false, false, false];
  bottomText: string = "";

  constructor(private formBuilder: FormBuilder) { }

  bookingForm = this.formBuilder.group({
    name: '',
    style: '',
    duration: '',
    peakPose: '',
    additionalInfo: '',
    pa: '',
    favAsanas: '',
    experienceLevel: '',
    theme: '',
    music: '',
    phone: '',
    email: '',
    setting: ''
  });

  ngOnInit(): void {
  }

  submit(): void {
    if(this.bookingForm.value.name && this.bookingForm.value.style && this.bookingForm.value.duration) {
      this.bottomText = "Sending message...";
      if(!this.bookingForm.value.peakPose) this.bookingForm.value.peakPose = 'N/A';
      if(!this.bookingForm.value.additionalInfo) this.bookingForm.value.additionalInfo = 'N/A';
      emailjs.init("user_rOlcwNHj5N8gq6GYBPeyK");
      emailjs.send('service_7u3xx4f', 'template_vfp1nxl', this.bookingForm.value)
        .then((response) => {
          this.bottomText = "Message sent successfully!";
        }, (error) => {
          this.bottomText = "There was a problem sending the message. Please try again later.";
        });
    }
    else{
      if(!this.bookingForm.value.name) this.requiredFields[0] = true;
      else this.requiredFields[0] = false;
      if(!this.bookingForm.value.style) this.requiredFields[1] = true;
      else this.requiredFields[1] = false;
      if(!this.bookingForm.value.duration) this.requiredFields[2] = true;
      else this.requiredFields[2] = false;
      if(!this.bookingForm.value.pa) this.requiredFields[3] = true;
      else this.requiredFields[3] = false;
      if(!this.bookingForm.value.experienceLevel) this.requiredFields[4] = true;
      else this.requiredFields[4] = false;
      if(!this.bookingForm.value.phone) this.requiredFields[5] = true;
      else this.requiredFields[5] = false;
      if(!this.bookingForm.value.email) this.requiredFields[6] = true;
      else this.requiredFields[6] = false;
      if(!this.bookingForm.value.setting) this.requiredFields[7] = true;
      else this.requiredFields[7] = false;
    }
  }

}
