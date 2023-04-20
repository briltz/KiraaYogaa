import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-group-classes',
  templateUrl: './group-classes.component.html',
  styleUrls: ['./group-classes.component.css']
})
export class GroupClassesComponent implements OnInit {
  requiredFields: boolean[] = [false, false, false, false];
  bottomText: string = "";
  review: boolean = false;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  bookingForm = this.formBuilder.group({
    name: '',
    additionalInfo: '',
    phone: '',
    email: '',
    date: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  setDate(dates: Date[]): void {
    let d: string[] = [];
    dates.forEach(date => {
      d.push("\n" + this.datePipe.transform(date, 'MMMM d, h:mm a') as string);
    });
    this.bookingForm.get('date')?.setValue(d.toString());
  }

  submit(): void {
    if (this.bookingForm.value.name) {
      this.bottomText = "Booking class, please wait...";
      if (!this.bookingForm.value.additionalInfo) this.bookingForm.value.additionalInfo = 'N/A';
      emailjs.init("user_rOlcwNHj5N8gq6GYBPeyK");
      emailjs.send('service_7u3xx4f', 'template_vfp1nxl', this.bookingForm.value)
        .then((response) => {
          this.bottomText = "Class booked successfully!";
        }, (error) => {
          this.bottomText = "There was a problem booking the class. Please try again later.";
        });
    }
    else {
      if (!this.bookingForm.value.name) this.requiredFields[0] = true;
      else this.requiredFields[0] = false;
      if (!this.bookingForm.value.phone) this.requiredFields[5] = true;
      else this.requiredFields[5] = false;
      if (!this.bookingForm.value.email) this.requiredFields[6] = true;
      else this.requiredFields[6] = false;
    }
  }
}
