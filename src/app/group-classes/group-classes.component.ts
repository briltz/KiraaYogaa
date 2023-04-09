import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-group-classes',
  templateUrl: './group-classes.component.html',
  styleUrls: ['./group-classes.component.css']
})
export class GroupClassesComponent implements OnInit {
  requiredFields: boolean[] = [false, false, false, false];
  bottomText: string = "";

  constructor(private formBuilder: FormBuilder) { }

  bookingForm = this.formBuilder.group({
    name: '',
    additionalInfo: '',
    phone: '',
    email: ''
  });

  ngOnInit(): void {
  }

  submit(): void {
    if(this.bookingForm.value.name) {
      this.bottomText = "Sending message...";
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
      if(!this.bookingForm.value.phone) this.requiredFields[5] = true;
      else this.requiredFields[5] = false;
      if(!this.bookingForm.value.email) this.requiredFields[6] = true;
      else this.requiredFields[6] = false;
    }
  }
}
