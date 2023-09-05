import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { DatePipe } from '@angular/common';
import * as TextContent from '../../assets/textContent.json';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-group-classes',
  templateUrl: './group-classes.component.html',
  styleUrls: ['./group-classes.component.css']
})
export class GroupClassesComponent implements OnInit {
  requiredFields: boolean[] = [false, false, false, false];
  review: boolean = false;
  waiver: boolean = false;
  submitted: boolean = false;
  content = TextContent;
  today = new Date();
  error: boolean = false;
  booking: boolean = true;
  signing: boolean = false;
  signed: boolean = false;

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  bookingForm = this.formBuilder.group({
    name: '',
    additionalInfo: '',
    phone: '',
    email: '',
    date: ['', [Validators.required]],
    today: this.datePipe.transform(this.today, 'MMMM d, YYYY'),
    signature: ''
  });

  @ViewChild('signature') signaturePad: SignaturePadComponent;

  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 0.1,
    maxWidth: 2,
    canvasWidth: 300,
    canvasHeight: 100
  };

  ngOnInit(): void {
  }

  clear() {
    this.signaturePad.clear();
    this.signed = false;
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    this.signed = true;
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }

  setDate(dates: Date[]): void {
    let d: string[] = [];
    dates.forEach(date => {
      d.push("\n" + this.datePipe.transform(date, 'MMMM d, h:mm a') as string);
    });
    this.bookingForm.get('date')?.setValue(d.toString());
  }

  submit(): void {
    this.submitted = true;
    this.bookingForm.get('signature')?.setValue(this.signaturePad.toDataURL());
    if (this.bookingForm.value.name) {
      if (!this.bookingForm.value.additionalInfo) this.bookingForm.value.additionalInfo = 'N/A';
      emailjs.init("user_rOlcwNHj5N8gq6GYBPeyK");
      emailjs.send('service_7u3xx4f', 'template_vfp1nxl', this.bookingForm.value)
        .then((response) => {
          this.booking = false;
        }, (error) => {
          this.booking = false;
          this.error = true;
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
