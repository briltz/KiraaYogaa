import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.css']
})
export class SmallCalendarComponent implements OnInit {
  weeks = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
  ];
  currentDate = new Date();
  curMonth = this.currentDate.getMonth();
  curYear = this.currentDate.getFullYear();
  firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
  lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();

  available: Date[] = [
    new Date(2023,3,16),
    new Date(2023,3,30)
  ];

  selected: Date[] = [];

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setDays();
  }

  setDays() {
    this.clearWeeks();
    this.firstDay = new Date(this.curYear, this.curMonth, 1).getDay();
    this.lastDay = new Date(this.curYear, this.curMonth + 1, 0).getDate();
    let count = 0;
    for(let i = 0; i < this.weeks.length; i++){
      for(let j = 0; j < this.weeks[0].length; j++){
        if(count >= this.firstDay && count - this.firstDay + 1 <= this.lastDay){
          this.weeks[i][j] = count - this.firstDay + 1;
        }
        count++;
      }
    }
  }

  clearWeeks(){
    this.weeks = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];
  }

  monthString(month: number): string{
    let names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return names[month];
  }

  dayDisabled(day: number): boolean {
    if(this.curMonth < this.currentDate.getMonth() && this.curYear === this.currentDate.getFullYear() ||
      this.curYear < this.currentDate.getFullYear() ||
      day < this.currentDate.getDate() && this.curMonth === this.currentDate.getMonth() && this.curYear === this.currentDate.getFullYear()){
      return true;
    }
    else {
      return false;
    }
  }

  dayAvailable(day: number): boolean {
    if(this.dayDisabled(day)) {
      return false;
    }
    return this.available.filter(date => date.getFullYear() === this.curYear && date.getMonth() === this.curMonth && date.getDate() === day).length > 0;
  }

  daySelected(day: number): boolean {
    return this.selected.filter(date => date.getFullYear() === this.curYear && date.getMonth() === this.curMonth && date.getDate() === day).length > 0;
  }

  select(day: number): void {
    if(this.daySelected(day)){
      this.selected.splice(this.selected.indexOf(new Date(this.curYear, this.curMonth, day)), 1);
    }
    else {
      this.selected.push(new Date(this.curYear, this.curMonth, day));
    }
  }

  check(e: MouseEvent){
    const popupHeight = 400,
    popupWidth = 300;

    let popupXPosition,
        popupYPosition

    if(e.clientX + popupWidth > window.innerWidth){
        popupXPosition = e.pageX - popupWidth;
    }else{
        popupXPosition = e.pageX;
    }

    if(e.clientY + popupHeight > window.innerHeight){
        popupYPosition = e.pageY - popupHeight;
    }else{
        popupYPosition = e.pageY;
    }

    let circle = document.getElementById('popup');
    let left = e.offsetX;
    let top = e.offsetY;
    if(circle){
      circle.style.left = left + 'px';
      circle.style.top = top + 'px';
    }
  }

  nextMonth() {
    if(this.curMonth === 11){
      this.curMonth = 0;
      this.curYear++;
    }
    else {
      this.curMonth++;
    }
    this.setDays();
  }

  prevMonth() {
    if(this.curMonth === 0){
      this.curMonth = 11;
      this.curYear--;
    }
    else {
      this.curMonth--;
    }
    this.setDays();
  }

}
