import { Component, OnInit } from '@angular/core';
import * as TextContent from '../../assets/textContent.json';
import { Coordinate } from '../coordinate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  igLogo = './../assets/ig-logo.png';
  home1 = './../assets/Home1.jpg';
  textContent = TextContent;
  stars: string[] =  [];
  numStars = 8;

  starPos: Coordinate[] = [
    {x: 157, y: 78},
    {x: 258, y: 381},
    {x: 340, y: 663},
    {x: 38, y: 863},
    {x: 716, y: 857},
    {x: 1061, y: 929},
    {x: 1817, y: 878},
    {x: 530, y: 70},
    {x: 1707, y: 510},
    {x: 1880, y: 294},
    {x: 1800, y: 77},
    {x: 1301, y: 152},
  ];

  constructor() { }

  ngOnInit(): void {
    for(let i = 0; i < this.numStars; i++){
      this.stars.push("./../assets/Stars/Star" + (i+1) + ".png");
    }
    this.starPos = this.shuffle(this.starPos);
  }

  randomStar (index: number): string {
    switch(index){
      case 0: return this.stars[0];
      case 1: return this.stars[1];
      case 2: return this.stars[2];
    }
    return this.stars[Math.floor(Math.random() * (this.numStars-3))+3];
  }

  randomTurn (): number {
    return (Math.random() * 90) - 45;
  }

  shuffle(array: Coordinate[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

}
