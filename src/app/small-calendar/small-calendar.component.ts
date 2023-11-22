import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YogaClass } from '../yoga-class';

@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.css']
})
export class SmallCalendarComponent implements OnInit {
  weeks = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  currentDate = new Date();
  curMonth = this.currentDate.getMonth();
  curYear = this.currentDate.getFullYear();
  firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
  lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
  available: YogaClass[] = [
    {
      date: new Date(2023, 10, 23, 19, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 10, 30, 19, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 11, 7, 19, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 11, 14, 19, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 11, 21, 19, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 11, 28, 19, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 10, 26, 18, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 11, 3, 18, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 11, 10, 18, 0),
      type: "Hatha",
      duration: "30 Minutes",
      price: 7
    },
    {
      date: new Date(2023, 10, 27, 19, 0),
      type: "Vinyasa",
      duration: "1 Hour",
      viewOnly: true,
      link: "https://www.livewithspirit.ca/classschedule",
      location: 'Live With Spirit Studio'
    },
    {
      date: new Date(2023, 11, 4, 19, 0),
      type: "Vinyasa",
      duration: "1 Hour",
      viewOnly: true,
      link: "https://www.livewithspirit.ca/classschedule",
      location: 'Live With Spirit Studio'
    },
    {
      date: new Date(2023, 11, 11, 19, 0),
      type: "Vinyasa",
      duration: "1 Hour",
      viewOnly: true,
      link: "https://www.livewithspirit.ca/classschedule",
      location: 'Live With Spirit Studio'
    },
    {
      date: new Date(2023, 11, 18, 19, 0),
      type: "Vinyasa",
      duration: "1 Hour",
      viewOnly: true,
      link: "https://www.livewithspirit.ca/classschedule",
      location: 'Live With Spirit Studio'
    },
    {
      date: new Date(2023, 11, 25, 19, 0),
      type: "Vinyasa",
      duration: "1 Hour",
      viewOnly: true,
      link: "https://www.livewithspirit.ca/classschedule",
      location: 'Live With Spirit Studio'
    },
  ];
  selected: Date[] = [];
  checking: boolean = false;
  checkDate: Date = new Date();

  @Output() dateSelect = new EventEmitter<Date[]>();

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setDays();
  }

  setDays() {
    this.clearWeeks();
    this.firstDay = new Date(this.curYear, this.curMonth, 1).getDay();
    this.lastDay = new Date(this.curYear, this.curMonth + 1, 0).getDate();
    let count = 0;
    for (let i = 0; i < this.weeks.length; i++) {
      for (let j = 0; j < this.weeks[0].length; j++) {
        if (count >= this.firstDay && count - this.firstDay + 1 <= this.lastDay) {
          this.weeks[i][j] = count - this.firstDay + 1;
        }
        count++;
      }
    }
  }

  clearWeeks() {
    this.weeks = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];
  }

  monthString(month: number): string {
    let names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[month];
  }

  dayDisabled(day: number): boolean {
    if (this.curMonth < this.currentDate.getMonth() && this.curYear === this.currentDate.getFullYear() ||
      this.curYear < this.currentDate.getFullYear() ||
      day < this.currentDate.getDate() && this.curMonth === this.currentDate.getMonth() && this.curYear === this.currentDate.getFullYear()) {
      return true;
    }
    else {
      return false;
    }
  }

  dayAvailable(day: number): boolean {
    if (this.dayDisabled(day)) {
      return false;
    }
    return this.available.filter(date => date.date.getFullYear() === this.curYear && date.date.getMonth() === this.curMonth && date.date.getDate() === day).length > 0;
  }

  dayViewOnly(day: number): boolean {
    if (!this.dayAvailable(day)) {
      return false;
    }
    return this.available.find(date => date.date.getFullYear() === this.curYear && date.date.getMonth() === this.curMonth && date.date.getDate() === day).viewOnly;
  }

  daySelected(date: Date): boolean {
    return this.selected.filter(d => d === date).length > 0;
  }

  select(date: Date): void {
    this.daySelected(date) ? this.selected.splice(this.selected.indexOf(date), 1) : this.selected.push(date);
    this.dateSelect.emit(this.selected);
  }

  check(day: number) {
    if (this.dayAvailable(day)) {
      if (this.checkDate.getFullYear() === this.curYear && this.checkDate.getMonth() === this.curMonth && this.checkDate.getDate() === day && this.checking) {
        this.checking = false;
      }
      else {
        this.checking = true;
        this.checkDate = new Date(this.curYear, this.curMonth, day);
      }
    }
  }

  getTime(d: Date): string {
    let ampm = "AM";
    let hour = d.getHours();
    let minute = d.getMinutes();
    let zero = "";
    if (hour > 11) {
      ampm = "PM";
    }
    if (hour > 12) {
      hour -= 12;
    }
    if (minute < 10) {
      zero = "0";
    }
    return (hour + ":" + zero + minute + " " + ampm);
  }

  getClasses(date: Date): YogaClass[] {
    let classes: YogaClass[] = [];
    this.available.forEach(c => {
      if (c.date.getFullYear() === date.getFullYear() && c.date.getMonth() === date.getMonth() && c.date.getDate() === date.getDate()) {
        classes.push(c);
      }
    });
    return classes;
  }

  nextMonth() {
    if (this.curMonth === 11) {
      this.curMonth = 0;
      this.curYear++;
    }
    else {
      this.curMonth++;
    }
    this.setDays();
  }

  prevMonth() {
    if (this.curMonth === 0) {
      this.curMonth = 11;
      this.curYear--;
    }
    else {
      this.curMonth--;
    }
    this.setDays();
  }

}
